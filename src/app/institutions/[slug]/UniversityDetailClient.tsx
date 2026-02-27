"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
    MapPin, GraduationCap, Users, Globe, Award, Building2,
    Clock, DollarSign, BookOpen, ArrowRight, ArrowLeft,
    CheckCircle, Star, Home, Wifi, Shield,
} from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

interface UniProps {
    uni: {
        id: string;
        slug: string;
        name: string;
        location: string;
        ranking: number;
        logoPlaceholder: string;
        established: number;
        totalStudents: number;
        internationalStudents: number;
        acceptanceRate: number;
        description: string;
        detailedDescription: string;
        highlights: string[];
        facilities: string[];
        campusLife: string;
        admissionRequirements: string[];
        accommodationInfo: string;
        colorAccent: string;
        tags: string[];
        country: { name: string; code: string; flag: string };
        courses: Array<{
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
        }>;
        tuitionRange: { min: number; max: number; currency: string };
    };
}

const tabs = ["Overview", "Campus Life", "Programs"] as const;
type Tab = (typeof tabs)[number];

export default function UniversityDetailClient({ uni }: UniProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Overview");
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <>
            {/* ─── HERO ─── */}
            <section ref={heroRef} className="relative flex min-h-[70vh] items-end overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${uni.colorAccent}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Link href="/institutions" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" /> All Institutions
                        </Link>
                    </motion.div>

                    <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-4">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-2xl font-black text-white backdrop-blur-md border border-white/20">
                                {uni.logoPlaceholder}
                            </motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl font-bold text-white sm:text-5xl font-[family-name:var(--font-heading)]">
                                {uni.name}
                            </motion.h1>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-1.5 text-sm text-white/80"><MapPin className="h-4 w-4" /> {uni.location}, {uni.country.flag} {uni.country.name}</span>
                                <span className="flex items-center gap-1.5 text-sm text-white/80"><Award className="h-4 w-4" /> World Rank #{uni.ranking}</span>
                                <span className="flex items-center gap-1.5 text-sm text-white/80"><Clock className="h-4 w-4" /> Est. {uni.established}</span>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-wrap gap-2">
                                {uni.tags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white border border-white/10">{tag}</span>
                                ))}
                            </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                { label: "Students", value: uni.totalStudents.toLocaleString(), icon: Users },
                                { label: "International", value: uni.internationalStudents.toLocaleString(), icon: Globe },
                                { label: "Acceptance", value: `${uni.acceptanceRate}%`, icon: Shield },
                                { label: "Programs", value: `${uni.courses.length}`, icon: BookOpen },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-md border border-white/10">
                                    <item.icon className="mx-auto h-5 w-5 text-brand-orange" />
                                    <p className="mt-1 text-lg font-bold text-white">{item.value}</p>
                                    <p className="text-[10px] text-white/60">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 z-20"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* ─── TAB NAV ─── */}
            <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
                <div className="mx-auto flex max-w-6xl gap-0 px-6">
                    {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`relative px-6 py-4 text-sm font-semibold transition-colors ${activeTab === tab ? "text-brand-purple" : "text-neutral-500 hover:text-neutral-800"}`}>
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-brand-orange" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* ─── TAB CONTENT ─── */}
            <div className="mx-auto max-w-6xl px-6 py-16">
                {activeTab === "Overview" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key="overview" className="space-y-16">
                        <div className="grid gap-12 lg:grid-cols-5">
                            <div className="lg:col-span-3 space-y-5">
                                <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">About {uni.name}</h2>
                                <p className="text-neutral-600 leading-relaxed">{uni.detailedDescription}</p>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Key Highlights</h3>
                                <ul className="space-y-3">
                                    {uni.highlights.map((h) => (
                                        <li key={h} className="flex items-start gap-3 text-sm text-neutral-600"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /> {h}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Facilities</h2>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {uni.facilities.map((f, i) => (
                                    <motion.div key={f} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-3 rounded-xl border border-neutral-200/60 bg-neutral-50 px-5 py-4">
                                        <Building2 className="h-5 w-5 text-brand-purple" />
                                        <span className="text-sm font-medium text-neutral-700">{f}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-brand-purple/5 to-brand-orange/5 p-8">
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Admission Requirements</h2>
                            <ul className="mt-6 space-y-3">
                                {uni.admissionRequirements.map((r) => (
                                    <li key={r} className="flex items-start gap-3 text-sm text-neutral-600"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" /> {r}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="rounded-2xl border border-neutral-200/60 p-8">
                                <div className="flex items-center gap-3 mb-4"><Home className="h-6 w-6 text-brand-orange" /><h3 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Accommodation</h3></div>
                                <p className="text-sm text-neutral-600 leading-relaxed">{uni.accommodationInfo}</p>
                            </div>
                            <div className="rounded-2xl border border-neutral-200/60 p-8">
                                <div className="flex items-center gap-3 mb-4"><DollarSign className="h-6 w-6 text-brand-orange" /><h3 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Tuition Range</h3></div>
                                <p className="text-3xl font-bold text-brand-purple font-[family-name:var(--font-heading)]">
                                    {uni.tuitionRange.currency} {uni.tuitionRange.min.toLocaleString()} – {uni.tuitionRange.max.toLocaleString()}
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">per year (varies by program)</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "Campus Life" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key="campus" className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Life at {uni.name}</h2>
                            <p className="mt-4 text-neutral-600 leading-relaxed max-w-3xl">{uni.campusLife}</p>
                        </div>
                        <div className={`relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${uni.colorAccent} overflow-hidden flex items-center justify-center`}>
                            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
                            <div className="text-center text-white">
                                <Building2 className="mx-auto h-16 w-16 opacity-40" />
                                <p className="mt-3 text-sm opacity-60">Campus panorama</p>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                { label: "Location", value: `${uni.location}, ${uni.country.name}`, icon: MapPin, desc: "City campus with excellent transport links" },
                                { label: "Student Body", value: `${uni.totalStudents.toLocaleString()} students`, icon: Users, desc: `Including ${uni.internationalStudents.toLocaleString()} international students` },
                                { label: "Founded", value: `${uni.established}`, icon: Award, desc: `${new Date().getFullYear() - uni.established} years of academic excellence` },
                            ].map((item) => (
                                <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-2xl border border-neutral-200/60 p-6 transition-shadow hover:shadow-lg">
                                    <item.icon className="h-8 w-8 text-brand-orange" />
                                    <p className="mt-3 text-xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{item.value}</p>
                                    <p className="text-xs text-neutral-500">{item.label}</p>
                                    <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === "Programs" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key="programs" className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Available Programs ({uni.courses.length})</h2>
                            <p className="mt-2 text-neutral-500">Explore our programs and find the right fit for your academic journey.</p>
                        </div>
                        <div className="space-y-4">
                            {uni.courses.map((course, i) => (
                                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="group rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-[10px] font-bold text-brand-purple">{course.level}</span>
                                                {course.scholarshipAvailable && (
                                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700">💰 Scholarship</span>
                                                )}
                                                <span className="text-[10px] text-neutral-400">{course.studyMode}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)] group-hover:text-brand-purple transition-colors">{course.title}</h3>
                                            <p className="text-sm text-neutral-500">{course.description}</p>
                                            <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {course.currency} {course.tuitionFee.toLocaleString()}/yr</span>
                                                <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {course.intakeDates.join(", ")}</span>
                                            </div>
                                        </div>
                                        <Link href={`/programs/${course.slug}`}
                                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-105">
                                            View Details <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            <CTABanner />
            <Footer />
        </>
    );
}
