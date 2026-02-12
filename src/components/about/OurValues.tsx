"use client";

import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
    Heart,
    Shield,
    Sparkles,
    Globe,
    Users,
    Lightbulb,
} from "lucide-react";
import { type ReactNode } from "react";

interface Value {
    icon: ReactNode;
    title: string;
    desc: string;
    accent: string;
}

const values: Value[] = [
    {
        icon: <Heart className="h-6 w-6" />,
        title: "Student First",
        desc: "Every decision we make starts with one question: is this best for the student?",
        accent: "from-rose-500/10 to-pink-500/10",
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Transparency",
        desc: "No hidden fees, no false promises. We give honest advice, even when it's hard.",
        accent: "from-blue-500/10 to-indigo-500/10",
    },
    {
        icon: <Sparkles className="h-6 w-6" />,
        title: "Excellence",
        desc: "We set the bar high — for ourselves, our partners, and the outcomes we deliver.",
        accent: "from-amber-500/10 to-orange-500/10",
    },
    {
        icon: <Globe className="h-6 w-6" />,
        title: "Global Mindset",
        desc: "We celebrate diversity and believe in the transformative power of cross-cultural education.",
        accent: "from-emerald-500/10 to-teal-500/10",
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Community",
        desc: "We build lasting relationships — with students, families, recruiters, and institutions.",
        accent: "from-purple-500/10 to-violet-500/10",
    },
    {
        icon: <Lightbulb className="h-6 w-6" />,
        title: "Innovation",
        desc: "We leverage technology to make the education journey smoother and more accessible.",
        accent: "from-cyan-500/10 to-blue-500/10",
    },
];

function ValueCard({ value, index }: { value: Value; index: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-8 transition-all duration-500 hover:border-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/5"
        >
            {/* Hover gradient */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative z-10">
                <div className="mb-5 inline-flex rounded-xl bg-brand-purple/8 p-3 text-brand-purple transition-colors duration-300 group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                    {value.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                    {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-500">
                    {value.desc}
                </p>
            </div>

            <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-brand-orange/5 transition-transform duration-500 group-hover:scale-[2]" />
        </motion.div>
    );
}

export function OurValues() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-neutral-50/50 px-6 py-24 lg:py-32">
            <SectionHeading
                label="What We Stand For"
                title="Our Core Values"
                subtitle="The principles that guide everything we do."
            />

            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {values.map((value, i) => (
                    <ValueCard key={value.title} value={value} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
