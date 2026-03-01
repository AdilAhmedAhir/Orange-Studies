"use server";

import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  BRAND CONSTANTS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PURPLE = "#662D91";
const ORANGE = "#FF6B35";
const DEEP = "#4A1A6B";
const SITE = "https://orange-studies.vercel.app";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SMTP TRANSPORTER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

async function getTransporter() {
    const s = await prisma.systemSetting.findUnique({ where: { id: "global" } });

    if (!s?.smtpHost || !s?.smtpUser || !s?.smtpPass) {
        return { transporter: null, error: "SMTP not configured. Go to Admin → Settings and enter your Zoho SMTP credentials.", from: "" };
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
 *  BRANDED EMAIL WRAPPER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function emailWrapper(body: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#f3f0f7; font-family:'Segoe UI',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f0f7; padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; margin:0 auto;">

    <!-- ─── Branded Header ─── -->
    <tr><td style="background: linear-gradient(135deg, ${PURPLE} 0%, ${DEEP} 50%, ${ORANGE} 100%); border-radius:16px 16px 0 0; padding:28px 32px; text-align:center;">
        <!-- Logo Mark -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
        <tr>
            <td style="width:44px; height:44px; background:rgba(255,255,255,0.15); border-radius:12px; text-align:center; vertical-align:middle; line-height:44px;">
                <span style="font-size:22px; font-weight:900; color:${ORANGE}; font-family:'Courier New',monospace;">O</span>
            </td>
        </tr>
        </table>
        <h1 style="font-size:24px; font-weight:900; color:white; margin:0; letter-spacing:-0.5px;">
            Orange<span style="color:${ORANGE};">Studies</span>
        </h1>
        <p style="font-size:11px; color:rgba(255,255,255,0.6); margin:6px 0 0; text-transform:uppercase; letter-spacing:2px;">Your Study Abroad Partner</p>
    </td></tr>

    <!-- ─── Body ─── -->
    <tr><td style="background:white; padding:36px 32px; border-left:1px solid #e8e0f0; border-right:1px solid #e8e0f0;">
        ${body}
    </td></tr>

    <!-- ─── Footer ─── -->
    <tr><td style="background:#faf8fc; border-radius:0 0 16px 16px; padding:24px 32px; text-align:center; border:1px solid #e8e0f0; border-top:none;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
            <td style="padding:0 8px;"><a href="${SITE}" style="font-size:11px; color:${PURPLE}; text-decoration:none; font-weight:600;">Website</a></td>
            <td style="color:#ddd; font-size:11px;">|</td>
            <td style="padding:0 8px;"><a href="${SITE}/programs" style="font-size:11px; color:${PURPLE}; text-decoration:none; font-weight:600;">Programs</a></td>
            <td style="color:#ddd; font-size:11px;">|</td>
            <td style="padding:0 8px;"><a href="${SITE}/contact" style="font-size:11px; color:${PURPLE}; text-decoration:none; font-weight:600;">Contact</a></td>
        </tr>
        </table>
        <p style="font-size:10px; color:#bbb; margin:14px 0 0; line-height:1.5;">
            © ${new Date().getFullYear()} OrangeStudies · Dhaka, Bangladesh<br>
            Empowering students to study at world-class institutions.
        </p>
    </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function brandButton(text: string, url: string) {
    return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 0;">
    <tr><td style="background:linear-gradient(135deg, ${PURPLE} 0%, ${ORANGE} 100%); border-radius:12px; padding:14px 36px; text-align:center;">
        <a href="${url}" style="color:white; text-decoration:none; font-size:14px; font-weight:700; letter-spacing:0.3px; display:inline-block;">${text}</a>
    </td></tr>
    </table>`;
}

function otpBlock(code: string) {
    return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto; width:100%;">
    <tr><td style="background:linear-gradient(135deg, ${PURPLE} 0%, ${DEEP} 50%, ${ORANGE} 100%); border-radius:14px; padding:28px 24px; text-align:center;">
        <p style="font-size:13px; color:rgba(255,255,255,0.7); margin:0 0 8px; text-transform:uppercase; letter-spacing:3px; font-weight:600;">Your Verification Code</p>
        <p style="font-size:42px; font-weight:900; color:white; letter-spacing:12px; margin:0; font-family:'Courier New',monospace;">${code}</p>
    </td></tr>
    </table>
    <p style="font-size:12px; color:#999; text-align:center; margin:0;">
        Expires in <strong style="color:${ORANGE};">15 minutes</strong> · Do not share this code
    </p>`;
}

function divider() {
    return `<hr style="border:none; border-top:1px solid #f0ecf5; margin:24px 0;">`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  EMAIL TEMPLATES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/**  1 ── OTP: Email Verification  */
export async function sendVerifyOtpEmail(email: string, code: string) {
    const html = emailWrapper(`
        <h2 style="font-size:22px; font-weight:800; color:#1a1a1a; text-align:center; margin:0 0 8px;">Verify Your Email</h2>
        <p style="font-size:14px; color:#666; text-align:center; margin:0 0 4px; line-height:1.7;">
            Welcome to <strong style="color:${PURPLE};">OrangeStudies</strong>! Enter the code below to verify your email and unlock your student portal.
        </p>
        ${otpBlock(code)}
        ${divider()}
        <p style="font-size:12px; color:#aaa; text-align:center; margin:0; line-height:1.6;">
            If you didn't create an account, you can safely ignore this email.
        </p>
    `);
    return sendMail({ to: email, subject: "🔐 Verify Your OrangeStudies Account", html });
}

/**  2 ── OTP: Password Reset  */
export async function sendResetOtpEmail(email: string, code: string) {
    const html = emailWrapper(`
        <h2 style="font-size:22px; font-weight:800; color:#1a1a1a; text-align:center; margin:0 0 8px;">Reset Your Password</h2>
        <p style="font-size:14px; color:#666; text-align:center; margin:0 0 4px; line-height:1.7;">
            We received a request to reset your <strong style="color:${PURPLE};">OrangeStudies</strong> password. Use the code below to set a new one.
        </p>
        ${otpBlock(code)}
        ${divider()}
        <p style="font-size:12px; color:#aaa; text-align:center; margin:0; line-height:1.6;">
            If you didn't request a password reset, your account is safe — just ignore this email.
        </p>
    `);
    return sendMail({ to: email, subject: "🔑 Reset Your OrangeStudies Password", html });
}

/**  3 ── Application Submitted Confirmation  */
export async function sendApplicationSubmittedEmail(
    email: string,
    studentName: string,
    programTitle: string,
    universityName: string,
    refCode: string
) {
    const html = emailWrapper(`
        <h2 style="font-size:22px; font-weight:800; color:#1a1a1a; text-align:center; margin:0 0 8px;">Application Submitted! 🎉</h2>
        <p style="font-size:14px; color:#666; text-align:center; margin:0 0 24px; line-height:1.7;">
            Congratulations, <strong style="color:${PURPLE};">${studentName}</strong>! Your application has been submitted successfully.
        </p>

        <!-- Details Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; background:#faf8fc; border:1px solid #e8e0f0; border-radius:14px; overflow:hidden;">
            <tr>
                <td style="padding:16px 20px; border-bottom:1px solid #e8e0f0;">
                    <p style="font-size:10px; color:#999; margin:0; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Program</p>
                    <p style="font-size:15px; font-weight:700; color:#1a1a1a; margin:4px 0 0;">${programTitle}</p>
                </td>
            </tr>
            <tr>
                <td style="padding:16px 20px; border-bottom:1px solid #e8e0f0;">
                    <p style="font-size:10px; color:#999; margin:0; text-transform:uppercase; letter-spacing:1px; font-weight:600;">University</p>
                    <p style="font-size:15px; font-weight:700; color:#1a1a1a; margin:4px 0 0;">${universityName}</p>
                </td>
            </tr>
            <tr>
                <td style="padding:16px 20px;">
                    <p style="font-size:10px; color:#999; margin:0; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Reference Code</p>
                    <p style="font-size:18px; font-weight:900; color:${PURPLE}; margin:4px 0 0; font-family:'Courier New',monospace; letter-spacing:2px;">${refCode}</p>
                </td>
            </tr>
        </table>

        <p style="font-size:13px; color:#666; text-align:center; margin:24px 0 0; line-height:1.7;">
            Our team will review your documents and keep you updated. Track your application status from your dashboard.
        </p>

        ${brandButton("View My Dashboard →", `${SITE}/dashboard/student`)}

        ${divider()}
        <p style="font-size:12px; color:#aaa; text-align:center; margin:0; line-height:1.6;">
            Save your reference code <strong style="color:${ORANGE};">${refCode}</strong> for future correspondence.
        </p>
    `);
    return sendMail({ to: email, subject: `✅ Application Submitted — ${programTitle} | OrangeStudies`, html });
}

/**  4 ── Welcome Email  */
export async function sendWelcomeEmail(email: string, name: string) {
    const html = emailWrapper(`
        <h2 style="font-size:22px; font-weight:800; color:#1a1a1a; text-align:center; margin:0 0 8px;">Welcome Aboard! 🌍</h2>
        <p style="font-size:14px; color:#666; text-align:center; margin:0 0 24px; line-height:1.7;">
            Hi <strong style="color:${PURPLE};">${name}</strong>, your OrangeStudies account is ready! Start exploring programs at world-class universities.
        </p>

        <!-- Feature Cards -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
            <tr>
                <td style="padding:12px; background:#faf8fc; border:1px solid #e8e0f0; border-radius:12px; margin-bottom:8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                            <td style="width:40px; vertical-align:top;">
                                <span style="font-size:20px;">🎓</span>
                            </td>
                            <td style="vertical-align:top; padding-left:8px;">
                                <p style="font-size:13px; font-weight:700; color:#1a1a1a; margin:0;">Browse 100+ Programs</p>
                                <p style="font-size:12px; color:#888; margin:2px 0 0;">From top universities in the UK, Canada, Australia & more</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr><td style="height:8px;"></td></tr>
            <tr>
                <td style="padding:12px; background:#faf8fc; border:1px solid #e8e0f0; border-radius:12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                            <td style="width:40px; vertical-align:top;">
                                <span style="font-size:20px;">📋</span>
                            </td>
                            <td style="vertical-align:top; padding-left:8px;">
                                <p style="font-size:13px; font-weight:700; color:#1a1a1a; margin:0;">Apply in Minutes</p>
                                <p style="font-size:12px; color:#888; margin:2px 0 0;">Upload documents & track your application in real time</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        ${brandButton("Explore Programs →", `${SITE}/programs`)}

        ${divider()}
        <p style="font-size:12px; color:#aaa; text-align:center; margin:0; line-height:1.6;">
            Need help? Simply reply to this email or <a href="${SITE}/contact" style="color:${PURPLE}; font-weight:600; text-decoration:none;">contact us</a>.
        </p>
    `);
    return sendMail({ to: email, subject: "🌍 Welcome to OrangeStudies!", html });
}

/**  5 ── Test Email (Admin)  */
export async function sendTestEmail(toEmail: string): Promise<{ success: boolean; error?: string }> {
    const html = emailWrapper(`
        <h2 style="font-size:22px; font-weight:800; color:#1a1a1a; text-align:center; margin:0 0 8px;">SMTP Test Successful ✅</h2>
        <p style="font-size:14px; color:#666; text-align:center; margin:0 0 24px; line-height:1.7;">
            Your <strong style="color:${PURPLE};">OrangeStudies</strong> email system is configured and working correctly.
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:14px; overflow:hidden;">
            <tr>
                <td style="padding:20px; text-align:center;">
                    <p style="font-size:28px; margin:0 0 8px;">🎉</p>
                    <p style="font-size:14px; font-weight:700; color:#16a34a; margin:0;">All Systems Operational</p>
                    <p style="font-size:12px; color:#4ade80; margin:6px 0 0;">
                        OTP emails, password resets, and application confirmations are ready to send.
                    </p>
                </td>
            </tr>
        </table>

        ${divider()}
        <p style="font-size:12px; color:#aaa; text-align:center; margin:0;">
            Sent at ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
        </p>
    `);
    return sendMail({ to: toEmail, subject: "✅ OrangeStudies — SMTP Test Email", html });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  LEGACY COMPAT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export async function sendOtpEmail(email: string, code: string, type: "VERIFY" | "RESET") {
    if (type === "VERIFY") return sendVerifyOtpEmail(email, code);
    return sendResetOtpEmail(email, code);
}
