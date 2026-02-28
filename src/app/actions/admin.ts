"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

const VALID_STATUSES = [
    "SUBMITTED",
    "UNDER_REVIEW",
    "OFFER_RECEIVED",
    "OFFER_ACCEPTED",
    "VISA_PROCESSING",
    "ENROLLED",
    "REJECTED",
] as const;

const PROGRESS_MAP: Record<string, number> = {
    SUBMITTED: 15,
    UNDER_REVIEW: 30,
    OFFER_RECEIVED: 50,
    OFFER_ACCEPTED: 60,
    VISA_PROCESSING: 75,
    ENROLLED: 100,
    REJECTED: 100,
};

export async function updateApplicationStatus(
    applicationId: string,
    newStatus: string
): Promise<{ success: boolean; error?: string }> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return { success: false, error: "Unauthorized." };
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
        return { success: false, error: "Insufficient permissions." };
    }

    if (!VALID_STATUSES.includes(newStatus as typeof VALID_STATUSES[number])) {
        return { success: false, error: "Invalid status value." };
    }

    const app = await prisma.application.findUnique({
        where: { id: applicationId },
    });

    if (!app) {
        return { success: false, error: "Application not found." };
    }

    const oldStatus = app.status;

    await prisma.application.update({
        where: { id: applicationId },
        data: {
            status: newStatus as typeof VALID_STATUSES[number],
            progress: PROGRESS_MAP[newStatus] ?? app.progress,
        },
    });

    // Write audit log
    await logActivity(
        applicationId,
        session.user.email,
        "STATUS_CHANGED",
        `Status changed from ${oldStatus} to ${newStatus}`
    );

    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/student");
    revalidatePath(`/dashboard/admin/application/${applicationId}`);

    return { success: true };
}

/* ── Helper: auth gate ── */
async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) return null;
    return user;
}

/* ── Helper: slug generator ── */
function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/* ─────────────────────────────────────────────────────
   CREATE UNIVERSITY
   ───────────────────────────────────────────────────── */
interface CreateUniversityPayload {
    name: string;
    location: string;
    countryId: string;
    ranking: number;
    description: string;
}

export async function createUniversity(
    data: CreateUniversityPayload
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        if (!data.name || !data.countryId) {
            return { success: false, error: "Name and country are required." };
        }

        await prisma.university.create({
            data: {
                slug: slugify(data.name),
                name: data.name.trim(),
                location: data.location.trim(),
                ranking: data.ranking || 999,
                logoPlaceholder: "🏛️",
                tuitionMin: 0,
                tuitionMax: 0,
                tuitionCurrency: "USD",
                established: new Date().getFullYear(),
                totalStudents: 0,
                internationalStudents: 0,
                acceptanceRate: 0,
                description: data.description || "",
                detailedDescription: data.description || "",
                highlights: [],
                facilities: [],
                campusLife: "",
                admissionRequirements: [],
                accommodationInfo: "",
                colorAccent: "#662D91",
                tags: [],
                countryId: data.countryId,
            },
        });

        revalidatePath("/programs");
        revalidatePath("/institutions");
        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to create university.";
        return { success: false, error: msg };
    }
}

/* ─────────────────────────────────────────────────────
   CREATE PROGRAM
   ───────────────────────────────────────────────────── */
interface CreateProgramPayload {
    title: string;
    universityId: string;
    level: string;
    duration: string;
    tuitionFee: number;
    currency: string;
    description: string;
    discipline: string;
    studyMode: string;
}

export async function createProgram(
    data: CreateProgramPayload
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        if (!data.title || !data.universityId) {
            return { success: false, error: "Title and university are required." };
        }

        await prisma.program.create({
            data: {
                slug: slugify(data.title),
                title: data.title.trim(),
                level: data.level || "Bachelor",
                duration: data.duration || "4 years",
                tuitionFee: data.tuitionFee || 0,
                currency: data.currency || "USD",
                intakeDates: ["September"],
                description: data.description || "",
                detailedDescription: data.description || "",
                modules: [],
                entryRequirements: [],
                careerOutcomes: [],
                scholarshipAvailable: false,
                applicationDeadline: "Rolling",
                studyMode: data.studyMode || "Full-time",
                discipline: data.discipline || "",
                universityId: data.universityId,
            },
        });

        revalidatePath("/programs");
        revalidatePath("/search");
        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to create program.";
        return { success: false, error: msg };
    }
}

/* ─────────────────────────────────────────────────────
   REUSABLE AUDIT LOGGER
   ───────────────────────────────────────────────────── */
export async function logActivity(
    applicationId: string,
    userEmail: string,
    action: string,
    details?: string
) {
    await prisma.auditLog.create({
        data: { applicationId, userEmail, action, details },
    });
}

/* ─────────────────────────────────────────────────────
   REQUEST DOCUMENT RE-UPLOAD
   ───────────────────────────────────────────────────── */
export async function requestDocReupload(
    docId: string,
    feedback: string,
    applicationId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        const doc = await prisma.document.findUnique({ where: { id: docId } });
        if (!doc) return { success: false, error: "Document not found." };

        await prisma.document.update({
            where: { id: docId },
            data: {
                requiresReupload: true,
                adminFeedback: feedback.trim(),
                status: "PENDING",
            },
        });

        await logActivity(
            applicationId,
            admin.email,
            "REUPLOAD_REQUESTED",
            `Re-upload requested for "${doc.name}": ${feedback.trim()}`
        );

        revalidatePath("/dashboard/admin");
        revalidatePath("/dashboard/student");
        revalidatePath(`/dashboard/admin/application/${applicationId}`);
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to request re-upload.";
        return { success: false, error: msg };
    }
}

/* ─────────────────────────────────────────────────────
   DELETE DOCUMENT
   ───────────────────────────────────────────────────── */
export async function deleteDocument(
    docId: string,
    applicationId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        const doc = await prisma.document.findUnique({ where: { id: docId } });
        if (!doc) return { success: false, error: "Document not found." };

        // Delete from Vercel Blob if URL exists
        if (doc.fileUrl) {
            try { await del(doc.fileUrl); } catch { /* blob may already be gone */ }
        }

        await prisma.document.delete({ where: { id: docId } });

        await logActivity(
            applicationId,
            admin.email,
            "DOCUMENT_DELETED",
            `Deleted document "${doc.name}"${doc.fileName ? ` (${doc.fileName})` : ""}`
        );

        revalidatePath("/dashboard/admin");
        revalidatePath("/dashboard/student");
        revalidatePath(`/dashboard/admin/application/${applicationId}`);
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete document.";
        return { success: false, error: msg };
    }
}

/* ─────────────────────────────────────────────────────
   REUPLOAD DOCUMENT (Student-side)
   ───────────────────────────────────────────────────── */
export async function reuploadDocument(
    docId: string,
    newUrl: string,
    newFileName: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return { success: false, error: "Unauthorized." };

        const doc = await prisma.document.findUnique({ where: { id: docId } });
        if (!doc) return { success: false, error: "Document not found." };

        // Ownership check: students can only re-upload their own documents
        const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!currentUser) return { success: false, error: "User not found." };

        if (currentUser.role === "STUDENT" && doc.userId !== currentUser.id) {
            return { success: false, error: "You do not have permission to modify this document." };
        }

        await prisma.document.update({
            where: { id: docId },
            data: {
                fileUrl: newUrl,
                fileName: newFileName,
                requiresReupload: false,
                adminFeedback: null,
                status: "PENDING",
            },
        });

        revalidatePath("/dashboard/student");
        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to re-upload document.";
        return { success: false, error: msg };
    }
}
