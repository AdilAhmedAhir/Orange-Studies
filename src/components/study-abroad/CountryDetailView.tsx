"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    GraduationCap,
    DollarSign,
    MapPin,
    CheckCircle,
    Lightbulb,
    ArrowRight,
} from "lucide-react";

type CountryDetailData = {
    name: string;
    flag: string;
    tagline: string;
    color: string;
    heroDescription: string;
    quickStats: { label: string; value: string; icon: React.ElementType }[];
    topUniversities: { name: string; ranking: string; programs: string }[];
    whyStudy: string[];
    livingCost: { item: string; range: string }[];
    visaSteps: string[];
    careerProspects: string;
    funFacts: string[];
};

export function CountryDetailView({ data }: { data: CountryDetailData }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            {/* ── Hero ──────────────────────────────── */}
            <section
                ref={ref}
                className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-brand-purple"
            >
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${data.color}`}
                    />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="relative z-10 mx-auto max-w-4xl px-6 text-center"
                >
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link
                            href="/study-abroad/country-guides"
                            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            All Countries
                        </Link>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-4 inline-block text-7xl"
                    >
                        {data.flag}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl"
                    >
                        Study in {data.name}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mx-auto mt-4 max-w-2xl text-lg text-white/70"
                    >
                        {data.heroDescription}
                    </motion.p>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                        <path
                            d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>

            {/* ── Quick Stats ──────────────────────── */}
            <section className="relative z-10 bg-white px-6 py-12">
                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {data.quickStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-5 text-center"
                        >
                            <stat.icon className="mx-auto mb-2 h-5 w-5 text-brand-purple" />
                            <p className="text-xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                {stat.value}
                            </p>
                            <p className="text-xs text-neutral-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Why Study Here ───────────────────── */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                            Why {data.name}?
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Reasons to Study in {data.name}
                        </h2>
                    </motion.div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {data.whyStudy.map((reason, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="flex items-start gap-3 rounded-xl border border-neutral-200/60 bg-white p-4 shadow-sm"
                            >
                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                <span className="text-sm text-neutral-700">{reason}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Top Universities ─────────────────── */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <span className="mb-3 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                            Top Universities
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Leading Institutions in {data.name}
                        </h2>
                    </motion.div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.topUniversities.map((uni, i) => (
                            <motion.div
                                key={uni.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="group rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/5 hover:-translate-y-0.5"
                            >
                                <GraduationCap className="mb-3 h-5 w-5 text-brand-purple" />
                                <h3 className="font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                    {uni.name}
                                </h3>
                                <p className="mt-1 text-xs text-brand-orange font-semibold">
                                    {uni.ranking}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {uni.programs}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Living Costs ─────────────────────── */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <span className="mb-3 inline-block rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-700">
                            Cost of Living
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Monthly Expenses in {data.name}
                        </h2>
                    </motion.div>
                    <div className="space-y-3">
                        {data.livingCost.map((cost, i) => (
                            <motion.div
                                key={cost.item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                                className="flex items-center justify-between rounded-xl border border-neutral-200/60 bg-white px-5 py-4 shadow-sm"
                            >
                                <span className="text-sm font-semibold text-neutral-700">
                                    {cost.item}
                                </span>
                                <span className="text-sm font-bold text-brand-purple">
                                    {cost.range}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Visa Steps ──────────────────────── */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <span className="mb-3 inline-block rounded-full border border-blue-300 bg-blue-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-700">
                            Visa Process
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            How to Get Your Student Visa
                        </h2>
                    </motion.div>
                    <div className="space-y-4">
                        {data.visaSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-purple text-xs font-bold text-white">
                                    {i + 1}
                                </div>
                                <p className="pt-1 text-sm text-neutral-700">
                                    {step}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Career + Fun Facts ──────────────── */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-20 lg:py-24">
                <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
                    {/* Career */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm"
                    >
                        <MapPin className="mb-3 h-5 w-5 text-brand-orange" />
                        <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Career Prospects
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                            {data.careerProspects}
                        </p>
                    </motion.div>

                    {/* Fun Facts */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm"
                    >
                        <Lightbulb className="mb-3 h-5 w-5 text-amber-500" />
                        <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Fun Facts
                        </h3>
                        <ul className="mt-3 space-y-2">
                            {data.funFacts.map((fact, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-neutral-600"
                                >
                                    <span className="mt-1 text-brand-orange">•</span>
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mx-auto mt-12 max-w-md text-center"
                >
                    <Link
                        href="/study-abroad#self-evaluation"
                        className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:-translate-y-0.5"
                    >
                        Check Your Eligibility for {data.name}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </section>
        </>
    );
}
