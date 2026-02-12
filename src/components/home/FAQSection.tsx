"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

/* ── FAQ data ──────────────────────────────────────────── */
const faqs = [
    {
        q: "Do I need an IELTS score to apply?",
        a: "It depends on the university and program. Many universities in the UK, US, and Canada require IELTS or TOEFL scores. However, some programs in Germany and Malaysia may accept other language certifications. We'll guide you on the exact requirements for your chosen program.",
    },
    {
        q: "How long does the visa process take?",
        a: "Visa processing times vary by country — typically 2-8 weeks. UK Student Visas take about 3 weeks, US F-1 visas can take 3-5 weeks, and Canadian Study Permits may take 4-8 weeks. We recommend applying at least 3 months before your program starts.",
    },
    {
        q: "What are the tuition fee ranges?",
        a: "Tuition varies by country and university. UK programs range from £12,000-£38,000/year, US universities from $20,000-$55,000/year, while Malaysian universities are more affordable at $3,000-$10,000/year. Many scholarships and financial aid options are available.",
    },
    {
        q: "Can you help with scholarship applications?",
        a: "Absolutely! Our counselors help identify scholarship opportunities, prepare compelling applications, and meet deadlines. We have a database of 500+ scholarships across our partner universities, including merit-based, need-based, and country-specific grants.",
    },
    {
        q: "Is there a service fee for using Orange Studies?",
        a: "Our initial consultation is completely free. We provide transparent pricing with no hidden fees. Our services include university selection, application support, visa guidance, and pre-departure orientation. Contact us for a detailed breakdown.",
    },
    {
        q: "What support do I get after arriving?",
        a: "We provide comprehensive post-arrival support including airport pickup coordination, accommodation assistance, bank account setup guidance, local orientation, and ongoing academic support throughout your study period.",
    },
];

/* ── single accordion item ─────────────────────────────── */
function FAQItem({
    faq,
    index,
    isOpen,
    toggle,
}: {
    faq: (typeof faqs)[0];
    index: number;
    isOpen: boolean;
    toggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group"
        >
            <button
                onClick={toggle}
                className={`flex w-full items-center gap-4 rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${isOpen
                        ? "border-brand-orange/30 bg-brand-orange/5 shadow-md shadow-brand-orange/5"
                        : "border-neutral-200/60 bg-white hover:border-neutral-300 hover:shadow-sm"
                    }`}
            >
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${isOpen
                            ? "bg-brand-orange text-white"
                            : "bg-neutral-100 text-neutral-400 group-hover:bg-brand-purple/10 group-hover:text-brand-purple"
                        }`}
                >
                    <HelpCircle className="h-4 w-4" />
                </div>
                <span
                    className={`flex-1 text-[15px] font-semibold transition-colors duration-300 ${isOpen ? "text-neutral-800" : "text-neutral-700"
                        }`}
                >
                    {faq.q}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`shrink-0 transition-colors duration-300 ${isOpen ? "text-brand-orange" : "text-neutral-400"
                        }`}
                >
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-2 pt-3 text-[15px] leading-relaxed text-neutral-500">
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── section ──────────────────────────────────────────── */
export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-32 overflow-hidden">
            {/* Decorative blurred circles */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />

            <div className="mx-auto max-w-3xl">
                {/* heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                        Got Questions?
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500">
                        Everything you need to know about studying abroad with
                        Orange Studies.
                    </p>
                </motion.div>

                {/* accordion list */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            index={i}
                            isOpen={openIndex === i}
                            toggle={() =>
                                setOpenIndex(openIndex === i ? null : i)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
