
/// This module is for storing the protocol fee rate on the manbow
module manbow_core::config;

const DEFAULT_MANBOW_FEE_RATE: u64 = 1_000;
const DEFAULT_FLASH_FEE_RATE: u64 = 1_000;
public struct ManbowConfig has key, store {
    id: UID,
    fee_rate: u64,
    flash_fee_rate: u64,
}

public struct AdminCap has key, store {
    id: UID
}

fun init(ctx: &mut TxContext) {
    let config = ManbowConfig {
        id: object::new(ctx),
        fee_rate: DEFAULT_MANBOW_FEE_RATE,
        flash_fee_rate: DEFAULT_FLASH_FEE_RATE,
    };
    let admin_cap = AdminCap {
        id: object::new(ctx),
    };
    transfer::public_transfer(admin_cap, ctx.sender());
    transfer::share_object(config);
}

public fun get_protocol_fee_rate(config: &ManbowConfig): u64 {
    config.fee_rate
}

public fun get_flash_fee_rate(config: &ManbowConfig): u64 {
    config.flash_fee_rate
}

