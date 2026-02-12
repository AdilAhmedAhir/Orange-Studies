"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Globe, Plane, FileCheck, Shield, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ── Floating illustration elements ────────────────────────── */
const floatingElements = [
    {
        icon: GraduationCap,
        size: 48,
        color: "text-brand-orange",
        bg: "bg-brand-orange/10 border-brand-orange/20",
        x: "15%",
        y: "20%",
        floatOffset: 0,
        floatRange: 15,
        rotateRange: 8,
    },
    {
        icon: Globe,
        size: 40,
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-400/20",
        x: "75%",
        y: "15%",
        floatOffset: 1,
        floatRange: 12,
        rotateRange: -6,
    },
    {
        icon: Plane,
        size: 36,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-400/20",
        x: "80%",
        y: "65%",
        floatOffset: 2,
        floatRange: 18,
        rotateRange: 12,
    },
    {
        icon: FileCheck,
        size: 32,
        color: "text-brand-purple-light",
        bg: "bg-brand-purple/10 border-brand-purple-light/20",
        x: "20%",
        y: "70%",
        floatOffset: 1.5,
        floatRange: 14,
        rotateRange: -10,
    },
    {
        icon: Shield,
        size: 28,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-400/20",
        x: "55%",
        y: "80%",
        floatOffset: 3,
        floatRange: 10,
        rotateRange: 5,
    },
    {
        icon: Users,
        size: 28,
        color: "text-pink-400",
        bg: "bg-pink-500/10 border-pink-400/20",
        x: "45%",
        y: "10%",
        floatOffset: 2.5,
        floatRange: 16,
        rotateRange: -8,
    },
];

/* ── Value items ───────────────────────────────────────────── */
const values = [
    {
        title: "Transparent Process",
        desc: "No hidden fees, no surprises. Every step is clear and documented.",
        icon: Shield,
        color: "text-brand-orange",
    },
    {
        title: "Expert Counselors",
        desc: "Experienced advisors who've guided 5,000+ students through their journey.",
        icon: Users,
        color: "text-brand-purple-light",
    },
    {
        title: "End-to-End Support",
        desc: "From first inquiry to campus arrival — we handle everything.",
        icon: Globe,
        color: "text-blue-400",
    },
];

/* ── Section ───────────────────────────────────────────────── */
export function WhyOrangeStudies() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const illustrationY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            ref={sectionRef}
            className="relative z-10 overflow-hidden bg-white px-6 py-24 lg:py-32"
        >
            {/* Subtle background accent */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/[0.02] via-transparent to-brand-orange/[0.02]" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left — Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="mb-4 inline-block rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                            Why Orange Studies
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                            Education Made{" "}
                            <span className="text-gradient-brand">
                                Simple
                            </span>
                        </h2>

                        <p className="mt-6 text-lg leading-relaxed text-neutral-500">
                            We believe every student deserves access to
                            world-class education. Our platform connects you
                            with the best universities — transparently, quickly,
                            and with confidence.
                        </p>

                        {/* Value items */}
                        <div className="mt-10 space-y-6">
                            {values.map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.15,
                                    }}
                                    className="group flex gap-4"
                                >
                                    <div
                                        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 ${v.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                                    >
                                        <v.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-800">
                                            {v.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-neutral-500">
                                            {v.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mini stats */}
                        <div className="mt-10 flex gap-8">
                            <div>
                                <AnimatedCounter
                                    target={15}
                                    suffix="+"
                                    duration={2}
                                    className="text-3xl font-bold text-brand-purple font-[family-name:var(--font-heading)]"
                                />
                                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                                    Countries
                                </p>
                            </div>
                            <div className="h-10 w-px bg-neutral-200" />
                            <div>
                                <AnimatedCounter
                                    target={200}
                                    suffix="+"
                                    duration={2}
                                    className="text-3xl font-bold text-brand-orange font-[family-name:var(--font-heading)]"
                                />
                                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                                    Universities
                                </p>
                            </div>
                            <div className="h-10 w-px bg-neutral-200" />
                            <div>
                                <AnimatedCounter
                                    target={98}
                                    suffix="%"
                                    duration={2}
                                    className="text-3xl font-bold text-emerald-500 font-[family-name:var(--font-heading)]"
                                />
                                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                                    Visa Success
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Animated illustration */}
                    <motion.div
                        className="relative h-[400px] lg:h-[500px]"
                        style={{ y: illustrationY }}
                    >
                        {/* Central ring */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                                className="h-48 w-48 rounded-full border-2 border-dashed border-brand-orange/20"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 40,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <motion.div
                                className="absolute inset-4 rounded-full border border-brand-purple/15"
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            {/* Center glow */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-purple/20 blur-xl"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Floating icon elements */}
                        {floatingElements.map((el, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{ left: el.x, top: el.y }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3 + i * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            -el.floatRange,
                                            0,
                                        ],
                                        rotate: [
                                            0,
                                            el.rotateRange,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 5 + i * 0.5,
                                        repeat: Infinity,
                                        delay: el.floatOffset,
                                        ease: "easeInOut",
                                    }}
                                    className={`flex items-center justify-center rounded-2xl border p-3 backdrop-blur-sm ${el.bg} ${el.color} shadow-lg transition-transform duration-300 hover:scale-125`}
                                >
                                    <el.icon size={el.size * 0.5} />
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Connecting lines (decorative) */}
                        <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 400 500"
                        >
                            <motion.path
                                d="M100 100 Q200 250 300 100"
                                fill="none"
                                stroke="rgba(255,148,0,0.08)"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 2,
                                    delay: 0.5,
                                }}
                            />
                            <motion.path
                                d="M80 350 Q200 200 320 350"
                                fill="none"
                                stroke="rgba(102,45,145,0.08)"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 2,
                                    delay: 0.8,
                                }}
                            />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
