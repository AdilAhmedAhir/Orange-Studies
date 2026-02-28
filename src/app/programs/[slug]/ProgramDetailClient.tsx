"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    ArrowLeft, ArrowRight, GraduationCap, Clock, DollarSign,
    MapPin, BookOpen, CheckCircle, Star, Award, Briefcase,
    Calendar, Users, Sparkles, FileText,
} from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

interface ProgramDetailProps {
    course: {
        id: string;
        slug: string;
        title: string;
        level: string;
        duration: string;
        tuitionFee: number;
        currency: string;
        intakeDates: string[];
        description: string;
        detailedDescription: string;
        modules: string[];
        entryRequirements: string[];
        careerOutcomes: string[];
        scholarshipAvailable: boolean;
        applicationDeadline: string;
        studyMode: string;
    };
    university: {
        id: string;
        slug: string;
        name: string;
        location: string;
        ranking: number;
        logoPlaceholder: string;
        colorAccent: string;
        description: string;
        country: { name: string; code: string; flag: string; slug: string };
    };
}

export default function ProgramDetailClient({ course, university }: ProgramDetailProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const router = useRouter();
    const { status } = useSession();
    const [isPending, startTransition] = useTransition();

    const handleApply = () => {
        startTransition(() => {
            if (status === "unauthenticated") {
                router.push(`/login?callbackUrl=/apply/${course.slug}`);
            } else {
                router.push(`/apply/${course.slug}`);
            }
        });
    };

    return (
        <>
            {/* ─── HERO ─── */}
            <section ref={heroRef} className="relative flex min-h-[60vh] items-end overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: bgY }}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${university.colorAccent}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </motion.div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Link href="/programs" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" /> All Programs
                        </Link>
                    </motion.div>

                    <div className="mt-6 space-y-4">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{course.level}</span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">{course.studyMode}</span>
                            {course.scholarshipAvailable && (
                                <span className="rounded-full bg-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-100 backdrop-blur-sm">💰 Scholarship Available</span>
                            )}
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-3xl font-bold text-white sm:text-5xl font-[family-name:var(--font-heading)] max-w-3xl">
                            {course.title}
                        </motion.h1>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <Link href={`/institutions/${university.slug}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-black text-white">{university.logoPlaceholder}</span>
                                <span className="text-sm font-medium">{university.name}</span>
                                <span className="text-sm text-white/50">•</span>
                                <span className="text-sm text-white/60"><Link href={`/study-abroad/country-guides/${university.country.slug}`} className="hover:underline hover:text-brand-orange transition-colors">{university.country.flag} {university.location}</Link></span>
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-5 pt-2">
                            {[
                                { icon: Clock, label: course.duration },
                                { icon: DollarSign, label: `${course.currency} ${course.tuitionFee.toLocaleString()}/yr` },
                                { icon: Calendar, label: course.intakeDates.join(" / ") },
                                { icon: Award, label: `#${university.ranking} World Rank` },
                            ].map((item) => (
                                <span key={item.label} className="flex items-center gap-1.5 text-sm text-white/70">
                                    <item.icon className="h-4 w-4 text-brand-orange" /> {item.label}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg>
                </div>
            </section>

            {/* ─── CONTENT ─── */}
            <section className="relative z-10 bg-white px-6 py-16">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
                    {/* LEFT COL — main content */}
                    <div className="lg:col-span-2 space-y-14">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Program Overview</h2>
                            <p className="mt-4 text-neutral-600 leading-relaxed">{course.detailedDescription}</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">What You&apos;ll Study</h2>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {course.modules.map((mod, i) => (
                                    <motion.div key={mod} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                                        className="flex items-center gap-3 rounded-xl border border-neutral-200/60 bg-neutral-50 px-5 py-4 transition-colors hover:bg-brand-purple/5 hover:border-brand-purple/20">
                                        <BookOpen className="h-4 w-4 shrink-0 text-brand-purple" />
                                        <span className="text-sm font-medium text-neutral-700">{mod}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-brand-purple/5 to-brand-orange/5 p-8">
                            <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Entry Requirements</h2>
                            <ul className="mt-5 space-y-3">
                                {course.entryRequirements.map((req) => (
                                    <li key={req} className="flex items-start gap-3 text-sm text-neutral-600">
                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /> {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Career Outcomes</h2>
                            <div className="mt-6 flex flex-wrap gap-3">
                                {course.careerOutcomes.map((career) => (
                                    <span key={career} className="rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-2 text-sm font-medium text-brand-purple">
                                        <Briefcase className="mr-1.5 inline-block h-3.5 w-3.5" /> {career}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL — sticky sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange via-brand-orange to-amber-500 p-8 text-center shadow-2xl shadow-brand-orange/30"
                            >
                                <div className="absolute -inset-1 rounded-2xl bg-brand-orange/40 blur-xl animate-pulse-soft" />
                                <div className="relative z-10">
                                    <Sparkles className="mx-auto h-10 w-10 text-white/90" />
                                    <h3 className="mt-3 text-xl font-bold text-white font-[family-name:var(--font-heading)]">Ready to Apply?</h3>
                                    <p className="mt-2 text-sm text-white/80">Start your application for {course.title} at {university.name}</p>
                                    <button onClick={handleApply}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-black text-brand-orange shadow-lg transition-all hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]">
                                        Apply Now <ArrowRight className="h-5 w-5" />
                                    </button>
                                    <p className="mt-3 text-[10px] text-white/60">Deadline: {course.applicationDeadline}</p>
                                </div>
                            </motion.div>

                            <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 space-y-4 shadow-sm">
                                <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Program Details</h3>
                                {[
                                    { label: "Level", value: course.level, icon: GraduationCap },
                                    { label: "Duration", value: course.duration, icon: Clock },
                                    { label: "Study Mode", value: course.studyMode, icon: Users },
                                    { label: "Tuition Fee", value: `${course.currency} ${course.tuitionFee.toLocaleString()}/yr`, icon: DollarSign },
                                    { label: "Intakes", value: course.intakeDates.join(", "), icon: Calendar },
                                    { label: "Deadline", value: course.applicationDeadline, icon: FileText },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-neutral-500"><item.icon className="h-4 w-4" /> {item.label}</span>
                                        <span className="font-semibold text-neutral-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={`/institutions/${university.slug}`} className="block group">
                                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${university.colorAccent} text-sm font-black text-white`}>
                                            {university.logoPlaceholder}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-neutral-800 group-hover:text-brand-purple transition-colors">{university.name}</h4>
                                            <p className="text-xs text-neutral-500">{university.country.flag} {university.location} • Rank #{university.ranking}</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs text-neutral-500">{university.description}</p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-orange group-hover:text-brand-orange-dark transition-colors">
                                        View University <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <CTABanner />
            <Footer />
        </>
    );
}
