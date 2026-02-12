"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";
import {
    GraduationCap,
    Users,
    Globe,
    BarChart3,
    Target,
    Zap,
    CheckCircle,
    ArrowRight,
    Building2,
    Award,
} from "lucide-react";

const servicesOffered = [
    { title: "Student Recruitment", description: "We source, screen, and refer quality international students to your programs, ensuring they meet your admission criteria.", icon: Users, color: "from-brand-orange to-amber-400" },
    { title: "Regional Representation", description: "Act as your official representative in South Asia, East Asia, and the Middle East — managing inquiries and applications.", icon: Globe, color: "from-blue-500 to-indigo-500" },
    { title: "Application Processing", description: "We handle the complete student application workflow — from document collection to SOP review to offer acceptance.", icon: GraduationCap, color: "from-brand-purple to-brand-purple-light" },
    { title: "Marketing & Branding", description: "Promote your programs through our digital channels, webinars, education fairs, and in-person counseling sessions.", icon: Target, color: "from-rose-500 to-pink-500" },
    { title: "Pre-Departure Support", description: "We prepare students for enrollment with visa guidance, accommodation assistance, and pre-departure orientations.", icon: Zap, color: "from-emerald-500 to-teal-500" },
    { title: "Data & Insights", description: "Receive detailed reports on student demographics, conversion rates, and market trends to optimize your recruitment strategy.", icon: BarChart3, color: "from-amber-500 to-orange-500" },
];

const partnerUniversities = [
    "University of Manchester", "University of Toronto", "UNSW Sydney",
    "Technical University of Munich", "University of Malaya", "Boston University",
    "University of Leeds", "McGill University", "Monash University",
    "University of Edinburgh", "University of British Columbia", "NYU",
];

export default function InstitutionsPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const [formData, setFormData] = useState({ institution: "", contact: "", email: "", country: "", programs: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

    return (
        <>
            {/* Hero */}
            <section ref={ref} className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-brand-deep to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/8 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-300">For Institutions</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl lg:text-6xl">
                        Partner With <span className="text-brand-orange">Orange Studies</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Connect with a pipeline of qualified, motivated international students. We handle recruitment, so you can focus on education.
                    </motion.p>
                    <motion.a initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} href="#partner-form" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:-translate-y-0.5">
                        Become a Partner <ArrowRight className="h-4 w-4" />
                    </motion.a>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* Services */}
            <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">Our Services</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">What We Offer Institutions</h2>
                </motion.div>
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesOffered.map((s, i) => (
                        <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-sm transition-transform group-hover:scale-110`}>
                                <s.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trusted By */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-28">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">Trusted Partners</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Universities We Work With</h2>
                </motion.div>
                <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {partnerUniversities.map((uni, i) => (
                        <motion.div key={uni} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 rounded-xl border border-neutral-200/60 bg-white px-4 py-3 shadow-sm">
                            <Building2 className="h-4 w-4 shrink-0 text-brand-purple" />
                            <span className="text-sm font-semibold text-neutral-700">{uni}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Partnership Form */}
            <section id="partner-form" className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <div className="mx-auto max-w-xl">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Become a Partner</h2>
                        <p className="mt-2 text-neutral-500">Tell us about your institution and we'll start the onboarding process.</p>
                    </motion.div>
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                            <h3 className="text-xl font-bold text-emerald-700 font-[family-name:var(--font-heading)]">Partnership Inquiry Received!</h3>
                            <p className="mt-2 text-sm text-neutral-600">Our institutional partnerships team will respond within 2 business days.</p>
                        </motion.div>
                    ) : (
                        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-brand-purple/5 sm:p-8 space-y-4">
                            <input type="text" placeholder="Institution Name" required value={formData.institution} onChange={(e) => update("institution", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input type="text" placeholder="Contact Person" required value={formData.contact} onChange={(e) => update("contact", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                                <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                            <input type="text" placeholder="Country" required value={formData.country} onChange={(e) => update("country", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <textarea placeholder="Programs you'd like to promote (optional)" rows={3} value={formData.programs} onChange={(e) => update("programs", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none" />
                            <button type="submit" className="w-full rounded-xl bg-brand-purple px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-purple/20 transition-all hover:bg-brand-deep hover:shadow-lg">Submit Inquiry</button>
                        </motion.form>
                    )}
                </div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
