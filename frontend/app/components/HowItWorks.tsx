"use client";

import { useEffect, useRef, useState } from "react";
import HoverText from "./HoverText";

const steps = [
  {
    num: "01",
    title: "Connect Wallet",
    desc: "One SUI wallet to rule them all. Connect and Manbow handles cross-chain via IKA.",
  },
  {
    num: "02",
    title: "Choose Chains",
    desc: "Pick a source chain to lend and a target chain to borrow from.",
  },
  {
    num: "03",
    title: "Lend & Borrow",
    desc: "Execute both in a single transaction. IKA bridges the communication.",
  },
  {
    num: "04",
    title: "Manage",
    desc: "Track, repay, and withdraw across all chains from one dashboard.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="howitworks" ref={sectionRef} className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-2xl md:text-4xl font-light text-[#1a1a1a] leading-tight">
            <HoverText text="Simple by design" />
          </h2>
        </div>

        <div className="divider mb-12" />

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex gap-8 md:gap-12 py-8 border-b border-black/[0.06] last:border-b-0 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionDuration: "0.6s",
                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
              }}
            >
              <span className="text-xl md:text-2xl font-light text-[#ccc] flex-shrink-0 pt-0.5 w-10 font-mono">
                {step.num}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-normal text-[#333] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#999] leading-[1.8]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
