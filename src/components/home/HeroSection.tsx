"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, BookOpen, ChevronDown } from "lucide-react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const blobX1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-white"
        >
            {/* Animated Background Blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Blob 1 — Orange (top-right) */}
                <motion.div
                    style={{ y: blobY1, x: blobX1 }}
                    className="absolute -right-32 -top-32 h-[500px] w-[500px] animate-blob rounded-full bg-brand-orange/15 blur-3xl lg:h-[700px] lg:w-[700px]"
                />
                {/* Blob 2 — Purple (bottom-left) */}
                <motion.div
                    style={{ y: blobY2 }}
                    className="absolute -bottom-40 -left-40 h-[400px] w-[400px] animate-blob-delayed rounded-full bg-brand-purple/12 blur-3xl lg:h-[600px] lg:w-[600px]"
                />
                {/* Blob 3 — Small accent (center-right) */}
                <motion.div
                    style={{ y: blobY1 }}
                    className="absolute right-1/4 top-1/3 h-[200px] w-[200px] animate-float rounded-full bg-brand-orange/8 blur-2xl"
                />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #662D91 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ y: contentY, opacity }}
                className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16 text-center lg:pt-32"
            >
                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-purple/10 bg-brand-purple/5 px-5 py-2"
                >
                    <span className="h-2 w-2 animate-pulse-soft rounded-full bg-brand-orange" />
                    <span className="text-sm font-medium text-brand-purple">
                        Trusted by 5,000+ students worldwide
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                    className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-neutral-900 font-[family-name:var(--font-heading)] sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    Education Choice{" "}
                    <span className="text-gradient-brand">Transparent,</span>
                    <br />
                    <span className="text-brand-purple">Globally</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 sm:text-xl"
                >
                    Discover universities, compare courses, and get expert guidance for
                    your international education journey — all in one place.
                </motion.p>

                {/* Floating Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
                    className="mx-auto mt-12 w-full max-w-3xl"
                >
                    <div className="rounded-2xl bg-white p-3 shadow-2xl shadow-brand-purple/8 ring-1 ring-black/5 sm:rounded-full sm:p-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
                            {/* Destination Input */}
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-5 py-3 transition-colors hover:bg-neutral-50 sm:rounded-l-full">
                                <MapPin
                                    size={20}
                                    className="shrink-0 text-brand-orange transition-transform group-hover:scale-110"
                                />
                                <div className="text-left">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                        Destination
                                    </p>
                                    <p className="text-sm font-medium text-neutral-700">
                                        Where do you want to study?
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden h-8 w-px bg-neutral-200 sm:block" />

                            {/* Program Input */}
                            <div className="group flex flex-1 items-center gap-3 rounded-xl px-5 py-3 transition-colors hover:bg-neutral-50">
                                <BookOpen
                                    size={20}
                                    className="shrink-0 text-brand-purple transition-transform group-hover:scale-110"
                                />
                                <div className="text-left">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                        Program
                                    </p>
                                    <p className="text-sm font-medium text-neutral-700">
                                        What do you want to study?
                                    </p>
                                </div>
                            </div>

                            {/* Search Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:shadow-xl sm:rounded-full"
                            >
                                <Search size={18} />
                                <span>Search</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats / Trust Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-8 sm:gap-12"
                >
                    {[
                        { value: "200+", label: "Universities" },
                        { value: "15+", label: "Countries" },
                        { value: "5K+", label: "Students Placed" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-2xl font-bold text-brand-purple font-[family-name:var(--font-heading)] sm:text-3xl">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                        Explore
                    </span>
                    <ChevronDown size={20} className="text-brand-orange" />
                </motion.div>
            </motion.div>
        </section>
    );
}
