"use client";

import { useEffect, useRef, useState } from "react";
import HoverText from "./HoverText";

const chains = [
  { name: "HyperEVM", tag: "HEVM", live: true },
  { name: "SuiMVM", tag: "MVM", live: true },
  { name: "Ethereum", tag: "ETH", live: true },
  { name: "Arbitrum", tag: "ARB", live: false },
  { name: "Solana", tag: "SOL", live: false },
  { name: "Base", tag: "BASE", live: false },
];

export default function Chains() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="chains" ref={ref} className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-4">
            Ecosystem
          </p>
          <h2 className="text-2xl md:text-4xl font-light text-[#1a1a1a] leading-tight">
            <HoverText text="Multi-chain compatible" />
          </h2>
        </div>

        <div className="divider mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-black/[0.06]">
          {chains.map((c, i) => (
            <div
              key={c.tag}
              className={`py-6 px-5 border-b border-black/[0.06] ${
                (i + 1) % 3 !== 0 ? "sm:border-r sm:border-r-black/[0.06]" : ""
              } ${
                (i + 1) % 2 !== 0 ? "border-r border-r-black/[0.06] sm:border-r-0" : ""
              } ${
                (i + 1) % 3 !== 0 ? "" : "sm:border-r-0"
              } ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transitionDuration: "0.5s",
                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#333]">{c.tag}</span>
                <span className={`text-[10px] font-mono ${c.live ? "text-[#4a6fa5]" : "text-[#ccc]"}`}>
                  {c.live ? "Live" : "Soon"}
                </span>
              </div>
              <p className="text-sm text-[#999]">{c.name}</p>
            </div>
          ))}
        </div>

        {/* IKA note */}
        <div
          className={`mt-12 pt-8 border-t border-black/[0.06] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{
            transitionDelay: "500ms",
            transitionDuration: "0.6s",
            transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
          }}
        >
          <p className="text-sm text-[#999] leading-[1.8]">
            <span className="text-[#333] font-medium">IKA</span> is the interoperability layer
            that lets your SUI wallet sign and execute transactions across every supported chain.
            No bridges. No wrapping.
          </p>
        </div>
      </div>
    </section>
  );
}
