"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "backdrop-blur-sm border-b border-black/[0.06] py-4"
          : "bg-transparent py-6"
      }`}
      style={scrolled ? {
        background: "linear-gradient(to right, transparent 0%, rgba(245,243,238,0.9) 40%, rgba(245,243,238,0.9) 60%, transparent 100%)",
      } : undefined}
    >
      <div className="mx-auto max-w-4xl px-6 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold tracking-tight text-[#333]">
          Manbow
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Chains", "Stats"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "")}`}
              className="text-xs text-[#999] hover:text-[#333] tracking-wide"
            >
              {label}
            </a>
          ))}
          <a
            href="#start"
            className="text-xs text-[#333] border-b border-[#333] pb-0.5 hover:text-[#4a6fa5] hover:border-[#4a6fa5]"
          >
            Launch App
          </a>
        </div>

        <button className="md:hidden text-[#999]" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? <path d="M4 4l10 10M4 14L14 4" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#f5f3ee]/95 backdrop-blur-sm border-t border-black/[0.06] px-6 py-6 flex flex-col gap-4 mt-1">
          {["How It Works", "Chains", "Stats"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "")}`}
              className="text-sm text-[#999] hover:text-[#333]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#start"
            className="text-sm text-[#333] border-b border-[#333] self-start pb-0.5"
            onClick={() => setMobileOpen(false)}
          >
            Launch App
          </a>
        </div>
      )}
    </nav>
  );
}
