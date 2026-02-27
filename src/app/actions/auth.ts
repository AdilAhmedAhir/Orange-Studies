"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
}

export async function registerUser(
    data: RegisterPayload
): Promise<{ success?: boolean; error?: string }> {
    if (!data.fullName || !data.email || !data.password) {
        return { error: "Name, email, and password are required." };
    }

    if (data.password.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    const existing = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
        return { error: "An account with this email already exists." };
    }

    const hashedPassword = await hash(data.password, 10);

    await prisma.user.create({
        data: {
            fullName: data.fullName.trim(),
            email: data.email.toLowerCase().trim(),
            passwordHash: hashedPassword,
            phone: data.phone?.trim() || null,
            role: "STUDENT",
        },
    });

    return { success: true };
}
