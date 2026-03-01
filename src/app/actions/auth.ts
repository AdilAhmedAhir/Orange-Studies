"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { generateOtp } from "@/app/actions/otp";
import { sendOtpEmail } from "@/lib/mail";

interface RegisterPayload {
    fullName: string;
    email: string;
    password: string;
    phone: string;
}

export async function registerUser(
    data: RegisterPayload
): Promise<{ success?: boolean; error?: string; requiresVerification?: boolean; email?: string }> {
    if (!data.fullName || !data.email || !data.password) {
        return { error: "Name, email, and password are required." };
    }

    if (!data.phone || data.phone.trim() === "") {
        return { error: "Phone number is required." };
    }

    if (data.password.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    const normalizedEmail = data.email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (existing) {
        return { error: "An account with this email already exists." };
    }

    // Rate limiting: block rapid-fire registrations from the same IP/email pattern
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentRegistrations = await prisma.user.count({
        where: { createdAt: { gte: fiveMinsAgo } },
    });
    if (recentRegistrations >= 10) {
        return { error: "Too many registrations. Please try again later." };
    }

    // Check if email verification is required
    const settings = await prisma.systemSetting.findUnique({ where: { id: "global" } });
    const requireVerification = settings?.requireEmailVerification ?? false;

    const hashedPassword = await hash(data.password, 10);

    await prisma.user.create({
        data: {
            fullName: data.fullName.trim(),
            email: normalizedEmail,
            passwordHash: hashedPassword,
            phone: data.phone?.trim() || null,
            role: "STUDENT",
            emailVerified: requireVerification ? null : new Date(),
        },
    });

    // If verification required, generate & send OTP
    if (requireVerification) {
        const code = await generateOtp(normalizedEmail, "VERIFY");
        await sendOtpEmail(normalizedEmail, code, "VERIFY");
        return { success: true, requiresVerification: true, email: normalizedEmail };
    }

    // Send welcome email (non-blocking) when no verification needed
    try {
        const { sendWelcomeEmail } = await import("@/lib/mail");
        await sendWelcomeEmail(normalizedEmail, data.fullName.trim());
    } catch {
        // non-blocking
    }

    return { success: true };
}
