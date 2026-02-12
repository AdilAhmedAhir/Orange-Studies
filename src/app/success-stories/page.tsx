"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";
import { Star, MapPin, GraduationCap, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

const stories = [
    {
        name: "Fatima Rahman",
        photo: "👩🏽‍🎓",
        from: "Dhaka, Bangladesh",
        university: "University of Manchester",
        country: "🇬🇧 United Kingdom",
        program: "MSc Data Science",
        scholarship: "30% Tuition Scholarship",
        quote: "Orange Studies made the impossible possible. From IELTS prep to visa approval, they guided me every step. I never thought I'd study at a Russell Group university!",
        year: "2024",
        rating: 5,
        color: "from-blue-600 to-indigo-700",
    },
    {
        name: "Arjun Mehta",
        photo: "👨🏽‍💼",
        from: "Mumbai, India",
        university: "University of Toronto",
        country: "🇨🇦 Canada",
        program: "BBA International Business",
        scholarship: "Lester B. Pearson Scholarship (Full)",
        quote: "I applied to 5 universities through Orange Studies and got accepted into 4. The SOP guidance was game-changing — my counselor understood exactly what U of T wanted.",
        year: "2023",
        rating: 5,
        color: "from-red-500 to-rose-700",
    },
    {
        name: "Nusrat Jahan",
        photo: "👩🏽‍💻",
        from: "Chittagong, Bangladesh",
        university: "Technical University of Munich",
        country: "🇩🇪 Germany",
        program: "MSc Computer Science",
        scholarship: "DAAD Scholarship",
        quote: "Studying in Germany with zero tuition was a dream I didn't know was achievable. Orange Studies showed me the path, helped with APS, and even the blocked account setup.",
        year: "2024",
        rating: 5,
        color: "from-neutral-800 to-neutral-900",
    },
    {
        name: "Imran Ali",
        photo: "👨🏽‍🔬",
        from: "Lahore, Pakistan",
        university: "UNSW Sydney",
        country: "🇦🇺 Australia",
        program: "PhD Biomedical Engineering",
        scholarship: "UNSW International Scientia Scholarship",
        quote: "As a PhD applicant, I needed targeted support — finding supervisors, writing research proposals. Orange Studies connected me with the right people and I landed a full scholarship.",
        year: "2023",
        rating: 5,
        color: "from-amber-600 to-yellow-700",
    },
    {
        name: "Sara Al-Mahmoud",
        photo: "👩🏽‍⚕️",
        from: "Riyadh, Saudi Arabia",
        university: "Boston University",
        country: "🇺🇸 United States",
        program: "MS Public Health",
        scholarship: "Dean's Award ($15,000/year)",
        quote: "The visa interview coaching was incredible. My counselor did mock interviews and I felt 100% prepared. Now I'm studying at one of the top public health programs in the US.",
        year: "2024",
        rating: 5,
        color: "from-red-700 to-red-900",
    },
    {
        name: "Tanvir Hossain",
        photo: "👨🏽‍🎓",
        from: "Sylhet, Bangladesh",
        university: "University of Malaya",
        country: "🇲🇾 Malaysia",
        program: "BEng Mechanical Engineering",
        scholarship: "UM Global Scholarship (50%)",
        quote: "Malaysia was an affordable option I hadn't considered. Orange Studies opened my eyes to the quality of education here. The process was smooth, fast, and completely stress-free.",
        year: "2024",
        rating: 5,
        color: "from-blue-700 to-blue-900",
    },
];

const stats = [
    { label: "Students Placed", value: "2,500+" },
    { label: "University Partners", value: "200+" },
    { label: "Visa Success Rate", value: "97%" },
    { label: "Scholarships Won", value: "$4.2M+" },
];

export default function SuccessStoriesPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            {/* Hero */}
            <section ref={ref} className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-orange via-brand-orange-dark to-amber-800" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/60">Real Students, Real Results</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl">
                        Success <span className="text-amber-200">Stories</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Meet the students who turned their study abroad dreams into reality with Orange Studies.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* Stats */}
            <section className="relative z-10 bg-white px-6 py-12">
                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-5 text-center">
                            <p className="text-2xl font-bold text-brand-orange font-[family-name:var(--font-heading)]">{stat.value}</p>
                            <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stories Grid */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-28">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
                    {stories.map((s, i) => (
                        <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }} className="group overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
                            <div className={`bg-gradient-to-br ${s.color} px-6 py-5 flex items-center gap-4`}>
                                <span className="text-4xl">{s.photo}</span>
                                <div className="text-white">
                                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">{s.name}</h3>
                                    <p className="text-xs text-white/60">{s.from}</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-purple/10 px-3 py-1 text-[10px] font-bold text-brand-purple"><GraduationCap className="h-3 w-3" />{s.university}</span>
                                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold text-neutral-600">{s.country}</span>
                                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold text-neutral-600">{s.program}</span>
                                </div>
                                {s.scholarship && (
                                    <p className="text-xs font-bold text-emerald-600">🎓 {s.scholarship}</p>
                                )}
                                <div className="relative rounded-xl bg-neutral-50 p-4">
                                    <Quote className="absolute top-2 left-2 h-5 w-5 text-neutral-200" />
                                    <p className="pl-5 text-sm italic leading-relaxed text-neutral-600">{s.quote}</p>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: s.rating }).map((_, j) => (<Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />))}
                                    <span className="ml-2 text-xs text-neutral-400">Class of {s.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-16">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-xl text-center">
                    <h2 className="text-2xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Ready to Write Your Success Story?</h2>
                    <p className="mt-3 text-sm text-neutral-500">Every journey starts with a conversation. Let us help you take the first step.</p>
                    <Link href="/study-abroad#consultation" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:-translate-y-0.5">
                        Book Free Consultation <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
