"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeadingProps {
    /** Small label above the heading (e.g. "WHY CHOOSE US") */
    label?: string;
    /** Main heading text */
    title: string;
    /** Optional subtitle paragraph */
    subtitle?: string;
    /** Text alignment (default: "center") */
    align?: "left" | "center";
    /** Use light (white) text variant for dark backgrounds */
    light?: boolean;
}

export function SectionHeading({
    label,
    title,
    subtitle,
    align = "center",
    light = false,
}: SectionHeadingProps) {
    const { ref, isInView, variants } = useScrollReveal({ preset: "fade-up" });
    const alignment = align === "center" ? "text-center mx-auto" : "text-left";

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`max-w-3xl ${alignment}`}
        >
            {label && (
                <span
                    className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-brand-orange-light" : "text-brand-orange"
                        }`}
                >
                    {label}
                </span>
            )}
            <h2
                className={`text-3xl font-bold font-[family-name:var(--font-heading)] sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-brand-purple"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-neutral-500"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
