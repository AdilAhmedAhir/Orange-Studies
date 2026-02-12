"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Search, FileText, Plane, GraduationCap } from "lucide-react";
import { type ReactNode } from "react";

/* ── Step Data ─────────────────────────────────────────────── */
interface Step {
    icon: ReactNode;
    number: string;
    title: string;
    desc: string;
    color: string;
    bg: string;
    glowColor: string;
}

const steps: Step[] = [
    {
        icon: <Search className="h-6 w-6" />,
        number: "01",
        title: "Explore",
        desc: "Browse 200+ universities across 15 countries. Filter by course, budget, and location to find your perfect match.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        glowColor: "shadow-blue-500/30",
    },
    {
        icon: <FileText className="h-6 w-6" />,
        number: "02",
        title: "Apply",
        desc: "Our counselors guide you through every application — from SOP to documents. We make the complex simple.",
        color: "text-brand-purple-light",
        bg: "bg-brand-purple/10",
        glowColor: "shadow-brand-purple/30",
    },
    {
        icon: <Plane className="h-6 w-6" />,
        number: "03",
        title: "Get Your Visa",
        desc: "98% visa success rate. We prepare your case, coach you for interviews, and handle the paperwork.",
        color: "text-brand-orange-light",
        bg: "bg-brand-orange/10",
        glowColor: "shadow-brand-orange/30",
    },
    {
        icon: <GraduationCap className="h-6 w-6" />,
        number: "04",
        title: "Start Your Journey",
        desc: "Pre-departure briefings, airport pickup, accommodation — we've got you covered from takeoff to first lecture.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        glowColor: "shadow-emerald-500/30",
    },
];

/* ── Animated Step Node ────────────────────────────────────── */
function StepNode({
    step,
    index,
    active,
}: {
    step: Step;
    index: number;
    active: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
        >
            <div
                className={`relative overflow-hidden rounded-2xl border p-6 pt-4 transition-all duration-700 ${active
                    ? `border-white/20 bg-white/[0.08] shadow-2xl ${step.glowColor}`
                    : "border-white/5 bg-white/[0.03]"
                    }`}
            >
                {/* Animated glow backdrop */}
                <motion.div
                    className={`pointer-events-none absolute inset-0 bg-radial-[at_50%_0%] ${step.color === "text-blue-400"
                        ? "from-blue-500/10"
                        : step.color === "text-brand-purple-light"
                            ? "from-purple-500/10"
                            : step.color === "text-brand-orange-light"
                                ? "from-brand-orange/10"
                                : "from-emerald-500/10"
                        } to-transparent`}
                    animate={{ opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Step number badge — inline, not absolutely positioned */}
                <motion.span
                    className={`mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-500 ${active
                        ? "bg-brand-orange shadow-brand-orange/30"
                        : "bg-white/10"
                        }`}
                    animate={{ scale: active ? 1.05 : 1 }}
                >
                    Step {step.number}
                </motion.span>

                {/* Icon with pulse */}
                <motion.div
                    className={`mb-5 inline-flex rounded-xl ${step.bg} p-4 ${step.color} transition-all duration-500`}
                    animate={
                        active
                            ? { scale: [1, 1.08, 1], rotate: [0, 3, 0] }
                            : { scale: 1, rotate: 0 }
                    }
                    transition={{
                        duration: 2,
                        repeat: active ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                >
                    {step.icon}
                </motion.div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-white/50">
                    {step.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 ${step.color === "text-blue-400"
                        ? "bg-blue-400"
                        : step.color === "text-brand-purple-light"
                            ? "bg-brand-purple-light"
                            : step.color === "text-brand-orange-light"
                                ? "bg-brand-orange"
                                : "bg-emerald-400"
                        }`}
                    animate={{ width: active ? "100%" : "0%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
}

/* ── Main Section ──────────────────────────────────────────── */
export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    /* Update active step based on scroll */
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        // Map 0.2-0.7 scroll range → 0-3 steps
        const step = Math.min(3, Math.floor(((v - 0.15) / 0.55) * 4));
        setActiveStep(Math.max(0, step));
    });

    /* SVG path draw progress */
    const pathLength = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative z-10 overflow-hidden bg-neutral-900 px-6 py-24 lg:py-32"
        >
            {/* Dot pattern background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-20 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-purple-light/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple-light">
                    How It Works
                </span>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Four Steps to Your Dream University
                </h2>
                <p className="mt-4 text-lg text-white/50">
                    From exploration to enrollment — we simplify every stage.
                </p>
            </motion.div>

            {/* Desktop: Horizontal layout with SVG path */}
            <div className="relative mx-auto max-w-6xl">
                {/* SVG connecting line (desktop only) */}
                <div className="pointer-events-none absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden lg:block" style={{ zIndex: 0 }}>
                    <svg
                        viewBox="0 0 1200 4"
                        className="w-full"
                        preserveAspectRatio="none"
                    >
                        {/* Background track */}
                        <line
                            x1="40"
                            y1="2"
                            x2="1160"
                            y2="2"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="2"
                        />
                        {/* Animated progress line */}
                        <motion.line
                            x1="40"
                            y1="2"
                            x2="1160"
                            y2="2"
                            stroke="url(#progressGradient)"
                            strokeWidth="3"
                            style={{
                                pathLength,
                            }}
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient
                                id="progressGradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="33%" stopColor="#8B5DB5" />
                                <stop offset="66%" stopColor="#FF9400" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Step cards grid */}
                <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <StepNode
                            key={step.number}
                            step={step}
                            index={i}
                            active={activeStep >= i}
                        />
                    ))}
                </div>

                {/* Animated traveling dots on the line (desktop) */}
                <div className="pointer-events-none absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden lg:block" style={{ zIndex: 1 }}>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute h-2 w-2 rounded-full bg-brand-orange shadow-lg shadow-brand-orange/50"
                            style={{ top: "-3px" }}
                            animate={{
                                left: ["3%", "97%"],
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 1.3,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
