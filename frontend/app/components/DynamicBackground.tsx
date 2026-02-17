"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline, utils } from "animejs";

const DOT_COUNT = 80;
const CONNECTOR_THRESHOLD = 150;

interface Dot {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
}

export default function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Create dot elements
    const dots: Dot[] = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < DOT_COUNT; i++) {
      const el = document.createElement("div");
      const size = 2 + Math.random() * 4;
      el.className = "bg-dot";
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(74, 111, 165, 0.12);
        pointer-events: none;
        will-change: transform, opacity;
      `;

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * canvas.height;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = "0";

      fragment.appendChild(el);
      dots.push({
        el,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseSize: size,
      });
    }
    container.appendChild(fragment);
    dotsRef.current = dots;

    // Entrance animation — staggered fade-in with scale
    animate(
      dots.map((d) => d.el),
      {
        opacity: [0, 1],
        scale: [0, 1],
        delay: stagger(30, { from: "random" }),
        duration: 800,
        ease: "outExpo",
      }
    );

    // Ambient floating pulse per dot
    dots.forEach((dot, i) => {
      const tl = createTimeline({
        loop: true,
        alternate: true,
      });
      tl.add(dot.el, {
        scale: [1, utils.random(1.2, 1.8)],
        opacity: [
          { to: utils.random(0.06, 0.18) },
          { to: utils.random(0.1, 0.25) },
        ],
        duration: utils.random(2500, 5000),
        ease: "inOutSine",
        delay: i * 20,
      });
    });

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.pageX;
      mouseRef.current.y = e.pageY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    });
    resizeObserver.observe(document.body);
    window.addEventListener("resize", resize);

    // Physics + connector line loop
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Mouse repulsion
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (1 - dist / 160) * 0.8;
          d.vx -= (dx / dist) * force;
          d.vy -= (dy / dist) * force;
        }

        // Friction
        d.vx *= 0.98;
        d.vy *= 0.98;

        // Move
        d.x += d.vx;
        d.y += d.vy;

        // Wrap edges
        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;

        d.el.style.left = `${d.x}px`;
        d.el.style.top = `${d.y}px`;

        // Draw connector lines to nearby dots
        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const cdx = d.x - d2.x;
          const cdy = d.y - d2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECTOR_THRESHOLD) {
            const alpha = (1 - cdist / CONNECTOR_THRESHOLD) * 0.08;
            ctx.strokeStyle = `rgba(74, 111, 165, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }

        // Mouse proximity glow — boost near cursor
        if (dist < 200) {
          const glowAlpha = (1 - dist / 200) * 0.15;
          ctx.fillStyle = `rgba(74, 111, 165, ${glowAlpha})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.baseSize * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      // Remove dot elements
      dots.forEach((d) => d.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
