"use client";

import { useCallback, useRef } from "react";

interface HoverTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function HoverText({ text, className = "", as: Tag = "span" }: HoverTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    el.style.color = "#4a6fa5";
    el.style.transform = "translateY(-2px)";
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    el.style.color = "";
    el.style.transform = "translateY(0)";
  }, []);

  // Split text into words, then characters
  const words = text.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                display: "inline-block",
                transition: "color .25s cubic-bezier(.4,.4,0,1), transform .25s cubic-bezier(.4,.4,0,1)",
                cursor: "default",
              }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
