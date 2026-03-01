"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft, Mail, Phone, Globe, MapPin, Shield, ShieldCheck,
    GraduationCap, Calendar, FileText, CheckCircle, Clock, Eye,
    Upload, AlertCircle,
} from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

interface UserDetail {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    nationality: string;
    currentCity: string;
    emailVerified: string | null;
    joinedDate: string;
    applications: {
        id: string;
        program: string;
        university: string;
        status: string;
        date: string;
    }[];
    documents: {
        id: string;
        name: string;
        status: string;
        fileUrl: string;
        date: string;
    }[];
}

const ROLE_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    ADMIN: { icon: <ShieldCheck className="h-4 w-4" />, color: "text-red-700", bg: "bg-red-100" },
    MANAGER: { icon: <Shield className="h-4 w-4" />, color: "text-purple-700", bg: "bg-purple-100" },
    STUDENT: { icon: <GraduationCap className="h-4 w-4" />, color: "text-blue-700", bg: "bg-blue-100" },
};

export default function UserDetailClient({ user }: { user: UserDetail }) {
    const rm = ROLE_META[user.role] || ROLE_META.STUDENT;
    const initials = user.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="space-y-6">
            {/* Back */}
            <Link href="/dashboard/admin/users" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-brand-purple transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Users
            </Link>

            {/* ─── Profile Card ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange text-2xl font-black text-white shadow-lg shadow-brand-purple/20">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{user.fullName}</h2>
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${rm.bg} ${rm.color}`}>
                                {rm.icon} {user.role}
                            </span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: <Mail className="h-3.5 w-3.5" />, label: "Email", value: user.email },
                                { icon: <Phone className="h-3.5 w-3.5" />, label: "Phone", value: user.phone },
                                { icon: <Globe className="h-3.5 w-3.5" />, label: "Nationality", value: user.nationality },
                                { icon: <MapPin className="h-3.5 w-3.5" />, label: "City", value: user.currentCity },
                                { icon: <Calendar className="h-3.5 w-3.5" />, label: "Joined", value: user.joinedDate },
                                { icon: user.emailVerified ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />, label: "Email Verified", value: user.emailVerified || "Not verified" },
                            ].map((f) => (
                                <div key={f.label} className="flex items-center gap-2 text-sm text-neutral-600">
                                    <span className="text-neutral-400">{f.icon}</span>
                                    <span className="font-medium text-neutral-400">{f.label}:</span>
                                    <span className="truncate font-semibold">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ─── Applications ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                        <FileText className="h-4 w-4 text-brand-purple" /> Applications ({user.applications.length})
                    </h3>
                </div>
                {user.applications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Program</th>
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">University</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Status</th>
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {user.applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-neutral-800">{app.program}</td>
                                        <td className="hidden md:table-cell px-6 py-4 text-neutral-500">{app.university}</td>
                                        <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                                        <td className="hidden md:table-cell px-6 py-4 text-xs text-neutral-400 whitespace-nowrap">{app.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/dashboard/admin/application/${app.id}`}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-brand-purple hover:text-white hover:border-brand-purple">
                                                <Eye className="h-3 w-3" /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <FileText className="h-10 w-10 text-gray-200" />
                        <p className="mt-3 text-sm text-gray-400">No applications found for this user.</p>
                    </div>
                )}
            </motion.div>

            {/* ─── Documents ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                        <Upload className="h-4 w-4 text-brand-orange" /> Documents ({user.documents.length})
                    </h3>
                </div>
                {user.documents.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Document</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Status</th>
                                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {user.documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-neutral-800">{doc.name}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={doc.status} />
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 text-xs text-neutral-400 whitespace-nowrap">{doc.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            {doc.fileUrl ? (
                                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-brand-orange hover:text-white hover:border-brand-orange">
                                                    <Eye className="h-3 w-3" /> View
                                                </a>
                                            ) : (
                                                <span className="text-xs text-neutral-400">No file</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Upload className="h-10 w-10 text-gray-200" />
                        <p className="mt-3 text-sm text-gray-400">No documents uploaded by this user.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
