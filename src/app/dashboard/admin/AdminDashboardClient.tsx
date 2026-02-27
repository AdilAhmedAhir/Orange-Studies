"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard, Users, FileText, GraduationCap, Building2,
    Clock, CheckCircle, AlertCircle, ArrowRight,
    TrendingUp, Eye, MessageCircle, Plus, Loader2, Globe,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { createUniversity, createProgram } from "@/app/actions/admin";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";

/* ── Types ── */
interface KPI {
    totalStudents: number;
    totalApplications: number;
    pendingReview: number;
    totalPrograms: number;
    totalUniversities: number;
}

interface StatusBreakdown {
    status: string;
    count: number;
}

interface RecentApp {
    id: string;
    appId: string;
    studentName: string;
    studentEmail: string;
    program: string;
    university: string;
    status: string;
    date: string;
}

interface RecentLead {
    id: string;
    name: string;
    email: string;
    type: string;
    status: string;
    date: string;
}

interface UniversityOption {
    id: string;
    name: string;
}

interface CountryOption {
    id: string;
    name: string;
    flag: string;
}

function formatStatus(status: string): { label: string; color: string } {
    const map: Record<string, { label: string; color: string }> = {
        SUBMITTED: { label: "Submitted", color: "bg-blue-100 text-blue-700" },
        UNDER_REVIEW: { label: "Under Review", color: "bg-amber-100 text-amber-700" },
        OFFER_RECEIVED: { label: "Offer Sent", color: "bg-emerald-100 text-emerald-700" },
        OFFER_ACCEPTED: { label: "Accepted", color: "bg-emerald-100 text-emerald-700" },
        VISA_PROCESSING: { label: "Visa", color: "bg-purple-100 text-purple-700" },
        ENROLLED: { label: "Enrolled", color: "bg-green-100 text-green-700" },
        REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
    };
    return map[status] || { label: status, color: "bg-neutral-100 text-neutral-700" };
}

export default function AdminDashboardClient({
    kpi,
    statusBreakdown,
    recentApplications,
    recentLeads,
    adminName,
    universities,
    countries,
}: {
    kpi: KPI;
    statusBreakdown: StatusBreakdown[];
    recentApplications: RecentApp[];
    recentLeads: RecentLead[];
    adminName: string;
    universities: UniversityOption[];
    countries: CountryOption[];
}) {
    const [activeTab, setActiveTab] = useState<"overview" | "data">("overview");

    /* ── University Form State ── */
    const [uniForm, setUniForm] = useState({ name: "", location: "", countryId: "", ranking: "", description: "" });
    const [uniLoading, setUniLoading] = useState(false);
    const [uniMsg, setUniMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    /* ── Program Form State ── */
    const [progForm, setProgForm] = useState({ title: "", universityId: "", level: "Bachelor", duration: "", tuitionFee: "", currency: "USD", description: "", discipline: "", studyMode: "Full-time" });
    const [progLoading, setProgLoading] = useState(false);
    const [progMsg, setProgMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    async function handleCreateUni(e: React.FormEvent) {
        e.preventDefault();
        setUniLoading(true); setUniMsg(null);
        const res = await createUniversity({ ...uniForm, ranking: parseInt(uniForm.ranking) || 999 });
        setUniLoading(false);
        if (res.success) {
            setUniMsg({ type: "ok", text: "University created successfully!" });
            setUniForm({ name: "", location: "", countryId: "", ranking: "", description: "" });
        } else {
            setUniMsg({ type: "err", text: res.error || "Failed." });
        }
    }

    async function handleCreateProg(e: React.FormEvent) {
        e.preventDefault();
        setProgLoading(true); setProgMsg(null);
        const res = await createProgram({ ...progForm, tuitionFee: parseInt(progForm.tuitionFee) || 0 });
        setProgLoading(false);
        if (res.success) {
            setProgMsg({ type: "ok", text: "Program created successfully!" });
            setProgForm({ title: "", universityId: "", level: "Bachelor", duration: "", tuitionFee: "", currency: "USD", description: "", discipline: "", studyMode: "Full-time" });
        } else {
            setProgMsg({ type: "err", text: res.error || "Failed." });
        }
    }
    return (
        <AdminCMSLayout adminName={adminName} title="Dashboard">
            {/* ─── Welcome ─── */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple via-brand-deep to-brand-purple p-8 text-white">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-orange/20 blur-3xl" />
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Welcome back, {adminName} 🛡️</h1>
                    <p className="mt-2 text-sm text-white/60">
                        {kpi.totalApplications} total applications across {kpi.totalPrograms} programs in {kpi.totalUniversities} universities.
                    </p>
                </div>
            </div>

            {/* ─── Tab Bar ─── */}
            <div className="flex gap-1 rounded-xl bg-neutral-100 p-1">
                <button onClick={() => setActiveTab("overview")} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${activeTab === "overview" ? "bg-white text-brand-purple shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}>
                    <LayoutDashboard className="inline h-4 w-4 mr-1.5 -mt-0.5" /> Overview
                </button>
                <button onClick={() => setActiveTab("data")} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${activeTab === "data" ? "bg-white text-brand-purple shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}>
                    <Plus className="inline h-4 w-4 mr-1.5 -mt-0.5" /> Quick Add
                </button>
            </div>

            {activeTab === "overview" && (<>

                {/* ─── KPI Cards ─── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        { label: "Total Students", value: kpi.totalStudents, icon: Users, color: "text-brand-purple", bg: "bg-brand-purple/10" },
                        { label: "Applications", value: kpi.totalApplications, icon: FileText, color: "text-brand-orange", bg: "bg-brand-orange/10" },
                        { label: "Pending Review", value: kpi.pendingReview, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
                        { label: "Programs", value: kpi.totalPrograms, icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-100" },
                        { label: "Universities", value: kpi.totalUniversities, icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm"
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                            <p className="mt-3 text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{stat.value}</p>
                            <p className="text-xs text-neutral-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ─── Status Breakdown + Recent Apps ─── */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Status Breakdown */}
                    <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <TrendingUp className="h-5 w-5 text-brand-orange" /> Status Breakdown
                        </h3>
                        <div className="mt-4 space-y-3">
                            {statusBreakdown.length > 0 ? (
                                statusBreakdown.map((item) => {
                                    const { label, color } = formatStatus(item.status);
                                    const pct = kpi.totalApplications > 0 ? Math.round((item.count / kpi.totalApplications) * 100) : 0;
                                    return (
                                        <div key={item.status}>
                                            <div className="flex items-center justify-between">
                                                <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${color}`}>{label}</span>
                                                <span className="text-sm font-bold text-neutral-700">{item.count}</span>
                                            </div>
                                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                                <motion.div
                                                    className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.6, delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-neutral-400">No applications yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="lg:col-span-2 rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                <FileText className="h-5 w-5 text-brand-purple" /> Recent Applications
                            </h3>
                        </div>

                        {recentApplications.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-neutral-100">
                                            <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Student</th>
                                            <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Program</th>
                                            <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">University</th>
                                            <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Status</th>
                                            <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Date</th>
                                            <th className="pb-3 text-right text-[10px] font-bold uppercase text-neutral-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentApplications.map((app, i) => {
                                            const { label, color } = formatStatus(app.status);
                                            return (
                                                <motion.tr
                                                    key={app.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: i * 0.04 }}
                                                    className="border-b border-neutral-50 last:border-0"
                                                >
                                                    <td className="py-3">
                                                        <p className="font-semibold text-neutral-800">{app.studentName}</p>
                                                        <p className="text-[10px] text-neutral-400">{app.studentEmail}</p>
                                                    </td>
                                                    <td className="py-3 text-neutral-600 max-w-[180px] truncate">{app.program}</td>
                                                    <td className="py-3 text-neutral-500 max-w-[140px] truncate">{app.university}</td>
                                                    <td className="py-3">
                                                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${color}`}>{label}</span>
                                                    </td>
                                                    <td className="py-3 text-xs text-neutral-400 whitespace-nowrap">{app.date}</td>
                                                    <td className="py-3 text-right">
                                                        <Link href={`/dashboard/admin/application/${app.appId}`}
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-purple/10 px-3 py-1.5 text-[10px] font-bold text-brand-purple transition-all hover:bg-brand-purple hover:text-white">
                                                            <Eye className="h-3 w-3" /> Manage
                                                        </Link>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <FileText className="h-10 w-10 text-neutral-300" />
                                <p className="mt-3 text-sm text-neutral-400">No applications submitted yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── Recent Leads ─── */}
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <MessageCircle className="h-5 w-5 text-brand-orange" /> Recent Leads & Consultations
                        </h3>
                    </div>

                    {recentLeads.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-100">
                                        <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Name</th>
                                        <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Email</th>
                                        <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Type</th>
                                        <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Status</th>
                                        <th className="pb-3 text-left text-[10px] font-bold uppercase text-neutral-400">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLeads.map((lead, i) => {
                                        const typeMap: Record<string, { label: string; color: string }> = {
                                            CONSULTATION_ONLINE: { label: "Online Consult", color: "bg-purple-100 text-purple-700" },
                                            CONSULTATION_OFFLINE: { label: "In-Person", color: "bg-blue-100 text-blue-700" },
                                            CONTACT: { label: "Contact", color: "bg-amber-100 text-amber-700" },
                                        };
                                        const typeInfo = typeMap[lead.type] || { label: lead.type, color: "bg-neutral-100 text-neutral-700" };
                                        return (
                                            <motion.tr
                                                key={lead.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="border-b border-neutral-50 last:border-0"
                                            >
                                                <td className="py-3 font-semibold text-neutral-800">{lead.name}</td>
                                                <td className="py-3 text-neutral-500">{lead.email}</td>
                                                <td className="py-3">
                                                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${typeInfo.color}`}>{typeInfo.label}</span>
                                                </td>
                                                <td className="py-3">
                                                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${lead.status === "NEW" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`}>{lead.status}</span>
                                                </td>
                                                <td className="py-3 text-xs text-neutral-400 whitespace-nowrap">{lead.date}</td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <MessageCircle className="h-10 w-10 text-neutral-300" />
                            <p className="mt-3 text-sm text-neutral-400">No leads captured yet.</p>
                        </div>
                    )}
                </div>
            </>)}

            {/* ═══════════════════════════════════════════
                    DATA MANAGEMENT TAB
                   ═══════════════════════════════════════════ */}
            {activeTab === "data" && (
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* ── Create University ── */}
                    <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] mb-4">
                            <Building2 className="h-5 w-5 text-brand-purple" /> Add University
                        </h3>
                        {uniMsg && (
                            <div className={`mb-4 rounded-lg px-4 py-3 text-xs font-semibold ${uniMsg.type === "ok" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                                {uniMsg.text}
                            </div>
                        )}
                        <form onSubmit={handleCreateUni} className="space-y-3">
                            <input type="text" placeholder="University Name *" required value={uniForm.name} onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <input type="text" placeholder="Location (e.g. London, UK)" value={uniForm.location} onChange={(e) => setUniForm({ ...uniForm, location: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <select required value={uniForm.countryId} onChange={(e) => setUniForm({ ...uniForm, countryId: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                <option value="">Select Country *</option>
                                {countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                            </select>
                            <input type="number" placeholder="Ranking" value={uniForm.ranking} onChange={(e) => setUniForm({ ...uniForm, ranking: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <textarea placeholder="Description" value={uniForm.description} onChange={(e) => setUniForm({ ...uniForm, description: e.target.value })} rows={3} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none" />
                            <button type="submit" disabled={uniLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl disabled:opacity-60">
                                {uniLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><Plus className="h-4 w-4" /> Create University</>}
                            </button>
                        </form>
                    </div>

                    {/* ── Create Program ── */}
                    <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] mb-4">
                            <GraduationCap className="h-5 w-5 text-brand-orange" /> Add Program
                        </h3>
                        {progMsg && (
                            <div className={`mb-4 rounded-lg px-4 py-3 text-xs font-semibold ${progMsg.type === "ok" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                                {progMsg.text}
                            </div>
                        )}
                        <form onSubmit={handleCreateProg} className="space-y-3">
                            <input type="text" placeholder="Program Title *" required value={progForm.title} onChange={(e) => setProgForm({ ...progForm, title: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <select required value={progForm.universityId} onChange={(e) => setProgForm({ ...progForm, universityId: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                <option value="">Select University *</option>
                                {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <select value={progForm.level} onChange={(e) => setProgForm({ ...progForm, level: e.target.value })} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                    <option>Bachelor</option><option>Master</option><option>PhD</option><option>Diploma</option>
                                </select>
                                <input type="text" placeholder="Duration (e.g. 4 years)" value={progForm.duration} onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" placeholder="Tuition Fee/yr" value={progForm.tuitionFee} onChange={(e) => setProgForm({ ...progForm, tuitionFee: e.target.value })} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                                <select value={progForm.currency} onChange={(e) => setProgForm({ ...progForm, currency: e.target.value })} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                    <option>USD</option><option>GBP</option><option>EUR</option><option>CAD</option><option>AUD</option><option>MYR</option><option>BDT</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Discipline (e.g. Engineering & Technology)" value={progForm.discipline} onChange={(e) => setProgForm({ ...progForm, discipline: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20" />
                            <select value={progForm.studyMode} onChange={(e) => setProgForm({ ...progForm, studyMode: e.target.value })} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20">
                                <option>Full-time</option><option>Part-time</option><option>Both</option>
                            </select>
                            <textarea placeholder="Description" value={progForm.description} onChange={(e) => setProgForm({ ...progForm, description: e.target.value })} rows={3} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 resize-none" />
                            <button type="submit" disabled={progLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl disabled:opacity-60">
                                {progLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><Plus className="h-4 w-4" /> Create Program</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminCMSLayout>
    );
}
