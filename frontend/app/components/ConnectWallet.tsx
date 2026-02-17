"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const WalletModal = dynamic(() => import("./WalletModal"), { ssr: false });
const WalletButton = dynamic(() => import("./WalletButton"), {
  ssr: false,
  loading: () => (
    <button className="border border-[#1a1a1a] bg-transparent px-15 py-5 text-sm tracking-[0.3em] text-[#1a1a1a]">
      接続
    </button>
  ),
});

export default function ConnectWallet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-6 right-6 z-20"
        style={{ writingMode: "vertical-rl", fontFamily: "var(--font-zen-old-mincho)", letterSpacing: "0.3em" }}
      >
        <WalletButton onOpen={() => setOpen(true)} />
      </div>

      {open && <WalletModal onClose={() => setOpen(false)} />}
    </>
  );
}
