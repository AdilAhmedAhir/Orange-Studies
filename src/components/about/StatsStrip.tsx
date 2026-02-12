"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
    { num: 200, suffix: "+", label: "Partner Universities" },
    { num: 15, suffix: "+", label: "Countries" },
    { num: 5000, suffix: "+", label: "Students Placed" },
    { num: 98, suffix: "%", label: "Visa Success Rate" },
    { num: 12, suffix: "+", label: "Years Experience" },
];

export function StatsStrip() {
    const { ref, isInView, variants } = useScrollReveal({ preset: "fade-up" });

    return (
        <section className="relative z-10 overflow-hidden bg-gradient-to-r from-brand-purple via-brand-deep to-brand-purple py-16">
            {/* Subtle pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />

            <motion.div
                ref={ref}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6 }}
                className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 lg:justify-between lg:gap-4"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center text-center"
                    >
                        <AnimatedCounter
                            target={stat.num}
                            suffix={stat.suffix}
                            duration={2}
                            className="text-3xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-4xl"
                        />
                        <span className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
