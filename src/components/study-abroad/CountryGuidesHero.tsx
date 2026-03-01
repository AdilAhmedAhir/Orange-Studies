"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, DollarSign, Clock } from "lucide-react";

/* ── country type (passed from server) ────────────── */
export interface CountryData {
    slug: string;
    name: string;
    flag: string;
    tagline: string;
    universities: string;
    avgTuition: string;
    visaTime: string;
    color: string;
    accent: string;
    highlights: string[];
    description?: string;
    image?: string;
}

/* ── fallback country data ──────────────────────────── */
const fallbackCountries: CountryData[] = [
    {
        slug: "united-kingdom",
        name: "United Kingdom",
        flag: "🇬🇧",
        tagline: "World-Class Research & Heritage",
        universities: "160+ Universities",
        avgTuition: "£12,000 – £38,000/yr",
        visaTime: "3 weeks",
        color: "from-blue-600 to-blue-800",
        accent: "bg-blue-500",
        highlights: ["Oxford & Cambridge", "1-Year Masters", "Post-Study Work Visa"],
    },
    {
        slug: "united-states",
        name: "United States",
        flag: "🇺🇸",
        tagline: "Innovation, Diversity & Opportunity",
        universities: "4,000+ Universities",
        avgTuition: "$20,000 – $55,000/yr",
        visaTime: "3–5 weeks",
        color: "from-red-600 to-red-800",
        accent: "bg-red-500",
        highlights: ["Ivy League", "OPT Work Permit", "Flexible Curriculum"],
    },
    {
        slug: "canada",
        name: "Canada",
        flag: "🇨🇦",
        tagline: "Affordable Excellence & PR Pathway",
        universities: "100+ Universities",
        avgTuition: "CAD 15,000 – 35,000/yr",
        visaTime: "4–8 weeks",
        color: "from-red-500 to-rose-700",
        accent: "bg-red-500",
        highlights: ["PGWP (3-Year Work Permit)", "Low Living Cost", "PR Pathway"],
    },
    {
        slug: "australia",
        name: "Australia",
        flag: "🇦🇺",
        tagline: "Sunny Campuses & Global Recognition",
        universities: "43 Universities",
        avgTuition: "AUD 20,000 – 45,000/yr",
        visaTime: "2–4 weeks",
        color: "from-amber-600 to-yellow-700",
        accent: "bg-amber-500",
        highlights: ["Group of Eight", "Post-Study Work (2–4yr)", "High Quality of Life"],
    },
    {
        slug: "germany",
        name: "Germany",
        flag: "🇩🇪",
        tagline: "Tuition-Free Education in Europe",
        universities: "400+ Universities",
        avgTuition: "€0 – €20,000/yr",
        visaTime: "4–6 weeks",
        color: "from-neutral-800 to-neutral-900",
        accent: "bg-neutral-800",
        highlights: ["Free Public Universities", "Engineering Hub", "18-Month Job Seeker Visa"],
    },
    {
        slug: "malaysia",
        name: "Malaysia",
        flag: "🇲🇾",
        tagline: "Affordable & Multicultural",
        universities: "70+ Universities",
        avgTuition: "$3,000 – $10,000/yr",
        visaTime: "2–3 weeks",
        color: "from-blue-700 to-indigo-800",
        accent: "bg-blue-600",
        highlights: ["Most Affordable", "English-Medium Programs", "Cultural Diversity"],
    },
];

export { fallbackCountries as countries };

/* ── country card ────────────────────────────────────── */
function CountryCard({
    country,
    index,
}: {
    country: CountryData;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Link
                href={`/study-abroad/country-guides/${country.slug}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-1"
            >
                {/* Gradient header with flag */}
                <div
                    className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${country.color} overflow-hidden`}
                >
                    {/* Decorative circles */}
                    <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-white/10" />
                    <div className="absolute top-4 left-4 h-12 w-12 rounded-full bg-white/10" />
                    <span className="text-7xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                        {country.flag}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                        {country.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                        {country.tagline}
                    </p>

                    {/* Stats row */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <GraduationCap className="mx-auto h-4 w-4 text-neutral-400" />
                            <p className="mt-1 text-[11px] font-medium text-neutral-600">
                                {country.universities}
                            </p>
                        </div>
                        <div className="text-center">
                            <DollarSign className="mx-auto h-4 w-4 text-neutral-400" />
                            <p className="mt-1 text-[11px] font-medium text-neutral-600">
                                {country.avgTuition.split(" – ")[0]}+
                            </p>
                        </div>
                        <div className="text-center">
                            <Clock className="mx-auto h-4 w-4 text-neutral-400" />
                            <p className="mt-1 text-[11px] font-medium text-neutral-600">
                                Visa: {country.visaTime}
                            </p>
                        </div>
                    </div>

                    {/* Highlight chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {country.highlights.map((h: string) => (
                            <span
                                key={h}
                                className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-500"
                            >
                                {h}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-purple opacity-0 transition-all duration-300 group-hover:opacity-100">
                        View Country Guide
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ── page section ────────────────────────────────────── */
export function CountryGuidesHero({ countries: dynamicCountries }: { countries?: CountryData[] }) {
    const displayCountries = dynamicCountries && dynamicCountries.length > 0 ? dynamicCountries : fallbackCountries;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            <section
                ref={ref}
                className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-brand-purple"
            >
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-purple to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-orange/8 blur-3xl" />
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
                        className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-orange-light"
                    >
                        Country Guides
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl lg:text-6xl"
                    >
                        Choose Your <span className="text-brand-orange">Destination</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
                    >
                        Detailed guides covering culture, top universities, costs, visa requirements,
                        and career opportunities in each country.
                    </motion.p>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                        <path
                            d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>

            {/* Country grid */}
            <section className="relative z-10 bg-white px-6 py-20 lg:py-28">
                <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {displayCountries.map((c, i) => (
                        <CountryCard key={c.slug || i} country={c} index={i} />
                    ))}
                    {displayCountries.length === 0 && (
                        <div className="col-span-full text-center py-12 text-neutral-400">No countries found. Add countries via the Admin dashboard.</div>
                    )}
                </div>
            </section>
        </>
    );
}
