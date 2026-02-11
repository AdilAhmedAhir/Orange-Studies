"use client";

import { motion } from "framer-motion";

const fadeSlideUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3 + i * 0.15,
            type: "spring" as const,
            stiffness: 80,
            damping: 18,
        },
    }),
};

export function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Trust Badge */}
            <motion.div
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-sm"
            >
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-brand-orange" />
                <span className="text-sm font-medium text-white/90">
                    Trusted by 5,000+ students worldwide
                </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white font-[family-name:var(--font-heading)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
                Education Choice{" "}
                <span className="text-brand-orange">Transparent,</span>
                <br />
                Globally.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl font-light"
            >
                Connect with the best universities and recruiters worldwide.
            </motion.p>
        </div>
    );
}
