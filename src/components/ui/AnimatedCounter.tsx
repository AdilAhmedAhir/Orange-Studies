"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    /** Target number to count up to */
    target: number;
    /** Optional suffix like "+", "%", "K+" */
    suffix?: string;
    /** Optional prefix like "$" */
    prefix?: string;
    /** Duration in seconds (default: 2) */
    duration?: number;
    /** CSS class for the number */
    className?: string;
}

export function AnimatedCounter({
    target,
    suffix = "",
    prefix = "",
    duration = 2,
    className = "",
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const [hasStarted, setHasStarted] = useState(false);

    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const display = useTransform(springValue, (v) => Math.round(v));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView && !hasStarted) {
            setHasStarted(true);
            springValue.set(target);
        }
    }, [isInView, hasStarted, springValue, target]);

    useEffect(() => {
        const unsubscribe = display.on("change", (v) => setDisplayValue(v));
        return unsubscribe;
    }, [display]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {prefix}{displayValue}{suffix}
        </motion.span>
    );
}
