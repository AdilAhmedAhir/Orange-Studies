"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, SlidersHorizontal, ChevronDown, MapPin, GraduationCap,
    BookOpen, X, ArrowRight, Sparkles, Filter,
} from "lucide-react";
import { getAllCourses } from "@/lib/mock-data";

/* ── Filter Configuration ── */
const filterGroups = [
    {
        id: "country",
        label: "Country",
        icon: MapPin,
        options: [
            { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
            { value: "Australia", label: "🇦🇺 Australia" },
            { value: "Canada", label: "🇨🇦 Canada" },
            { value: "Germany", label: "🇩🇪 Germany" },
            { value: "United States", label: "🇺🇸 United States" },
        ],
    },
    {
        id: "level",
        label: "Degree Level",
        icon: GraduationCap,
        options: [
            { value: "Bachelor", label: "Bachelor's" },
            { value: "Master", label: "Master's" },
            { value: "PhD", label: "PhD" },
            { value: "Diploma", label: "Diploma" },
        ],
    },
    {
        id: "discipline",
        label: "Discipline",
        icon: BookOpen,
        options: [
            { value: "Computer Science", label: "Computer Science" },
            { value: "Business", label: "Business & MBA" },
            { value: "Engineering", label: "Engineering" },
            { value: "Medicine", label: "Medicine & Health" },
            { value: "Arts", label: "Arts & Design" },
            { value: "Law", label: "Law" },
        ],
    },
];

/* ── Search Content (with useSearchParams) ── */
function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeCountry = searchParams.get("country") || "";
    const activeLevel = searchParams.get("level") || "";
    const activeDiscipline = searchParams.get("discipline") || "";
    const query = searchParams.get("q") || "";

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.get(key) === value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/search?${params.toString()}`, { scroll: false });
    };

    const setQuery = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("q", value);
        else params.delete("q");
        router.push(`/search?${params.toString()}`, { scroll: false });
    };

    const clearAll = () => router.push("/search", { scroll: false });

    const activeValues: Record<string, string> = { country: activeCountry, level: activeLevel, discipline: activeDiscipline };
    const activeCount = [activeCountry, activeLevel, activeDiscipline, query].filter(Boolean).length;

    /* ── Filter mock data ── */
    const allCourses = getAllCourses();
    const filtered = allCourses.filter((c) => {
        if (activeCountry && c.countryName !== activeCountry) return false;
        if (activeLevel && c.level !== activeLevel) return false;
        if (activeDiscipline) {
            const t = c.title.toLowerCase();
            const d = activeDiscipline.toLowerCase();
            if (d === "computer science" && !t.includes("computer") && !t.includes("software") && !t.includes("data") && !t.includes("artificial") && !t.includes("cyber") && !t.includes("robotics")) return false;
            if (d === "business" && !t.includes("business") && !t.includes("mba") && !t.includes("management") && !t.includes("finance") && !t.includes("marketing")) return false;
            if (d === "engineering" && !t.includes("engineer") && !t.includes("mechanical") && !t.includes("civil") && !t.includes("electrical") && !t.includes("robotics")) return false;
            if (d === "medicine" && !t.includes("medic") && !t.includes("health") && !t.includes("nurs") && !t.includes("pharma") && !t.includes("biomedical")) return false;
            if (d === "arts" && !t.includes("art") && !t.includes("design") && !t.includes("media") && !t.includes("creative") && !t.includes("graphic")) return false;
            if (d === "law" && !t.includes("law") && !t.includes("legal") && !t.includes("justice")) return false;
        }
        if (query) {
            const q = query.toLowerCase();
            if (!c.title.toLowerCase().includes(q) && !c.universityName.toLowerCase().includes(q) && !c.countryName.toLowerCase().includes(q)) return false;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Hero Bar */}
            <div className="bg-gradient-to-r from-brand-purple via-brand-deep to-brand-purple py-12 px-6">
                <div className="mx-auto max-w-7xl">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-4xl">
                        Find Your Perfect Program
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="mt-2 text-sm text-white/60">
                        {allCourses.length} programs across {filterGroups[0].options.length} countries
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="mt-6 relative max-w-2xl">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by program, university, or country..."
                            className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* ── LEFT SIDEBAR ── */}
                    <aside className="w-full md:w-1/4 shrink-0">
                        <div className="sticky top-24 space-y-1 rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="flex items-center gap-2 text-sm font-bold text-brand-purple font-[family-name:var(--font-heading)]">
                                    <SlidersHorizontal className="h-4 w-4" /> Filters
                                </h2>
                                {activeCount > 0 && (
                                    <button onClick={clearAll} className="flex items-center gap-1 text-[10px] font-semibold text-red-500 hover:text-red-600 transition-colors">
                                        <X className="h-3 w-3" /> Clear All
                                    </button>
                                )}
                            </div>

                            {filterGroups.map((group) => (
                                <FilterAccordion
                                    key={group.id}
                                    group={group}
                                    activeValue={activeValues[group.id]}
                                    onSelect={(value) => updateParam(group.id, value)}
                                />
                            ))}
                        </div>
                    </aside>

                    {/* ── RIGHT GRID ── */}
                    <main className="flex-1">
                        {/* Results Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                                    {filtered.length} Program{filtered.length !== 1 ? "s" : ""} Found
                                </h2>
                                {activeCount > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {activeCountry && <ActiveTag label={activeCountry} onRemove={() => updateParam("country", activeCountry)} />}
                                        {activeLevel && <ActiveTag label={activeLevel} onRemove={() => updateParam("level", activeLevel)} />}
                                        {activeDiscipline && <ActiveTag label={activeDiscipline} onRemove={() => updateParam("discipline", activeDiscipline)} />}
                                        {query && <ActiveTag label={`"${query}"`} onRemove={() => setQuery("")} />}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results */}
                        {filtered.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-20 text-center">
                                <Filter className="h-12 w-12 text-neutral-300" />
                                <p className="mt-4 text-lg font-bold text-neutral-700 font-[family-name:var(--font-heading)]">No programs match your filters</p>
                                <p className="mt-1 text-sm text-neutral-400">Try adjusting or clearing your filters.</p>
                                <button onClick={clearAll} className="mt-4 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md">
                                    Clear All Filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((course, i) => (
                                        <motion.div
                                            key={course.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: Math.min(i * 0.03, 0.3) }}
                                            className="group overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            {/* Card Top Accent */}
                                            <div className="h-1.5 bg-gradient-to-r from-brand-orange to-brand-purple" />

                                            <div className="p-5">
                                                {/* Country + Level badges */}
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 font-medium text-neutral-600">
                                                        {course.countryFlag} {course.countryName}
                                                    </span>
                                                    <span className="rounded-full bg-brand-purple/10 px-2.5 py-1 font-medium text-brand-purple">
                                                        {course.level}
                                                    </span>
                                                    {course.scholarshipAvailable && (
                                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700 flex items-center gap-1">
                                                            <Sparkles className="h-3 w-3" /> Scholarship
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Program Title */}
                                                <h3 className="mt-3 text-base font-bold text-neutral-900 font-[family-name:var(--font-heading)] leading-snug">
                                                    {course.title}
                                                </h3>

                                                {/* University */}
                                                <p className="mt-1 text-sm text-neutral-500">{course.universityName}</p>

                                                {/* Meta row */}
                                                <div className="mt-3 flex items-center gap-4 text-xs text-neutral-400">
                                                    <span>{course.duration}</span>
                                                    <span>•</span>
                                                    <span>{course.studyMode}</span>
                                                    <span>•</span>
                                                    <span>{course.intakeDates[0]}</span>
                                                </div>

                                                {/* Footer */}
                                                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase text-neutral-400">Tuition / Year</p>
                                                        <p className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                                                            {course.currency} {course.tuitionFee.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <Link href={`/apply/${course.slug}`}
                                                        className="flex items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-brand-orange/20 transition-all hover:shadow-md hover:shadow-brand-orange/30 hover:scale-105">
                                                        Apply Now <ArrowRight className="h-3.5 w-3.5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

/* ── Filter Accordion Component ── */
function FilterAccordion({ group, activeValue, onSelect }: {
    group: typeof filterGroups[0];
    activeValue: string;
    onSelect: (value: string) => void;
}) {
    return (
        <details className="group/acc" open>
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 list-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                    <group.icon className="h-4 w-4 text-neutral-400" />
                    {group.label}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400 transition-transform group-open/acc:rotate-180" />
            </summary>
            <div className="space-y-0.5 pb-3 pl-4 pr-2 pt-1">
                {group.options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onSelect(opt.value)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-all ${activeValue === opt.value
                                ? "bg-brand-orange/10 font-semibold text-brand-orange"
                                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
                            }`}
                    >
                        <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${activeValue === opt.value
                                ? "border-brand-orange bg-brand-orange"
                                : "border-neutral-300"
                            }`}>
                            {activeValue === opt.value && (
                                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {opt.label}
                    </button>
                ))}
            </div>
        </details>
    );
}

/* ── Active Filter Tag ── */
function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-3 py-1 text-[11px] font-semibold text-brand-purple">
            {label}
            <button onClick={onRemove} className="hover:text-red-500 transition-colors"><X className="h-3 w-3" /></button>
        </span>
    );
}

/* ── Page wrapper with Suspense for useSearchParams ── */
export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
