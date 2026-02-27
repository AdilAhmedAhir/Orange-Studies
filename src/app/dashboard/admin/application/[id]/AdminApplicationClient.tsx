"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft, User, GraduationCap, FileText, Clock, CheckCircle,
    AlertCircle, Eye, Building2, Calendar, Mail, Phone, MapPin,
    Globe, Loader2, ChevronDown, Shield, Download, Trash2,
    RotateCcw, History, X,
} from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import StatusBadge from "@/components/ui/StatusBadge";
import { updateApplicationStatus, requestDocReupload, deleteDocument } from "@/app/actions/admin";

/* ── Types ── */
interface AppData {
    id: string;
    refCode: string;
    status: string;
    progress: number;
    createdAt: string;
    updatedAt: string;
    student: {
        fullName: string;
        email: string;
        phone: string;
        nationality: string;
        currentCity: string;
        memberSince: string;
    };
    program: {
        title: string;
        level: string;
        duration: string;
        tuitionFee: number;
        currency: string;
    };
    university: {
        name: string;
        location: string;
    };
    timeline: { step: string; date: string; done: boolean; active: boolean }[];
    documents: {
        id: string;
        name: string;
        fileName: string;
        fileUrl: string;
        status: string;
        date: string;
        requiresReupload: boolean;
        adminFeedback: string;
    }[];
    auditLogs: {
        id: string;
        action: string;
        userEmail: string;
        details: string;
        createdAt: string;
    }[];
}

const STATUS_OPTIONS = [
    { value: "SUBMITTED", label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { value: "UNDER_REVIEW", label: "Under Review", color: "bg-amber-100 text-amber-700 border-amber-200" },
    { value: "OFFER_RECEIVED", label: "Offer Sent", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { value: "OFFER_ACCEPTED", label: "Offer Accepted", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { value: "VISA_PROCESSING", label: "Visa Processing", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { value: "ENROLLED", label: "Enrolled", color: "bg-green-100 text-green-700 border-green-200" },
    { value: "REJECTED", label: "Rejected", color: "bg-red-100 text-red-700 border-red-200" },
];

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
    STATUS_CHANGED: { label: "Status Changed", color: "bg-blue-100 text-blue-700" },
    REUPLOAD_REQUESTED: { label: "Re-upload Requested", color: "bg-amber-100 text-amber-700" },
    DOCUMENT_DELETED: { label: "Document Deleted", color: "bg-red-100 text-red-700" },
    DOCUMENT_UPLOADED: { label: "Document Uploaded", color: "bg-emerald-100 text-emerald-700" },
    NOTE_ADDED: { label: "Note Added", color: "bg-neutral-100 text-neutral-700" },
};

function getStatusStyle(status: string) {
    return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

export default function AdminApplicationClient({ application }: { application: AppData }) {
    const [currentStatus, setCurrentStatus] = useState(application.status);
    const [updating, setUpdating] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [docActions, setDocActions] = useState<Record<string, boolean>>({});
    const [reuploadModal, setReuploadModal] = useState<{ docId: string; docName: string } | null>(null);
    const [reuploadFeedback, setReuploadFeedback] = useState("");
    const [reuploadLoading, setReuploadLoading] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;
        setUpdating(true);
        setStatusMessage("");
        try {
            const result = await updateApplicationStatus(application.id, newStatus);
            if (result.success) {
                setCurrentStatus(newStatus);
                setStatusMessage("Status updated successfully.");
            } else {
                setStatusMessage(result.error || "Update failed.");
            }
        } catch {
            setStatusMessage("An unexpected error occurred.");
        } finally {
            setUpdating(false);
            setTimeout(() => setStatusMessage(""), 3000);
        }
    };

    const handleDeleteDoc = async (docId: string) => {
        if (!confirm("Delete this document permanently? This cannot be undone.")) return;
        setDocActions((prev) => ({ ...prev, [docId]: true }));
        try {
            const result = await deleteDocument(docId, application.id);
            if (!result.success) alert(result.error || "Delete failed.");
        } catch {
            alert("Failed to delete document.");
        } finally {
            setDocActions((prev) => ({ ...prev, [docId]: false }));
        }
    };

    const handleRequestReupload = async () => {
        if (!reuploadModal || !reuploadFeedback.trim()) return;
        setReuploadLoading(true);
        try {
            const result = await requestDocReupload(reuploadModal.docId, reuploadFeedback, application.id);
            if (result.success) {
                setReuploadModal(null);
                setReuploadFeedback("");
            } else {
                alert(result.error || "Failed.");
            }
        } catch {
            alert("An error occurred.");
        } finally {
            setReuploadLoading(false);
        }
    };

    const statusStyle = getStatusStyle(currentStatus);

    return (
        <AdminCMSLayout>
            {/* ─── Breadcrumb ─── */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <Link href="/dashboard/admin" className="hover:text-gray-700 transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">Application {application.refCode}</span>
            </div>

            {/* ─── STATUS CONTROL BAR ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                            Application Review
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500">
                            Ref: <span className="font-mono font-semibold text-brand-purple">{application.refCode}</span>
                            <span className="mx-2 text-neutral-300">•</span>
                            Submitted {application.createdAt}
                            <span className="mx-2 text-neutral-300">•</span>
                            Updated {application.updatedAt}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={currentStatus}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={updating}
                                className={`appearance-none rounded-xl border-2 px-5 py-2.5 pr-10 text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple/20 disabled:opacity-60 ${statusStyle.color}`}
                            >
                                {STATUS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none opacity-40" />
                        </div>
                        {updating && <Loader2 className="h-5 w-5 animate-spin text-brand-purple" />}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                        animate={{ width: `${application.progress}%` }}
                        transition={{ duration: 0.8 }}
                    />
                </div>

                {statusMessage && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`mt-3 text-xs font-semibold ${statusMessage.includes("success") ? "text-emerald-600" : "text-red-500"}`}>
                        {statusMessage}
                    </motion.p>
                )}
            </motion.div>

            {/* ─── MAIN CONTENT GRID ─── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* ─── LEFT COLUMN ─── */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Student Profile */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <User className="h-5 w-5 text-brand-purple" /> Student Profile
                        </h3>
                        <div className="mt-4 flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange text-lg font-bold text-white">
                                {application.student.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-lg font-bold text-neutral-900">{application.student.fullName}</p>
                                <p className="text-sm text-neutral-500">Member since {application.student.memberSince}</p>
                            </div>
                        </div>
                        <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
                            {[
                                { icon: Mail, label: "Email", value: application.student.email },
                                { icon: Phone, label: "Phone", value: application.student.phone },
                                { icon: Globe, label: "Nationality", value: application.student.nationality },
                                { icon: MapPin, label: "Current City", value: application.student.currentCity },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3">
                                    <item.icon className="h-4 w-4 shrink-0 text-neutral-400" />
                                    <div>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase">{item.label}</p>
                                        <p className="text-sm font-medium text-neutral-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Program Details */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <GraduationCap className="h-5 w-5 text-brand-orange" /> Program Details
                        </h3>
                        <div className="mt-4 rounded-xl bg-gradient-to-r from-brand-purple/5 to-brand-orange/5 p-5">
                            <p className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{application.program.title}</p>
                            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-600">
                                <Building2 className="h-4 w-4 text-neutral-400" />
                                <span>{application.university.name}</span>
                                <span className="text-neutral-300">•</span>
                                <span>{application.university.location}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3 text-xs">
                                <span className="rounded-full bg-white px-3 py-1 font-semibold text-neutral-700 shadow-sm">{application.program.level}</span>
                                <span className="rounded-full bg-white px-3 py-1 font-semibold text-neutral-700 shadow-sm flex items-center gap-1"><Clock className="h-3 w-3" /> {application.program.duration}</span>
                                <span className="rounded-full bg-white px-3 py-1 font-semibold text-brand-orange shadow-sm">{application.program.currency} {application.program.tuitionFee.toLocaleString()}/yr</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Application Timeline */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <Calendar className="h-5 w-5 text-brand-purple" /> Application Timeline
                        </h3>
                        <div className="mt-4 space-y-0">
                            {application.timeline.map((step, i) => (
                                <div key={step.step} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-emerald-500" : step.active ? "bg-brand-orange animate-pulse" : "bg-neutral-200"}`}>
                                            {step.done ? <CheckCircle className="h-3.5 w-3.5 text-white" /> :
                                                step.active ? <Clock className="h-3.5 w-3.5 text-white" /> :
                                                    <div className="h-2 w-2 rounded-full bg-neutral-400" />}
                                        </div>
                                        {i < application.timeline.length - 1 && (
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
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800">
                            <History className="h-4 w-4 text-brand-purple" /> Activity History
                        </h3>

                        {application.auditLogs.length > 0 ? (
                            <div className="mt-4 max-h-[400px] overflow-y-auto pr-1">
                                <div className="relative border-l-2 border-gray-200 pl-6 space-y-4 ml-2">
                                    {application.auditLogs.map((log) => (
                                        <div key={log.id} className="relative">
                                            <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-purple" />
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <StatusBadge status={log.action} />
                                                <span className="text-xs text-gray-400">{log.createdAt}</span>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">by <span className="font-semibold text-gray-700">{log.userEmail}</span></p>
                                            {log.details && (
                                                <p className="mt-1 text-xs text-gray-600">{log.details}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col items-center py-8 text-center">
                                <History className="h-8 w-8 text-gray-200" />
                                <p className="mt-2 text-sm text-gray-400">No activity recorded yet.</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* ─── RIGHT COLUMN ─── */}
                <div className="space-y-6">
                    {/* Documents Review */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <FileText className="h-5 w-5 text-brand-orange" /> Documents
                        </h3>

                        {application.documents.length > 0 ? (
                            <div className="mt-4 space-y-3">
                                {application.documents.map((doc) => (
                                    <div key={doc.id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-all hover:shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${doc.status === "VERIFIED" ? "bg-emerald-100" : doc.status === "PENDING" ? "bg-amber-100" : "bg-neutral-100"}`}>
                                                    {doc.status === "VERIFIED" ? <CheckCircle className="h-4 w-4 text-emerald-600" /> :
                                                        doc.status === "PENDING" ? <Clock className="h-4 w-4 text-amber-600" /> :
                                                            <AlertCircle className="h-4 w-4 text-neutral-400" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-neutral-800">{doc.name}</p>
                                                    <p className="text-[10px] text-neutral-400">
                                                        {doc.status === "VERIFIED" ? "Verified" : doc.status === "PENDING" ? "Pending Review" : "Missing"}
                                                        {doc.date && ` • ${doc.date}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Re-upload badge */}
                                        {doc.requiresReupload && (
                                            <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                                                <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                                                    <RotateCcw className="h-3 w-3" /> Re-upload Requested
                                                </p>
                                                {doc.adminFeedback && (
                                                    <p className="mt-1 text-[10px] text-amber-600 italic">&quot;{doc.adminFeedback}&quot;</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        {doc.fileUrl ? (
                                            <div className="mt-3 flex items-center gap-2">
                                                <a
                                                    href={doc.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-purple/10 px-3 py-2 text-[11px] font-bold text-brand-purple transition-all hover:bg-brand-purple hover:text-white"
                                                >
                                                    <Eye className="h-3 w-3" /> View
                                                </a>
                                                <a
                                                    href={doc.fileUrl}
                                                    download={doc.fileName || doc.name}
                                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-2 text-[11px] font-bold text-neutral-600 transition-all hover:bg-neutral-200"
                                                >
                                                    <Download className="h-3 w-3" />
                                                </a>
                                                <button
                                                    onClick={() => setReuploadModal({ docId: doc.id, docName: doc.name })}
                                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-600 transition-all hover:bg-amber-100"
                                                    title="Request Re-upload"
                                                >
                                                    <RotateCcw className="h-3 w-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDoc(doc.id)}
                                                    disabled={!!docActions[doc.id]}
                                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-bold text-red-500 transition-all hover:bg-red-100 disabled:opacity-50"
                                                    title="Delete Document"
                                                >
                                                    {docActions[doc.id] ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                                </button>
                                            </div>
                                        ) : doc.status === "MISSING" ? (
                                            <p className="mt-3 text-center text-[10px] text-neutral-400 italic">Not uploaded by student</p>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col items-center py-8 text-center">
                                <FileText className="h-8 w-8 text-neutral-300" />
                                <p className="mt-2 text-sm text-neutral-400">No documents submitted.</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Admin Actions */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                            <Shield className="h-5 w-5 text-brand-purple" /> Quick Actions
                        </h3>
                        <div className="mt-4 space-y-2">
                            {currentStatus === "SUBMITTED" && (
                                <button onClick={() => handleStatusChange("UNDER_REVIEW")}
                                    className="w-full rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-bold text-amber-700 transition-all hover:bg-amber-100">
                                    Start Review →
                                </button>
                            )}
                            {currentStatus === "UNDER_REVIEW" && (
                                <>
                                    <button onClick={() => handleStatusChange("OFFER_RECEIVED")}
                                        className="w-full rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100">
                                        Send Offer ✉️
                                    </button>
                                    <button onClick={() => handleStatusChange("REJECTED")}
                                        className="w-full rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-100">
                                        Reject Application
                                    </button>
                                </>
                            )}
                            {(currentStatus === "OFFER_RECEIVED" || currentStatus === "OFFER_ACCEPTED") && (
                                <button onClick={() => handleStatusChange("VISA_PROCESSING")}
                                    className="w-full rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm font-bold text-purple-700 transition-all hover:bg-purple-100">
                                    Begin Visa Processing 🛂
                                </button>
                            )}
                            {currentStatus === "VISA_PROCESSING" && (
                                <button onClick={() => handleStatusChange("ENROLLED")}
                                    className="w-full rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-bold text-green-700 transition-all hover:bg-green-100">
                                    Confirm Enrollment 🎓
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ─── Re-upload Feedback Modal ─── */}
            <AnimatePresence>
                {reuploadModal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
                            onClick={() => { setReuploadModal(null); setReuploadFeedback(""); }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-heading)]">Request Re-upload</h3>
                                <button onClick={() => { setReuploadModal(null); setReuploadFeedback(""); }}>
                                    <X className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Document: <span className="font-semibold text-gray-800">{reuploadModal.docName}</span></p>
                            <p className="text-xs text-gray-400 mb-4">Provide feedback explaining why the student needs to re-upload this document.</p>
                            <textarea
                                value={reuploadFeedback}
                                onChange={(e) => setReuploadFeedback(e.target.value)}
                                placeholder="e.g. Document is blurry, please upload a clearer scan..."
                                rows={3}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                            />
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => { setReuploadModal(null); setReuploadFeedback(""); }}
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRequestReupload}
                                    disabled={!reuploadFeedback.trim() || reuploadLoading}
                                    className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {reuploadLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Send Request
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminCMSLayout>
    );
}
