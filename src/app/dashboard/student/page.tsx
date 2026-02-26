"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard, FileText, Upload, User, Calendar, Bell,
    LogOut, ChevronRight, Clock, CheckCircle, AlertCircle,
    Eye, ArrowRight, MapPin, GraduationCap, DollarSign,
    Sparkles, Menu, X, BookOpen, MessageCircle, Mail,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

/* ── Dummy Application Data ── */
const applications = [
    {
        id: "APP-X8K2M",
        program: "MSc Computer Science",
        university: "University of Manchester",
        country: "🇬🇧",
        status: "under-review",
        statusLabel: "Under Review",
        statusColor: "bg-amber-100 text-amber-700",
        submittedDate: "Feb 26, 2026",
        lastUpdate: "Feb 26, 2026",
        progress: 40,
        timeline: [
            { step: "Application Submitted", date: "Feb 26, 2026", done: true },
            { step: "Document Verification", date: "In Progress", done: false, active: true },
            { step: "University Review", date: "Pending", done: false },
            { step: "Offer Letter", date: "Pending", done: false },
            { step: "Visa Processing", date: "Pending", done: false },
            { step: "Enrolled", date: "Pending", done: false },
        ],
    },
    {
        id: "APP-R3P7Q",
        program: "MSc Artificial Intelligence",
        university: "Imperial College London",
        country: "🇬🇧",
        status: "offer",
        statusLabel: "Offer Received 🎉",
        statusColor: "bg-emerald-100 text-emerald-700",
        submittedDate: "Jan 15, 2026",
        lastUpdate: "Feb 20, 2026",
        progress: 65,
        timeline: [
            { step: "Application Submitted", date: "Jan 15, 2026", done: true },
            { step: "Document Verification", date: "Jan 18, 2026", done: true },
            { step: "University Review", date: "Feb 5, 2026", done: true },
            { step: "Offer Letter", date: "Feb 20, 2026", done: true },
            { step: "Visa Processing", date: "Pending", done: false, active: true },
            { step: "Enrolled", date: "Pending", done: false },
        ],
    },
    {
        id: "APP-N5W1J",
        program: "MSc Robotics, Cognition, Intelligence",
        university: "Technical University of Munich",
        country: "🇩🇪",
        status: "submitted",
        statusLabel: "Submitted",
        statusColor: "bg-blue-100 text-blue-700",
        submittedDate: "Feb 24, 2026",
        lastUpdate: "Feb 24, 2026",
        progress: 15,
        timeline: [
            { step: "Application Submitted", date: "Feb 24, 2026", done: true },
            { step: "Document Verification", date: "Pending", done: false, active: true },
            { step: "University Review", date: "Pending", done: false },
            { step: "Offer Letter", date: "Pending", done: false },
            { step: "Visa Processing", date: "Pending", done: false },
            { step: "Enrolled", date: "Pending", done: false },
        ],
    },
];

const documents = [
    { name: "Passport Copy", status: "verified", date: "Feb 26, 2026" },
    { name: "Academic Transcripts", status: "verified", date: "Feb 26, 2026" },
    { name: "IELTS Certificate", status: "verified", date: "Feb 26, 2026" },
    { name: "Statement of Purpose", status: "pending", date: "Feb 26, 2026" },
    { name: "Letter of Recommendation", status: "missing", date: "—" },
    { name: "Financial Statement", status: "missing", date: "—" },
];

const notifications = [
    { id: 1, text: "Your offer from Imperial College London is ready!", time: "2 hours ago", type: "success" },
    { id: 2, text: "Document verification in progress for Manchester application.", time: "5 hours ago", type: "info" },
    { id: 3, text: "Deadline reminder: TUM application closes May 31.", time: "1 day ago", type: "warning" },
];

type Tab = "overview" | "applications" | "documents" | "profile";

const sidebarItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "applications", label: "My Applications", icon: FileText },
    { id: "documents", label: "Documents", icon: Upload },
    { id: "profile", label: "My Profile", icon: User },
];

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [expandedApp, setExpandedApp] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* ─── SIDEBAR (Desktop) ─── */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
                <div className="flex flex-1 flex-col border-r border-neutral-200/60 bg-white">
                    {/* Logo */}
                    <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-5">
                        <LogoIcon size={36} />
                        <span className="text-lg font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${activeTab === item.id
                                    ? "bg-brand-orange/10 text-brand-orange"
                                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-brand-orange" : "text-neutral-400"}`} />
                                {item.label}
                                {item.id === "applications" && (
                                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                                        {applications.length}
                                    </span>
                                )}
                            </button>
                        ))}

                        <div className="pt-4">
                            <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-all">
                                <Calendar className="h-5 w-5 text-neutral-400" /> Book Consultation
                            </button>
                            <button className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-all">
                                <MessageCircle className="h-5 w-5 text-neutral-400" /> Support
                            </button>
                        </div>
                    </nav>

                    {/* User + Logout */}
                    <div className="border-t border-neutral-100 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-sm font-bold text-white">
                                AA
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-semibold text-neutral-800">Adil Ahmed</p>
                                <p className="truncate text-[10px] text-neutral-400">adil@example.com</p>
                            </div>
                        </div>
                        <Link href="/" className="mt-2 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
                            <ArrowRight className="h-4 w-4 rotate-180" /> Back to Website
                        </Link>
                        <Link href="/login" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <LogOut className="h-4 w-4" /> Sign Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ─── MOBILE SIDEBAR ─── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden" onClick={() => setSidebarOpen(false)} />
                        <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 border-r border-neutral-200/60 bg-white lg:hidden">
                            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <LogoIcon size={32} />
                                    <span className="text-lg font-black text-brand-purple font-[family-name:var(--font-heading)]">
                                        Orange<span className="text-brand-orange">Studies</span>
                                    </span>
                                </div>
                                <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5 text-neutral-400" /></button>
                            </div>
                            <nav className="space-y-1 px-3 py-4">
                                {sidebarItems.map((item) => (
                                    <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                                        className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${activeTab === item.id ? "bg-brand-orange/10 text-brand-orange" : "text-neutral-500"
                                            }`}>
                                        <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-brand-orange" : "text-neutral-400"}`} />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ─── MAIN CONTENT ─── */}
            <main className="flex-1 lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200/60 bg-white/90 px-6 py-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu className="h-5 w-5 text-neutral-600" />
                        </button>
                        <h1 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            {sidebarItems.find((i) => i.id === activeTab)?.label || "Dashboard"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200">
                            <Bell className="h-4 w-4" />
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[8px] font-bold text-white">
                                {notifications.length}
                            </span>
                        </button>
                        <Link href="/programs" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                            <Sparkles className="h-3.5 w-3.5" /> Apply to More
                        </Link>
                    </div>
                </header>

                <div className="p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        {/* ════════════ OVERVIEW TAB ════════════ */}
                        {activeTab === "overview" && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                                {/* Welcome Banner */}
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple via-brand-deep to-brand-purple p-8 text-white">
                                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-orange/20 blur-3xl" />
                                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
                                    <div className="relative z-10">
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Welcome back, Adil! 👋</h2>
                                        <p className="mt-2 max-w-lg text-sm text-white/70">
                                            You have {applications.length} active applications. Your Imperial College offer is awaiting acceptance.
                                        </p>
                                        <button onClick={() => setActiveTab("applications")} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25">
                                            View Applications <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {[
                                        { label: "Active Applications", value: String(applications.length), icon: FileText, color: "text-brand-orange", bg: "bg-brand-orange/10" },
                                        { label: "Offers Received", value: "1", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
                                        { label: "Documents Uploaded", value: String(documents.filter((d) => d.status === "verified").length), icon: Upload, color: "text-brand-purple", bg: "bg-brand-purple/10" },
                                        { label: "Pending Actions", value: String(documents.filter((d) => d.status !== "verified").length), icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
                                    ].map((stat, i) => (
                                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                            className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                            </div>
                                            <p className="mt-3 text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{stat.value}</p>
                                            <p className="text-xs text-neutral-500">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Recent Applications + Notifications */}
                                <div className="grid gap-6 lg:grid-cols-5">
                                    {/* Applications (3/5) */}
                                    <div className="lg:col-span-3 rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Recent Applications</h3>
                                            <button onClick={() => setActiveTab("applications")} className="text-xs font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">
                                                View All →
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {applications.map((app) => (
                                                <div key={app.id} className="flex items-center gap-4 rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100">
                                                    <span className="text-2xl">{app.country}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="truncate text-sm font-semibold text-neutral-800">{app.program}</p>
                                                        <p className="truncate text-xs text-neutral-400">{app.university}</p>
                                                    </div>
                                                    <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold ${app.statusColor}`}>
                                                        {app.statusLabel}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notifications (2/5) */}
                                    <div className="lg:col-span-2 rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                                        <h3 className="mb-4 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Notifications</h3>
                                        <div className="space-y-3">
                                            {notifications.map((n) => (
                                                <div key={n.id} className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3">
                                                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${n.type === "success" ? "bg-emerald-100" : n.type === "warning" ? "bg-amber-100" : "bg-blue-100"
                                                        }`}>
                                                        {n.type === "success" ? <CheckCircle className="h-3 w-3 text-emerald-600" /> :
                                                            n.type === "warning" ? <AlertCircle className="h-3 w-3 text-amber-600" /> :
                                                                <Eye className="h-3 w-3 text-blue-600" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-neutral-700">{n.text}</p>
                                                        <p className="mt-1 text-[10px] text-neutral-400">{n.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ════════════ APPLICATIONS TAB ════════════ */}
                        {activeTab === "applications" && (
                            <motion.div key="applications" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">My Applications</h2>
                                        <p className="text-sm text-neutral-500">Track the status of all your applications in one place.</p>
                                    </div>
                                    <Link href="/programs" className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                                        <Sparkles className="h-4 w-4" /> New Application
                                    </Link>
                                </div>

                                {applications.map((app, i) => (
                                    <motion.div key={app.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                                        className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm">
                                        {/* Card Header */}
                                        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                                            onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl">{app.country}</span>
                                                <div>
                                                    <p className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{app.program}</p>
                                                    <p className="text-sm text-neutral-500">{app.university}</p>
                                                    <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {app.submittedDate}</span>
                                                        <span>Ref: {app.id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`rounded-full px-4 py-1.5 text-xs font-bold ${app.statusColor}`}>
                                                    {app.statusLabel}
                                                </span>
                                                <motion.div animate={{ rotate: expandedApp === app.id ? 90 : 0 }}>
                                                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div className="px-6 pb-2">
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                                <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                                                    initial={{ width: 0 }} animate={{ width: `${app.progress}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                                            </div>
                                        </div>

                                        {/* Expanded Timeline */}
                                        <AnimatePresence>
                                            {expandedApp === app.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-neutral-100 px-6 py-6">
                                                        <h4 className="mb-4 text-sm font-bold text-neutral-800">Application Timeline</h4>
                                                        <div className="space-y-0">
                                                            {app.timeline.map((step, si) => (
                                                                <div key={step.step} className="flex items-start gap-4">
                                                                    <div className="flex flex-col items-center">
                                                                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-emerald-500" : step.active ? "bg-brand-orange animate-pulse-soft" : "bg-neutral-200"
                                                                            }`}>
                                                                            {step.done ? <CheckCircle className="h-3.5 w-3.5 text-white" /> :
                                                                                step.active ? <Clock className="h-3.5 w-3.5 text-white" /> :
                                                                                    <div className="h-2 w-2 rounded-full bg-neutral-400" />}
                                                                        </div>
                                                                        {si < app.timeline.length - 1 && (
                                                                            <div className={`w-0.5 h-8 ${step.done ? "bg-emerald-300" : "bg-neutral-200"}`} />
                                                                        )}
                                                                    </div>
                                                                    <div className="pb-6">
                                                                        <p className={`text-sm font-medium ${step.done ? "text-neutral-800" : step.active ? "text-brand-orange font-semibold" : "text-neutral-400"}`}>
                                                                            {step.step}
                                                                        </p>
                                                                        <p className="text-xs text-neutral-400">{step.date}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* ════════════ DOCUMENTS TAB ════════════ */}
                        {activeTab === "documents" && (
                            <motion.div key="documents" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">My Documents</h2>
                                    <p className="text-sm text-neutral-500">Manage and upload the documents required for your applications.</p>
                                </div>

                                {/* Upload Progress Summary */}
                                <div className="rounded-2xl bg-gradient-to-r from-brand-purple/5 to-brand-orange/5 p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-800">{documents.filter((d) => d.status === "verified").length} of {documents.length} documents verified</p>
                                            <p className="text-xs text-neutral-500">Keep your profile complete for faster processing.</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-brand-purple font-[family-name:var(--font-heading)]">
                                                {Math.round((documents.filter((d) => d.status === "verified").length / documents.length) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                                        <div className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-orange"
                                            style={{ width: `${(documents.filter((d) => d.status === "verified").length / documents.length) * 100}%` }} />
                                    </div>
                                </div>

                                {/* Documents Grid */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {documents.map((doc, i) => (
                                        <motion.div key={doc.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                                            className="group flex items-center justify-between rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                                            <div className="flex items-center gap-4">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${doc.status === "verified" ? "bg-emerald-100" : doc.status === "pending" ? "bg-amber-100" : "bg-neutral-100"
                                                    }`}>
                                                    {doc.status === "verified" ? <CheckCircle className="h-5 w-5 text-emerald-600" /> :
                                                        doc.status === "pending" ? <Clock className="h-5 w-5 text-amber-600" /> :
                                                            <Upload className="h-5 w-5 text-neutral-400" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-neutral-800">{doc.name}</p>
                                                    <p className="text-xs text-neutral-400">
                                                        {doc.status === "verified" ? `Verified • ${doc.date}` : doc.status === "pending" ? "Under Review" : "Not uploaded"}
                                                    </p>
                                                </div>
                                            </div>
                                            {doc.status === "missing" && (
                                                <button className="shrink-0 rounded-lg bg-brand-orange/10 px-3 py-1.5 text-xs font-bold text-brand-orange transition-all hover:bg-brand-orange hover:text-white">
                                                    Upload
                                                </button>
                                            )}
                                            {doc.status === "verified" && (
                                                <span className="shrink-0 text-[10px] font-bold text-emerald-600">✓ Verified</span>
                                            )}
                                            {doc.status === "pending" && (
                                                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Pending</span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ════════════ PROFILE TAB ════════════ */}
                        {activeTab === "profile" && (
                            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">My Profile</h2>
                                    <p className="text-sm text-neutral-500">Manage your personal information and preferences.</p>
                                </div>

                                {/* Profile Card */}
                                <div className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange text-2xl font-black text-white shadow-lg shadow-brand-purple/20">
                                            AA
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Adil Ahmed</h3>
                                            <p className="text-sm text-neutral-500">Student Applicant</p>
                                            <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start text-xs text-neutral-400">
                                                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> adil@example.com</span>
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Dhaka, Bangladesh</span>
                                                <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> BSc Computer Science</span>
                                            </div>
                                        </div>
                                        <button className="rounded-xl border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Fields */}
                                <div className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                                    <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] mb-6">Personal Details</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {[
                                            { label: "Full Name", value: "Adil Ahmed" },
                                            { label: "Email", value: "adil@example.com" },
                                            { label: "Phone", value: "+880 1700-000000" },
                                            { label: "Date of Birth", value: "January 15, 2000" },
                                            { label: "Nationality", value: "Bangladeshi" },
                                            { label: "Current City", value: "Dhaka" },
                                            { label: "Highest Qualification", value: "BSc Computer Science" },
                                            { label: "Previous Institution", value: "University of Dhaka" },
                                            { label: "GPA", value: "3.75 / 4.00" },
                                            { label: "IELTS Score", value: "7.5" },
                                        ].map(({ label, value }) => (
                                            <div key={label} className="rounded-xl bg-neutral-50 px-5 py-4">
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">{label}</p>
                                                <p className="mt-1 text-sm font-medium text-neutral-800">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
