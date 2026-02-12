"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, CheckCircle, AlertCircle } from "lucide-react";

const sopSections = [
    {
        title: "Opening Paragraph",
        content: "Start with a compelling hook — a personal story, a defining moment, or a bold statement about your passion.",
        dos: ["Start with a specific experience", "Show passion through actions", "Keep it concise — 2-3 sentences"],
        donts: ["Don't use dictionary definitions", "Don't start with quotes unless truly relevant", "Don't mention childhood unless impactful"],
    },
    {
        title: "Academic Background",
        content: "Highlight relevant courses, projects, and grades that demonstrate readiness. Connect your academic journey to your chosen program.",
        dos: ["Mention specific courses and GPA if strong", "Highlight research projects or theses", "Connect academic experience to the program"],
        donts: ["Don't list every course you took", "Don't just repeat your CV/resume", "Don't explain bad grades unless asked"],
    },
    {
        title: "Professional Experience",
        content: "Describe relevant work experience. Focus on impact — what you achieved, not just what you did. Use numbers and specifics.",
        dos: ["Quantify achievements ('increased by 30%')", "Focus on relevant experience only", "Show progression and growth"],
        donts: ["Don't list job duties like a resume", "Don't include irrelevant jobs", "Don't exaggerate experience"],
    },
    {
        title: "Why This University & Program",
        content: "Research the specific program, faculty, labs, or projects. Show genuine interest and how the program aligns with your goals.",
        dos: ["Name specific professors or facilities", "Show alignment between program and goals", "Demonstrate knowledge of the university"],
        donts: ["Don't use generic reasons", "Don't copy text from the university website", "Don't apply same SOP to every university"],
    },
    {
        title: "Career Goals & Closing",
        content: "Outline clear short-term and long-term career goals. Show how this degree bridges your current position and future ambitions.",
        dos: ["Be specific about career goals", "Show how the degree fills a skills gap", "End confidently — not with 'I hope'"],
        donts: ["Don't be vague about career plans", "Don't say 'I want to settle abroad'", "Don't end with 'Thank you for considering'"],
    },
];

export function SOPGuide() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-3xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }} className="mb-10">
                    <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">SOP Writing Guide</span>
                    <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">How to Write a Winning Statement of Purpose</h2>
                    <p className="mt-2 text-neutral-500">Section-by-section guide with dos and don&apos;ts.</p>
                </motion.div>

                <div className="space-y-3">
                    {sopSections.map((section, i) => {
                        const isOpen = open === i;
                        return (
                            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className={`rounded-2xl border transition-colors ${isOpen ? "border-brand-orange/30 bg-brand-orange/[0.02]" : "border-neutral-200/60 bg-white"}`}>
                                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-xs font-bold text-brand-orange-dark">{i + 1}</span>
                                        <span className="font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{section.title}</span>
                                    </div>
                                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown className="h-4 w-4 text-neutral-400" />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                                            <div className="px-5 pb-5 space-y-4">
                                                <p className="text-sm leading-relaxed text-neutral-600">{section.content}</p>
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="rounded-xl bg-emerald-50 p-4">
                                                        <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-700"><CheckCircle className="h-3.5 w-3.5" /> Do</h4>
                                                        <ul className="space-y-1.5">{section.dos.map((d) => (<li key={d} className="text-xs text-emerald-700">• {d}</li>))}</ul>
                                                    </div>
                                                    <div className="rounded-xl bg-red-50 p-4">
                                                        <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-red-700"><AlertCircle className="h-3.5 w-3.5" /> Don&apos;t</h4>
                                                        <ul className="space-y-1.5">{section.donts.map((d) => (<li key={d} className="text-xs text-red-700">• {d}</li>))}</ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
