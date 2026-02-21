
/// This module is for defining events related to presign operations, 
/// such as generation, sale, and usage of presigns. These events can be 
/// emitted and listened to by other modules or external applications to 
/// track the lifecycle of presigns in the system.
/// 
module manbow_core::presign_events;

use sui::event;
use std::string::String;

public struct NullEvent has copy, drop {
    text: String
}

public struct PresignGenerated has copy, drop  {
    owner: address,
    presign_id: u64,
    chain_id: u64
}

public struct PresignSold has copy, drop  {
    owner: address,
    presign_id: u64,
    chain_id: u64
}

public struct PresignUsed has copy, drop  {
    owner: address,
    presign_id: u64,
    chain_id: u64
}

public fun emit_null_event() {
    let event = NullEvent { text: b"I am yutaka from manbow".to_string() };
    event::emit(event);
}

public fun emit_presign_generated(owner: address, presign_id: u64, chain_id: u64) {
    let event = PresignGenerated { owner, presign_id, chain_id };
    event::emit(event);
}

public fun emit_presign_sold(owner: address, presign_id: u64, chain_id: u64) {
    let event = PresignSold { owner, presign_id, chain_id };
    event::emit(event);
}

public fun emit_presign_used(owner: address, presign_id: u64, chain_id: u64) {
    let event = PresignUsed { owner, presign_id, chain_id };
    event::emit(event);
}