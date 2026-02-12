"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

const faqCategories = [
    {
        category: "Getting Started",
        faqs: [
            { q: "How do I start the study abroad process?", a: "Begin with a free consultation at Orange Studies. We'll assess your academic profile, English test scores, and preferences to recommend the best countries and universities. You can book online or visit our office." },
            { q: "What is the minimum GPA required?", a: "Requirements vary by university and country. Generally, a GPA of 2.5/4.0 is the minimum, but competitive programs may require 3.0+. We can assess your eligibility for your dream universities." },
            { q: "Do I need IELTS or TOEFL?", a: "Most universities require English proficiency proof. IELTS 6.0-7.0 is typical for undergraduate, 6.5-7.5 for postgraduate. Some universities accept Duolingo or PTE as alternatives." },
            { q: "Can I study abroad without IELTS?", a: "Some universities in Malaysia, Germany, and Canada accept Duolingo English Test or MOI (Medium of Instruction) letters. We can identify options that match your situation." },
        ],
    },
    {
        category: "Costs & Funding",
        faqs: [
            { q: "How much does it cost to study abroad?", a: "Costs vary widely: Malaysia ($3K-$10K/yr), Germany (often free), Canada/UK ($15K-$38K/yr), USA ($20K-$55K/yr). Our cost calculator can give detailed estimates for your target country." },
            { q: "Are scholarships available?", a: "Yes! We help students access hundreds of scholarships — Chevening (UK), Fulbright (USA), DAAD (Germany), and many university-specific ones. Some cover full tuition, living expenses, and airfare." },
            { q: "Can I work while studying?", a: "Most countries allow part-time work: UK (20 hrs/week), USA (20 hrs on-campus), Canada (20 hrs/week), Australia (48 hrs/fortnight), Germany (120 full days or 240 half days/year)." },
            { q: "Do you charge consulting fees?", a: "Our initial consultation is completely free. We earn commissions from partner universities, so most students pay nothing for our services. Premium add-ons like SOP review are available at minimal cost." },
        ],
    },
    {
        category: "Visa & Documents",
        faqs: [
            { q: "How long does visa processing take?", a: "Processing times vary: UK (3 weeks), USA (2-4 weeks after interview), Canada (4-8 weeks), Australia (2-4 weeks), Germany (4-6 weeks), Malaysia (2-3 weeks). We recommend applying early." },
            { q: "What documents do I need?", a: "Typically: passport, academic transcripts, English test scores, financial proof, SOP, recommendation letters, and health certificates. Requirements vary by country — we provide a personalized checklist." },
            { q: "Will you help with my visa application?", a: "Absolutely. We guide you through the entire visa process — from document preparation to interview coaching. Our visa success rate is over 95%." },
            { q: "What if my visa gets rejected?", a: "Visa rejections are rare with our guidance, but if it happens, we analyze the reason, strengthen your application, and re-apply. Common fixes include better financial documentation or improved SOP." },
        ],
    },
    {
        category: "After Admission",
        faqs: [
            { q: "Will you help me find accommodation?", a: "We provide guidance on university housing, private accommodation, and homestays. Many of our partner universities guarantee housing for international students in their first year." },
            { q: "What is a pre-departure orientation?", a: "Before you fly, we host a session covering what to pack, airport procedures, cultural tips, banking, SIM cards, and connecting with fellow students going to the same country." },
            { q: "Can I stay and work after graduation?", a: "Most countries offer post-study work visas: UK (2 years), USA (1-3 years OPT), Canada (up to 3 years PGWP), Australia (2-4 years), Germany (18 months). We can help plan your career pathway." },
            { q: "Do you provide ongoing support?", a: "Yes — our support doesn't end at arrival. We stay in touch for guidance on academics, part-time jobs, visa renewals, and post-graduation careers. You're part of the Orange Studies family." },
        ],
    },
];

export default function StudyAbroadFAQsPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const toggle = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <>
            <section ref={ref} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-700 via-rose-600 to-pink-700" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-rose-200">Common Questions</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl">
                        Frequently Asked <span className="text-rose-200">Questions</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Everything you need to know about studying abroad — from eligibility to post-graduation.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg>
                </div>
            </section>

            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-3xl space-y-12">
                    {faqCategories.map((cat, ci) => (
                        <motion.div key={cat.category} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: ci * 0.08 }}>
                            <h2 className="mb-4 text-xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{cat.category}</h2>
                            <div className="space-y-2">
                                {cat.faqs.map((faq, fi) => {
                                    const key = `${ci}-${fi}`;
                                    const isOpen = !!openItems[key];
                                    return (
                                        <div key={key} className={`rounded-xl border transition-colors ${isOpen ? "border-brand-orange/30 bg-brand-orange/[0.02]" : "border-neutral-200/60 bg-white"}`}>
                                            <button onClick={() => toggle(key)} className="flex w-full items-center justify-between px-5 py-3.5 text-left">
                                                <div className="flex items-center gap-3">
                                                    <HelpCircle className={`h-4 w-4 shrink-0 ${isOpen ? "text-brand-orange" : "text-neutral-400"}`} />
                                                    <span className="text-sm font-semibold text-neutral-800">{faq.q}</span>
                                                </div>
                                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                                                        <p className="px-5 pb-4 pl-12 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
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
