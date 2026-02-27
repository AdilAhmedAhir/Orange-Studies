"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

    await prisma.application.update({
        where: { id: applicationId },
        data: {
            status: newStatus as typeof VALID_STATUSES[number],
            progress: PROGRESS_MAP[newStatus] ?? app.progress,
        },
    });

    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/student");
    revalidatePath(`/dashboard/admin/application/${applicationId}`);

    return { success: true };
}
