"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/main" },
  { label: "Supply", href: "/main/supply" },
  { label: "Borrow", href: "/main/borrow" },
  { label: "Markets", href: "/main/markets" },
  { label: "Portfolio", href: "/main/portfolio" },
  { label: "History", href: "/main/history" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 left-6 z-30 flex flex-col justify-center items-center gap-[5px] w-8 h-8"
      >
        <span className="block w-5 h-[1.5px] bg-[#1a1a1a]" />
        <span className="block w-5 h-[1.5px] bg-[#1a1a1a]" />
        <span className="block w-5 h-[1.5px] bg-[#1a1a1a]" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#f5f3ee] border-r border-[rgba(0,0,0,0.08)] shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[rgba(0,0,0,0.06)]">
          <Link
            href="/"
            className="font-logo text-xl text-[#1a1a1a]"
            onClick={() => setOpen(false)}
          >
            Manbow
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-[#999] hover:text-[#1a1a1a] text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#1a1a1a] text-[#f5f3ee]"
                    : "text-[#666] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#1a1a1a]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-[rgba(0,0,0,0.06)]">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-xs text-[#999] hover:text-[#1a1a1a] font-mono tracking-wide"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
