use anyhow::Result;
use std::sync::Arc;
use sui_indexer_alt_framework::pipeline::Processor;
use sui_indexer_alt_framework::types::full_checkpoint_content::Checkpoint;

use crate::models::{NullEvent, StoredNullEvent, StoredTransactionDigest};
use crate::schema::null_events;
use crate::schema::transaction_digests::dsl::*;
use diesel_async::RunQueryDsl;
use sui_indexer_alt_framework::{
    pipeline::sequential::Handler,
    postgres::{Connection, Db},
};

// ── NullEvent filter constants ────────────────────────────────────────────────

// Raw bytes of the package ID — avoids any string-formatting ambiguity (0x prefix, etc.)
const TARGET_PACKAGE: [u8; 32] = [
    0xff, 0x38, 0x35, 0xea, 0x4f, 0x41, 0x62, 0xc1,
    0x50, 0x5e, 0x56, 0x81, 0x64, 0xb0, 0xe0, 0xf4,
    0x16, 0x7b, 0xe4, 0xa2, 0x3f, 0x6e, 0xc5, 0x8f,
    0x53, 0x4c, 0x07, 0x9f, 0x6e, 0xfe, 0xda, 0x77,
];
const TARGET_MODULE: &str = "presign_events";
const NULL_EVENT_NAME: &str = "NullEvent";

// ── TransactionDigestHandler ──────────────────────────────────────────────────

pub struct TransactionDigestHandler;

#[async_trait::async_trait]
impl Processor for TransactionDigestHandler {
    const NAME: &'static str = "transaction_digest_handler";

    type Value = StoredTransactionDigest;

    async fn process(&self, checkpoint: &Arc<Checkpoint>) -> Result<Vec<Self::Value>> {
        let checkpoint_seq = checkpoint.summary.sequence_number as i64;

        let digests = checkpoint
            .transactions
            .iter()
            .map(|tx| StoredTransactionDigest {
                tx_digest: tx.transaction.digest().to_string(),
                checkpoint_sequence_number: checkpoint_seq,
            })
            .collect();

        Ok(digests)
    }
}

#[async_trait::async_trait]
impl Handler for TransactionDigestHandler {
    type Store = Db;
    type Batch = Vec<Self::Value>;

    fn batch(&self, batch: &mut Self::Batch, values: std::vec::IntoIter<Self::Value>) {
        batch.extend(values);
    }

    async fn commit<'a>(&self, batch: &Self::Batch, conn: &mut Connection<'a>) -> Result<usize> {
        let inserted = diesel::insert_into(transaction_digests)
            .values(batch)
            .on_conflict(tx_digest)
            .do_nothing()
            .execute(conn)
            .await?;

        Ok(inserted)
    }
}

// ── NullEventHandler ──────────────────────────────────────────────────────────

pub struct NullEventHandler;

#[async_trait::async_trait]
impl Processor for NullEventHandler {
    const NAME: &'static str = "null_event_handler";

    type Value = StoredNullEvent;

    async fn process(&self, checkpoint: &Arc<Checkpoint>) -> Result<Vec<Self::Value>> {
        let checkpoint_seq = checkpoint.summary.sequence_number as i64;
        let mut results = Vec::new();

        for tx in &checkpoint.transactions {
            // Level 1: skip transactions with no events from our package
            let has_target_event = tx
                .events
                .iter()
                .flat_map(|evs| &evs.data)
                .any(|ev| ev.type_.address.as_ref() == TARGET_PACKAGE);

            if !has_target_event {
                continue;
            }

            // Level 2: match the specific event type
            let Some(events) = &tx.events else { continue };
            for ev in &events.data {
                if ev.type_.address.as_ref() != TARGET_PACKAGE {
                    continue;
                }
                if ev.type_.module.as_str() != TARGET_MODULE {
                    continue;
                }
                if ev.type_.name.as_str() != NULL_EVENT_NAME {
                    continue;
                }

                let parsed: NullEvent = bcs::from_bytes(&ev.contents)?;
                results.push(StoredNullEvent {
                    tx_digest: tx.transaction.digest().to_string(),
                    checkpoint_sequence_number: checkpoint_seq,
                    text: parsed.text,
                });
            }
        }

        Ok(results)
    }
}

#[async_trait::async_trait]
impl Handler for NullEventHandler {
    type Store = Db;
    type Batch = Vec<Self::Value>;

    fn batch(&self, batch: &mut Self::Batch, values: std::vec::IntoIter<Self::Value>) {
        batch.extend(values);
    }

    async fn commit<'a>(&self, batch: &Self::Batch, conn: &mut Connection<'a>) -> Result<usize> {
        let inserted = diesel::insert_into(null_events::table)
            .values(batch)
            .execute(conn)
            .await?;

        Ok(inserted)
    }
}
