"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
    Settings, Server, Mail, Lock, Hash, ToggleLeft, ToggleRight,
    Loader2, CheckCircle, AlertCircle, Info, Send, Zap,
} from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import { updateSystemSettings } from "@/app/actions/otp";
import { sendTestEmail } from "@/lib/mail";

interface SettingsForm {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    requireEmailVerification: boolean;
}

export default function SettingsClient({ initialSettings, adminEmail }: { initialSettings: SettingsForm; adminEmail: string }) {
    const [form, setForm] = useState<SettingsForm>(initialSettings);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [isPending, startTransition] = useTransition();

    // Test email state
    const [testEmail, setTestEmail] = useState(adminEmail);
    const [testMsg, setTestMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [isTestPending, startTestTransition] = useTransition();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        startTransition(async () => {
            const res = await updateSystemSettings(form);
            if (res.success) {
                setMsg({ type: "ok", text: "Settings saved successfully!" });
            } else {
                setMsg({ type: "err", text: res.error || "Failed to save." });
            }
            setTimeout(() => setMsg(null), 5000);
        });
    };

    const handleTestEmail = () => {
        setTestMsg(null);
        if (!testEmail) { setTestMsg({ type: "err", text: "Enter an email address." }); return; }
        startTestTransition(async () => {
            const res = await sendTestEmail(testEmail);
            if (res.success) {
                setTestMsg({ type: "ok", text: `Test email sent to ${testEmail}! Check your inbox.` });
            } else {
                setTestMsg({ type: "err", text: res.error || "Failed to send test email." });
            }
            setTimeout(() => setTestMsg(null), 8000);
        });
    };

    return (
        <AdminCMSLayout title="System Settings">
            <div className="max-w-2xl space-y-6">
                {/* Info Banner */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <Info className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
                    <div className="text-xs text-blue-700 space-y-1">
                        <p className="font-bold">Zoho SMTP Setup</p>
                        <p>To send emails (OTP verification, password resets, application confirmations), configure your SMTP below:</p>
                        <ul className="list-disc ml-4 space-y-0.5">
                            <li>Host: <code className="bg-blue-100 px-1 rounded text-[11px]">smtp.zoho.com</code></li>
                            <li>Port: <code className="bg-blue-100 px-1 rounded text-[11px]">465</code> (SSL) or <code className="bg-blue-100 px-1 rounded text-[11px]">587</code> (TLS)</li>
                            <li>User: Your full Zoho email (e.g. <code className="bg-blue-100 px-1 rounded text-[11px]">noreply@orangestudies.com</code>)</li>
                            <li>Password: Your Zoho <strong>app password</strong> (generate from Zoho Security → App Passwords)</li>
                        </ul>
                    </div>
                </motion.div>

                {/* SMTP Settings Form */}
                <motion.form
                    onSubmit={handleSave}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm space-y-6"
                >
                    <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                        <Server className="h-5 w-5 text-brand-purple" /> SMTP Configuration
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
                                <Mail className="inline h-3 w-3 mr-1" />SMTP Host
                            </label>
                            <input
                                type="text"
                                value={form.smtpHost}
                                onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
                                placeholder="smtp.zoho.com"
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
                                <Hash className="inline h-3 w-3 mr-1" />Port
                            </label>
                            <input
                                type="number"
                                value={form.smtpPort}
                                onChange={(e) => setForm({ ...form, smtpPort: parseInt(e.target.value) || 465 })}
                                placeholder="465"
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
                            <Mail className="inline h-3 w-3 mr-1" />SMTP Username (Email)
                        </label>
                        <input
                            type="email"
                            value={form.smtpUser}
                            onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
                            placeholder="noreply@orangestudies.com"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
                            <Lock className="inline h-3 w-3 mr-1" />SMTP Password
                        </label>
                        <input
                            type="password"
                            value={form.smtpPass}
                            onChange={(e) => setForm({ ...form, smtpPass: e.target.value })}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        />
                    </div>

                    <hr className="border-neutral-100" />

                    <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                        <Settings className="h-5 w-5 text-brand-orange" /> Verification Settings
                    </h3>

                    {/* OTP Toggle */}
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <div>
                            <p className="text-sm font-semibold text-neutral-800">Require OTP on Account Creation</p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                                When enabled, new students must verify their email via OTP before they can log in.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, requireEmailVerification: !form.requireEmailVerification })}
                            className="shrink-0 ml-4"
                        >
                            {form.requireEmailVerification ? (
                                <ToggleRight className="h-8 w-8 text-emerald-500" />
                            ) : (
                                <ToggleLeft className="h-8 w-8 text-neutral-300" />
                            )}
                        </button>
                    </div>

                    {/* Save Feedback */}
                    {msg && (
                        <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold ${msg.type === "ok" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                            {msg.type === "ok" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            {msg.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl disabled:opacity-60"
                    >
                        {isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Settings className="h-4 w-4" /> Save Settings</>}
                    </button>
                </motion.form>

                {/* ── Test Email Section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm space-y-4"
                >
                    <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                        <Zap className="h-5 w-5 text-amber-500" /> Test Email Connection
                    </h3>
                    <p className="text-xs text-neutral-500">
                        Save your settings first, then send a test email to verify your SMTP configuration is working.
                    </p>

                    <div className="flex gap-3">
                        <input
                            type="email"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        />
                        <button
                            type="button"
                            onClick={handleTestEmail}
                            disabled={isTestPending}
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 hover:shadow-xl disabled:opacity-60"
                        >
                            {isTestPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            {isTestPending ? "Sending..." : "Send Test"}
                        </button>
                    </div>

                    {testMsg && (
                        <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold ${testMsg.type === "ok" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                            {testMsg.type === "ok" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            {testMsg.text}
                        </div>
                    )}
                </motion.div>

                {/* ── Email Templates Info ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm"
                >
                    <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)] mb-4">
                        <Mail className="h-5 w-5 text-brand-purple" /> Active Email Templates
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: "Email Verification OTP", trigger: "Student registration (when toggle is ON)", color: "bg-purple-100 text-purple-700" },
                            { name: "Password Reset OTP", trigger: "Forgot Password flow", color: "bg-orange-100 text-orange-700" },
                            { name: "Application Submitted", trigger: "After student submits an application", color: "bg-emerald-100 text-emerald-700" },
                            { name: "Welcome Email", trigger: "After registration (when toggle is OFF)", color: "bg-blue-100 text-blue-700" },
                            { name: "SMTP Test", trigger: "Admin → Send Test button above", color: "bg-amber-100 text-amber-700" },
                        ].map((t) => (
                            <div key={t.name} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                                <div>
                                    <p className="text-sm font-semibold text-neutral-800">{t.name}</p>
                                    <p className="text-xs text-neutral-400 mt-0.5">{t.trigger}</p>
                                </div>
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${t.color}`}>Active</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AdminCMSLayout>
    );
}
