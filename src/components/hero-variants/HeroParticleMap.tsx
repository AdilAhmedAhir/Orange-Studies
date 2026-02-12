"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Search, MapPin, BookOpen } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

const VIDEO_SRC =
    "https://videos.pexels.com/video-files/6209/6209-hd_1920_1080_30fps.mp4";
const POSTER_SRC =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80&auto=format";

/* ═════════════════════════════════════════════════════════════
 * LOGO GEOMETRY — graduation cap + orange sphere (matches SVG icon)
 *
 * SVG viewBox is 0‑400, we normalise to 0‑1 for canvas rendering.
 * Centre of the logo ≈ (200, 180) in SVG coords → (0.50, 0.45) normalised.
 * We scale the whole thing to fit ~40% of the viewport width.
 * ═════════════════════════════════════════════════════════════ */

const LOGO_SCALE = 0.0009;   // SVG unit → normalised viewport fraction
const LOGO_OX = 0.50;        // centre X offset in viewport (0‑1)
const LOGO_OY = 0.46;        // centre Y offset

/** Convert SVG (0‑400) coordinate to normalised (0‑1) viewport coordinate */
function svgToNorm(sx: number, sy: number): [number, number] {
    return [
        LOGO_OX + (sx - 200) * LOGO_SCALE,
        LOGO_OY + (sy - 200) * LOGO_SCALE,
    ];
}

/* ── 1. ORANGE SPHERE (circle cx=200 cy=240 r=130) ─────────── */
function generateSpherePoints(): [number, number][] {
    const pts: [number, number][] = [];
    const cx = 200, cy = 240, r = 130;

    // Outer ring — evenly spaced around circumference
    const ringCount = 60;
    for (let i = 0; i < ringCount; i++) {
        const a = (2 * Math.PI * i) / ringCount;
        pts.push(svgToNorm(cx + r * Math.cos(a), cy + r * Math.sin(a)));
    }

    // Concentric rings inward for fill
    const shells = [0.8, 0.58, 0.36, 0.14];
    const dotsPerShell = [48, 36, 24, 10];
    for (let s = 0; s < shells.length; s++) {
        const sr = r * shells[s];
        for (let i = 0; i < dotsPerShell[s]; i++) {
            const a = (2 * Math.PI * i) / dotsPerShell[s] + s * 0.3;
            pts.push(svgToNorm(cx + sr * Math.cos(a), cy + sr * Math.sin(a)));
        }
    }

    return pts;
}

/* ── 2. CAP DIAMOND (rhombus M200,40 → 360,110 → 200,150 → 40,110) ── */
function generateCapDiamondPoints(): [number, number][] {
    const pts: [number, number][] = [];

    // Fill the diamond with a grid, clipping to the diamond shape
    const top = 40, bottom = 150, midY = 110, midX = 200, right = 360;
    const rows = 14;
    for (let r = 0; r <= rows; r++) {
        const t = r / rows;
        const y = top + t * (bottom - top);
        let hw: number;
        if (y <= midY) {
            const ty = (y - top) / (midY - top);
            hw = ty * (right - midX);     // 0 → 160
        } else {
            const ty = (y - midY) / (bottom - midY);
            hw = (1 - ty) * (right - midX);
        }
        const cols = Math.max(2, Math.round(hw / 12));
        for (let c = 0; c <= cols; c++) {
            const x = midX - hw + (2 * hw * c) / cols;
            pts.push(svgToNorm(x, y));
        }
    }
    return pts;
}

/* ── 3. CAP BASE (block sitting on sphere, y 135→160) ────────── */
function generateCapBasePoints(): [number, number][] {
    const pts: [number, number][] = [];
    const x0 = 100, x1 = 300, y0 = 130, y1 = 162;
    const rows = 4;
    const cols = 16;
    for (let r = 0; r <= rows; r++) {
        const y = y0 + (y1 - y0) * (r / rows);
        for (let c = 0; c <= cols; c++) {
            const x = x0 + (x1 - x0) * (c / cols);
            pts.push(svgToNorm(x, y));
        }
    }
    return pts;
}

/* ── 4. TASSEL (string + bob from left side) ────────────────── */
function generateTasselPoints(): [number, number][] {
    const pts: [number, number][] = [];
    // String path: (65, 118) → (65, 180)
    for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        pts.push(svgToNorm(65, 118 + t * 62));
    }
    // Bob (trapezoid 55,180 → 75,180 → 70,215 → 60,215)
    const bobPts: [number, number][] = [
        [57, 185], [67, 185], [77, 185],
        [59, 198], [65, 198], [71, 198],
        [60, 210], [65, 210], [70, 210],
    ];
    for (const bp of bobPts) {
        pts.push(svgToNorm(bp[0], bp[1]));
    }
    // Knot
    pts.push(svgToNorm(65, 118));
    return pts;
}

/* ── 5. HIGHLIGHT ACCENT DOTS ───────────────────────────────── */
function generateHighlightPoints(): [number, number][] {
    return [
        svgToNorm(270, 170),
        svgToNorm(285, 180),
        svgToNorm(300, 190),
        svgToNorm(310, 210),
        svgToNorm(295, 175),
        svgToNorm(305, 200),
    ];
}

/* ── Assemble all target points ─────────────────────────────── */
const SPHERE_POINTS = generateSpherePoints();
const CAP_DIAMOND_POINTS = generateCapDiamondPoints();
const CAP_BASE_POINTS = generateCapBasePoints();
const TASSEL_POINTS = generateTasselPoints();
const HIGHLIGHT_POINTS = generateHighlightPoints();

const ALL_TARGET_POINTS: [number, number][] = [
    ...SPHERE_POINTS,
    ...CAP_DIAMOND_POINTS,
    ...CAP_BASE_POINTS,
    ...TASSEL_POINTS,
    ...HIGHLIGHT_POINTS,
];
const PARTICLE_COUNT = ALL_TARGET_POINTS.length;

// Indices for colouring: sphere=orange, cap=purple, tassel=purple, highlights=white
const SPHERE_END = SPHERE_POINTS.length;
const CAP_END = SPHERE_END + CAP_DIAMOND_POINTS.length + CAP_BASE_POINTS.length;
const TASSEL_END = CAP_END + TASSEL_POINTS.length;



function generateRandomPositions(count: number): { x: number; y: number; vx: number; vy: number; size: number; pulse: number }[] {
    const particles: { x: number; y: number; vx: number; vy: number; size: number; pulse: number }[] = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.0008,
            vy: (Math.random() - 0.5) * 0.0008,
            size: 1.5 + Math.random() * 2.5,
            pulse: Math.random() * Math.PI * 2,
        });
    }
    return particles;
}

export function HeroParticleMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoRevealRef = useRef<HTMLDivElement>(null);
    const [particles] = useState(() => generateRandomPositions(PARTICLE_COUNT));
    const progressRef = useRef(0);
    const timeRef = useRef(0);
    const particleStateRef = useRef(particles.map(p => ({ x: p.x, y: p.y })));

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        progressRef.current = v;
    });

    /* ── Canvas animation loop ──────────────────────────────── */
    const drawParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use CSS pixel dimensions for position math (canvas.width includes DPR)
        const w = window.innerWidth;
        const h = window.innerHeight;
        const progress = progressRef.current;
        const time = timeRef.current;
        timeRef.current += 0.016;

        // Formation progress (0→1 between scroll 0% and 40%)
        const formProgress = Math.min(1, Math.max(0, progress / 0.40));
        const ease = formProgress < 0.5
            ? 4 * formProgress * formProgress * formProgress
            : 1 - Math.pow(-2 * formProgress + 2, 3) / 2;

        // Fade out after 65%
        const fadeOut = progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) / 0.15) : 1;

        // Slow rotation angle when formed
        const rotAngle = ease * time * 0.08;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const state = particleStateRef.current;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];
            let target = ALL_TARGET_POINTS[i];

            // Apply gentle horizontal oscillation when forming (not full rotation)
            if (ease > 0.1) {
                const tx = target[0] - LOGO_OX;
                const ty = target[1] - LOGO_OY;
                // Subtle horizontal sway — just shift x slightly with sine
                const sway = Math.sin(rotAngle) * 0.015 * ease;
                target = [LOGO_OX + tx + sway, LOGO_OY + ty];
            }

            // Floating animation (when not formed)
            const floatX = Math.sin(time * 0.5 + p.pulse) * 0.003;
            const floatY = Math.cos(time * 0.7 + p.pulse * 1.3) * 0.003;

            // Drift the free positions gently
            if (ease < 0.01) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -0.05) p.x = 1.05;
                if (p.x > 1.05) p.x = -0.05;
                if (p.y < -0.05) p.y = 1.05;
                if (p.y > 1.05) p.y = -0.05;
            }

            // Interpolate: free position → target position
            const freeX = p.x + floatX;
            const freeY = p.y + floatY;
            const curX = freeX + (target[0] - freeX) * ease;
            const curY = freeY + (target[1] - freeY) * ease;

            state[i].x = curX;
            state[i].y = curY;

            const px = curX * w;
            const py = curY * h;

            // Pulsing glow effect in free state
            const pulseAlpha = ease < 0.3
                ? 0.4 + Math.sin(time * 2 + p.pulse) * 0.3
                : 0.7 + ease * 0.3;
            // Fade particles out as the real logo fades in (ease 0.7→1.0)
            const logoTakeover = ease > 0.7 ? Math.min(1, (ease - 0.7) / 0.3) : 0;
            const alpha = pulseAlpha * fadeOut * (1 - logoTakeover);

            // Size: bigger when floating, tighter when formed
            const size = p.size * (1 - ease * 0.35);

            // Color: per-part colouring — sphere→orange, cap→purple, tassel→purple, highlights→bright white
            let r: number, g: number, b: number;
            if (i >= TASSEL_END) {
                // Highlight dots → stay bright white
                r = 255; g = 255; b = 255;
            } else if (i >= CAP_END) {
                // Tassel → purple
                r = Math.round(255 - ease * 162); // 255→93
                g = Math.round(255 - ease * 210); // 255→45
                b = Math.round(255 - ease * 112); // 255→143
            } else if (i >= SPHERE_END) {
                // Cap → purple (#5D2D8F)
                r = Math.round(255 - ease * 162);
                g = Math.round(255 - ease * 210);
                b = Math.round(255 - ease * 112);
            } else {
                // Sphere → orange (#FF9400)
                r = 255;
                g = Math.round(255 - ease * 107);
                b = Math.round(255 - ease * 255);
            }

            // Draw glow
            if (size > 1.8 && alpha > 0.25) {
                const gradient = ctx.createRadialGradient(px, py, 0, px, py, size * 3.5);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.beginPath();
                ctx.arc(px, py, size * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Draw particle core
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();
        }

        // Connection lines when forming (between nearby sphere particles)
        const logoTakeoverGlobal = ease > 0.7 ? Math.min(1, (ease - 0.7) / 0.3) : 0;
        if (ease > 0.3 && fadeOut > 0 && logoTakeoverGlobal < 1) {
            const lineThreshold = Math.min(55, 30 + ease * 25);
            const lineAlpha = (ease - 0.3) * 0.15 * fadeOut * (1 - logoTakeoverGlobal);

            for (let i = 0; i < SPHERE_END; i++) {
                const ax = state[i].x * w;
                const ay = state[i].y * h;
                for (let j = i + 1; j < SPHERE_END; j++) {
                    const bx = state[j].x * w;
                    const by = state[j].y * h;
                    const dist = Math.hypot(bx - ax, by - ay);
                    if (dist < lineThreshold) {
                        ctx.beginPath();
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(bx, by);
                        ctx.strokeStyle = `rgba(255, 148, 0, ${lineAlpha * (1 - dist / lineThreshold)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Gentle orbit glow when mostly formed (also fades with logo takeover)
        if (ease > 0.6 && fadeOut > 0 && logoTakeoverGlobal < 1) {
            const glowAlpha = (ease - 0.6) * 2.5 * fadeOut * 0.15 * (1 - logoTakeoverGlobal);
            const cx = LOGO_OX * w;
            const cy = LOGO_OY * h;
            const LOGO_GLOW_R = 0.20;
            const radius = LOGO_GLOW_R * Math.min(w, h);
            const orbGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.5);
            orbGrad.addColorStop(0, `rgba(255, 148, 0, 0)`);
            orbGrad.addColorStop(0.5, `rgba(255, 148, 0, ${glowAlpha})`);
            orbGrad.addColorStop(1, `rgba(255, 148, 0, 0)`);
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = orbGrad;
            ctx.fill();
        }

        requestAnimationFrame(drawParticles);

        // Update logo reveal element opacity/scale directly from the same progress
        if (logoRevealRef.current) {
            // Logo fades in: progress 0.15→0.28, stays 0.28→0.55, fades out: 0.55→0.68
            let logoAlpha = 0;
            if (progress >= 0.15 && progress < 0.28) {
                logoAlpha = (progress - 0.15) / 0.13;
            } else if (progress >= 0.28 && progress < 0.55) {
                logoAlpha = 1;
            } else if (progress >= 0.55 && progress < 0.68) {
                logoAlpha = 1 - (progress - 0.55) / 0.13;
            }
            const logoScaleVal = progress < 0.28 ? 0.6 + 0.4 * Math.min(1, Math.max(0, (progress - 0.15) / 0.13)) : 1;
            logoRevealRef.current.style.opacity = String(logoAlpha);
            logoRevealRef.current.style.transform = `scale(${logoScaleVal})`;
        }
    }, [particles]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const isMobile = window.innerWidth <= 768;
            const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener("resize", resize);
        const frame = requestAnimationFrame(drawParticles);
        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(frame);
        };
    }, [drawParticles]);

    /* ── Standard hero transforms (compressed timeline) ──────── */
    // Clip-path: start growing at 30%, cover screen by 70%
    const clipRadius = useTransform(scrollYProgress, [0, 0.30, 0.55, 0.75], [0, 0, 50, 160]);
    const clipPath = useTransform(clipRadius, (r: number) => `circle(${r}% at 50% 50%)`);
    // Text fades out — extended to stay visible longer (gone ~25%)
    const textScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.04]);
    const textOpacity = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
    const textVisibility = useTransform(scrollYProgress, (v: number) => v > 0.26 ? "hidden" as const : "visible" as const);
    // Search bar — appears at 60%, visible by 72%
    const searchY = useTransform(scrollYProgress, [0.60, 0.72], [60, 0]);
    const searchOpacity = useTransform(scrollYProgress, [0.60, 0.72], [0, 1]);
    // Overlay — follows video reveal
    const overlayOpacity = useTransform(scrollYProgress, [0.30, 0.55, 0.80], [0, 0.35, 0.15]);
    const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

    return (
        <section ref={containerRef} style={{ height: "300vh" }} className="relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* LAYER 1 — Background + canvas particles */}
                <div className="absolute inset-0 bg-[#0a0118]">
                    <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,148,0,0.04)_0%,_transparent_70%)]" />
                </div>

                {/* Tassel swing + sparkle orbit keyframes */}
                <style>{`
                    @keyframes tasselSwing {
                        from { transform: rotate(-5deg); }
                        to   { transform: rotate(5deg); }
                    }
                    .hero-logo-reveal #tassel-hero {
                        transform-origin: 65px 125px;
                        animation: tasselSwing 2s ease-in-out infinite alternate;
                    }
                    @keyframes sparkleOrbit {
                        0%   { transform: rotate(var(--start-angle)) translateX(var(--orbit-r)) rotate(calc(-1 * var(--start-angle))); opacity: 0.2; }
                        50%  { transform: rotate(calc(var(--start-angle) + 180deg)) translateX(var(--orbit-r)) rotate(calc(-1 * (var(--start-angle) + 180deg))); opacity: 1; }
                        100% { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--orbit-r)) rotate(calc(-1 * (var(--start-angle) + 360deg))); opacity: 0.2; }
                    }
                    @keyframes sparklePulse {
                        0%, 100% { transform: scale(0.6); }
                        50%      { transform: scale(1.4); }
                    }
                `}</style>

                {/* LAYER 1.5 — Animated SVG logo reveal (sits above particles, below video) */}
                <div
                    ref={logoRevealRef}
                    className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none hero-logo-reveal"
                    style={{ opacity: 0 }}
                >
                    <div>
                        <motion.div
                            animate={{
                                y: [0, -14, 0, 10, 0],
                                rotate: [0, -3, 0, 3, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative"
                            style={{ filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.4))' }}
                        >
                            {/* Pulsing glow behind logo */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 -m-16 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,148,0,0.5) 0%, rgba(93,45,143,0.25) 45%, transparent 70%)',
                                    filter: 'blur(30px)',
                                }}
                            />

                            {/* ✦ Orbiting sparkle particles */}
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                <div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5"
                                    style={{
                                        ['--start-angle' as string]: `${angle}deg`,
                                        ['--orbit-r' as string]: `${140 + (i % 2) * 20}px`,
                                        animation: `sparkleOrbit ${6 + i * 0.5}s linear infinite`,
                                    }}
                                >
                                    <div
                                        className="h-3 w-3"
                                        style={{
                                            animation: `sparklePulse ${1.5 + i * 0.3}s ease-in-out infinite`,
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                                            <path
                                                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
                                                fill={i % 2 === 0 ? '#FF9400' : '#8B5DB5'}
                                                fillOpacity={0.8}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}

                            {/* Full detailed SVG graduation cap — scaled up for impact */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 400 400"
                                width={240}
                                height={240}
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="heroSphereGrad" x1="25%" y1="25%" x2="85%" y2="85%">
                                        <stop offset="0%" stopColor="#FF9400" />
                                        <stop offset="100%" stopColor="#CC7600" />
                                    </linearGradient>
                                    <linearGradient id="heroHatShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#000" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <circle cx={200} cy={240} r={130} fill="url(#heroSphereGrad)" />
                                <path d="M 100 160 Q 200 100 300 160 Q 200 210 100 160 Z" fill="url(#heroHatShadow)" />
                                <path d="M 270 170 Q 310 190 315 220 Q 290 180 250 175" fill="#fff" fillOpacity={0.9} />
                                <path d="M 100 160 L 100 135 L 300 135 L 300 160 Q 200 100 100 160 Z" fill="#5D2D8F" />
                                <path d="M 105 155 Q 200 105 295 155" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
                                <path d="M 200 40 L 360 110 L 200 150 L 40 110 Z" fill="#5D2D8F" stroke="#4A2375" strokeWidth={1} />
                                <path d="M 300 135 L 300 110 L 200 150 L 200 165 Z" fill="#421C6B" />
                                <path d="M 100 135 L 100 110 L 200 150 L 200 165 Z" fill="#5D2D8F" />
                                <path d="M 180 142 Q 250 140 280 120" stroke="#fff" strokeWidth={3} fill="none" opacity={0.6} />
                                <path d="M 200 40 L 360 110" stroke="#7A4BAB" strokeWidth={2} />
                                <g id="tassel-hero">
                                    <path d="M 65 118 L 65 180" stroke="#5D2D8F" strokeWidth={4} />
                                    <circle cx={65} cy={118} r={5} fill="#5D2D8F" />
                                    <path d="M 55 180 L 75 180 L 70 215 L 60 215 Z" fill="#5D2D8F" />
                                </g>
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* LAYER 2 — Video mask (hidden until clip-path grows) */}
                <motion.div className="absolute inset-0 z-[2]" style={{ clipPath, willChange: "clip-path" }}>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${POSTER_SRC})` }} />
                    <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
                        <video autoPlay loop muted playsInline poster={POSTER_SRC} preload="metadata" className="h-full w-full object-cover">
                            <source src={VIDEO_SRC} type="video/mp4" />
                        </video>
                    </motion.div>
                    <motion.div className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-purple/50 to-brand-deep/70" style={{ opacity: overlayOpacity }} />
                </motion.div>

                {/* LAYER 3 — Copy (with subtle backdrop for readability over particles) */}
                <motion.div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ visibility: textVisibility }}>
                    <motion.div className="relative flex flex-col items-center text-center px-6" style={{ scale: textScale, opacity: textOpacity }}>
                        {/* Subtle radial backdrop — just enough to lift text off noisy particle background */}
                        <div className="absolute inset-0 -mx-16 -my-10 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(10,1,24,0.55) 0%, rgba(10,1,24,0.3) 40%, transparent 70%)' }} />
                        <div className="relative flex flex-col items-center text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                                <span className="text-sm font-medium text-white/80">Your gateway to global education</span>
                            </div>
                            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white font-[family-name:var(--font-heading)] sm:text-5xl md:text-6xl lg:text-[5.5rem]" style={{ textShadow: '0 2px 20px rgba(10,1,24,0.6)' }}>
                                Education Choice<br />
                                <span className="text-brand-orange">Transparent,</span> Globally.
                            </h1>
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg font-light" style={{ textShadow: '0 1px 10px rgba(10,1,24,0.5)' }}>
                                Connect with 200+ universities across 15 countries.<br className="hidden sm:block" />
                                Your journey starts with a single scroll.
                            </p>

                        </div>
                    </motion.div>
                </motion.div>

                {/* LAYER 4 — Search bar */}
                <motion.div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-6 pb-16" style={{ y: searchY, opacity: searchOpacity }}>
                    <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-white/15 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-full sm:p-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10 sm:rounded-l-full">
                                <MapPin size={18} className="shrink-0 text-brand-orange" />
                                <input type="text" placeholder="Where do you want to study?" className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none" />
                            </div>
                            <div className="hidden h-8 w-px bg-white/15 sm:block" />
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10">
                                <BookOpen size={18} className="shrink-0 text-brand-orange" />
                                <input type="text" placeholder="What do you want to study?" className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none" />
                            </div>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-colors hover:bg-brand-orange-dark sm:rounded-full">
                                <Search size={16} /><span>Search</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
