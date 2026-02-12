"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";
import {
    Users,
    TrendingUp,
    Globe,
    Shield,
    Headphones,
    DollarSign,
    CheckCircle,
    ArrowRight,
    Building2,
    BarChart3,
    Handshake,
} from "lucide-react";

const benefits = [
    { title: "Access 200+ Universities", description: "We partner with top institutions across 15+ countries, giving your students the widest range of options.", icon: Globe, color: "from-brand-orange to-amber-400" },
    { title: "Competitive Commissions", description: "Industry-leading commission rates with transparent payment cycles. Earn more per successful placement.", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
    { title: "Dedicated Support Team", description: "A dedicated account manager handles your queries, trains your staff, and ensures smooth operations.", icon: Headphones, color: "from-brand-purple to-brand-purple-light" },
    { title: "Real-Time Tracking", description: "Track every application from submission to enrollment through our recruiter portal. Full transparency.", icon: BarChart3, color: "from-blue-500 to-indigo-500" },
    { title: "Marketing Resources", description: "Access branded materials, social media templates, event support, and student-facing collateral.", icon: TrendingUp, color: "from-rose-500 to-pink-500" },
    { title: "Compliance & Trust", description: "We handle visa processing, document verification, and university liaison — minimizing your risk.", icon: Shield, color: "from-amber-500 to-orange-500" },
];

const howItWorks = [
    { step: "01", title: "Register as a Partner", description: "Fill out the demo request form below. Our team reviews and onboards you within 48 hours." },
    { step: "02", title: "Refer Students", description: "Share your unique referral link or submit student profiles through the recruiter portal." },
    { step: "03", title: "We Handle Applications", description: "Our counselors guide students through SOP writing, document prep, and university applications." },
    { step: "04", title: "Earn Commissions", description: "Get paid for every successful enrollment. Transparent tracking and quarterly payouts." },
];

export default function RecruitersPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", students: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            {/* Hero */}
            <section ref={ref} className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-purple to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-orange/8 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange-light">For Recruiters</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl lg:text-6xl">
                        Grow Your Business <br /><span className="text-brand-orange">With Orange Studies</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Partner with us to give your students access to 200+ top universities worldwide. Earn competitive commissions with zero hassle.
                    </motion.p>
                    <motion.a initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} href="#request-demo" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:-translate-y-0.5">
                        Request a Demo <ArrowRight className="h-4 w-4" />
                    </motion.a>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* Benefits */}
            <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">Why Partner With Us</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">Everything You Need to Succeed</h2>
                </motion.div>
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((b, i) => (
                        <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }} className="group rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.color} shadow-sm transition-transform group-hover:scale-110`}>
                                <b.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{b.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{b.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-32">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">Partnership Model</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">How It Works</h2>
                </motion.div>
                <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {howItWorks.map((step, i) => (
                        <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm">
                            <span className="absolute top-3 right-3 text-4xl font-black text-neutral-100 font-[family-name:var(--font-heading)]">{step.step}</span>
                            <h3 className="text-base font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{step.title}</h3>
                            <p className="mt-2 text-sm text-neutral-500">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Demo Request Form */}
            <section id="request-demo" className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <div className="mx-auto max-w-xl">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
                        <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">Get Started</span>
                        <h2 className="mt-4 text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Request a Demo</h2>
                        <p className="mt-2 text-neutral-500">Fill in your details and our partnership team will reach out within 24 hours.</p>
                    </motion.div>

                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                            <h3 className="text-xl font-bold text-emerald-700 font-[family-name:var(--font-heading)]">Request Received!</h3>
                            <p className="mt-2 text-sm text-neutral-600">Our partnership team will contact you within 24 hours to schedule a demo.</p>
                        </motion.div>
                    ) : (
                        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-brand-purple/5 sm:p-8 space-y-4">
                            <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20" />
                            <input type="text" placeholder="Company / Agency Name" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20" />
                                <input type="tel" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20" />
                            </div>
                            <select value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} required className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20">
                                <option value="">Students per year?</option>
                                <option value="1-10">1 – 10</option>
                                <option value="11-50">11 – 50</option>
                                <option value="51-200">51 – 200</option>
                                <option value="200+">200+</option>
                            </select>
                            <textarea placeholder="Anything else we should know? (optional)" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 resize-none" />
                            <button type="submit" className="w-full rounded-xl bg-brand-purple px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-purple/20 transition-all hover:bg-brand-deep hover:shadow-lg">
                                Request Demo
                            </button>
                        </motion.form>
                    )}
                </div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
