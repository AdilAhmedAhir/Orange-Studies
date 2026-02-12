"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";
import {
    CheckCircle,
    Circle,
    FileText,
    GraduationCap,
    Plane,
    ClipboardList,
    Download,
} from "lucide-react";

/* ── checklist data ──────────────────────────────────── */
const phases = [
    {
        phase: "Phase 1",
        title: "Research & Planning",
        timeline: "12–18 months before intake",
        icon: ClipboardList,
        color: "bg-brand-orange",
        items: [
            "Shortlist 5–8 universities and programs",
            "Check admission requirements (GPA, IELTS/TOEFL, work experience)",
            "Research tuition fees and living costs",
            "Identify scholarship opportunities and deadlines",
            "Take IELTS/TOEFL and achieve required band score",
            "Prepare budget plan including tuition, visa, travel, and living costs",
        ],
    },
    {
        phase: "Phase 2",
        title: "Document Preparation",
        timeline: "8–12 months before intake",
        icon: FileText,
        color: "bg-brand-purple",
        items: [
            "Obtain official transcripts and degree certificates",
            "Write your Statement of Purpose (SOP) — 1 per university",
            "Request 2 Letters of Recommendation (academic or professional)",
            "Update your CV/Resume with academic and extracurricular details",
            "Get your passport renewed (validity: 2+ years)",
            "Prepare financial documents (bank statements, sponsor letters)",
            "Gather portfolio or work samples (if applicable)",
        ],
    },
    {
        phase: "Phase 3",
        title: "Application & Submission",
        timeline: "6–8 months before intake",
        icon: GraduationCap,
        color: "bg-blue-500",
        items: [
            "Create accounts on university application portals",
            "Fill out application forms accurately",
            "Upload all required documents",
            "Pay application fees ($25–$100 per university)",
            "Submit scholarship applications (if separate)",
            "Track application status and respond to queries promptly",
        ],
    },
    {
        phase: "Phase 4",
        title: "Offer & Visa Processing",
        timeline: "3–5 months before intake",
        icon: FileText,
        color: "bg-emerald-500",
        items: [
            "Accept your offer letter and pay deposit (if required)",
            "Receive CAS/I-20/CoE from the university",
            "Compile visa application documents",
            "Book visa appointment at embassy/consulate",
            "Attend visa interview (if required) and submit biometrics",
            "Arrange health insurance and accommodation",
        ],
    },
    {
        phase: "Phase 5",
        title: "Pre-Departure",
        timeline: "1–2 months before intake",
        icon: Plane,
        color: "bg-rose-500",
        items: [
            "Book flights and arrange airport pickup",
            "Attend pre-departure orientation (online or in-person)",
            "Pack essentials — documents, medicines, electronics",
            "Inform your bank about international travel",
            "Set up international SIM or eSIM",
            "Connect with fellow students via university forums or social media",
            "Photocopy all important documents (passport, visa, offer letter)",
        ],
    },
];

export default function ApplicationChecklistPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (key: string) =>
        setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

    const totalItems = phases.reduce((acc, p) => acc + p.items.length, 0);
    const checkedCount = Object.values(checked).filter(Boolean).length;
    const progress = Math.round((checkedCount / totalItems) * 100);

    return (
        <>
            {/* ── Hero ──────────────────────────────── */}
            <section
                ref={ref}
                className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple"
            >
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700" />
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
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-200"
                    >
                        Step-by-Step Guide
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl"
                    >
                        Application <span className="text-blue-200">Checklist</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
                    >
                        Track your progress from research to departure. Check off each item as you complete it.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                        <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ── Progress bar ─────────────────────── */}
            <section className="relative z-10 bg-white px-6 py-8">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-neutral-700">Your Progress</span>
                        <span className="font-bold text-brand-purple">
                            {checkedCount}/{totalItems} ({progress}%)
                        </span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-neutral-200">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </section>

            {/* ── Phases ──────────────────────────── */}
            <section className="relative z-10 bg-white px-6 pb-24 lg:pb-32">
                <div className="mx-auto max-w-3xl space-y-10">
                    {phases.map((phase, pi) => (
                        <motion.div
                            key={phase.phase}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: pi * 0.08 }}
                        >
                            {/* Phase header */}
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${phase.color} shadow-sm`}
                                >
                                    <phase.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase text-neutral-400">
                                        {phase.phase} • {phase.timeline}
                                    </span>
                                    <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                        {phase.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-2 pl-2">
                                {phase.items.map((item, ii) => {
                                    const key = `${pi}-${ii}`;
                                    const done = !!checked[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => toggle(key)}
                                            className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${done
                                                ? "border-emerald-200 bg-emerald-50/50 text-neutral-500 line-through"
                                                : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                                                }`}
                                        >
                                            {done ? (
                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                            ) : (
                                                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" />
                                            )}
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
