
/// This module will let users to receive the dWallet cap in a single PTB 
/// and generate the presigncap for them
/// 
/// 
module manbow_core::dWallet_helper;

// Import coordinator and types from ika_dwallet_2pc_mpc
use ika_dwallet_2pc_mpc::{
    coordinator::DWalletCoordinator,
    coordinator_inner::{
        DWalletCap,
        UnverifiedPresignCap,
        VerifiedPresignCap,
        MessageApproval
    },
    sessions_manager::SessionIdentifier
};
use ika::ika::IKA;
use sui::{
    sui::SUI,
    coin::Coin,
    balance::Balance
};
use manbow_core::config::{Self, ManbowConfig};

/// ------------------------------------------------------------------------------------------------
///  Public Structs
/// ------------------------------------------------------------------------------------------------
/// 
/// Strategy 1: Making Wrapped Accounts as a derived object of RootStruct
/// In this strategy, we will
///  - Make RootStruct a key struct
///  - Make WrappedAccount a derived object of RootStruct
///  - The derived id will be composed of the root id and the name of the account or the index of the account
/// This way you don't need to create a hefty registry object for storing the accounts
/// 
/// Strategy 2: Storing Wrapped Accounts in a registry object
/// In this strategy, we will
///  - Create a registry object for storing the wrapped accounts
///  - The registry object will have the id of the root struct and the vector of the wrapped accounts
///  - The vector of the wrapped accounts is the vector of the wrapped accounts
///  - The vector of the wrapped accounts is the vector of the wrapped accounts

/// Option 1: Making Wrapped Accounts as a derived object of RootStruct
public struct RootStruct has key {
    id: UID,
    accounts: vector<vector<u8>>
}

/// Option 2: Storing Wrapped Accounts in a registry object
public struct Registry has key {
    id: UID,
    accounts: vector<ID>
}

public struct WrappedAccount has key, store {
    id: UID,
    lender: address,
    borrower: address,
    lender_cap: DWalletCap,
    balance: Balance<IKA>
}

/// Hot potato pattern for borrowing the dWallet
/// - FlashDWalletReceipt will be minted when user borrow the dWallet
/// - Borrower will repay the loan by returning asset to the dWallet
/// - At that point the Receipt struct will be destroyed
public struct FlashDWalletReceipt {
    lender: address,
    dWallet: ID,
    flash_fee: u64,
}

fun init(ctx: &mut TxContext) {
    let root = RootStruct {
        id: object::new(ctx),
        accounts: vector::empty()
    };
    transfer::transfer(root, ctx.sender());
}

// public fun flash_dWallet(
//     config: &ManbowConfig,
//     dWallet: &DWalletCap,
//     ctx: &mut TxContext
// ): FlashDWalletReceipt {

// }




