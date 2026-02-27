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

    await prisma.lead.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone || null,
            type: payload.type,
            branch: payload.branch || null,
            date: payload.date || null,
            message: payload.message || null,
        },
    });

    revalidatePath("/dashboard/admin");

    return { success: true };
}
