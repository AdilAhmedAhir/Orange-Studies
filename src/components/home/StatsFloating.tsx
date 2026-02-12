"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Globe, GraduationCap, ShieldCheck, Headphones } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { type ReactNode } from "react";

/* ── Data ──────────────────────────────────────────────────── */
interface Stat {
    icon: ReactNode;
    num: number;
    suffix: string;
    title: string;
    desc: string;
    accent: string;      // icon + counter color on hover
    glow: string;         // radial glow bg
    orbitDelay: number;   // float offset
}

const stats: Stat[] = [
    {
        icon: <Globe className="h-7 w-7" />,
        num: 200,
        suffix: "+",
        title: "Partner Universities",
        desc: "Across 15+ countries worldwide",
        accent: "group-hover:text-blue-400",
        glow: "from-blue-500/20 via-blue-400/5 to-transparent",
        orbitDelay: 0,
    },
    {
        icon: <GraduationCap className="h-7 w-7" />,
        num: 5,
        suffix: "K+",
        title: "Students Placed",
        desc: "Thriving at top institutions",
        accent: "group-hover:text-brand-orange",
        glow: "from-brand-orange/20 via-brand-orange/5 to-transparent",
        orbitDelay: 1.5,
    },
    {
        icon: <ShieldCheck className="h-7 w-7" />,
        num: 98,
        suffix: "%",
        title: "Visa Success Rate",
        desc: "Expert guidance every step",
        accent: "group-hover:text-emerald-400",
        glow: "from-emerald-500/20 via-emerald-400/5 to-transparent",
        orbitDelay: 3,
    },
    {
        icon: <Headphones className="h-7 w-7" />,
        num: 24,
        suffix: "/7",
        title: "Support Available",
        desc: "Dedicated counselors always ready",
        accent: "group-hover:text-purple-400",
        glow: "from-purple-500/20 via-purple-400/5 to-transparent",
        orbitDelay: 4.5,
    },
];

/* ── Mouse Parallax Card ───────────────────────────────────── */
function TiltCard({ stat, index }: { stat: Stat; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 … 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -12, y: x * 12 }); // degrees
    }, []);

    const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

    return (
        <motion.div
            ref={cardRef}
            variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative perspective-[800px]"
        >
            <motion.div
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.08]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Radial glow on hover */}
                <div
                    className={`pointer-events-none absolute inset-0 bg-radial-[at_50%_50%] ${stat.glow} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                />

                {/* Floating orbit animation wrapper */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: stat.orbitDelay,
                        ease: "easeInOut",
                    }}
                    className="relative z-10"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Icon */}
                    <div className={`mb-5 inline-flex rounded-xl bg-white/10 p-3 text-white/70 transition-colors duration-300 ${stat.accent}`}>
                        {stat.icon}
                    </div>

                    {/* Animated counter */}
                    <div className="mb-2">
                        <AnimatedCounter
                            target={stat.num}
                            suffix={stat.suffix}
                            duration={2.5}
                            className={`text-4xl font-bold text-white font-[family-name:var(--font-heading)] transition-colors duration-300 ${stat.accent}`}
                        />
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 text-lg font-semibold text-white/90">
                        {stat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/50">{stat.desc}</p>
                </motion.div>

                {/* Corner glow accent */}
                <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/5 blur-xl transition-transform duration-700 group-hover:scale-[2]" />
            </motion.div>
        </motion.div>
    );
}

/* ── Section ───────────────────────────────────────────────── */
export function StatsFloating() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { ref, isInView } = useScrollReveal();

    /* scroll-driven background gradient transition */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <section ref={sectionRef} className="relative z-10 overflow-hidden">
            {/* Dark-to-light bridge gradient */}
            <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#0d0d35] to-neutral-900"
                style={{ opacity: bgOpacity }}
            />
            {/* Base dark bg */}
            <div className="absolute inset-0 bg-neutral-900" style={{ zIndex: -1 }} />

            {/* Ambient particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-white/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 px-6 py-24 lg:py-32">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange">
                        Why Choose Us
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                        Your Global Education Partner
                    </h2>
                    <p className="mt-4 text-lg text-white/50">
                        Numbers that speak for our commitment to your success.
                    </p>
                </motion.div>

                {/* Stat cards grid */}
                <motion.div
                    ref={ref}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((stat, i) => (
                        <TiltCard key={stat.title} stat={stat} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
