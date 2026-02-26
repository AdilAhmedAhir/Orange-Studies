"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight, User, GraduationCap, Upload, FileCheck,
    CheckCircle, PartyPopper, Clock, MapPin, Mail, Phone,
    BookOpen, Award, Calendar, Sparkles,
} from "lucide-react";
import { getCourseBySlug } from "@/lib/mock-data";
import { DocumentDropzone } from "@/components/ui/DocumentDropzone";

const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Documents", icon: Upload },
    { id: 3, title: "Review", icon: FileCheck },
    { id: 4, title: "Success", icon: PartyPopper },
];

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function ApplicationPage() {
    const { programId } = useParams<{ programId: string }>();
    const data = getCourseBySlug(programId);
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);

    // ── Form state ──
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "", dob: "", nationality: "",
        currentCity: "", previousDegree: "", previousInstitution: "", gpa: "", ieltsScore: "",
    });
    const [documents, setDocuments] = useState<Record<string, File | null>>({
        passport: null, transcripts: null, ielts: null, sop: null,
    });

    const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
    const updateDoc = (key: string, file: File | null) => setDocuments((prev) => ({ ...prev, [key]: file }));

    const goNext = () => { setDirection(1); setCurrentStep((s) => Math.min(s + 1, 4)); };
    const goBack = () => { setDirection(-1); setCurrentStep((s) => Math.max(s - 1, 1)); };

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Program Not Found</h1>
                    <p className="mt-3 text-neutral-500">We couldn&apos;t find the program you&apos;re trying to apply to.</p>
                    <Link href="/programs" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-white transition-transform hover:scale-105">
                        <ArrowLeft className="h-4 w-4" /> Browse Programs
                    </Link>
                </div>
            </div>
        );
    }

    const { university, ...course } = data;

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* ─── TOP BAR ─── */}
            <div className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                    <Link href={`/programs/${course.slug}`} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to Program
                    </Link>
                    <div className="text-center hidden sm:block">
                        <p className="text-xs text-neutral-400">Applying to</p>
                        <p className="text-sm font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{course.title}</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-orange to-amber-500 text-[10px] font-black text-white">
                        {university.logoPlaceholder}
                    </div>
                </div>
            </div>

            {/* ─── STEP PROGRESS ─── */}
            <div className="mx-auto max-w-4xl px-6 pt-10">
                <div className="flex items-center justify-between">
                    {steps.map((step, i) => (
                        <div key={step.id} className="flex items-center">
                            <motion.div
                                animate={{
                                    scale: currentStep === step.id ? 1.1 : 1,
                                    backgroundColor: currentStep >= step.id ? (step.id === 4 && currentStep === 4 ? "#10b981" : "#FF9400") : "#e5e5e5",
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all"
                            >
                                {currentStep > step.id ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <step.icon className="h-5 w-5" />
                                )}
                            </motion.div>
                            <span className={`ml-2 hidden text-xs font-semibold sm:inline ${currentStep >= step.id ? "text-neutral-800" : "text-neutral-400"}`}>
                                {step.title}
                            </span>
                            {i < steps.length - 1 && (
                                <div className="mx-3 h-[2px] w-8 sm:w-16 md:w-24 rounded-full overflow-hidden bg-neutral-200">
                                    <motion.div
                                        className="h-full bg-brand-orange"
                                        initial={{ width: "0%" }}
                                        animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── STEP CONTENT ─── */}
            <div className="mx-auto max-w-4xl px-6 py-10">
                <AnimatePresence mode="wait" custom={direction}>
                    {/* ════════════ STEP 1: Personal Info ════════════ */}
                    {currentStep === 1 && (
                        <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>
                            <div className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Personal & Academic Profile</h2>
                                <p className="mt-2 text-sm text-neutral-500">Tell us about yourself and your academic background.</p>

                                <div className="mt-8 space-y-8">
                                    {/* Personal Section */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple uppercase tracking-wide">
                                            <User className="h-4 w-4" /> Personal Information
                                        </h3>
                                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                            {[
                                                { key: "firstName", label: "First Name", placeholder: "Adil", icon: User },
                                                { key: "lastName", label: "Last Name", placeholder: "Ahmed", icon: User },
                                                { key: "email", label: "Email Address", placeholder: "adil@example.com", icon: Mail, type: "email" },
                                                { key: "phone", label: "Phone Number", placeholder: "+880 1700-000000", icon: Phone, type: "tel" },
                                                { key: "dob", label: "Date of Birth", placeholder: "", icon: Calendar, type: "date" },
                                                { key: "nationality", label: "Nationality", placeholder: "Bangladeshi", icon: MapPin },
                                                { key: "currentCity", label: "Current City", placeholder: "Dhaka", icon: MapPin },
                                            ].map(({ key, label, placeholder, icon: Icon, type }) => (
                                                <div key={key} className={key === "currentCity" ? "sm:col-span-2" : ""}>
                                                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</label>
                                                    <div className="relative">
                                                        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                                        <input
                                                            type={type || "text"}
                                                            value={form[key as keyof typeof form]}
                                                            onChange={(e) => updateForm(key, e.target.value)}
                                                            placeholder={placeholder}
                                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Academic Section */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple uppercase tracking-wide">
                                            <GraduationCap className="h-4 w-4" /> Academic Background
                                        </h3>
                                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                            {[
                                                { key: "previousDegree", label: "Highest Qualification", placeholder: "BSc Computer Science", icon: BookOpen },
                                                { key: "previousInstitution", label: "Institution", placeholder: "University of Dhaka", icon: Award },
                                                { key: "gpa", label: "GPA / Percentage", placeholder: "3.75 / 4.00", icon: GraduationCap },
                                                { key: "ieltsScore", label: "IELTS / English Score", placeholder: "7.5", icon: BookOpen },
                                            ].map(({ key, label, placeholder, icon: Icon }) => (
                                                <div key={key}>
                                                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</label>
                                                    <div className="relative">
                                                        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                                        <input
                                                            type="text"
                                                            value={form[key as keyof typeof form]}
                                                            onChange={(e) => updateForm(key, e.target.value)}
                                                            placeholder={placeholder}
                                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ════════════ STEP 2: Documents ════════════ */}
                    {currentStep === 2 && (
                        <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>
                            <div className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Upload Your Documents</h2>
                                <p className="mt-2 text-sm text-neutral-500">Upload the required documents for your application. All files are securely processed.</p>

                                <div className="mt-8 space-y-6">
                                    <DocumentDropzone
                                        label="Passport Copy"
                                        description="Upload a clear scan or photo of your passport's bio data page."
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onFileSelect={(f) => updateDoc("passport", f)}
                                        uploaded={!!documents.passport}
                                    />
                                    <DocumentDropzone
                                        label="Academic Transcripts"
                                        description="Official transcripts from your most recent qualification. Include all semesters."
                                        accept=".pdf,.doc,.docx"
                                        onFileSelect={(f) => updateDoc("transcripts", f)}
                                        uploaded={!!documents.transcripts}
                                    />
                                    <DocumentDropzone
                                        label="IELTS / Language Certificate"
                                        description="Your English language proficiency test result (IELTS, TOEFL, PTE, etc.)"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onFileSelect={(f) => updateDoc("ielts", f)}
                                        uploaded={!!documents.ielts}
                                    />
                                    <DocumentDropzone
                                        label="Statement of Purpose (SOP)"
                                        description="A personal essay describing your motivation, goals, and why this program is right for you."
                                        accept=".pdf,.doc,.docx"
                                        onFileSelect={(f) => updateDoc("sop", f)}
                                        uploaded={!!documents.sop}
                                    />
                                </div>

                                {/* Upload summary */}
                                <div className="mt-8 flex items-center gap-3 rounded-xl bg-brand-purple/5 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple/10">
                                        <Upload className="h-5 w-5 text-brand-purple" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-neutral-800">
                                            {Object.values(documents).filter(Boolean).length} of 4 documents uploaded
                                        </p>
                                        <p className="text-xs text-neutral-500">You can proceed and upload remaining documents later.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ════════════ STEP 3: Review ════════════ */}
                    {currentStep === 3 && (
                        <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>
                            <div className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Review Your Application</h2>
                                <p className="mt-2 text-sm text-neutral-500">Please review all information before submitting.</p>

                                {/* Program Info */}
                                <div className="mt-8 rounded-xl bg-gradient-to-r from-brand-purple/5 to-brand-orange/5 p-6">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple">
                                        <GraduationCap className="h-4 w-4" /> Applying To
                                    </h3>
                                    <p className="mt-2 text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{course.title}</p>
                                    <p className="text-sm text-neutral-600">{university.name} • {university.country.flag} {university.location}</p>
                                    <div className="mt-2 flex gap-3 text-xs text-neutral-400">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                        <span>{course.level}</span>
                                    </div>
                                </div>

                                {/* Personal Info Summary */}
                                <div className="mt-6">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple">
                                        <User className="h-4 w-4" /> Personal Information
                                    </h3>
                                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                        {[
                                            { label: "Name", value: `${form.firstName} ${form.lastName}` },
                                            { label: "Email", value: form.email },
                                            { label: "Phone", value: form.phone },
                                            { label: "Nationality", value: form.nationality },
                                            { label: "Current City", value: form.currentCity },
                                        ].filter((i) => i.value.trim()).map((item) => (
                                            <div key={item.label} className="rounded-lg bg-neutral-50 px-4 py-3">
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase">{item.label}</p>
                                                <p className="text-sm font-medium text-neutral-800">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Academic Summary */}
                                <div className="mt-6">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple">
                                        <BookOpen className="h-4 w-4" /> Academic Background
                                    </h3>
                                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                        {[
                                            { label: "Qualification", value: form.previousDegree },
                                            { label: "Institution", value: form.previousInstitution },
                                            { label: "GPA", value: form.gpa },
                                            { label: "IELTS Score", value: form.ieltsScore },
                                        ].filter((i) => i.value.trim()).map((item) => (
                                            <div key={item.label} className="rounded-lg bg-neutral-50 px-4 py-3">
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase">{item.label}</p>
                                                <p className="text-sm font-medium text-neutral-800">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Documents Summary */}
                                <div className="mt-6">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-brand-purple">
                                        <Upload className="h-4 w-4" /> Documents
                                    </h3>
                                    <div className="mt-3 space-y-2">
                                        {[
                                            { key: "passport", label: "Passport Copy" },
                                            { key: "transcripts", label: "Academic Transcripts" },
                                            { key: "ielts", label: "IELTS / Language Certificate" },
                                            { key: "sop", label: "Statement of Purpose" },
                                        ].map((doc) => (
                                            <div key={doc.key} className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-3">
                                                {documents[doc.key] ? (
                                                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                ) : (
                                                    <div className="h-4 w-4 rounded-full border-2 border-neutral-300" />
                                                )}
                                                <span className="text-sm text-neutral-700">{doc.label}</span>
                                                {documents[doc.key] && (
                                                    <span className="ml-auto text-xs text-neutral-400">{documents[doc.key]!.name}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ════════════ STEP 4: Success ════════════ */}
                    {currentStep === 4 && (
                        <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: "easeInOut" }}>
                            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-12 text-center shadow-sm">
                                {/* Confetti-like particles */}
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute h-2 w-2 rounded-full"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            backgroundColor: ["#FF9400", "#662D91", "#4D2075", "#10b981", "#3b82f6"][i % 5],
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 1, 0],
                                            scale: [0, 1.5, 1, 0],
                                            y: [0, -30, -60, -100],
                                        }}
                                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                ))}

                                {/* Success icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                                    className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-200"
                                >
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </motion.div>

                                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                    className="relative z-10 mt-6 text-3xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                                    Application Submitted! 🎉
                                </motion.h2>

                                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                    className="relative z-10 mx-auto mt-3 max-w-md text-neutral-500">
                                    Your application for <span className="font-semibold text-brand-purple">{course.title}</span> at{" "}
                                    <span className="font-semibold text-brand-purple">{university.name}</span> has been successfully submitted.
                                </motion.p>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                    className="relative z-10 mt-6 rounded-xl bg-brand-orange/5 p-4 text-sm text-neutral-600">
                                    <p>📧 A confirmation email has been sent to <strong>{form.email || "your email"}</strong></p>
                                    <p className="mt-1">📋 Application Reference: <strong className="text-brand-purple">OS-{Date.now().toString(36).toUpperCase()}</strong></p>
                                </motion.div>

                                {/* Timeline */}
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                                    className="relative z-10 mx-auto mt-8 max-w-sm space-y-3 text-left">
                                    <h3 className="text-center text-sm font-bold text-neutral-800">What happens next?</h3>
                                    {[
                                        { step: "1", text: "Our team reviews your application (2-3 business days)" },
                                        { step: "2", text: "University evaluates your profile" },
                                        { step: "3", text: "You receive offer letter or feedback" },
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-[10px] font-bold text-white">{item.step}</span>
                                            <span className="text-sm text-neutral-600">{item.text}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                    className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                    <Link href="/dashboard/student"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all hover:shadow-xl hover:scale-105">
                                        <Sparkles className="h-4 w-4" /> Go to Student Dashboard
                                    </Link>
                                    <Link href="/programs"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-8 py-4 text-sm font-bold text-neutral-700 transition-all hover:bg-neutral-50">
                                        Browse More Programs
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── NAVIGATION FOOTER ─── */}
                {currentStep < 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex items-center justify-between">
                        <button onClick={goBack} disabled={currentStep === 1}
                            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${currentStep === 1
                                    ? "cursor-not-allowed text-neutral-300"
                                    : "text-neutral-600 hover:bg-neutral-100"
                                }`}>
                            <ArrowLeft className="h-4 w-4" /> Back
                        </button>

                        <button onClick={goNext}
                            className="group flex items-center gap-2 rounded-full bg-brand-orange px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl hover:scale-105 active:scale-[0.98]">
                            {currentStep === 3 ? (
                                <><Sparkles className="h-4 w-4" /> Submit Application</>
                            ) : (
                                <>Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
