"use client";

import { motion } from "framer-motion";

/* ─── University logos (placeholder SVG-style labels) ────── */
const universities = [
    "University of Oxford",
    "MIT",
    "University of Toronto",
    "University of Melbourne",
    "Imperial College London",
    "ETH Zurich",
    "NUS Singapore",
    "University of Sydney",
    "McGill University",
    "UCL London",
    "TU Munich",
    "University of Edinburgh",
];

/* Double the array so the loop is seamless */
const doubled = [...universities, ...universities];

export function SocialProofTicker() {
    return (
        <section className="relative z-10 overflow-hidden bg-white py-10 border-b border-neutral-100">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                Trusted by students placed at
            </p>

            {/* Infinite scroll ribbon */}
            <motion.div
                className="flex w-max gap-12 hover:[animation-play-state:paused]"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
                style={{ willChange: "transform" }}
            >
                {doubled.map((uni, i) => (
                    <div
                        key={`${uni}-${i}`}
                        className="group flex h-14 shrink-0 items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 px-6 transition-all duration-300 hover:border-brand-orange/30 hover:bg-brand-orange/5 hover:shadow-md"
                    >
                        {/* Placeholder logo circle */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-xs font-bold text-brand-purple transition-colors group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                            {uni.charAt(0)}
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-800">
                            {uni}
                        </span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
