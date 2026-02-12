"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, GraduationCap, Globe } from "lucide-react";

export function StudyAbroadHero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-brand-purple"
        >
            {/* Animated gradient background */}
            <motion.div className="absolute inset-0" style={{ y: bgY }}>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-purple to-brand-purple" />
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-orange/8 blur-3xl" />
                <div className="absolute right-1/4 top-1/3 h-3 w-3 rounded-full bg-brand-orange/50 animate-pulse" />
                <div className="absolute left-1/3 bottom-1/4 h-2 w-2 rounded-full bg-white/30 animate-pulse" />
                <div className="absolute right-1/2 top-1/4 h-2 w-2 rounded-full bg-brand-orange/40 animate-bounce-slow" />
                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 mx-auto max-w-4xl px-6 text-center"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange-light"
                >
                    Your Global Education Journey
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl lg:text-6xl"
                >
                    Study in the World&apos;s
                    <br />
                    <span className="text-brand-orange">Top Universities</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
                >
                    Explore courses, compare countries, check your eligibility, and get expert
                    guidance — all in one place. We make your dream of studying abroad a reality.
                </motion.p>

                {/* Quick action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                >
                    <a
                        href="/study-abroad/country-guides"
                        className="group flex items-center gap-2.5 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/30 hover:-translate-y-0.5"
                    >
                        <Globe className="h-4 w-4" />
                        Explore Countries
                    </a>
                    <a
                        href="/study-abroad/cost-scholarships"
                        className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                    >
                        <GraduationCap className="h-4 w-4" />
                        Scholarships & Costs
                    </a>
                </motion.div>
            </motion.div>

            {/* Bottom curve */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                    <path
                        d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
