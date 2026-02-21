// @generated automatically by Diesel CLI.

diesel::table! {
    transaction_digests (tx_digest) {
        tx_digest -> Text,
        checkpoint_sequence_number -> Int8,
    }
}

diesel::table! {
    null_events (id) {
        id -> Int8,
        tx_digest -> Text,
        checkpoint_sequence_number -> Int8,
        text -> Text,
    }
}
