"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DollarSign, GraduationCap, Globe, TrendingDown, Award, ExternalLink } from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

/* ── tuition data ──────────────────────────────────── */
const tuitionData = [
    { country: "🇬🇧 United Kingdom", undergrad: "£12,000 – £25,000", postgrad: "£14,000 – £38,000", currency: "GBP" },
    { country: "🇺🇸 United States", undergrad: "$20,000 – £40,000", postgrad: "$25,000 – $55,000", currency: "USD" },
    { country: "🇨🇦 Canada", undergrad: "CAD 15,000 – 25,000", postgrad: "CAD 18,000 – 35,000", currency: "CAD" },
    { country: "🇦🇺 Australia", undergrad: "AUD 20,000 – 35,000", postgrad: "AUD 22,000 – 45,000", currency: "AUD" },
    { country: "🇩🇪 Germany", undergrad: "€0 – €3,000", postgrad: "€0 – €20,000", currency: "EUR" },
    { country: "🇲🇾 Malaysia", undergrad: "$3,000 – 6,000", postgrad: "$4,000 – 10,000", currency: "USD" },
];

const scholarships = [
    {
        name: "Chevening Scholarship",
        country: "🇬🇧 UK",
        coverage: "Full tuition + living expenses",
        eligibility: "Master's students from eligible countries",
        deadline: "November (annually)",
        color: "from-blue-600 to-blue-800",
    },
    {
        name: "Fulbright Program",
        country: "🇺🇸 USA",
        coverage: "Full tuition + stipend + airfare",
        eligibility: "Graduate students, researchers, professionals",
        deadline: "February (varies by country)",
        color: "from-red-600 to-red-800",
    },
    {
        name: "Vanier Canada Graduate Scholarships",
        country: "🇨🇦 Canada",
        coverage: "CAD 50,000/year for 3 years",
        eligibility: "PhD students — any nationality",
        deadline: "November (annually)",
        color: "from-red-500 to-rose-700",
    },
    {
        name: "Australia Awards (AAS)",
        country: "🇦🇺 Australia",
        coverage: "Full tuition + living + return airfare",
        eligibility: "Students from developing countries",
        deadline: "April – May (varies)",
        color: "from-amber-600 to-yellow-700",
    },
    {
        name: "DAAD Scholarship",
        country: "🇩🇪 Germany",
        coverage: "€934/month + travel + insurance",
        eligibility: "Master's & PhD from any country",
        deadline: "October – November",
        color: "from-neutral-800 to-neutral-900",
    },
    {
        name: "Malaysian International Scholarship (MIS)",
        country: "🇲🇾 Malaysia",
        coverage: "Full tuition + living allowance",
        eligibility: "Master's & PhD students",
        deadline: "July (annually)",
        color: "from-blue-700 to-indigo-800",
    },
    {
        name: "Commonwealth Scholarships",
        country: "🌍 Multiple",
        coverage: "Full tuition + airfare + stipend",
        eligibility: "Students from Commonwealth nations",
        deadline: "December (annually)",
        color: "from-brand-purple to-brand-purple-light",
    },
    {
        name: "Erasmus Mundus Joint Masters",
        country: "🇪🇺 Europe",
        coverage: "€1,400/month + tuition + travel",
        eligibility: "Any nationality — multi-country programs",
        deadline: "January – March",
        color: "from-emerald-600 to-teal-700",
    },
];

const savingTips = [
    { tip: "Apply early — many scholarships have limited spots", icon: Award },
    { tip: "Consider Germany or Malaysia for near-zero tuition", icon: TrendingDown },
    { tip: "Look for university-specific bursaries and fee waivers", icon: GraduationCap },
    { tip: "Compare living costs, not just tuition — it adds up fast", icon: Globe },
];

export default function CostScholarshipsPage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            {/* ── Hero ──────────────────────────────── */}
            <section
                ref={ref}
                className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple"
            >
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700" />
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
                        className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-300"
                    >
                        Costs & Financial Aid
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl"
                    >
                        Tuition Fees & <span className="text-emerald-300">Scholarships</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
                    >
                        Compare tuition costs across countries and discover scholarships that can fund your entire education.
                    </motion.p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                        <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ── Tuition Comparison Table ─────────── */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <span className="mb-3 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                            Tuition Comparison
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Annual Tuition by Country
                        </h2>
                        <p className="mt-2 text-neutral-500">
                            Approximate annual tuition for international students (2024/25 academic year).
                        </p>
                    </motion.div>

                    <div className="overflow-hidden rounded-2xl border border-neutral-200/60 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-neutral-50">
                                        <th className="px-5 py-4 text-left font-bold text-neutral-700">Country</th>
                                        <th className="px-5 py-4 text-left font-bold text-neutral-700">Undergraduate</th>
                                        <th className="px-5 py-4 text-left font-bold text-neutral-700">Postgraduate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tuitionData.map((row, i) => (
                                        <motion.tr
                                            key={row.country}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-t border-neutral-100 transition-colors hover:bg-neutral-50/50"
                                        >
                                            <td className="px-5 py-4 font-semibold text-neutral-800">{row.country}</td>
                                            <td className="px-5 py-4 text-neutral-600">{row.undergrad}</td>
                                            <td className="px-5 py-4 text-neutral-600">{row.postgrad}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Scholarships ─────────────────────── */}
            <section className="relative z-10 bg-neutral-50/80 px-6 py-20 lg:py-24 overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl" />
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 text-center"
                    >
                        <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                            Scholarships
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">
                            Top Scholarships for International Students
                        </h2>
                        <p className="mt-4 text-lg text-neutral-500">
                            Government-funded and university-specific scholarships to reduce your financial burden.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {scholarships.map((s, i) => (
                            <motion.div
                                key={s.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="group overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className={`bg-gradient-to-br ${s.color} px-5 py-4`}>
                                    <span className="text-xs font-bold text-white/70">{s.country}</span>
                                    <h3 className="mt-1 text-sm font-bold text-white leading-snug">{s.name}</h3>
                                </div>
                                <div className="p-5 space-y-3">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-neutral-400">Coverage</span>
                                        <p className="text-xs font-semibold text-emerald-600">{s.coverage}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-neutral-400">Eligibility</span>
                                        <p className="text-xs text-neutral-600">{s.eligibility}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-neutral-400">Deadline</span>
                                        <p className="text-xs text-neutral-600">{s.deadline}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Saving Tips ─────────────────────── */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-24">
                <div className="mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center"
                    >
                        <h2 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            Money-Saving Tips
                        </h2>
                    </motion.div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {savingTips.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-start gap-3 rounded-xl border border-neutral-200/60 bg-neutral-50 p-5"
                            >
                                <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                                <span className="text-sm text-neutral-700">{t.tip}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <CTABanner />
            <Footer />
        </>
    );
}
