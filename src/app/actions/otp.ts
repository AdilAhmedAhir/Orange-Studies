"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { sendOtpEmail } from "@/lib/mail";

/* ── Generate 6-digit OTP ── */
function randomOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ── Generate & persist OTP ── */
export async function generateOtp(email: string, type: "VERIFY" | "RESET") {
    // Delete any existing OTPs for this email + type
    await prisma.otpCode.deleteMany({ where: { email, type } });

    const code = randomOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.otpCode.create({
        data: { email, code, type, expiresAt },
    });

    return code;
}

/* ── Verify OTP ── */
export async function verifyOtp(email: string, code: string, type: "VERIFY" | "RESET") {
    const otp = await prisma.otpCode.findFirst({
        where: { email, type, code },
        orderBy: { createdAt: "desc" },
    });

    if (!otp) return { valid: false, error: "Invalid OTP code." };
    if (otp.expiresAt < new Date()) {
        await prisma.otpCode.delete({ where: { id: otp.id } });
        return { valid: false, error: "OTP has expired. Please request a new one." };
    }

    // Delete the used OTP
    await prisma.otpCode.delete({ where: { id: otp.id } });
    return { valid: true };
}

/* ── Forgot Password: Request OTP ── */
export async function forgotPassword(email: string): Promise<{ success?: boolean; error?: string }> {
    if (!email) return { error: "Email is required." };

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    // Always return success to avoid email enumeration
    if (!user) return { success: true };

    const code = await generateOtp(email.toLowerCase().trim(), "RESET");
    await sendOtpEmail(email.toLowerCase().trim(), code, "RESET");
    return { success: true };
}

/* ── Reset Password: Verify OTP + Update ── */
export async function resetPassword(
    email: string,
    otp: string,
    newPassword: string
): Promise<{ success?: boolean; error?: string }> {
    if (!email || !otp || !newPassword) return { error: "All fields are required." };
    if (newPassword.length < 6) return { error: "Password must be at least 6 characters." };

    const result = await verifyOtp(email.toLowerCase().trim(), otp, "RESET");
    if (!result.valid) return { error: result.error };

    const hashedPassword = await hash(newPassword, 10);
    await prisma.user.update({
        where: { email: email.toLowerCase().trim() },
        data: { passwordHash: hashedPassword },
    });

    return { success: true };
}

/* ── Verify Email Account ── */
export async function verifyEmailAccount(
    email: string,
    code: string
): Promise<{ success?: boolean; error?: string }> {
    if (!email || !code) return { error: "Email and OTP code are required." };

    const result = await verifyOtp(email.toLowerCase().trim(), code, "VERIFY");
    if (!result.valid) return { error: result.error };

    await prisma.user.update({
        where: { email: email.toLowerCase().trim() },
        data: { emailVerified: new Date() },
    });

    return { success: true };
}

/* ── Admin: Update System Settings ── */
export async function updateSystemSettings(data: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    requireEmailVerification: boolean;
}): Promise<{ success?: boolean; error?: string }> {
    try {
        await prisma.systemSetting.upsert({
            where: { id: "global" },
            update: {
                smtpHost: data.smtpHost || null,
                smtpPort: data.smtpPort || null,
                smtpUser: data.smtpUser || null,
                smtpPass: data.smtpPass || null,
                requireEmailVerification: data.requireEmailVerification,
            },
            create: {
                id: "global",
                smtpHost: data.smtpHost || null,
                smtpPort: data.smtpPort || null,
                smtpUser: data.smtpUser || null,
                smtpPass: data.smtpPass || null,
                requireEmailVerification: data.requireEmailVerification,
            },
        });
        return { success: true };
    } catch (err) {
        console.error("[SETTINGS] Update failed:", err);
        return { error: "Failed to update settings." };
    }
}

/* ── Admin: Get System Settings ── */
export async function getSystemSettings() {
    const settings = await prisma.systemSetting.findUnique({ where: { id: "global" } });
    return settings || {
        id: "global",
        smtpHost: "",
        smtpPort: 465,
        smtpUser: "",
        smtpPass: "",
        requireEmailVerification: false,
    };
}
