"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const startIdle = () => {
      // Gentle breathing pulse on outer diamond — stays in place
      idleAnimRef.current = animate(outer, {
        scale: [1, 1.15, 1],
        opacity: [0.9, 1, 0.9],
        duration: 2000,
        loop: true,
        ease: "inOutSine",
      });
    };

    const stopIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (idleAnimRef.current) {
        idleAnimRef.current.pause();
        idleAnimRef.current = null;
      }
      // Reset scale/opacity back to normal
      outer.style.scale = "1";
      outer.style.opacity = "1";
    };

    let isIdle = false;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current.x = x;
      posRef.current.y = y;

      // Only clean up idle if actually idle
      if (isIdle) {
        isIdle = false;
        if (idleAnimRef.current) {
          idleAnimRef.current.pause();
          idleAnimRef.current = null;
        }
        outer.style.scale = "1";
        outer.style.opacity = "1";
      }

      // Position via left/top — avoids compositor-layer frame delay
      inner.style.left = `${x}px`;
      inner.style.top = `${y}px`;
      outer.style.left = `${x}px`;
      outer.style.top = `${y}px`;

      // Debounce idle start
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isIdle = true;
        startIdle();
      }, 400);
    };

    // Hover detection — morph to circle on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .rotating-shape-container")) {
        if (hoveringRef.current) return;
        hoveringRef.current = true;

        // Outer: diamond -> circle, expand, accent color
        animate(outer, {
          width: 48,
          height: 48,
          borderRadius: "50%",
          borderColor: "rgba(74, 111, 165, 0.6)",
          duration: 400,
          ease: "outElastic(1, 0.6)",
        });

        // Inner: diamond -> circle, shrink and fade
        animate(inner, {
          width: 3,
          height: 3,
          borderRadius: "50%",
          opacity: 0.4,
          duration: 300,
          ease: "outExpo",
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .rotating-shape-container")) {
        hoveringRef.current = false;

        // Outer: circle -> diamond, shrink back
        animate(outer, {
          width: 28,
          height: 28,
          borderRadius: "2px",
          borderColor: "rgba(51, 51, 51, 0.35)",
          duration: 400,
          ease: "outElastic(1, 0.6)",
        });

        // Inner: circle -> diamond, restore
        animate(inner, {
          width: 5,
          height: 5,
          borderRadius: "0.5px",
          opacity: 1,
          duration: 300,
          ease: "outExpo",
        });
      }
    };

    // Click effect — quick squeeze
    const onMouseDown = () => {
      animate(outer, {
        scale: [1, 0.7],
        duration: 120,
        ease: "outQuad",
      });
      animate(inner, {
        scale: [1, 2],
        duration: 120,
        ease: "outQuad",
      });
    };

    const onMouseUp = () => {
      animate(outer, {
        scale: [0.7, 1],
        duration: 500,
        ease: "outElastic(1, 0.4)",
      });
      animate(inner, {
        scale: [2, 1],
        duration: 500,
        ease: "outElastic(1, 0.4)",
      });
    };

    // Show/hide on enter/leave window
    const onMouseEnter = () => {
      animate([outer, inner], {
        opacity: [0, 1],
        duration: 300,
        ease: "outQuad",
      });
    };

    const onMouseLeave = () => {
      animate([outer, inner], {
        opacity: [1, 0],
        duration: 300,
        ease: "outQuad",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stopIdle();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer diamond */}
      <div
        ref={outerRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          border: "1.5px solid rgba(51, 51, 51, 0.35)",
          borderRadius: "2px",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "darken",
          transform: "rotate(45deg)",
        }}
      />
      {/* Inner diamond dot */}
      <div
        ref={innerRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          borderRadius: "0.5px",
          background: "#333",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "rotate(45deg)",
        }}
      />
    </>
  );
}
