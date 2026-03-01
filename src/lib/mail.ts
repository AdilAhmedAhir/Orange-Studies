"use server";

import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SMTP TRANSPORTER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

async function getSmtpSettings() {
    return prisma.systemSetting.findUnique({ where: { id: "global" } });
}

async function getTransporter() {
    const s = await getSmtpSettings();

    if (!s?.smtpHost || !s?.smtpUser || !s?.smtpPass) {
        return { transporter: null, error: "SMTP not configured. Go to Admin → Settings and enter your Zoho SMTP credentials." };
    }

    const transporter = nodemailer.createTransport({
        host: s.smtpHost,
        port: s.smtpPort || 465,
        secure: (s.smtpPort || 465) === 465,
        auth: { user: s.smtpUser, pass: s.smtpPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });

    return { transporter, error: null, from: `"OrangeStudies" <${s.smtpUser}>` };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SEND GENERIC EMAIL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<{ success: boolean; error?: string }> {
    const { transporter, error: configError, from } = await getTransporter();
    if (!transporter) return { success: false, error: configError! };

    try {
        const info = await transporter.sendMail({ from, to, subject, html });
        console.log("[MAIL] Sent:", info.messageId, "to:", to);
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown SMTP error";
        console.error("[MAIL] Send FAILED:", message);
        return { success: false, error: `Email send failed: ${message}` };
    }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SHARED TEMPLATE WRAPPER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function emailWrapper(body: string) {
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; background: #f8f8f8;">
        <div style="background: white; border-radius: 16px; padding: 40px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eee;">
            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 28px;">
                <h1 style="font-size: 26px; font-weight: 900; color: #662D91; margin: 0; letter-spacing: -0.5px;">
                    Orange<span style="color: #FF6B35;">Studies</span>
                </h1>
                <p style="font-size: 11px; color: #bbb; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 1px;">Your Study Abroad Partner</p>
            </div>
            <!-- Body -->
            ${body}
        </div>
        <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 11px; color: #bbb; margin: 0;">© ${new Date().getFullYear()} OrangeStudies. All rights reserved.</p>
            <p style="font-size: 10px; color: #ccc; margin: 4px 0 0;">Dhaka, Bangladesh · info@orangestudies.com</p>
        </div>
    </div>`;
}

function otpBlock(code: string) {
    return `
    <div style="background: linear-gradient(135deg, #662D91 0%, #FF6B35 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <p style="font-size: 38px; font-weight: 900; color: white; letter-spacing: 10px; margin: 0; font-family: 'Courier New', monospace;">${code}</p>
    </div>`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  EMAIL TEMPLATES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**  1 ── OTP: Email Verification  */
export async function sendVerifyOtpEmail(email: string, code: string) {
    const html = emailWrapper(`
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 8px;">Verify Your Email</h2>
        <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 4px; line-height: 1.6;">
            Welcome to OrangeStudies! Use the code below to verify your email and activate your account.
        </p>
        ${otpBlock(code)}
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            This code expires in <strong>15 minutes</strong>. If you didn't create an account, ignore this email.
        </p>
    `);
    return sendMail({ to: email, subject: "Verify Your OrangeStudies Account", html });
}

/**  2 ── OTP: Password Reset  */
export async function sendResetOtpEmail(email: string, code: string) {
    const html = emailWrapper(`
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 8px;">Password Reset</h2>
        <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 4px; line-height: 1.6;">
            We received a request to reset your password. Use the code below to set a new one.
        </p>
        ${otpBlock(code)}
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            This code expires in <strong>15 minutes</strong>. If you didn't request this, your account is safe — just ignore this email.
        </p>
    `);
    return sendMail({ to: email, subject: "Reset Your OrangeStudies Password", html });
}

/**  3 ── Application Submitted  */
export async function sendApplicationSubmittedEmail(
    email: string,
    studentName: string,
    programTitle: string,
    universityName: string,
    refCode: string
) {
    const html = emailWrapper(`
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 8px;">Application Submitted! 🎉</h2>
        <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 20px; line-height: 1.6;">
            Congratulations, <strong>${studentName}</strong>! Your application has been submitted successfully.
        </p>
        <div style="background: #f9f5ff; border: 1px solid #e9ddff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-size: 12px; color: #888; vertical-align: top;">Program</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333; text-align: right;">${programTitle}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-size: 12px; color: #888; border-top: 1px solid #eee; vertical-align: top;">University</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #333; text-align: right; border-top: 1px solid #eee;">${universityName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-size: 12px; color: #888; border-top: 1px solid #eee;">Reference</td>
                    <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #662D91; text-align: right; border-top: 1px solid #eee; font-family: 'Courier New', monospace;">${refCode}</td>
                </tr>
            </table>
        </div>
        <p style="font-size: 13px; color: #555; text-align: center; margin: 0 0 20px; line-height: 1.6;">
            Our team will review your documents and update your application status. You can track progress anytime from your <strong>Student Dashboard</strong>.
        </p>
        <div style="text-align: center;">
            <a href="https://orange-studies.vercel.app/dashboard/student" style="display: inline-block; background: linear-gradient(135deg, #662D91 0%, #FF6B35 100%); color: white; text-decoration: none; padding: 12px 32px; border-radius: 10px; font-size: 14px; font-weight: 700;">View Dashboard →</a>
        </div>
    `);
    return sendMail({ to: email, subject: `Application Submitted — ${programTitle} | OrangeStudies`, html });
}

/**  4 ── Welcome Email (after registration, no OTP required)  */
export async function sendWelcomeEmail(email: string, name: string) {
    const html = emailWrapper(`
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 8px;">Welcome to OrangeStudies! 🌍</h2>
        <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 20px; line-height: 1.6;">
            Hi <strong>${name}</strong>, your account is ready. Start exploring programs and universities from around the world.
        </p>
        <div style="text-align: center; margin-bottom: 20px;">
            <a href="https://orange-studies.vercel.app/programs" style="display: inline-block; background: linear-gradient(135deg, #662D91 0%, #FF6B35 100%); color: white; text-decoration: none; padding: 12px 32px; border-radius: 10px; font-size: 14px; font-weight: 700;">Explore Programs →</a>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Need help? Reply to this email or visit our contact page.
        </p>
    `);
    return sendMail({ to: email, subject: "Welcome to OrangeStudies!", html });
}

/**  5 ── Test Email (Admin)  */
export async function sendTestEmail(toEmail: string): Promise<{ success: boolean; error?: string }> {
    const html = emailWrapper(`
        <h2 style="font-size: 20px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 0 0 8px;">✅ SMTP Test Successful</h2>
        <p style="font-size: 14px; color: #666; text-align: center; margin: 0 0 20px; line-height: 1.6;">
            This is a test email from your <strong>OrangeStudies</strong> admin panel. If you received this, your SMTP configuration is working correctly.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px;">
            <p style="font-size: 14px; font-weight: 600; color: #16a34a; margin: 0;">🎉 All systems operational!</p>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Sent at ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
        </p>
    `);
    return sendMail({ to: toEmail, subject: "OrangeStudies — SMTP Test Email ✅", html });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  LEGACY COMPAT (used by otp.ts)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export async function sendOtpEmail(email: string, code: string, type: "VERIFY" | "RESET") {
    if (type === "VERIFY") return sendVerifyOtpEmail(email, code);
    return sendResetOtpEmail(email, code);
}
