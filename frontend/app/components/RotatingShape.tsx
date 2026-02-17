"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
}

const STEP_ANGLE = Math.PI / 4;

enum Phase {
  OUTER_ROTATE,
  PARTICLES_INWARD,
  INNER_ROTATE,
  PARTICLES_OUTWARD,
}

export default function RotatingShape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spokeCount = 8;
    const lineWidth = 1.2;
    const particleRadius = 6;

    // Blue to pink palette
    const centerColor = "rgba(80, 120, 220, 0.22)";
    const orbitColor = "rgba(140, 90, 200, 0.18)";
    const innerSpokeColor = "rgba(100, 100, 210, 0.16)";
    const outerLineColor = "rgba(200, 80, 160, 0.15)";
    const outerNodeColor = "rgba(220, 70, 150, 0.20)";

    let outerAngle = 0;
    let innerAngle = 0;
    let phase: Phase = Phase.OUTER_ROTATE;
    let phaseProgress = 0;
    let rotateFrom = 0;
    let rotateTo = STEP_ANGLE;
    let particles: Particle[] = [];
    let particlesSpawned = false;

    const rotateSpeed = 0.012;

    function easeInOut(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function getAngle(i: number, offset: number): number {
      return (i * 2 * Math.PI) / spokeCount + offset;
    }

    function drawCircle(x: number, y: number, r: number, color: string) {
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function drawGradientLine(x1: number, y1: number, x2: number, y2: number, color1: string, color2: string) {
      if (!ctx) return;
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Interpolate between blue and pink based on progress (0=blue, 1=pink)
    function getParticleColor(t: number): string {
      const r = Math.round(80 + (220 - 80) * t);
      const g = Math.round(120 + (70 - 120) * t);
      const b = Math.round(220 + (150 - 220) * t);
      return `rgba(${r}, ${g}, ${b}, 0.85)`;
    }

    function getParticleGlowColor(t: number): string {
      const r = Math.round(80 + (220 - 80) * t);
      const g = Math.round(120 + (70 - 120) * t);
      const b = Math.round(220 + (150 - 220) * t);
      return `rgba(${r}, ${g}, ${b}, 0.3)`;
    }

    // Get responsive dimensions
    function getDimensions() {
      if (!canvas) return { cx: 0, cy: 0, centerRadius: 0, orbitRadius: 0, spokeLength: 0, nodeRadius: 0 };
      const size = canvas.width / dpr;
      const cx = size / 2;
      const cy = size / 2;
      const scale = size / 600;
      return {
        cx, cy,
        centerRadius: 24 * scale,
        orbitRadius: 150 * scale,
        spokeLength: 260 * scale,
        nodeRadius: 30 * scale,
      };
    }

    function spawnInwardParticles() {
      if (particlesSpawned) return;
      particlesSpawned = true;
      const d = getDimensions();

      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        // Start at outer node edge (not center of node)
        const nodeX = d.cx + Math.cos(a) * d.spokeLength;
        const nodeY = d.cy + Math.sin(a) * d.spokeLength;
        const startX = nodeX - Math.cos(a) * d.nodeRadius;
        const startY = nodeY - Math.sin(a) * d.nodeRadius;
        particles.push({
          startX, startY,
          midX: d.cx + Math.cos(a) * d.orbitRadius,
          midY: d.cy + Math.sin(a) * d.orbitRadius,
          endX: d.cx,
          endY: d.cy,
          progress: 0,
          speed: 0.008,
        });
      }
    }

    function spawnOutwardParticles() {
      if (particlesSpawned) return;
      particlesSpawned = true;
      const d = getDimensions();

      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        const nodeX = d.cx + Math.cos(a) * d.spokeLength;
        const nodeY = d.cy + Math.sin(a) * d.spokeLength;
        // End at outer node edge (not center of node)
        const endX = nodeX - Math.cos(a) * d.nodeRadius;
        const endY = nodeY - Math.sin(a) * d.nodeRadius;
        particles.push({
          startX: d.cx,
          startY: d.cy,
          midX: d.cx + Math.cos(a) * d.orbitRadius,
          midY: d.cy + Math.sin(a) * d.orbitRadius,
          endX, endY,
          progress: 0,
          speed: 0.008,
        });
      }
    }

    function updateAndDrawParticles(): boolean {
      let allDone = true;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        allDone = false;
        const t = easeInOut(p.progress);

        let x: number, y: number;
        if (t < 0.5) {
          const seg = t * 2;
          x = p.startX + (p.midX - p.startX) * seg;
          y = p.startY + (p.midY - p.startY) * seg;
        } else {
          const seg = (t - 0.5) * 2;
          x = p.midX + (p.endX - p.midX) * seg;
          y = p.midY + (p.endY - p.midY) * seg;
        }

        const opacity = p.progress < 0.1
          ? p.progress / 0.1
          : p.progress > 0.85
            ? (1 - p.progress) / 0.15
            : 1;

        // Color shifts along the path: blue (center) to pink (outer)
        // Determine distance from center as a ratio
        const d = getDimensions();
        const distFromCenter = Math.sqrt((x - d.cx) ** 2 + (y - d.cy) ** 2);
        const maxDist = d.spokeLength;
        const colorT = Math.min(distFromCenter / maxDist, 1);

        // Glow
        if (ctx) {
          ctx.globalAlpha = opacity * 0.25;
          ctx.fillStyle = getParticleGlowColor(colorT);
          ctx.beginPath();
          ctx.arc(x, y, particleRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.globalAlpha = opacity * 0.9;
          ctx.fillStyle = getParticleColor(colorT);
          ctx.beginPath();
          ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 1;
        }
      }

      return allDone && particlesSpawned;
    }

    function enterPhase(newPhase: Phase) {
      phase = newPhase;
      phaseProgress = 0;
      particlesSpawned = false;

      if (newPhase === Phase.OUTER_ROTATE) {
        rotateFrom = outerAngle;
        rotateTo = outerAngle + STEP_ANGLE;
      } else if (newPhase === Phase.INNER_ROTATE) {
        rotateFrom = innerAngle;
        rotateTo = innerAngle - STEP_ANGLE;
      }
    }

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const size = canvas.width / dpr;
      ctx.clearRect(0, 0, size, size);

      const d = getDimensions();

      // --- Phase logic ---
      if (phase === Phase.OUTER_ROTATE) {
        phaseProgress += rotateSpeed;
        if (phaseProgress >= 1) {
          phaseProgress = 1;
          outerAngle = rotateTo;
          enterPhase(Phase.PARTICLES_INWARD);
        } else {
          outerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
        }
      } else if (phase === Phase.PARTICLES_INWARD) {
        spawnInwardParticles();
        const allDone = updateAndDrawParticles();
        if (allDone) {
          enterPhase(Phase.INNER_ROTATE);
        }
      } else if (phase === Phase.INNER_ROTATE) {
        phaseProgress += rotateSpeed;
        if (phaseProgress >= 1) {
          phaseProgress = 1;
          innerAngle = rotateTo;
          enterPhase(Phase.PARTICLES_OUTWARD);
        } else {
          innerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
        }
      } else if (phase === Phase.PARTICLES_OUTWARD) {
        spawnOutwardParticles();
        const allDone = updateAndDrawParticles();
        if (allDone) {
          enterPhase(Phase.OUTER_ROTATE);
        }
      }

      // --- Draw static circles ---
      drawCircle(d.cx, d.cy, d.orbitRadius, orbitColor);
      drawCircle(d.cx, d.cy, d.centerRadius, centerColor);

      // --- Inner spokes (center edge → orbit edge) — blue gradient ---
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, innerAngle);
        const ix = d.cx + Math.cos(a) * d.centerRadius;
        const iy = d.cy + Math.sin(a) * d.centerRadius;
        const ox = d.cx + Math.cos(a) * d.orbitRadius;
        const oy = d.cy + Math.sin(a) * d.orbitRadius;
        drawGradientLine(ix, iy, ox, oy, centerColor, orbitColor);
      }

      // --- Outer group (orbit edge → outer node edge) — purple to pink gradient ---
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        const ox = d.cx + Math.cos(a) * d.orbitRadius;
        const oy = d.cy + Math.sin(a) * d.orbitRadius;
        const nodeX = d.cx + Math.cos(a) * d.spokeLength;
        const nodeY = d.cy + Math.sin(a) * d.spokeLength;

        // Line stops at outer node edge
        const lineEndX = nodeX - Math.cos(a) * d.nodeRadius;
        const lineEndY = nodeY - Math.sin(a) * d.nodeRadius;

        drawGradientLine(ox, oy, lineEndX, lineEndY, orbitColor, outerLineColor);
        drawCircle(nodeX, nodeY, d.nodeRadius, outerNodeColor);
      }

      // Draw straggler particles during non-particle phases
      if (phase !== Phase.PARTICLES_INWARD && phase !== Phase.PARTICLES_OUTWARD) {
        updateAndDrawParticles();
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = draw();

    const container = canvasRef.current?.parentElement;
    const onScroll = () => {
      if (!container) return;
      const scrollY = window.scrollY;
      const maxScroll = 400;
      const t = Math.min(scrollY / maxScroll, 1);
      container.style.setProperty("--scroll-t", String(t));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafRef.current);
      cleanup?.();
      window.removeEventListener("scroll", onScroll);
    };
  }, [draw]);

  return (
    <div className="rotating-shape-container rotating-shape-left">
      <canvas ref={canvasRef} />
    </div>
  );
}

export function RotatingShapeRight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Reuse the same draw logic via a second instance
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spokeCount = 8;
    const lineWidth = 1.2;
    const particleRadius = 6;

    const centerColor = "rgba(80, 120, 220, 0.22)";
    const orbitColor = "rgba(140, 90, 200, 0.18)";
    const outerLineColor = "rgba(200, 80, 160, 0.15)";
    const outerNodeColor = "rgba(220, 70, 150, 0.20)";

    let outerAngle = 0;
    let innerAngle = 0;
    let phase: Phase = Phase.OUTER_ROTATE;
    let phaseProgress = 0;
    let rotateFrom = 0;
    let rotateTo = STEP_ANGLE;
    let particles: Particle[] = [];
    let particlesSpawned = false;
    const rotateSpeed = 0.012;

    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function getAngle(i: number, offset: number) {
      return (i * 2 * Math.PI) / spokeCount + offset;
    }
    function drawCircle(x: number, y: number, r: number, color: string) {
      if (!ctx) return;
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    }
    function drawGradientLine(x1: number, y1: number, x2: number, y2: number, c1: string, c2: string) {
      if (!ctx) return;
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, c1); grad.addColorStop(1, c2);
      ctx.strokeStyle = grad; ctx.lineWidth = lineWidth;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    function getParticleColor(t: number) {
      return `rgba(${Math.round(80 + 140 * t)}, ${Math.round(120 - 50 * t)}, ${Math.round(220 - 70 * t)}, 0.85)`;
    }
    function getParticleGlowColor(t: number) {
      return `rgba(${Math.round(80 + 140 * t)}, ${Math.round(120 - 50 * t)}, ${Math.round(220 - 70 * t)}, 0.3)`;
    }
    function getDimensions() {
      if (!canvas) return { cx: 0, cy: 0, centerRadius: 0, orbitRadius: 0, spokeLength: 0, nodeRadius: 0 };
      const size = canvas.width / dpr;
      const scale = size / 600;
      return { cx: size / 2, cy: size / 2, centerRadius: 24 * scale, orbitRadius: 150 * scale, spokeLength: 260 * scale, nodeRadius: 30 * scale };
    }

    function spawnInwardParticles() {
      if (particlesSpawned) return; particlesSpawned = true;
      const d = getDimensions();
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
        particles.push({ startX: nX - Math.cos(a) * d.nodeRadius, startY: nY - Math.sin(a) * d.nodeRadius, midX: d.cx + Math.cos(a) * d.orbitRadius, midY: d.cy + Math.sin(a) * d.orbitRadius, endX: d.cx, endY: d.cy, progress: 0, speed: 0.008 });
      }
    }
    function spawnOutwardParticles() {
      if (particlesSpawned) return; particlesSpawned = true;
      const d = getDimensions();
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
        particles.push({ startX: d.cx, startY: d.cy, midX: d.cx + Math.cos(a) * d.orbitRadius, midY: d.cy + Math.sin(a) * d.orbitRadius, endX: nX - Math.cos(a) * d.nodeRadius, endY: nY - Math.sin(a) * d.nodeRadius, progress: 0, speed: 0.008 });
      }
    }

    function updateAndDrawParticles(): boolean {
      let allDone = true;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]; p.progress += p.speed;
        if (p.progress >= 1) { particles.splice(i, 1); continue; }
        allDone = false;
        const t = easeInOut(p.progress);
        let x: number, y: number;
        if (t < 0.5) { const s = t * 2; x = p.startX + (p.midX - p.startX) * s; y = p.startY + (p.midY - p.startY) * s; }
        else { const s = (t - 0.5) * 2; x = p.midX + (p.endX - p.midX) * s; y = p.midY + (p.endY - p.midY) * s; }
        const opacity = p.progress < 0.1 ? p.progress / 0.1 : p.progress > 0.85 ? (1 - p.progress) / 0.15 : 1;
        const d = getDimensions();
        const dist = Math.sqrt((x - d.cx) ** 2 + (y - d.cy) ** 2);
        const colorT = Math.min(dist / d.spokeLength, 1);
        if (ctx) {
        ctx.globalAlpha = opacity * 0.25; ctx.fillStyle = getParticleGlowColor(colorT);
          ctx.beginPath(); ctx.arc(x, y, particleRadius * 2.5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = opacity * 0.9; ctx.fillStyle = getParticleColor(colorT);
          ctx.beginPath(); ctx.arc(x, y, particleRadius, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      return allDone && particlesSpawned;
    }

    function enterPhase(newPhase: Phase) {
      phase = newPhase; phaseProgress = 0; particlesSpawned = false;
      if (newPhase === Phase.OUTER_ROTATE) { rotateFrom = outerAngle; rotateTo = outerAngle + STEP_ANGLE; }
      else if (newPhase === Phase.INNER_ROTATE) { rotateFrom = innerAngle; rotateTo = innerAngle - STEP_ANGLE; }
    }

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const size = canvas.width / dpr;
      ctx.clearRect(0, 0, size, size);
      const d = getDimensions();

      if (phase === Phase.OUTER_ROTATE) {
        phaseProgress += rotateSpeed;
        if (phaseProgress >= 1) { outerAngle = rotateTo; enterPhase(Phase.PARTICLES_INWARD); }
        else outerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
      } else if (phase === Phase.PARTICLES_INWARD) {
        spawnInwardParticles();
        if (updateAndDrawParticles()) enterPhase(Phase.INNER_ROTATE);
      } else if (phase === Phase.INNER_ROTATE) {
        phaseProgress += rotateSpeed;
        if (phaseProgress >= 1) { innerAngle = rotateTo; enterPhase(Phase.PARTICLES_OUTWARD); }
        else innerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
      } else if (phase === Phase.PARTICLES_OUTWARD) {
        spawnOutwardParticles();
        if (updateAndDrawParticles()) enterPhase(Phase.OUTER_ROTATE);
      }

      drawCircle(d.cx, d.cy, d.orbitRadius, orbitColor);
      drawCircle(d.cx, d.cy, d.centerRadius, centerColor);
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, innerAngle);
        drawGradientLine(d.cx + Math.cos(a) * d.centerRadius, d.cy + Math.sin(a) * d.centerRadius, d.cx + Math.cos(a) * d.orbitRadius, d.cy + Math.sin(a) * d.orbitRadius, centerColor, orbitColor);
      }
      for (let i = 0; i < spokeCount; i++) {
        const a = getAngle(i, outerAngle);
        const ox = d.cx + Math.cos(a) * d.orbitRadius, oy = d.cy + Math.sin(a) * d.orbitRadius;
        const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
        drawGradientLine(ox, oy, nX - Math.cos(a) * d.nodeRadius, nY - Math.sin(a) * d.nodeRadius, orbitColor, outerLineColor);
        drawCircle(nX, nY, d.nodeRadius, outerNodeColor);
      }
      if (phase !== Phase.PARTICLES_INWARD && phase !== Phase.PARTICLES_OUTWARD) updateAndDrawParticles();
    };
    animate();

    return () => { window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const cleanup = draw();
    const container = canvasRef.current?.parentElement;
    const onScroll = () => {
      if (!container) return;
      const t = Math.min(window.scrollY / 400, 1);
      container.style.setProperty("--scroll-t", String(t));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { cancelAnimationFrame(rafRef.current); cleanup?.(); window.removeEventListener("scroll", onScroll); };
  }, [draw]);

  return (
    <div className="rotating-shape-container rotating-shape-right">
      <canvas ref={canvasRef} />
    </div>
  );
}
