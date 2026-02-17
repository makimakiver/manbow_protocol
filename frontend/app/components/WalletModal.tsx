"use client";

import { useState } from "react";
import {
  useWallets,
  useDAppKit,
  useCurrentWallet,
  useCurrentAccount,
} from "@mysten/dapp-kit-react";

export default function WalletModal({ onClose }: { onClose: () => void }) {
  const wallets = useWallets();
  const dAppKit = useDAppKit();
  const currentWallet = useCurrentWallet();
  const account = useCurrentAccount();
  const [connecting, setConnecting] = useState(false);

  async function handleConnect(wallet: (typeof wallets)[number]) {
    try {
      setConnecting(true);
      await dAppKit.connectWallet({ wallet });
      onClose();
    } catch {
      // user cancelled or error
    } finally {
      setConnecting(false);
    }
  }

  async function handleDisconnect() {
    await dAppKit.disconnectWallet();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[440px] max-w-[90vw] max-h-[80vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ writingMode: "horizontal-tb" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-0">
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">
              {currentWallet ? "Wallet" : "Select Wallet"}
            </h3>
            {!currentWallet && (
              <p className="text-sm text-[#888] mt-1">
                Choose a wallet to connect.
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#999] hover:text-[#1a1a1a] text-xl leading-none p-1"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-7 py-5">
          {currentWallet ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="flex flex-col items-center gap-2">
                {currentWallet.icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentWallet.icon}
                    alt={currentWallet.name}
                    width={48}
                    height={48}
                    className="rounded-xl"
                  />
                )}
                <p className="text-base font-medium text-[#1a1a1a]">
                  {currentWallet.name}
                </p>
              </div>

              {account && (
                <div className="w-full border border-[#eee] rounded-xl px-5 py-3 bg-[#fafafa]">
                  <p className="text-[10px] text-[#999] font-mono uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-xs font-mono text-[#1a1a1a]">
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                  </p>
                </div>
              )}

              <button
                onClick={handleDisconnect}
                className="w-full border border-[#ddd] rounded-xl px-6 py-3.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet)}
                  disabled={connecting}
                  className="w-full flex items-center gap-4 px-5 py-4 border border-[#eee] rounded-xl hover:border-[#ccc] hover:bg-[#fafafa] transition-colors disabled:opacity-50 text-left"
                >
                  {wallet.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      width={36}
                      height={36}
                      className="rounded-lg shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">
                      {wallet.name}
                    </p>
                    <p className="text-xs text-[#888]">
                      Connect {wallet.name}
                    </p>
                  </div>
                </button>
              ))}
              {wallets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[#999]">
                    No wallets detected.
                  </p>
                  <p className="text-xs text-[#bbb] mt-1">
                    Install a SUI wallet extension to continue.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
