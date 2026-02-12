"use client";

import { motion } from "framer-motion";
import { Search, FileText, Send, CheckCircle } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Explore & Discover",
        description:
            "Browse our database of 200+ universities across 15+ countries. Filter by course, budget, and location to find your perfect match.",
        icon: Search,
        color: "from-brand-orange to-amber-400",
    },
    {
        step: "02",
        title: "Get Expert Guidance",
        description:
            "Book a free consultation with our certified counselors. We'll evaluate your profile, suggest universities, and map out your timeline.",
        icon: FileText,
        color: "from-brand-purple to-brand-purple-light",
    },
    {
        step: "03",
        title: "Apply with Confidence",
        description:
            "We handle your SOP, recommendation letters, and application forms. Our team ensures every document is polished and submitted on time.",
        icon: Send,
        color: "from-blue-500 to-indigo-500",
    },
    {
        step: "04",
        title: "Enroll & Fly",
        description:
            "From visa processing to pre-departure orientation — we stay with you every step until you land at your dream university.",
        icon: CheckCircle,
        color: "from-emerald-500 to-teal-500",
    },
];

export function StudyAbroadProcess() {
    return (
        <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
            {/* heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-16 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                    How It Works
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Your Journey in Four Simple Steps
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    From discovery to enrollment, we simplify every stage of your study abroad experience.
                </p>
            </motion.div>

            {/* steps grid */}
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-1"
                    >
                        {/* Step number watermark */}
                        <span className="absolute top-4 right-4 text-5xl font-black text-neutral-100 font-[family-name:var(--font-heading)] transition-colors duration-300 group-hover:text-brand-orange/10">
                            {step.step}
                        </span>

                        {/* Icon */}
                        <div
                            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                            <step.icon className="h-5 w-5 text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                            {step.description}
                        </p>

                        {/* Connecting line (not on last item) */}
                        {i < steps.length - 1 && (
                            <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-neutral-300 to-transparent lg:block" />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
