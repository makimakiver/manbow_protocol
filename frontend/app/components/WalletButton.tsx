"use client";

import { useCurrentWallet, useCurrentAccount } from "@mysten/dapp-kit-react";

export default function WalletButton({ onOpen }: { onOpen: () => void }) {
  const currentWallet = useCurrentWallet();
  const account = useCurrentAccount();

  if (currentWallet && account) {
    const addr = account.address;
    const short = `${addr.slice(0, 4)}…`;

    return (
      <button
        onClick={onOpen}
        className="w-[42px] h-[140px] border border-[#1a1a1a] bg-transparent text-sm tracking-[0.3em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f3ee] transition-all duration-500 flex items-center justify-center"
        style={{ textOrientation: "upright" }}
      >
        <span className="block text-[10px] tracking-[0.15em] opacity-60 mb-1">済</span>
        <span className="block">{short}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onOpen}
      className="w-[42px] h-[140px] border border-[#1a1a1a] bg-transparent text-sm tracking-[0.3em] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f3ee] transition-all duration-500 flex items-center justify-center"
      style={{ textOrientation: "upright" }}
    >
      接続
    </button>
  );
}
