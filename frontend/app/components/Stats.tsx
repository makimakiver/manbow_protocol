"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "$1.8B+", label: "Total Value Locked" },
  { value: "6+", label: "Supported Chains" },
  { value: "8,200+", label: "Active Users" },
  { value: "<3s", label: "Settlement Time" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section id="stats" ref={ref} className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="divider mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transitionDuration: "0.5s",
                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)",
              }}
            >
              <p className="text-2xl md:text-3xl font-light text-[#333] mb-2">
                {s.value}
              </p>
              <p className="text-[11px] text-[#bbb] font-mono tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="divider mt-12" />

        <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
          {["Audited", "Non-Custodial", "Open Source", "DAO Governed"].map((tag) => (
            <span key={tag} className="text-[11px] font-mono text-[#ccc]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
