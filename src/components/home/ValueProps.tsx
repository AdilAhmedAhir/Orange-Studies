"use client";

import { motion } from "framer-motion";
import { GraduationCap, Globe, ShieldCheck, Headphones } from "lucide-react";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type ReactNode } from "react";

interface StatCard {
    icon: ReactNode;
    num: number;
    suffix: string;
    title: string;
    desc: string;
    gradient: string;
}

const stats: StatCard[] = [
    {
        icon: <Globe className="h-7 w-7" />,
        num: 200,
        suffix: "+",
        title: "Partner Universities",
        desc: "Across 15+ countries worldwide, opening doors to global education.",
        gradient: "from-blue-500/10 to-brand-purple/10",
    },
    {
        icon: <GraduationCap className="h-7 w-7" />,
        num: 5,
        suffix: "K+",
        title: "Students Placed",
        desc: "Successfully enrolled and thriving at top institutions globally.",
        gradient: "from-brand-orange/10 to-amber-500/10",
    },
    {
        icon: <ShieldCheck className="h-7 w-7" />,
        num: 98,
        suffix: "%",
        title: "Visa Success Rate",
        desc: "Expert guidance through every step of the visa process.",
        gradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
        icon: <Headphones className="h-7 w-7" />,
        num: 24,
        suffix: "/7",
        title: "Support Available",
        desc: "Dedicated counselors ready to help whenever you need us.",
        gradient: "from-pink-500/10 to-rose-500/10",
    },
];

function StatCardItem({ card, index }: { card: StatCard; index: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-8 transition-all duration-500 hover:border-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/5"
        >
            {/* Background gradient glow on hover */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative z-10">
                {/* Icon */}
                <div className="mb-5 inline-flex rounded-xl bg-brand-purple/8 p-3 text-brand-purple transition-colors duration-300 group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                    {card.icon}
                </div>

                {/* Animated number */}
                <div className="mb-2">
                    <AnimatedCounter
                        target={card.num}
                        suffix={card.suffix}
                        duration={2}
                        className="text-4xl font-bold text-brand-purple font-[family-name:var(--font-heading)] group-hover:text-brand-orange transition-colors duration-300"
                    />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-neutral-800">
                    {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-neutral-500">
                    {card.desc}
                </p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-brand-orange/5 transition-transform duration-500 group-hover:scale-150" />
        </motion.div>
    );
}

export function ValueProps() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-neutral-50/50 px-6 py-24 lg:py-32">
            <SectionHeading
                label="Why Choose Us"
                title="Your Global Education Partner"
                subtitle="We connect students, recruiters, and institutions worldwide — making international education accessible, transparent, and effortless."
            />

            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((card, i) => (
                    <StatCardItem key={card.title} card={card} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
