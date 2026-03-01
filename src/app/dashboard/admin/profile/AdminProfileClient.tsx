"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { User, Lock, Loader2, CheckCircle, AlertCircle, Save, Mail, Phone, Globe, MapPin, Calendar, ShieldCheck } from "lucide-react";
import { updateProfile, changePassword } from "@/app/actions/profile";

interface AdminUser {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    currentCity: string;
    role: string;
    joinedDate: string;
}

export default function AdminProfileClient({ user }: { user: AdminUser }) {
    const [tab, setTab] = useState<"profile" | "password">("profile");
    const [isPending, startTransition] = useTransition();
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const [form, setForm] = useState({
        fullName: user.fullName,
        phone: user.phone,
        nationality: user.nationality,
        currentCity: user.currentCity,
    });

    const [pwdForm, setPwdForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        startTransition(async () => {
            const res = await updateProfile(form);
            setMsg(res.success ? { type: "ok", text: "Profile updated successfully!" } : { type: "err", text: res.error || "Failed." });
        });
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);
        startTransition(async () => {
            const res = await changePassword(pwdForm);
            if (res.success) {
                setMsg({ type: "ok", text: "Password changed successfully!" });
                setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setMsg({ type: "err", text: res.error || "Failed." });
            }
        });
    };

    const initials = user.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-orange text-2xl font-black text-white shadow-lg shadow-brand-purple/20">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h2 className="text-xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{user.fullName}</h2>
                        <div className="mt-1 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                                <ShieldCheck className="h-3 w-3" /> {user.role}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-neutral-400">
                                <Mail className="h-3 w-3" /> {user.email}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-neutral-400">
                                <Calendar className="h-3 w-3" /> Joined {user.joinedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tab Switcher */}
            <div className="flex gap-2 border-b border-gray-200 pb-0">
                {[
                    { id: "profile" as const, label: "Edit Profile", icon: <User className="h-4 w-4" /> },
                    { id: "password" as const, label: "Change Password", icon: <Lock className="h-4 w-4" /> },
                ].map((t) => (
                    <button key={t.id} onClick={() => { setTab(t.id); setMsg(null); }}
                        className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === t.id
                            ? "border-brand-purple text-brand-purple"
                            : "border-transparent text-neutral-400 hover:text-neutral-700"}`}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {tab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form onSubmit={handleProfileSave} className="space-y-5 max-w-lg">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">Full Name *</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">Nationality</label>
                                <div className="relative">
                                    <Globe className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input value={form.currentCity} onChange={(e) => setForm({ ...form, currentCity: e.target.value })}
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                            </div>
                        </div>

                        {msg && (
                            <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${msg.type === "ok" ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-red-50 border-red-200 text-red-600"}`}>
                                {msg.type === "ok" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />} {msg.text}
                            </div>
                        )}

                        <button type="submit" disabled={isPending}
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50">
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
                        </button>
                    </form>
                </motion.div>
            )}

            {tab === "password" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">Current Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                <input type="password" required value={pwdForm.currentPassword}
                                    onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">New Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                <input type="password" required minLength={6} value={pwdForm.newPassword}
                                    onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase">Confirm New Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                <input type="password" required minLength={6} value={pwdForm.confirmPassword}
                                    onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                            </div>
                        </div>

                        {msg && (
                            <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold ${msg.type === "ok" ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-red-50 border-red-200 text-red-600"}`}>
                                {msg.type === "ok" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />} {msg.text}
                            </div>
                        )}

                        <button type="submit" disabled={isPending}
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md disabled:opacity-50">
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} Change Password
                        </button>
                    </form>
                </motion.div>
            )}
        </div>
    );
}
