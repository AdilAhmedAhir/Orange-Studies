"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard, Users, FileText, GraduationCap, Building2,
    Clock, CheckCircle, AlertCircle, ArrowRight, LogOut,
    TrendingUp, Eye, MessageCircle,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

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
}: {
    kpi: KPI;
    statusBreakdown: StatusBreakdown[];
    recentApplications: RecentApp[];
    recentLeads: RecentLead[];
    adminName: string;
}) {
    return (
        <div className="min-h-screen bg-neutral-50">
            {/* ─── TOP HEADER ─── */}
            <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <LogoIcon size={32} />
                        <span className="text-lg font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                        <span className="ml-2 rounded-full bg-brand-purple/10 px-3 py-1 text-[10px] font-bold text-brand-purple uppercase">Admin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-500">{adminName}</span>
                        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors">
                            <LogOut className="h-3.5 w-3.5" /> Exit
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                {/* ─── Welcome ─── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple via-brand-deep to-brand-purple p-8 text-white">
                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-orange/20 blur-3xl" />
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Admin Dashboard 🛡️</h1>
                        <p className="mt-2 text-sm text-white/60">
                            {kpi.totalApplications} total applications across {kpi.totalPrograms} programs in {kpi.totalUniversities} universities.
                        </p>
                    </div>
                </div>

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
            </div>
        </div>
    );
}
