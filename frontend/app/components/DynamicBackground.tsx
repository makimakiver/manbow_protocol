"use client";

import { useEffect, useRef } from "react";

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Characters — mix of subtle symbols
    const chars = "·:;+=-~*°•◦○◌◊∙∘⋅⟡⬡⬢△▽◇□";
    const spacing = 32;
    let cols = Math.ceil(canvas.width / spacing);
    let rows = Math.ceil(canvas.height / spacing);

    // Build grid
    let grid: { char: string; baseX: number; baseY: number; phase: number }[] = [];

    const buildGrid = () => {
      cols = Math.ceil(canvas.width / spacing);
      rows = Math.ceil(canvas.height / spacing);
      grid = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          grid.push({
            char: chars[Math.floor(Math.random() * chars.length)],
            baseX: c * spacing + spacing / 2,
            baseY: r * spacing + spacing / 2,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };
    buildGrid();

    const onResize = () => {
      resize();
      buildGrid();
    };
    window.addEventListener("resize", onResize);

    // Track mouse position relative to page (not viewport)
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.pageX;
      mouseRef.current.y = e.pageY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Observe body height changes to resize canvas
    const resizeObserver = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    resizeObserver.observe(document.body);

    let time = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.008;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fill with the cream background
      ctx.fillStyle = "#f5f3ee";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.font = "13px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < grid.length; i++) {
        const item = grid[i];
        const dx = mx - item.baseX;
        const dy = my - item.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse displacement — push away from cursor
        const maxDist = 120;
        const force = Math.max(0, 1 - dist / maxDist);
        const pushStrength = force * force * 18;
        const angle = Math.atan2(dy, dx);
        const offsetX = -Math.cos(angle) * pushStrength;
        const offsetY = -Math.sin(angle) * pushStrength;

        // Gentle ambient drift
        const driftX = Math.sin(time + item.phase) * 1.2;
        const driftY = Math.cos(time * 0.7 + item.phase) * 1.2;

        // Opacity: slightly brighter near mouse
        const baseOpacity = 0.06;
        const hoverBoost = force * 0.12;
        const opacity = baseOpacity + hoverBoost;

        // Color: warm gray, slight blue shift near mouse
        const r = Math.round(51 - force * 20);
        const g = Math.round(51 - force * 10);
        const b = Math.round(51 + force * 30);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fillText(
          item.char,
          item.baseX + offsetX + driftX,
          item.baseY + offsetY + driftY
        );

        // Randomly swap character
        if (Math.random() < 0.0003) {
          item.char = chars[Math.floor(Math.random() * chars.length)];
        }
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
