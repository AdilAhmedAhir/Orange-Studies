"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface LeadPayload {
    name: string;
    email: string;
    phone?: string;
    type: string;
    branch?: string;
    date?: string;
    message?: string;
}

export async function submitLead(
    payload: LeadPayload
): Promise<{ success: boolean; error?: string }> {
    if (!payload.name || !payload.email || !payload.type) {
        return { success: false, error: "Name, email, and type are required." };
    }

    // Rate limiting: 5-minute cooldown per email
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = await prisma.lead.findFirst({
        where: { email: payload.email.toLowerCase().trim(), createdAt: { gte: fiveMinsAgo } },
    });
    if (recent) {
        return { success: false, error: "Please wait before submitting again." };
    }

    // Sanitize message length
    const safeMessage = payload.message ? payload.message.substring(0, 2000) : null;

    await prisma.lead.create({
        data: {
            name: payload.name.trim(),
            email: payload.email.toLowerCase().trim(),
            phone: payload.phone || null,
            type: payload.type,
            branch: payload.branch || null,
            date: payload.date || null,
            message: safeMessage,
        },
    });

    revalidatePath("/dashboard/admin");

    return { success: true };
}

