"use client";

import { motion } from "framer-motion";
import {
    Globe,
    DollarSign,
    ClipboardList,
    FileText,
    HelpCircle,
    BookOpen,
} from "lucide-react";
import Link from "next/link";

const resources = [
    {
        title: "Country Guides",
        description:
            "Detailed guides for the UK, USA, Canada, Australia, Germany, and Malaysia — covering culture, costs, and top universities.",
        href: "/study-abroad/country-guides",
        icon: Globe,
        color: "from-brand-orange to-amber-400",
        accent: "border-brand-orange/20 hover:border-brand-orange/40",
    },
    {
        title: "Cost & Scholarships",
        description:
            "Compare tuition fees across countries and discover 500+ scholarships — merit-based, need-based, and government-funded.",
        href: "/study-abroad/cost-scholarships",
        icon: DollarSign,
        color: "from-emerald-500 to-teal-500",
        accent: "border-emerald-200 hover:border-emerald-400",
    },
    {
        title: "Application Checklist",
        description:
            "Step-by-step checklist for every stage — from document prep to university submission. Never miss a deadline.",
        href: "/study-abroad/application-checklist",
        icon: ClipboardList,
        color: "from-blue-500 to-indigo-500",
        accent: "border-blue-200 hover:border-blue-400",
    },
    {
        title: "SOP & Visa Guides",
        description:
            "Expert templates for Statements of Purpose and country-specific visa application walkthroughs.",
        href: "/study-abroad/sop-visa-guides",
        icon: FileText,
        color: "from-brand-purple to-brand-purple-light",
        accent: "border-brand-purple/20 hover:border-brand-purple/40",
    },
    {
        title: "FAQs",
        description:
            "Answers to the most common questions about studying abroad — IELTS, fees, timelines, and visa success rates.",
        href: "/study-abroad/faqs",
        icon: HelpCircle,
        color: "from-rose-500 to-pink-500",
        accent: "border-rose-200 hover:border-rose-400",
    },
    {
        title: "Self-Evaluation",
        description:
            "Check your eligibility for your dream university in minutes. Get personalized recommendations based on your profile.",
        href: "/study-abroad#self-evaluation",
        icon: BookOpen,
        color: "from-amber-500 to-orange-500",
        accent: "border-amber-200 hover:border-amber-400",
    },
];

export function StudyAbroadResources() {
    return (
        <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-32 overflow-hidden">
            {/* Decorative */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />

            {/* heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-14 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                    Student Resources
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Everything You Need to Get Started
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Guides, checklists, and tools to make your study abroad journey smooth and stress-free.
                </p>
            </motion.div>

            {/* cards grid */}
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((res, i) => (
                    <motion.div
                        key={res.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                        <Link
                            href={res.href}
                            className={`group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-1 ${res.accent}`}
                        >
                            {/* Icon */}
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${res.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                            >
                                <res.icon className="h-5 w-5 text-white" />
                            </div>

                            <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                {res.title}
                            </h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
                                {res.description}
                            </p>

                            <span className="mt-4 text-sm font-semibold text-brand-purple opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                                Learn more →
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
