"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, CheckCircle, Lightbulb } from "lucide-react";

const visaGuides = [
    {
        country: "United Kingdom", flag: "🇬🇧", visaType: "Student Visa (Tier 4)",
        requirements: ["CAS from university", "Valid passport (6+ months)", "Financial proof: £1,334/month (London) for 9 months", "IELTS 6.0+ (UKVI approved)", "TB test (if required)", "BRP appointment"],
        fees: "£363 + £470/year IHS", processingTime: "3 weeks (standard)",
        tips: ["Apply up to 6 months before course start", "Work 20 hrs/week during term", "Graduate Route visa: 2 years post-study"],
    },
    {
        country: "United States", flag: "🇺🇸", visaType: "F-1 Student Visa",
        requirements: ["I-20 form from university", "SEVIS fee ($350)", "DS-160 form", "Valid passport", "Full-year financial proof", "Academic transcripts"],
        fees: "$185 visa + $350 SEVIS", processingTime: "2-4 weeks after interview",
        tips: ["Schedule interview early — long wait times", "Prepare for questions about study plans", "OPT: 1-3 years of post-grad work"],
    },
    {
        country: "Canada", flag: "🇨🇦", visaType: "Study Permit",
        requirements: ["Letter of Acceptance from DLI", "Proof of funds: CAD 10,000+/year", "Valid passport", "Medical exam (if required)", "Police clearance", "SOP"],
        fees: "CAD 150", processingTime: "4-8 weeks",
        tips: ["Use Student Direct Stream for faster processing", "Work 20 hrs/week on-campus", "PGWP: up to 3 years post-grad"],
    },
    {
        country: "Australia", flag: "🇦🇺", visaType: "Student Visa (Subclass 500)",
        requirements: ["CoE from university", "OSHC health cover", "GTE statement", "Financial proof: AUD 21,041/year", "English proficiency", "Valid passport"],
        fees: "AUD 710", processingTime: "2-4 weeks",
        tips: ["GTE statement is crucial — be genuine", "Work 48 hrs/fortnight during term", "Post-study work: 2-4 years"],
    },
    {
        country: "Germany", flag: "🇩🇪", visaType: "National Type D Visa",
        requirements: ["University admission letter", "Blocked account: €11,208/year", "Health insurance", "Academic transcripts", "Language proof (if needed)", "Valid passport"],
        fees: "€75", processingTime: "4-6 weeks",
        tips: ["Open blocked account at Expatrio or Fintiba", "Many English-taught programs available", "18-month Job Seeker Visa after graduation"],
    },
    {
        country: "Malaysia", flag: "🇲🇾", visaType: "Student Pass (EMGS)",
        requirements: ["Offer letter", "EMGS application via university", "Passport (18+ months validity)", "Medical report", "Academic transcripts", "Photos"],
        fees: "~$235 (RM 1,060)", processingTime: "2-3 weeks",
        tips: ["University handles application", "20 hrs/week part-time work allowed", "Very high approval rate"],
    },
];

export function VisaGuides() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="relative z-10 bg-neutral-50/80 px-6 py-20 lg:py-24">
            <div className="mx-auto max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }} className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">Student Visa Guides</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">Visa Requirements by Country</h2>
                </motion.div>

                <div className="space-y-4">
                    {visaGuides.map((visa, i) => {
                        const isOpen = open === i;
                        return (
                            <motion.div key={visa.country} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className={`rounded-2xl border transition-colors ${isOpen ? "border-brand-purple/30 bg-brand-purple/[0.02]" : "border-neutral-200/60 bg-white"}`}>
                                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{visa.flag}</span>
                                        <div>
                                            <span className="font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{visa.country}</span>
                                            <span className="ml-2 text-xs text-neutral-400">{visa.visaType}</span>
                                        </div>
                                    </div>
                                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown className="h-4 w-4 text-neutral-400" />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                                            <div className="px-5 pb-5 space-y-4">
                                                <div>
                                                    <h4 className="mb-2 text-xs font-bold uppercase text-neutral-400">Requirements</h4>
                                                    <ul className="space-y-1.5">
                                                        {visa.requirements.map((r) => (<li key={r} className="flex items-start gap-2 text-sm text-neutral-600"><CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-purple" />{r}</li>))}
                                                    </ul>
                                                </div>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <div className="rounded-xl bg-neutral-50 p-3">
                                                        <span className="text-[10px] font-bold uppercase text-neutral-400">Fees</span>
                                                        <p className="text-sm font-semibold text-neutral-700">{visa.fees}</p>
                                                    </div>
                                                    <div className="rounded-xl bg-neutral-50 p-3">
                                                        <span className="text-[10px] font-bold uppercase text-neutral-400">Processing Time</span>
                                                        <p className="text-sm font-semibold text-neutral-700">{visa.processingTime}</p>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl bg-amber-50 p-4">
                                                    <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-amber-700"><Lightbulb className="h-3.5 w-3.5" /> Pro Tips</h4>
                                                    <ul className="space-y-1.5">
                                                        {visa.tips.map((t) => (<li key={t} className="text-xs text-amber-700">• {t}</li>))}
                                                    </ul>
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
