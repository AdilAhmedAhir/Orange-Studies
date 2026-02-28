"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
    Search, Filter, GraduationCap, MapPin, Clock, DollarSign,
    Star, ArrowRight, X,
} from "lucide-react";
import Link from "next/link";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

/* ── Types ── */
interface ProgramCard {
    id: string;
    slug: string;
    title: string;
    level: string;
    duration: string;
    tuitionFee: number;
    currency: string;
    intakeDates: string[];
    description: string;
    scholarshipAvailable: boolean;
    studyMode: string;
    discipline: string;
    universityName: string;
    universitySlug: string;
    countryName: string;
    countryFlag: string;
}

interface Props {
    programs: ProgramCard[];
    disciplines: string[];
    activeDiscipline: string | null;
}

const levels = ["All", "Bachelor", "Master", "PhD", "Diploma"];

export default function ProgramsClient({ programs, disciplines, activeDiscipline }: Props) {
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        return programs.filter((p) => {
            const matchSearch =
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.universityName.toLowerCase().includes(search.toLowerCase());
            const matchLevel = level === "All" || p.level.toLowerCase().includes(level.toLowerCase());
            return matchSearch && matchLevel;
        });
    }, [programs, search, level]);

    const activeFilterCount = [level].filter((f) => f !== "All").length + (activeDiscipline ? 1 : 0);

    /* currency formatter */
    const fmt = (fee: number, cur: string) => {
        const symbols: Record<string, string> = {
            GBP: "£", USD: "$", CAD: "CAD ", AUD: "AUD ", EUR: "€", MYR: "MYR ",
        };
        return `${symbols[cur] ?? cur + " "}${fee.toLocaleString()}/yr`;
    };

    return (
        <>
            {/* ── Hero ── */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-deep via-brand-purple to-[#1a0a2e]">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand-orange/10 blur-[100px]" />
                    <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 lg:pt-32 pb-16 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-light mb-6">
                            <GraduationCap className="h-3.5 w-3.5" /> Explore Programs
                        </span>
                        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                            Find Your Perfect{" "}
                            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Program</span>
                        </h1>
                        <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
                            Browse programs across multiple countries. Filter by field, level, and location to find the university and course that fits your goals.
                        </p>
                    </motion.div>
                </div>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none"><path d="M0,60 C360,100 1080,20 1440,60 L1440,80 L0,80 Z" fill="white" /></svg>
            </section>

            {/* ── Search & Filters ── */}
            <section className="bg-white px-6 py-12">
                <div className="mx-auto max-w-6xl">
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
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                                <label className="mb-1 block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Discipline</label>
                                <select
                                    value={activeDiscipline ?? "All"}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "All") {
                                            window.location.href = "/programs";
                                        } else {
                                            window.location.href = `/programs?discipline=${encodeURIComponent(val)}`;
                                        }
                                    }}
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                >
                                    <option value="All">All</option>
                                    {disciplines.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {/* Active discipline tag */}
                    {activeDiscipline && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-xs text-neutral-500">Filtering by:</span>
                            <Link
                                href="/programs"
                                className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-semibold text-brand-purple hover:bg-brand-purple/20 transition-colors"
                            >
                                {activeDiscipline} <X className="h-3 w-3" />
                            </Link>
                        </div>
                    )}

                    {/* Results count */}
                    <p className="mt-6 text-sm text-neutral-500">
                        Showing <span className="font-semibold text-neutral-800">{filtered.length}</span> program{filtered.length !== 1 ? "s" : ""}
                    </p>

                    {/* ── Program Cards Grid ── */}
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
                                        {program.countryFlag} {program.countryName}
                                    </span>
                                    {program.scholarshipAvailable && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                                            <Star className="h-3 w-3" /> Scholarship
                                        </span>
                                    )}
                                </div>

                                {/* Program name → links to program page */}
                                <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] leading-tight">
                                    <Link href={`/programs/${program.slug}`} className="hover:text-brand-purple transition-colors">
                                        {program.title}
                                    </Link>
                                </h3>

                                {/* University → links to institution page */}
                                <Link
                                    href={`/institutions/${program.universitySlug}`}
                                    className="mt-1 flex items-center gap-1.5 text-sm text-brand-purple font-medium hover:underline"
                                >
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    {program.universityName}
                                </Link>

                                {/* Description */}
                                <p className="mt-3 text-sm text-neutral-500 leading-relaxed line-clamp-2">
                                    {program.description}
                                </p>

                                {/* Meta row */}
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-[12px] text-neutral-500">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {program.duration}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {fmt(program.tuitionFee, program.currency)}</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {program.intakeDates.join(", ")}</span>
                                    <span className="flex items-center gap-1">📚 {program.level}</span>
                                </div>

                                {/* Discipline tag + Apply CTA */}
                                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                                    {program.discipline ? (
                                        <Link
                                            href={`/programs?discipline=${encodeURIComponent(program.discipline)}`}
                                            className="text-[11px] font-medium text-neutral-400 hover:text-brand-purple transition-colors"
                                        >
                                            {program.discipline}
                                        </Link>
                                    ) : (
                                        <span className="text-[11px] font-medium text-neutral-400">{program.level}</span>
                                    )}
                                    <Link
                                        href={`/apply/${program.slug}`}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange transition-all hover:gap-1.5"
                                    >
                                        Apply Now <ArrowRight className="h-3 w-3" />
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
                            <Link
                                href="/programs"
                                className="mt-4 inline-block rounded-full bg-brand-orange/10 px-5 py-2 text-sm font-semibold text-brand-orange transition-all hover:bg-brand-orange/20"
                            >
                                Clear all filters
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            <CTABanner />
            <Footer />
        </>
    );
}
