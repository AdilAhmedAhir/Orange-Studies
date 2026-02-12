"use client";

import { useRef } from "react";
import { useInView, type Variant } from "framer-motion";

/* ─── Preset animation variants ──────────────────────────── */
const presets = {
    "fade-up": {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    "slide-up": {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
    },
} as const satisfies Record<string, { hidden: Variant; visible: Variant }>;

export type RevealPreset = keyof typeof presets;

interface UseScrollRevealOptions {
    /** Animation preset (default: "fade-up") */
    preset?: RevealPreset;
    /** Trigger once, then stay visible (default: true) */
    once?: boolean;
    /** IntersectionObserver margin (default: "-80px") */
    margin?: string;
    /** IntersectionObserver threshold (default: 0.15) */
    amount?: number;
}

/**
 * Returns { ref, variants, isInView } — wire these into a <motion.div>:
 *
 * ```tsx
 * const { ref, variants, isInView } = useScrollReveal();
 * <motion.div
 *   ref={ref}
 *   variants={variants}
 *   initial="hidden"
 *   animate={isInView ? "visible" : "hidden"}
 * />
 * ```
 */
export function useScrollReveal({
    preset = "fade-up",
    once = true,
    margin = "-80px",
    amount = 0.15,
}: UseScrollRevealOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: margin as `${number}px`, amount });

    return {
        ref,
        isInView,
        variants: presets[preset],
    };
}

/* ─── Stagger container helper ───────────────────────────── */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};
