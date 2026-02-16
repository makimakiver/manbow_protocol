module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/non_ai_ui/app/components/RotatingShape.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotatingShapeRight",
    ()=>RotatingShapeRight,
    "default",
    ()=>RotatingShape
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const STEP_ANGLE = Math.PI / 4;
var Phase = /*#__PURE__*/ function(Phase) {
    Phase[Phase["OUTER_ROTATE"] = 0] = "OUTER_ROTATE";
    Phase[Phase["PARTICLES_INWARD"] = 1] = "PARTICLES_INWARD";
    Phase[Phase["INNER_ROTATE"] = 2] = "INNER_ROTATE";
    Phase[Phase["PARTICLES_OUTWARD"] = 3] = "PARTICLES_OUTWARD";
    return Phase;
}(Phase || {});
function RotatingShape() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const resize = ()=>{
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
        let phase = 0;
        let phaseProgress = 0;
        let rotateFrom = 0;
        let rotateTo = STEP_ANGLE;
        let particles = [];
        let particlesSpawned = false;
        const rotateSpeed = 0.012;
        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function getAngle(i, offset) {
            return i * 2 * Math.PI / spokeCount + offset;
        }
        function drawCircle(x, y, r, color) {
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.stroke();
        }
        function drawLine(x1, y1, x2, y2, color) {
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        function drawGradientLine(x1, y1, x2, y2, color1, color2) {
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
        function getParticleColor(t) {
            const r = Math.round(80 + (220 - 80) * t);
            const g = Math.round(120 + (70 - 120) * t);
            const b = Math.round(220 + (150 - 220) * t);
            return `rgba(${r}, ${g}, ${b}, 0.85)`;
        }
        function getParticleGlowColor(t) {
            const r = Math.round(80 + (220 - 80) * t);
            const g = Math.round(120 + (70 - 120) * t);
            const b = Math.round(220 + (150 - 220) * t);
            return `rgba(${r}, ${g}, ${b}, 0.3)`;
        }
        // Get responsive dimensions
        function getDimensions() {
            const size = canvas.width / dpr;
            const cx = size / 2;
            const cy = size / 2;
            const scale = size / 600;
            return {
                cx,
                cy,
                centerRadius: 24 * scale,
                orbitRadius: 150 * scale,
                spokeLength: 260 * scale,
                nodeRadius: 30 * scale
            };
        }
        function spawnInwardParticles() {
            if (particlesSpawned) return;
            particlesSpawned = true;
            const d = getDimensions();
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, outerAngle);
                // Start at outer node edge (not center of node)
                const nodeX = d.cx + Math.cos(a) * d.spokeLength;
                const nodeY = d.cy + Math.sin(a) * d.spokeLength;
                const startX = nodeX - Math.cos(a) * d.nodeRadius;
                const startY = nodeY - Math.sin(a) * d.nodeRadius;
                particles.push({
                    startX,
                    startY,
                    midX: d.cx + Math.cos(a) * d.orbitRadius,
                    midY: d.cy + Math.sin(a) * d.orbitRadius,
                    endX: d.cx,
                    endY: d.cy,
                    progress: 0,
                    speed: 0.008
                });
            }
        }
        function spawnOutwardParticles() {
            if (particlesSpawned) return;
            particlesSpawned = true;
            const d = getDimensions();
            for(let i = 0; i < spokeCount; i++){
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
                    endX,
                    endY,
                    progress: 0,
                    speed: 0.008
                });
            }
        }
        function updateAndDrawParticles() {
            let allDone = true;
            for(let i = particles.length - 1; i >= 0; i--){
                const p = particles[i];
                p.progress += p.speed;
                if (p.progress >= 1) {
                    particles.splice(i, 1);
                    continue;
                }
                allDone = false;
                const t = easeInOut(p.progress);
                let x, y;
                if (t < 0.5) {
                    const seg = t * 2;
                    x = p.startX + (p.midX - p.startX) * seg;
                    y = p.startY + (p.midY - p.startY) * seg;
                } else {
                    const seg = (t - 0.5) * 2;
                    x = p.midX + (p.endX - p.midX) * seg;
                    y = p.midY + (p.endY - p.midY) * seg;
                }
                const opacity = p.progress < 0.1 ? p.progress / 0.1 : p.progress > 0.85 ? (1 - p.progress) / 0.15 : 1;
                // Color shifts along the path: blue (center) to pink (outer)
                // Determine distance from center as a ratio
                const d = getDimensions();
                const distFromCenter = Math.sqrt((x - d.cx) ** 2 + (y - d.cy) ** 2);
                const maxDist = d.spokeLength;
                const colorT = Math.min(distFromCenter / maxDist, 1);
                // Glow
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
            return allDone && particlesSpawned;
        }
        function enterPhase(newPhase) {
            phase = newPhase;
            phaseProgress = 0;
            particlesSpawned = false;
            if (newPhase === 0) {
                rotateFrom = outerAngle;
                rotateTo = outerAngle + STEP_ANGLE;
            } else if (newPhase === 2) {
                rotateFrom = innerAngle;
                rotateTo = innerAngle - STEP_ANGLE;
            }
        }
        const animate = ()=>{
            rafRef.current = requestAnimationFrame(animate);
            const size = canvas.width / dpr;
            ctx.clearRect(0, 0, size, size);
            const d = getDimensions();
            // --- Phase logic ---
            if (phase === 0) {
                phaseProgress += rotateSpeed;
                if (phaseProgress >= 1) {
                    phaseProgress = 1;
                    outerAngle = rotateTo;
                    enterPhase(1);
                } else {
                    outerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
                }
            } else if (phase === 1) {
                spawnInwardParticles();
                const allDone = updateAndDrawParticles();
                if (allDone) {
                    enterPhase(2);
                }
            } else if (phase === 2) {
                phaseProgress += rotateSpeed;
                if (phaseProgress >= 1) {
                    phaseProgress = 1;
                    innerAngle = rotateTo;
                    enterPhase(3);
                } else {
                    innerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
                }
            } else if (phase === 3) {
                spawnOutwardParticles();
                const allDone = updateAndDrawParticles();
                if (allDone) {
                    enterPhase(0);
                }
            }
            // --- Draw static circles ---
            drawCircle(d.cx, d.cy, d.orbitRadius, orbitColor);
            drawCircle(d.cx, d.cy, d.centerRadius, centerColor);
            // --- Inner spokes (center edge → orbit edge) — blue gradient ---
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, innerAngle);
                const ix = d.cx + Math.cos(a) * d.centerRadius;
                const iy = d.cy + Math.sin(a) * d.centerRadius;
                const ox = d.cx + Math.cos(a) * d.orbitRadius;
                const oy = d.cy + Math.sin(a) * d.orbitRadius;
                drawGradientLine(ix, iy, ox, oy, centerColor, orbitColor);
            }
            // --- Outer group (orbit edge → outer node edge) — purple to pink gradient ---
            for(let i = 0; i < spokeCount; i++){
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
            if (phase !== 1 && phase !== 3) {
                updateAndDrawParticles();
            }
        };
        animate();
        return ()=>{
            window.removeEventListener("resize", resize);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cleanup = draw();
        const container = canvasRef.current?.parentElement;
        const onScroll = ()=>{
            if (!container) return;
            const scrollY = window.scrollY;
            const maxScroll = 400;
            const t = Math.min(scrollY / maxScroll, 1);
            container.style.setProperty("--scroll-t", String(t));
        };
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>{
            cancelAnimationFrame(rafRef.current);
            cleanup?.();
            window.removeEventListener("scroll", onScroll);
        };
    }, [
        draw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rotating-shape-container rotating-shape-left",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef
        }, void 0, false, {
            fileName: "[project]/non_ai_ui/app/components/RotatingShape.tsx",
            lineNumber: 364,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/RotatingShape.tsx",
        lineNumber: 363,
        columnNumber: 5
    }, this);
}
function RotatingShapeRight() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Reuse the same draw logic via a second instance
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const resize = ()=>{
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
        let phase = 0;
        let phaseProgress = 0;
        let rotateFrom = 0;
        let rotateTo = STEP_ANGLE;
        let particles = [];
        let particlesSpawned = false;
        const rotateSpeed = 0.012;
        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function getAngle(i, offset) {
            return i * 2 * Math.PI / spokeCount + offset;
        }
        function drawCircle(x, y, r, color) {
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.stroke();
        }
        function drawGradientLine(x1, y1, x2, y2, c1, c2) {
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            ctx.strokeStyle = grad;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        function getParticleColor(t) {
            return `rgba(${Math.round(80 + 140 * t)}, ${Math.round(120 - 50 * t)}, ${Math.round(220 - 70 * t)}, 0.85)`;
        }
        function getParticleGlowColor(t) {
            return `rgba(${Math.round(80 + 140 * t)}, ${Math.round(120 - 50 * t)}, ${Math.round(220 - 70 * t)}, 0.3)`;
        }
        function getDimensions() {
            const size = canvas.width / dpr;
            const scale = size / 600;
            return {
                cx: size / 2,
                cy: size / 2,
                centerRadius: 24 * scale,
                orbitRadius: 150 * scale,
                spokeLength: 260 * scale,
                nodeRadius: 30 * scale
            };
        }
        function spawnInwardParticles() {
            if (particlesSpawned) return;
            particlesSpawned = true;
            const d = getDimensions();
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, outerAngle);
                const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
                particles.push({
                    startX: nX - Math.cos(a) * d.nodeRadius,
                    startY: nY - Math.sin(a) * d.nodeRadius,
                    midX: d.cx + Math.cos(a) * d.orbitRadius,
                    midY: d.cy + Math.sin(a) * d.orbitRadius,
                    endX: d.cx,
                    endY: d.cy,
                    progress: 0,
                    speed: 0.008
                });
            }
        }
        function spawnOutwardParticles() {
            if (particlesSpawned) return;
            particlesSpawned = true;
            const d = getDimensions();
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, outerAngle);
                const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
                particles.push({
                    startX: d.cx,
                    startY: d.cy,
                    midX: d.cx + Math.cos(a) * d.orbitRadius,
                    midY: d.cy + Math.sin(a) * d.orbitRadius,
                    endX: nX - Math.cos(a) * d.nodeRadius,
                    endY: nY - Math.sin(a) * d.nodeRadius,
                    progress: 0,
                    speed: 0.008
                });
            }
        }
        function updateAndDrawParticles() {
            let allDone = true;
            for(let i = particles.length - 1; i >= 0; i--){
                const p = particles[i];
                p.progress += p.speed;
                if (p.progress >= 1) {
                    particles.splice(i, 1);
                    continue;
                }
                allDone = false;
                const t = easeInOut(p.progress);
                let x, y;
                if (t < 0.5) {
                    const s = t * 2;
                    x = p.startX + (p.midX - p.startX) * s;
                    y = p.startY + (p.midY - p.startY) * s;
                } else {
                    const s = (t - 0.5) * 2;
                    x = p.midX + (p.endX - p.midX) * s;
                    y = p.midY + (p.endY - p.midY) * s;
                }
                const opacity = p.progress < 0.1 ? p.progress / 0.1 : p.progress > 0.85 ? (1 - p.progress) / 0.15 : 1;
                const d = getDimensions();
                const dist = Math.sqrt((x - d.cx) ** 2 + (y - d.cy) ** 2);
                const colorT = Math.min(dist / d.spokeLength, 1);
                ctx.globalAlpha = opacity * 0.25;
                ctx.fillStyle = getParticleGlowColor(colorT);
                ctx.beginPath();
                ctx.arc(x, y, particleRadius * 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = opacity * 0.9;
                ctx.fillStyle = getParticleColor(colorT);
                ctx.beginPath();
                ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            return allDone && particlesSpawned;
        }
        function enterPhase(newPhase) {
            phase = newPhase;
            phaseProgress = 0;
            particlesSpawned = false;
            if (newPhase === 0) {
                rotateFrom = outerAngle;
                rotateTo = outerAngle + STEP_ANGLE;
            } else if (newPhase === 2) {
                rotateFrom = innerAngle;
                rotateTo = innerAngle - STEP_ANGLE;
            }
        }
        const animate = ()=>{
            rafRef.current = requestAnimationFrame(animate);
            const size = canvas.width / dpr;
            ctx.clearRect(0, 0, size, size);
            const d = getDimensions();
            if (phase === 0) {
                phaseProgress += rotateSpeed;
                if (phaseProgress >= 1) {
                    outerAngle = rotateTo;
                    enterPhase(1);
                } else outerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
            } else if (phase === 1) {
                spawnInwardParticles();
                if (updateAndDrawParticles()) enterPhase(2);
            } else if (phase === 2) {
                phaseProgress += rotateSpeed;
                if (phaseProgress >= 1) {
                    innerAngle = rotateTo;
                    enterPhase(3);
                } else innerAngle = rotateFrom + (rotateTo - rotateFrom) * easeInOut(phaseProgress);
            } else if (phase === 3) {
                spawnOutwardParticles();
                if (updateAndDrawParticles()) enterPhase(0);
            }
            drawCircle(d.cx, d.cy, d.orbitRadius, orbitColor);
            drawCircle(d.cx, d.cy, d.centerRadius, centerColor);
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, innerAngle);
                drawGradientLine(d.cx + Math.cos(a) * d.centerRadius, d.cy + Math.sin(a) * d.centerRadius, d.cx + Math.cos(a) * d.orbitRadius, d.cy + Math.sin(a) * d.orbitRadius, centerColor, orbitColor);
            }
            for(let i = 0; i < spokeCount; i++){
                const a = getAngle(i, outerAngle);
                const ox = d.cx + Math.cos(a) * d.orbitRadius, oy = d.cy + Math.sin(a) * d.orbitRadius;
                const nX = d.cx + Math.cos(a) * d.spokeLength, nY = d.cy + Math.sin(a) * d.spokeLength;
                drawGradientLine(ox, oy, nX - Math.cos(a) * d.nodeRadius, nY - Math.sin(a) * d.nodeRadius, orbitColor, outerLineColor);
                drawCircle(nX, nY, d.nodeRadius, outerNodeColor);
            }
            if (phase !== 1 && phase !== 3) updateAndDrawParticles();
        };
        animate();
        return ()=>{
            window.removeEventListener("resize", resize);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cleanup = draw();
        const container = canvasRef.current?.parentElement;
        const onScroll = ()=>{
            if (!container) return;
            const t = Math.min(window.scrollY / 400, 1);
            container.style.setProperty("--scroll-t", String(t));
        };
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>{
            cancelAnimationFrame(rafRef.current);
            cleanup?.();
            window.removeEventListener("scroll", onScroll);
        };
    }, [
        draw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rotating-shape-container rotating-shape-right",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef
        }, void 0, false, {
            fileName: "[project]/non_ai_ui/app/components/RotatingShape.tsx",
            lineNumber: 545,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/RotatingShape.tsx",
        lineNumber: 544,
        columnNumber: 5
    }, this);
}
}),
"[project]/non_ai_ui/app/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Navbar() {
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 right-0 z-50 ${scrolled ? "backdrop-blur-sm border-b border-black/[0.06] py-4" : "bg-transparent py-6"}`,
        style: scrolled ? {
            background: "linear-gradient(to right, transparent 0%, rgba(245,243,238,0.9) 40%, rgba(245,243,238,0.9) 60%, transparent 100%)"
        } : undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-4xl px-6 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "text-sm font-semibold tracking-tight text-[#333]",
                        children: "Manbow"
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-8",
                        children: [
                            [
                                "How It Works",
                                "Chains",
                                "Stats"
                            ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `#${label.toLowerCase().replace(/\s+/g, "")}`,
                                    className: "text-xs text-[#999] hover:text-[#333] tracking-wide",
                                    children: label
                                }, label, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#start",
                                className: "text-xs text-[#333] border-b border-[#333] pb-0.5 hover:text-[#4a6fa5] hover:border-[#4a6fa5]",
                                children: "Launch App"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden text-[#999]",
                        onClick: ()=>setMobileOpen(!mobileOpen),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "18",
                            height: "18",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.5",
                            children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M4 4l10 10M4 14L14 4"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                                lineNumber: 51,
                                columnNumber: 27
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M2 5h14M2 9h14M2 13h14"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                                lineNumber: 51,
                                columnNumber: 63
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden bg-[#f5f3ee]/95 backdrop-blur-sm border-t border-black/[0.06] px-6 py-6 flex flex-col gap-4 mt-1",
                children: [
                    [
                        "How It Works",
                        "Chains",
                        "Stats"
                    ].map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `#${label.toLowerCase().replace(/\s+/g, "")}`,
                            className: "text-sm text-[#999] hover:text-[#333]",
                            onClick: ()=>setMobileOpen(false),
                            children: label
                        }, label, false, {
                            fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#start",
                        className: "text-sm text-[#333] border-b border-[#333] self-start pb-0.5",
                        onClick: ()=>setMobileOpen(false),
                        children: "Launch App"
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/non_ai_ui/app/components/Navbar.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/non_ai_ui/app/components/HoverText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HoverText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function HoverText({ text, className = "", as: Tag = "span" }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const el = e.currentTarget;
        el.style.color = "#4a6fa5";
        el.style.transform = "translateY(-2px)";
    }, []);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const el = e.currentTarget;
        el.style.color = "";
        el.style.transform = "translateY(0)";
    }, []);
    // Split text into words, then characters
    const words = text.split(" ");
    return(// @ts-expect-error dynamic tag
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ref: containerRef,
        className: className,
        children: words.map((word, wi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    display: "inline-block",
                    whiteSpace: "nowrap"
                },
                children: [
                    word.split("").map((char, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            onMouseEnter: handleMouseEnter,
                            onMouseLeave: handleMouseLeave,
                            style: {
                                display: "inline-block",
                                transition: "color .25s cubic-bezier(.4,.4,0,1), transform .25s cubic-bezier(.4,.4,0,1)",
                                cursor: "default"
                            },
                            children: char
                        }, `${wi}-${ci}`, false, {
                            fileName: "[project]/non_ai_ui/app/components/HoverText.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this)),
                    wi < words.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: " "
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/HoverText.tsx",
                        lineNumber: 48,
                        columnNumber: 37
                    }, this)
                ]
            }, wi, true, {
                fileName: "[project]/non_ai_ui/app/components/HoverText.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/HoverText.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this));
}
}),
"[project]/non_ai_ui/app/components/Hero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/app/components/HoverText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const CHAINS = [
    "HyperEVM",
    "SuiMVM",
    "Ethereum",
    "Arbitrum"
];
const LEND_CHAINS = [
    "HEVM",
    "ETH",
    "ARB",
    "SUI"
];
const BORROW_CHAINS = [
    "MVM",
    "ARB",
    "HEVM",
    "ETH"
];
function Hero() {
    const [activeChain, setActiveChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [flowIndex, setFlowIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [flowVisible, setFlowVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const flowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const interval = setInterval(()=>{
            setActiveChain((prev)=>(prev + 1) % CHAINS.length);
        }, 2800);
        const flowInterval = setInterval(()=>{
            setFlowIndex((prev)=>(prev + 1) % LEND_CHAINS.length);
        }, 3200);
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) setFlowVisible(true);
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        });
        if (flowRef.current) observer.observe(flowRef.current);
        return ()=>{
            clearInterval(interval);
            clearInterval(flowInterval);
            observer.disconnect();
        };
    }, []);
    const stagger = (delay)=>({
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: `${delay}s`,
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 max-w-3xl mx-auto text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-[#1a1a1a] mb-6",
                                style: stagger(0),
                                children: "Manbow"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 54,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-[#999] tracking-[0.15em] uppercase mb-8 font-mono",
                                style: stagger(0.1),
                                children: "Multi-chain lending protocol"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 62,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: stagger(0.25),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] mb-8 text-[#1a1a1a]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            text: "Lend on one chain."
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                            lineNumber: 72,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                            lineNumber: 73,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-normal",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                text: "Borrow on another."
                                            }, void 0, false, {
                                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                            lineNumber: 74,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 71,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 70,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divider w-12 mx-auto mb-8",
                                style: stagger(0.35)
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 81,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm md:text-base text-[#999] max-w-md mx-auto mb-14 leading-[1.8]",
                                style: stagger(0.45),
                                children: [
                                    "Supply assets on",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block text-[#333] font-medium",
                                        style: {
                                            animation: "fadeSwap 0.8s cubic-bezier(.4, .4, 0, 1)"
                                        },
                                        children: CHAINS[activeChain]
                                    }, activeChain, false, {
                                        fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                        lineNumber: 92,
                                        columnNumber: 11
                                    }, this),
                                    " ",
                                    "and borrow on any other chain — all from your SUI wallet."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 87,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-center justify-center gap-5 mb-20",
                                style: stagger(0.55),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#start",
                                        className: "px-8 py-3 text-sm text-[#f5f3ee] bg-[#333] rounded-none hover:bg-[#1a1a1a]",
                                        children: "Start Lending"
                                    }, void 0, false, {
                                        fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                        lineNumber: 107,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#howitworks",
                                        className: "text-sm text-[#999] border-b border-[#ccc] pb-0.5 hover:text-[#333] hover:border-[#333]",
                                        children: "Learn more"
                                    }, void 0, false, {
                                        fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                        lineNumber: 113,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 103,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                        lineNumber: 52,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-px h-6 bg-[#ddd]"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 125,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-mono text-[#ccc] tracking-[0.2em]",
                                children: "SCROLL"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                lineNumber: 126,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                        lineNumber: 124,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                lineNumber: 51,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: flowRef,
                className: "relative z-20 py-16 px-6",
                style: {
                    opacity: flowVisible ? 1 : 0,
                    transform: flowVisible ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.8s cubic-bezier(.4,.4,0,1), transform 0.8s cubic-bezier(.4,.4,0,1)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-2xl bg-[#f5f3ee]/80 backdrop-blur-sm rounded-lg px-8 py-6 flex items-center justify-center gap-6 md:gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center min-w-[48px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-mono text-[#4a6fa5] mb-1",
                                    style: {
                                        animation: "fadeSwap 1s cubic-bezier(.4, .4, 0, 1)"
                                    },
                                    children: LEND_CHAINS[flowIndex]
                                }, `lend-${flowIndex}`, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 142,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#bbb]",
                                    children: "Lend"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 149,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                            lineNumber: 141,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-8 h-px bg-[#ddd]"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 153,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-[#ccc] font-mono",
                                    children: "IKA"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 154,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-8 h-px bg-[#ddd]"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 155,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                            lineNumber: 152,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-mono text-[#333] font-medium mb-1",
                                    children: "Manbow"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 159,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#bbb]",
                                    children: "Protocol"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 160,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                            lineNumber: 158,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-8 h-px bg-[#ddd]"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 164,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-[#ccc] font-mono",
                                    children: "IKA"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 165,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-8 h-px bg-[#ddd]"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 166,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                            lineNumber: 163,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center min-w-[48px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-mono text-[#4a6fa5] mb-1",
                                    style: {
                                        animation: "fadeSwap 1s cubic-bezier(.4, .4, 0, 1)"
                                    },
                                    children: BORROW_CHAINS[flowIndex]
                                }, `borrow-${flowIndex}`, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 170,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#bbb]",
                                    children: "Borrow"
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                                    lineNumber: 177,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                            lineNumber: 169,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                    lineNumber: 140,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/non_ai_ui/app/components/Hero.tsx",
                lineNumber: 131,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/non_ai_ui/app/components/HowItWorks.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowItWorks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/app/components/HoverText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const steps = [
    {
        num: "01",
        title: "Connect Wallet",
        desc: "One SUI wallet to rule them all. Connect and Manbow handles cross-chain via IKA."
    },
    {
        num: "02",
        title: "Choose Chains",
        desc: "Pick a source chain to lend and a target chain to borrow from."
    },
    {
        num: "03",
        title: "Lend & Borrow",
        desc: "Execute both in a single transaction. IKA bridges the communication."
    },
    {
        num: "04",
        title: "Manage",
        desc: "Track, repay, and withdraw across all chains from one dashboard."
    }
];
function HowItWorks() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) setVisible(true);
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "howitworks",
        ref: sectionRef,
        className: "relative py-28 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-4",
                            children: "How It Works"
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl md:text-4xl font-light text-[#1a1a1a] leading-tight",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: "Simple by design"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divider mb-12"
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-0",
                    children: steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex gap-8 md:gap-12 py-8 border-b border-black/[0.06] last:border-b-0 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                            style: {
                                transitionDelay: `${i * 100}ms`,
                                transitionDuration: "0.6s",
                                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl md:text-2xl font-light text-[#ccc] flex-shrink-0 pt-0.5 w-10 font-mono",
                                    children: step.num
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-base md:text-lg font-normal text-[#333] mb-2",
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#999] leading-[1.8]",
                                            children: step.desc
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, step.num, true, {
                            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/HowItWorks.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/non_ai_ui/app/components/Chains.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Chains
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/app/components/HoverText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const chains = [
    {
        name: "HyperEVM",
        tag: "HEVM",
        live: true
    },
    {
        name: "SuiMVM",
        tag: "MVM",
        live: true
    },
    {
        name: "Ethereum",
        tag: "ETH",
        live: true
    },
    {
        name: "Arbitrum",
        tag: "ARB",
        live: false
    },
    {
        name: "Solana",
        tag: "SOL",
        live: false
    },
    {
        name: "Base",
        tag: "BASE",
        live: false
    }
];
function Chains() {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) setVisible(true);
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        });
        if (ref.current) observer.observe(ref.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "chains",
        ref: ref,
        className: "relative py-28 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-4",
                            children: "Ecosystem"
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl md:text-4xl font-light text-[#1a1a1a] leading-tight",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: "Multi-chain compatible"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divider mb-12"
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-black/[0.06]",
                    children: chains.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `py-6 px-5 border-b border-black/[0.06] ${(i + 1) % 3 !== 0 ? "sm:border-r sm:border-r-black/[0.06]" : ""} ${(i + 1) % 2 !== 0 ? "border-r border-r-black/[0.06] sm:border-r-0" : ""} ${(i + 1) % 3 !== 0 ? "" : "sm:border-r-0"} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`,
                            style: {
                                transitionDelay: `${i * 80}ms`,
                                transitionDuration: "0.5s",
                                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-mono text-[#333]",
                                            children: c.tag
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[10px] font-mono ${c.live ? "text-[#4a6fa5]" : "text-[#ccc]"}`,
                                            children: c.live ? "Live" : "Soon"
                                        }, void 0, false, {
                                            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[#999]",
                                    children: c.name
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, c.tag, true, {
                            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mt-12 pt-8 border-t border-black/[0.06] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`,
                    style: {
                        transitionDelay: "500ms",
                        transitionDuration: "0.6s",
                        transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#999] leading-[1.8]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#333] font-medium",
                                children: "IKA"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            " is the interoperability layer that lets your SUI wallet sign and execute transactions across every supported chain. No bridges. No wrapping."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/Chains.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/non_ai_ui/app/components/Stats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Stats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const stats = [
    {
        value: "$1.8B+",
        label: "Total Value Locked"
    },
    {
        value: "6+",
        label: "Supported Chains"
    },
    {
        value: "8,200+",
        label: "Active Users"
    },
    {
        value: "<3s",
        label: "Settlement Time"
    }
];
function Stats() {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) setVisible(true);
        }, {
            threshold: 0.1
        });
        if (ref.current) observer.observe(ref.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "stats",
        ref: ref,
        className: "relative py-28 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divider mb-12"
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4",
                    children: stats.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `text-center ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`,
                            style: {
                                transitionDelay: `${i * 80}ms`,
                                transitionDuration: "0.5s",
                                transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl md:text-3xl font-light text-[#333] mb-2",
                                    children: s.value
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#bbb] font-mono tracking-wide",
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s.label, true, {
                            fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divider mt-12"
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-8 mt-8 flex-wrap",
                    children: [
                        "Audited",
                        "Non-Custodial",
                        "Open Source",
                        "DAO Governed"
                    ].map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] font-mono text-[#ccc]",
                            children: tag
                        }, tag, false, {
                            fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/Stats.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/non_ai_ui/app/components/CTA.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/non_ai_ui/app/components/HoverText.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function CTA() {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) setVisible(true);
        }, {
            threshold: 0.1
        });
        if (ref.current) observer.observe(ref.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "start",
        ref: ref,
        className: "relative py-32 px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
                style: {
                    transitionDuration: "0.8s",
                    transitionTimingFunction: "cubic-bezier(.4, .4, 0, 1)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-mono text-[#999] tracking-[0.15em] uppercase mb-6",
                        children: "Get Started"
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl md:text-4xl font-light text-[#1a1a1a] mb-5 leading-tight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$app$2f$components$2f$HoverText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: "Start lending across chains"
                        }, void 0, false, {
                            fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#999] mb-12 max-w-sm mx-auto leading-[1.8]",
                        children: "Connect your SUI wallet, pick your chains, and go."
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center justify-center gap-5 mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "px-8 py-3 text-sm text-[#f5f3ee] bg-[#333] hover:bg-[#1a1a1a]",
                                children: "Launch App"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "text-sm text-[#999] border-b border-[#ccc] pb-0.5 hover:text-[#333] hover:border-[#333]",
                                children: "Read Documentation"
                            }, void 0, false, {
                                fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$non_ai_ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divider w-12 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/non_ai_ui/app/components/CTA.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bcd65a47._.js.map