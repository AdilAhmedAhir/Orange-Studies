"use server";

import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

/**
 * Fetch SMTP settings from SystemSetting singleton.
 * Returns a configured transporter or null if settings are missing.
 */
async function getTransporter() {
    const settings = await prisma.systemSetting.findUnique({ where: { id: "global" } });

    if (!settings?.smtpHost || !settings?.smtpUser || !settings?.smtpPass) {
        console.error("[MAIL] SMTP settings not configured. Go to Admin → Settings.");
        return null;
    }

    return nodemailer.createTransport({
        host: settings.smtpHost,
        port: settings.smtpPort || 465,
        secure: (settings.smtpPort || 465) === 465,
        auth: {
            user: settings.smtpUser,
            pass: settings.smtpPass,
        },
    });
}

/**
 * Send a generic email using the configured SMTP transport.
 */
export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
    const transporter = await getTransporter();
    if (!transporter) return { success: false, error: "SMTP not configured." };

    const settings = await prisma.systemSetting.findUnique({ where: { id: "global" } });

    try {
        await transporter.sendMail({
            from: `"OrangeStudies" <${settings?.smtpUser || "noreply@orangestudies.com"}>`,
            to,
            subject,
            html,
        });
        return { success: true };
    } catch (err) {
        console.error("[MAIL] Send failed:", err);
        return { success: false, error: "Failed to send email." };
    }
}

/**
 * Send a branded OTP email.
 */
export async function sendOtpEmail(email: string, code: string, type: "VERIFY" | "RESET") {
    const subject = type === "VERIFY"
        ? "Verify Your OrangeStudies Account"
        : "Reset Your OrangeStudies Password";

    const heading = type === "VERIFY"
        ? "Verify Your Email"
        : "Password Reset Request";

    const description = type === "VERIFY"
        ? "Use the code below to verify your email address and complete your registration."
        : "Use the code below to reset your password. This code is valid for 15 minutes.";

    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
        <div style="background: white; border-radius: 16px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #f0f0f0;">
            <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="font-size: 24px; font-weight: 800; color: #662D91; margin: 0;">
                    Orange<span style="color: #FF6B35;">Studies</span>
                </h1>
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 12px;">${heading}</h2>
            <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 28px; line-height: 1.6;">${description}</p>
            <div style="background: linear-gradient(135deg, #662D91 0%, #FF6B35 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
                <p style="font-size: 36px; font-weight: 800; color: white; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${code}</p>
            </div>
            <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
                This code expires in <strong>15 minutes</strong>. If you didn't request this, please ignore this email.
            </p>
        </div>
        <p style="font-size: 11px; color: #bbb; text-align: center; margin-top: 20px;">
            © ${new Date().getFullYear()} OrangeStudies. All rights reserved.
        </p>
    </div>`;

    return sendMail({ to: email, subject, html });
}
