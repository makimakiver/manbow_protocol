"use client";

import { useEffect, useState, useRef } from "react";
import HoverText from "./HoverText";

const CHAINS = ["HyperEVM", "SuiMVM", "Ethereum", "Arbitrum"];
const LEND_CHAINS = ["HEVM", "ETH", "ARB", "SUI"];
const BORROW_CHAINS = ["MVM", "ARB", "HEVM", "ETH"];

export default function Hero() {
  const [activeChain, setActiveChain] = useState(0);
  const [flowIndex, setFlowIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [flowVisible, setFlowVisible] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveChain((prev) => (prev + 1) % CHAINS.length);
    }, 2800);
    const flowInterval = setInterval(() => {
      setFlowIndex((prev) => (prev + 1) % LEND_CHAINS.length);
    }, 3200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFlowVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (flowRef.current) observer.observe(flowRef.current);

    return () => {
      clearInterval(interval);
      clearInterval(flowInterval);
      observer.disconnect();
    };
  }, []);

  const stagger = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transitionDelay: `${delay}s`,
    transitionDuration: "0.8s",
    transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
  });

  return (
    <>
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Logo */}
        <h2
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-[#1a1a1a] mb-6"
          style={stagger(0)}
        >
          Manbow
        </h2>

        {/* Small tag */}
        <p
          className="text-[11px] text-[#999] tracking-[0.15em] uppercase mb-8 font-mono"
          style={stagger(0.1)}
        >
          Multi-chain lending protocol
        </p>

        {/* Heading with per-letter hover */}
        <div style={stagger(0.25)}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] mb-8 text-[#1a1a1a]">
            <HoverText text="Lend on one chain." />
            <br />
            <span className="font-normal">
              <HoverText text="Borrow on another." />
            </span>
          </h1>
        </div>

        {/* Divider */}
        <div
          className="divider w-12 mx-auto mb-8"
          style={stagger(0.35)}
        />

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          style={stagger(0.55)}
        >
          <a
            href="#start"
            className="px-8 py-3 text-sm text-[#f5f3ee] bg-[#333] rounded-none hover:bg-[#1a1a1a]"
          >
            Start Lending
          </a>
          <a
            href="#howitworks"
            className="text-sm text-[#999] border-b border-[#ccc] pb-0.5 hover:text-[#333] hover:border-[#333]"
          >
            Learn more
          </a>
        </div>

      </div>
    </section>

    {/* Minimal flow — appears on scroll */}
    <section
      ref={flowRef}
      className="relative z-20 py-16 px-6"
      style={{
        opacity: flowVisible ? 1 : 0,
        transform: flowVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s cubic-bezier(.4,.4,0,1), transform 0.8s cubic-bezier(.4,.4,0,1)",
      }}
    >
      <div className="mx-auto max-w-2xl bg-[#f5f3ee]/80 backdrop-blur-sm rounded-lg px-8 py-6 flex items-center justify-center gap-6 md:gap-10">
        <div className="text-center min-w-[48px]">
          <p
            key={`lend-${flowIndex}`}
            className="text-xs font-mono text-[#4a6fa5] mb-1"
            style={{ animation: "fadeSwap 1s cubic-bezier(.4, .4, 0, 1)" }}
          >
            {LEND_CHAINS[flowIndex]}
          </p>
          <p className="text-[11px] text-[#bbb]">Lend</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#ddd]" />
          <span className="text-[10px] text-[#ccc] font-mono">IKA</span>
          <span className="w-8 h-px bg-[#ddd]" />
        </div>

        <div className="text-center">
          <p className="text-xs font-mono text-[#333] font-medium mb-1">Manbow</p>
          <p className="text-[11px] text-[#bbb]">Protocol</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#ddd]" />
          <span className="text-[10px] text-[#ccc] font-mono">IKA</span>
          <span className="w-8 h-px bg-[#ddd]" />
        </div>

        <div className="text-center min-w-[48px]">
          <p
            key={`borrow-${flowIndex}`}
            className="text-xs font-mono text-[#4a6fa5] mb-1"
            style={{ animation: "fadeSwap 1s cubic-bezier(.4, .4, 0, 1)" }}
          >
            {BORROW_CHAINS[flowIndex]}
          </p>
          <p className="text-[11px] text-[#bbb]">Borrow</p>
        </div>
      </div>
    </section>
    </>
  );
}
