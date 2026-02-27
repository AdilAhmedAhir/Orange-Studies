"use client";

const STATUS_MAP: Record<string, { label: string; bg: string; text: string }> = {
    /* Application Statuses */
    SUBMITTED: { label: "Submitted", bg: "bg-blue-50", text: "text-blue-700" },
    UNDER_REVIEW: { label: "Under Review", bg: "bg-amber-50", text: "text-amber-700" },
    OFFER_RECEIVED: { label: "Offer Sent", bg: "bg-emerald-50", text: "text-emerald-700" },
    OFFER_ACCEPTED: { label: "Accepted", bg: "bg-green-50", text: "text-green-700" },
    VISA_PROCESSING: { label: "Visa Processing", bg: "bg-violet-50", text: "text-violet-700" },
    ENROLLED: { label: "Enrolled", bg: "bg-teal-50", text: "text-teal-700" },
    REJECTED: { label: "Rejected", bg: "bg-red-50", text: "text-red-700" },

    /* User Roles */
    ADMIN: { label: "Admin", bg: "bg-purple-50", text: "text-purple-700" },
    MANAGER: { label: "Manager", bg: "bg-blue-50", text: "text-blue-700" },
    STUDENT: { label: "Student", bg: "bg-gray-100", text: "text-gray-600" },
    RECRUITER: { label: "Recruiter", bg: "bg-emerald-50", text: "text-emerald-700" },
    INSTITUTION: { label: "Institution", bg: "bg-amber-50", text: "text-amber-700" },

    /* Document Statuses */
    VERIFIED: { label: "Verified", bg: "bg-emerald-50", text: "text-emerald-700" },
    PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700" },
    MISSING: { label: "Missing", bg: "bg-gray-100", text: "text-gray-500" },

    /* Lead Statuses */
    NEW: { label: "New", bg: "bg-blue-50", text: "text-blue-700" },
    CONTACTED: { label: "Contacted", bg: "bg-amber-50", text: "text-amber-700" },
    CONVERTED: { label: "Converted", bg: "bg-emerald-50", text: "text-emerald-700" },
};

export default function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
    const key = status.toUpperCase().replace(/[- ]/g, "_");
    const config = STATUS_MAP[key] || { label: status, bg: "bg-gray-100", text: "text-gray-600" };

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${config.bg} ${config.text} ${className}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${config.text.replace("text-", "bg-")} opacity-60`} />
            {config.label}
        </span>
    );
}
