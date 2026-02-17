"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HoverText from "./HoverText";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="start" ref={ref} className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className={`${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
          }}
        >
          <p className="text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-6">
            Get Started
          </p>

          <h2 className="text-2xl md:text-4xl font-light text-[#1a1a1a] mb-5 leading-tight">
            <HoverText text="Start lending across chains" />
          </h2>

          <p className="text-sm text-[#999] mb-12 max-w-sm mx-auto leading-[1.8]">
            Connect your SUI wallet, pick your chains, and go.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <a
              href="#"
              className="px-8 py-3 text-sm text-[#f5f3ee] bg-[#333] hover:bg-[#1a1a1a]"
              onClick={(e) => {
                e.preventDefault();
                router.push("/main");
              }}
            >
              Launch App
            </a>
            <a
              href="#"
              className="text-sm text-[#999] border-b border-[#ccc] pb-0.5 hover:text-[#333] hover:border-[#333]"
            >
              Read Documentation
            </a>
          </div>

          <div className="divider w-12 mx-auto" />
        </div>
      </div>
    </section>
  );
}
