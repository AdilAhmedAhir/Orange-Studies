"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Search, Filter, GraduationCap, MapPin, Clock, DollarSign, Star, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

/* ── Programs data ────────────────────────────────── */
const programs = [
    {
        id: 1,
        name: "Computer Science",
        university: "University of Oxford",
        country: "UK",
        flag: "🇬🇧",
        level: "Undergraduate",
        duration: "3 years",
        tuition: "£37,000/yr",
        ranking: 1,
        field: "Engineering & Technology",
        intake: "September",
        scholarship: true,
        description: "World-leading CS program combining theory with practical skills in AI, cybersecurity, and software engineering.",
    },
    {
        id: 2,
        name: "Business Administration (MBA)",
        university: "Harvard Business School",
        country: "USA",
        flag: "🇺🇸",
        level: "Postgraduate",
        duration: "2 years",
        tuition: "$74,000/yr",
        ranking: 2,
        field: "Business & Management",
        intake: "August",
        scholarship: true,
        description: "Flagship MBA with case-method learning, global network, and unparalleled career placement.",
    },
    {
        id: 3,
        name: "Mechanical Engineering",
        university: "University of Toronto",
        country: "Canada",
        flag: "🇨🇦",
        level: "Undergraduate",
        duration: "4 years",
        tuition: "CAD 58,000/yr",
        ranking: 18,
        field: "Engineering & Technology",
        intake: "September",
        scholarship: true,
        description: "Comprehensive engineering program with co-op placements and cutting-edge research opportunities.",
    },
    {
        id: 4,
        name: "Medicine (MBBS)",
        university: "University of Melbourne",
        country: "Australia",
        flag: "🇦🇺",
        level: "Undergraduate",
        duration: "5 years",
        tuition: "AUD 78,000/yr",
        ranking: 14,
        field: "Health & Medicine",
        intake: "February",
        scholarship: false,
        description: "Australia's top medical program with clinical placements from year one and global recognition.",
    },
    {
        id: 5,
        name: "Data Science & AI",
        university: "Technical University of Munich",
        country: "Germany",
        flag: "🇩🇪",
        level: "Postgraduate",
        duration: "2 years",
        tuition: "€300/semester",
        ranking: 30,
        field: "Engineering & Technology",
        intake: "October",
        scholarship: true,
        description: "Tuition-free master's in Germany's leading technical university with strong industry connections.",
    },
    {
        id: 6,
        name: "International Business",
        university: "Monash University Malaysia",
        country: "Malaysia",
        flag: "🇲🇾",
        level: "Undergraduate",
        duration: "3 years",
        tuition: "MYR 42,000/yr",
        ranking: 42,
        field: "Business & Management",
        intake: "February / July",
        scholarship: true,
        description: "Affordable world-class degree in Asia's education hub with pathways to Australian campuses.",
    },
    {
        id: 7,
        name: "Law (LLB)",
        university: "University of Cambridge",
        country: "UK",
        flag: "🇬🇧",
        level: "Undergraduate",
        duration: "3 years",
        tuition: "£33,000/yr",
        ranking: 3,
        field: "Law & Social Sciences",
        intake: "October",
        scholarship: true,
        description: "Prestigious law program with small-group supervisions and globally recognized qualification.",
    },
    {
        id: 8,
        name: "Environmental Science",
        university: "University of British Columbia",
        country: "Canada",
        flag: "🇨🇦",
        level: "Postgraduate",
        duration: "2 years",
        tuition: "CAD 9,000/yr",
        ranking: 34,
        field: "Natural Sciences",
        intake: "September",
        scholarship: true,
        description: "Research-intensive program addressing climate change, sustainability, and conservation.",
    },
    {
        id: 9,
        name: "Graphic Design & Digital Media",
        university: "Parsons School of Design",
        country: "USA",
        flag: "🇺🇸",
        level: "Undergraduate",
        duration: "4 years",
        tuition: "$52,000/yr",
        ranking: 5,
        field: "Arts & Design",
        intake: "August",
        scholarship: false,
        description: "NYC-based creative program shaping the next generation of designers, artists, and creative technologists.",
    },
    {
        id: 10,
        name: "Biomedical Engineering",
        university: "RWTH Aachen University",
        country: "Germany",
        flag: "🇩🇪",
        level: "Postgraduate",
        duration: "2 years",
        tuition: "€600/semester",
        ranking: 33,
        field: "Health & Medicine",
        intake: "October",
        scholarship: true,
        description: "Interdisciplinary master's blending medicine and engineering with nearly tuition-free education.",
    },
    {
        id: 11,
        name: "Psychology",
        university: "University of Sydney",
        country: "Australia",
        flag: "🇦🇺",
        level: "Undergraduate",
        duration: "3 years",
        tuition: "AUD 46,000/yr",
        ranking: 19,
        field: "Law & Social Sciences",
        intake: "February / July",
        scholarship: true,
        description: "APAC-accredited program preparing students for provisional psychologist registration.",
    },
    {
        id: 12,
        name: "Hospitality & Tourism Management",
        university: "Taylor's University",
        country: "Malaysia",
        flag: "🇲🇾",
        level: "Undergraduate",
        duration: "3 years",
        tuition: "MYR 35,000/yr",
        ranking: 1,
        field: "Business & Management",
        intake: "January / March / August",
        scholarship: true,
        description: "Asia's #1 ranked hospitality program with luxury hotel internships and global exchange opportunities.",
    },
];

const countries = ["All", "UK", "USA", "Canada", "Australia", "Germany", "Malaysia"];
const levels = ["All", "Undergraduate", "Postgraduate"];
const fields = ["All", "Engineering & Technology", "Business & Management", "Health & Medicine", "Law & Social Sciences", "Natural Sciences", "Arts & Design"];

export default function ProgramsPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("All");
    const [level, setLevel] = useState("All");
    const [field, setField] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        return programs.filter((p) => {
            const matchSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.university.toLowerCase().includes(search.toLowerCase());
            const matchCountry = country === "All" || p.country === country;
            const matchLevel = level === "All" || p.level === level;
            const matchField = field === "All" || p.field === field;
            return matchSearch && matchCountry && matchLevel && matchField;
        });
    }, [search, country, level, field]);

    const activeFilterCount = [country, level, field].filter((f) => f !== "All").length;

    return (
        <>
            {/* ── Hero ─────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-deep via-brand-purple to-[#1a0a2e]">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-[100px]" />
                    <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                </motion.div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-light mb-6">
                            <GraduationCap className="h-3.5 w-3.5" /> Explore Programs
                        </span>
                        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                            Find Your Perfect{" "}
                            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Program</span>
                        </h1>
                        <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
                            Browse 200+ programs across 6 countries. Filter by field, level, and location to find the university and course that fits your goals.
                        </p>
                    </motion.div>
                </div>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none"><path d="M0,60 C360,100 1080,20 1440,60 L1440,80 L0,80 Z" fill="white" /></svg>
            </section>

            {/* ── Search & Filters ─────────────────────────── */}
            <section className="bg-white px-6 py-12">
                <div className="mx-auto max-w-6xl">
                    {/* Search + filter toggle */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search by program or university..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 py-3.5 pl-12 pr-4 text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-medium transition-all ${showFilters ? "border-brand-purple bg-brand-purple/5 text-brand-purple" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"}`}
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">{activeFilterCount}</span>
                            )}
                        </button>
                    </div>

                    {/* Filter dropdowns */}
                    {showFilters && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Country</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                >
                                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Level</label>
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                >
                                    {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Field of Study</label>
                                <select
                                    value={field}
                                    onChange={(e) => setField(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                >
                                    {fields.map((f) => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {/* Results count */}
                    <p className="mt-6 text-sm text-neutral-500">
                        Showing <span className="font-semibold text-neutral-800">{filtered.length}</span> program{filtered.length !== 1 ? "s" : ""}
                    </p>

                    {/* ── Program Cards Grid ────────────────── */}
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((program, i) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="group relative rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/5 hover:-translate-y-1"
                            >
                                {/* Badge row */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple/5 px-3 py-1 text-[11px] font-semibold text-brand-purple">
                                        {program.flag} {program.country}
                                    </span>
                                    {program.scholarship && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                                            <Star className="h-3 w-3" /> Scholarship
                                        </span>
                                    )}
                                </div>

                                {/* Program name */}
                                <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] leading-tight">
                                    {program.name}
                                </h3>

                                {/* University */}
                                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-purple font-medium">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    {program.university}
                                </p>

                                {/* Description */}
                                <p className="mt-3 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                                    {program.description}
                                </p>

                                {/* Meta row */}
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-[12px] text-neutral-500">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {program.duration}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {program.tuition}</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {program.intake}</span>
                                    <span className="flex items-center gap-1">📚 {program.level}</span>
                                </div>

                                {/* Field tag */}
                                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                                    <span className="text-[11px] font-medium text-neutral-400">{program.field}</span>
                                    <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange transition-all hover:gap-1.5">
                                        Enquire <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center py-16">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-bold text-neutral-700 font-[family-name:var(--font-heading)]">No programs found</h3>
                            <p className="mt-2 text-sm text-neutral-500">Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => { setSearch(""); setCountry("All"); setLevel("All"); setField("All"); }}
                                className="mt-4 rounded-full bg-brand-orange/10 px-5 py-2 text-sm font-semibold text-brand-orange transition-all hover:bg-brand-orange/20"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            <CTABanner />
            <Footer />
        </>
    );
}
