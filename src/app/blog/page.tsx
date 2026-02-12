"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Tag, User } from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

const blogPosts = [
    {
        slug: "top-scholarships-2025",
        title: "Top 10 Scholarships for International Students in 2025",
        excerpt: "A comprehensive guide to the most prestigious fully-funded scholarships available worldwide — from Chevening to DAAD to Fulbright.",
        category: "Scholarships",
        author: "Nadia Ahmed",
        date: "Feb 5, 2025",
        readTime: "8 min read",
        color: "from-emerald-500 to-teal-600",
    },
    {
        slug: "ielts-preparation-tips",
        title: "IELTS Band 7+ in 3 Months: A Realistic Study Plan",
        excerpt: "Break down the IELTS exam, understand what examiners look for, and follow our week-by-week study schedule to hit your target band.",
        category: "Test Prep",
        author: "Arif Khan",
        date: "Jan 28, 2025",
        readTime: "10 min read",
        color: "from-blue-500 to-indigo-600",
    },
    {
        slug: "germany-free-tuition",
        title: "Study in Germany for Free: Complete 2025 Guide",
        excerpt: "Germany offers zero tuition at public universities. Here's how to apply, what a blocked account is, and how to secure your spot.",
        category: "Country Guides",
        author: "Fatima Rahman",
        date: "Jan 20, 2025",
        readTime: "7 min read",
        color: "from-neutral-800 to-neutral-900",
    },
    {
        slug: "sop-writing-mistakes",
        title: "7 SOP Mistakes That Get Your Application Rejected",
        excerpt: "Admissions officers share the most common Statement of Purpose mistakes they see — and how to avoid every single one of them.",
        category: "Application Tips",
        author: "Nadia Ahmed",
        date: "Jan 12, 2025",
        readTime: "6 min read",
        color: "from-rose-500 to-pink-600",
    },
    {
        slug: "canada-vs-australia",
        title: "Canada vs Australia: Which Is Better for International Students?",
        excerpt: "We compare education quality, work opportunities, immigration pathways, costs, and lifestyle to help you make the right choice.",
        category: "Comparison",
        author: "Imran Ali",
        date: "Jan 5, 2025",
        readTime: "9 min read",
        color: "from-brand-orange to-amber-600",
    },
    {
        slug: "student-visa-interview",
        title: "How to Ace Your Student Visa Interview (With Sample Answers)",
        excerpt: "Mock questions and model answers for US F-1, UK Tier 4, and Canadian study permit interviews — plus body language tips.",
        category: "Visa",
        author: "Arif Khan",
        date: "Dec 28, 2024",
        readTime: "8 min read",
        color: "from-brand-purple to-brand-purple-light",
    },
];

export default function BlogPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            <section ref={ref} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-purple to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl">
                        Blog & <span className="text-brand-orange">Resources</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Expert guides, tips, and insights to help you navigate your study abroad journey.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            <section className="relative z-10 bg-white px-6 py-20 lg:py-28">
                <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post, i) => (
                        <motion.article key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.06 }} className="group overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className={`bg-gradient-to-br ${post.color} h-40 flex items-end p-5`}>
                                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">{post.category}</span>
                            </div>
                            <div className="p-5 space-y-3">
                                <h3 className="text-base font-bold leading-snug text-neutral-800 font-[family-name:var(--font-heading)] group-hover:text-brand-purple transition-colors">{post.title}</h3>
                                <p className="text-xs leading-relaxed text-neutral-500">{post.excerpt}</p>
                                <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                    <span>{post.date}</span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange transition-colors group-hover:text-brand-orange-dark">
                                    Read More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
