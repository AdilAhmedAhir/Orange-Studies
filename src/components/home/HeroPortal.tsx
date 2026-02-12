"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, BookOpen } from "lucide-react";

const VIDEO_SRC =
    "https://assets.mixkit.co/videos/preview/mixkit-university-students-walking-in-slow-motion-42409-large.mp4";
const POSTER_SRC =
    "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80&auto=format";

export function HeroPortal() {
    const containerRef = useRef<HTMLDivElement>(null);

    /* ── Scroll tracking across the 400vh container ─────────── */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /* ── Clip-path: circle aperture ──────────────────────────── *
     * Expands slowly from 6% → 160%.
     * Uses a wider input range [0.05, 0.85] so 80% of the scroll
     * distance is used — giving a slow, cinematic Apple-style feel.
     * ─────────────────────────────────────────────────────────── */
    const clipRadius = useTransform(
        scrollYProgress,
        [0, 0.05, 0.4, 0.85],     // input keyframes
        [6, 6, 40, 160],        // output %  — stays small, ramps mid, finishes big
    );
    const clipPath = useTransform(
        clipRadius,
        (r: number) => `circle(${r}% at 50% 50%)`
    );

    /* ── Copy animations ─────────────────────────────────────── */
    const textScale = useTransform(scrollYProgress, [0, 0.30], [1, 1.06]);
    const textOpacity = useTransform(scrollYProgress, [0.10, 0.40], [1, 0]);

    /* ── Search bar reveal ──────────────────────────────────── */
    const searchY = useTransform(scrollYProgress, [0.78, 0.92], [60, 0]);
    const searchOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);

    /* ── Video overlay fades ────────────────────────────────── */
    const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.80], [0.6, 0.15]);

    /* ── Subtle video parallax ──────────────────────────────── */
    const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

    /* ── Portal ring glow (fades out as circle grows) ────────── */
    const ringOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

    return (
        <section ref={containerRef} style={{ height: "400vh" }} className="relative">
            {/* ── Sticky viewport ──────────────────────────────── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* LAYER 1 — Brand Purple Background */}
                <div className="absolute inset-0 bg-brand-purple">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,148,0,0.08)_0%,_transparent_70%)]" />
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>

                {/* LAYER 1b — Faint portal ring glow (visible at start) */}
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{ opacity: ringOpacity }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, transparent 5.5%, rgba(255,148,0,0.25) 6%, rgba(255,148,0,0.08) 7.5%, transparent 10%)`,
                        }}
                    />
                </motion.div>

                {/* LAYER 2 — Video masked by expanding circle */}
                <motion.div
                    className="absolute inset-0 z-[2]"
                    style={{ clipPath, willChange: "clip-path" }}
                >
                    {/* Poster image (always visible — guarantees contrast even if video hasn't loaded) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${POSTER_SRC})` }}
                    />

                    {/* Video (overlays poster once loaded) */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ scale: videoScale }}
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={POSTER_SRC}
                            preload="auto"
                            className="h-full w-full object-cover"
                        >
                            <source src={VIDEO_SRC} type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* Gradient overlay for readability */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-brand-deep/80 via-brand-purple/50 to-brand-deep/70"
                        style={{ opacity: overlayOpacity }}
                    />
                </motion.div>

                {/* LAYER 3 — Floating Copy (fades + scales on scroll) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <motion.div
                        className="flex flex-col items-center text-center px-6"
                        style={{ scale: textScale, opacity: textOpacity }}
                    >
                        {/* Pill badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse-soft" />
                            <span className="text-sm font-medium text-white/80">
                                Your gateway to global education
                            </span>
                        </div>

                        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white font-[family-name:var(--font-heading)] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
                            Education Choice
                            <br />
                            <span className="text-brand-orange">Transparent,</span>{" "}
                            Globally.
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg font-light">
                            Connect with 200+ universities across 15 countries.
                            <br className="hidden sm:block" />
                            Your journey starts with a single scroll.
                        </p>

                        {/* Scroll cue */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="mt-10 flex flex-col items-center gap-1"
                        >
                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                Scroll to explore
                            </span>
                            <div className="h-10 w-[1px] bg-gradient-to-b from-brand-orange/60 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* LAYER 4 — Search bar (slides up once portal is open) */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-6 pb-12"
                    style={{ y: searchY, opacity: searchOpacity }}
                >
                    <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-white/15 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-full sm:p-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
                            {/* Destination */}
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10 sm:rounded-l-full">
                                <MapPin size={18} className="shrink-0 text-brand-orange" />
                                <input
                                    type="text"
                                    placeholder="Where do you want to study?"
                                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                                />
                            </div>

                            <div className="hidden h-8 w-px bg-white/15 sm:block" />

                            {/* Course */}
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10">
                                <BookOpen size={18} className="shrink-0 text-brand-orange" />
                                <input
                                    type="text"
                                    placeholder="What do you want to study?"
                                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                                />
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-colors hover:bg-brand-orange-dark sm:rounded-full"
                            >
                                <Search size={16} />
                                <span>Search</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
