"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Globe, Loader2 } from "lucide-react";
import { Footer } from "@/components/home/Footer";
import { submitLead } from "@/app/actions/lead";

const contactInfo = [
    { icon: MapPin, label: "Head Office", value: "House 12, Road 5, Block C, Bashundhara R/A, Dhaka 1229", color: "text-brand-orange" },
    { icon: Phone, label: "Phone", value: "+880 1700-000000", color: "text-brand-purple" },
    { icon: Mail, label: "Email", value: "info@orangestudies.com", color: "text-emerald-500" },
    { icon: Clock, label: "Office Hours", value: "Sun – Thu: 10 AM – 7 PM", color: "text-blue-500" },
];

const offices = [
    { city: "Dhaka", address: "House 12, Road 5, Block C, Bashundhara R/A", phone: "+880 1700-000000" },
    { city: "Chittagong", address: "CDA Avenue, GEC Circle, 4th Floor", phone: "+880 1700-000001" },
    { city: "Sylhet", address: "Zindabazar, Sylhet 3100", phone: "+880 1700-000002" },
];

export default function ContactPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const up = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

    return (
        <>
            <section ref={ref} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-deep to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-orange/8 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>
                <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl">
                        Get in <span className="text-brand-orange">Touch</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Have questions? Ready to start your journey? We&apos;re here to help.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* Contact Cards */}
            <section className="relative z-10 bg-white px-6 py-12">
                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {contactInfo.map((c, i) => (
                        <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-5 text-center">
                            <c.icon className={`mx-auto mb-2 h-5 w-5 ${c.color}`} />
                            <p className="text-xs font-bold uppercase text-neutral-400">{c.label}</p>
                            <p className="mt-1 text-sm font-semibold text-neutral-700">{c.value}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form + Branch Offices */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
                            <h2 className="text-2xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Send Us a Message</h2>
                        </motion.div>
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
                                <h3 className="text-xl font-bold text-emerald-700 font-[family-name:var(--font-heading)]">Message Sent!</h3>
                                <p className="mt-2 text-sm text-neutral-600">We&apos;ll respond within 24 hours. In the meantime, explore our study abroad guides.</p>
                            </motion.div>
                        ) : (
                            <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} onSubmit={async (e) => { e.preventDefault(); setLoading(true); try { await submitLead({ name: form.name, email: form.email, phone: form.phone || undefined, type: "CONTACT", message: form.subject ? `[${form.subject}] ${form.message}` : form.message }); setSubmitted(true); } catch { setSubmitted(true); } finally { setLoading(false); } }} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => up("name", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                                    <input type="email" placeholder="Email" required value={form.email} onChange={(e) => up("email", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => up("phone", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                                    <select value={form.subject} onChange={(e) => up("subject", e.target.value)} required className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                        <option value="">Select Subject</option>
                                        <option value="study-abroad">Study Abroad Inquiry</option>
                                        <option value="scholarship">Scholarship Help</option>
                                        <option value="visa">Visa Assistance</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <textarea placeholder="Your message..." rows={5} required value={form.message} onChange={(e) => up("message", e.target.value)} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none" />
                                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-purple/20 transition-all hover:bg-brand-deep hover:shadow-lg disabled:opacity-60">
                                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
                                </button>
                            </motion.form>
                        )}
                    </div>

                    {/* Offices */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Our Offices</h3>
                        <div className="space-y-3">
                            {offices.map((o, i) => (
                                <motion.div key={o.city} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-neutral-200/60 bg-neutral-50 p-4">
                                    <h4 className="font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{o.city}</h4>
                                    <p className="mt-1 text-xs text-neutral-500">{o.address}</p>
                                    <p className="mt-1 text-xs font-semibold text-brand-purple">{o.phone}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
