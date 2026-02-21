use diesel::prelude::*;
use sui_indexer_alt_framework::FieldCount;
use crate::schema::transaction_digests;
use crate::schema::null_events;

#[derive(Insertable, Debug, Clone, FieldCount)]
#[diesel(table_name = transaction_digests)]
pub struct StoredTransactionDigest {
    pub tx_digest: String,
    pub checkpoint_sequence_number: i64,
}

/// Mirrors the Move struct: `manbow_core::presign_events::NullEvent`
#[derive(serde::Deserialize, Debug)]
pub struct NullEvent {
    pub text: String,
}

#[derive(Insertable, Debug, Clone, FieldCount)]
#[diesel(table_name = null_events)]
pub struct StoredNullEvent {
    pub tx_digest: String,
    pub checkpoint_sequence_number: i64,
    pub text: String,
}