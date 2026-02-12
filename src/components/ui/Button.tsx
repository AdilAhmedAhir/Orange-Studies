"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: Variant;
    className?: string;
    onClick?: () => void;
}

const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

const styles: Record<Variant, string> = {
    primary:
        "bg-brand-orange text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/30",
    secondary:
        "bg-white text-brand-purple border border-neutral-200 shadow-sm hover:border-brand-purple/30 hover:shadow-md",
    ghost:
        "text-brand-purple hover:bg-brand-purple/5",
};

export function Button({
    children,
    href,
    variant = "primary",
    className = "",
    onClick,
}: ButtonProps) {
    const cls = `${base} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href={href} className={cls}>
                    {children}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={cls}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}
