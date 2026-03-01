"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trash2, Loader2, X, Search, Copy, Check, Shield, ShieldCheck, GraduationCap, Building2, ChevronDown } from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import StatusBadge from "@/components/ui/StatusBadge";
import { createStaffAccount, changeUserRole, deleteUser } from "@/app/actions/users";

interface UserRow {
    id: string; fullName: string; email: string; role: string;
    joinedDate: string; applicationCount: number;
}

const ROLE_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    ADMIN: { bg: "bg-red-100", text: "text-red-700", icon: <ShieldCheck className="h-3 w-3" /> },
    MANAGER: { bg: "bg-purple-100", text: "text-purple-700", icon: <Shield className="h-3 w-3" /> },
    STUDENT: { bg: "bg-blue-100", text: "text-blue-700", icon: <GraduationCap className="h-3 w-3" /> },
    RECRUITER: { bg: "bg-emerald-100", text: "text-emerald-700", icon: <Users className="h-3 w-3" /> },
    INSTITUTION: { bg: "bg-amber-100", text: "text-amber-700", icon: <Building2 className="h-3 w-3" /> },
};

const ROLES = ["STUDENT", "MANAGER", "ADMIN"] as const;

export default function UsersCMSClient({ users, currentUserId, isAdmin }: { users: UserRow[]; currentUserId: string; isAdmin: boolean }) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("ALL");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ fullName: "", email: "", role: "STUDENT" as "ADMIN" | "MANAGER" | "STUDENT" });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
    const [copiedPwd, setCopiedPwd] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [changingRole, setChangingRole] = useState<string | null>(null);
    const [openRoleDropdown, setOpenRoleDropdown] = useState<string | null>(null);

    const filtered = users.filter((u) => {
        const matchesSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const staffCount = users.filter((u) => u.role === "ADMIN" || u.role === "MANAGER").length;
    const studentCount = users.filter((u) => u.role === "STUDENT").length;

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setMsg(null); setGeneratedPassword(null);
        const res = await createStaffAccount(form);
        setLoading(false);
        if (res.success && res.password) {
            setGeneratedPassword(res.password);
            setMsg({ type: "ok", text: `Account created for ${form.email}` });
            setForm({ fullName: "", email: "", role: "STUDENT" });
        } else {
            setMsg({ type: "err", text: res.error || "Failed." });
        }
    };

    const handleCopyPwd = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword);
            setCopiedPwd(true);
            setTimeout(() => setCopiedPwd(false), 2000);
        }
    };

    const handleRoleChange = async (userId: string, newRole: typeof ROLES[number]) => {
        setChangingRole(userId);
        const res = await changeUserRole(userId, newRole);
        if (!res.success) alert(res.error || "Role change failed.");
        setChangingRole(null);
        setOpenRoleDropdown(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this user? This cannot be undone.")) return;
        setDeleting(id);
        const res = await deleteUser(id);
        if (!res.success) alert(res.error || "Delete failed.");
        setDeleting(null);
    };

    return (
        <AdminCMSLayout title="User Directory">
            {/* ─── KPI Stats ─── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                    { label: "Total Users", value: users.length, color: "text-brand-purple", bg: "bg-brand-purple/10", ring: "ring-brand-purple/5" },
                    { label: "Staff (Admin/Manager)", value: staffCount, color: "text-red-600", bg: "bg-red-50", ring: "ring-red-100" },
                    { label: "Students", value: studentCount, color: "text-blue-600", bg: "bg-blue-50", ring: "ring-blue-100" },
                ].map((s) => (
                    <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${s.bg} ring-4 ${s.ring}`}>
                            <Users className={`h-5 w-5 ${s.color}`} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                            <p className="text-xs font-medium text-gray-500">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Toolbar ─── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..."
                            className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                    </div>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-600 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                        <option value="ALL">All Roles</option>
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                {isAdmin && (
                    <button onClick={() => { setModal(true); setMsg(null); setGeneratedPassword(null); }}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                        <Plus className="h-4 w-4" /> Add User
                    </button>
                )}
            </div>

            {/* ─── Data Table ─── */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full md:min-w-[700px] text-left text-sm">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">User</th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Role</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Applications</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Joined</th>
                                {isAdmin && <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((u) => {
                                const rc = ROLE_COLORS[u.role] || ROLE_COLORS.STUDENT;
                                const isSelf = u.id === currentUserId;
                                return (
                                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => window.location.href = `/dashboard/admin/users/${u.id}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-xs font-bold text-white">
                                                    {u.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-800">{u.fullName} {isSelf && <span className="text-xs text-neutral-400">(You)</span>}</p>
                                                    <p className="text-xs text-neutral-400">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="relative">
                                                {isAdmin && !isSelf ? (
                                                    <>
                                                        <button onClick={() => setOpenRoleDropdown(openRoleDropdown === u.id ? null : u.id)}
                                                            disabled={changingRole === u.id}
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${rc.bg} ${rc.text} hover:opacity-80 transition-all`}>
                                                            {changingRole === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : rc.icon}
                                                            {u.role}
                                                            <ChevronDown className="h-3 w-3" />
                                                        </button>
                                                        {openRoleDropdown === u.id && (
                                                            <div className="absolute top-full left-0 z-30 mt-1 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                                                                {ROLES.filter((r) => r !== u.role).map((r) => (
                                                                    <button key={r} onClick={() => handleRoleChange(u.id, r)}
                                                                        className="block w-full px-4 py-2 text-left text-xs font-semibold text-neutral-700 hover:bg-neutral-50">{r}</button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <StatusBadge status={u.role} />
                                                )}
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4"><span className="font-semibold text-neutral-800">{u.applicationCount}</span></td>
                                        <td className="hidden md:table-cell px-6 py-4 text-xs text-neutral-500">{u.joinedDate}</td>
                                        {isAdmin && (
                                            <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                {!isSelf && (
                                                    <button onClick={() => handleDelete(u.id)} disabled={deleting === u.id}
                                                        className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50">
                                                        {deleting === u.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </motion.tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr><td colSpan={isAdmin ? 5 : 4} className="px-6 py-12 text-center text-sm text-neutral-400">No users found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-400">
                    Showing {filtered.length} of {users.length} users
                </div>
            </div>

            {/* ─── Add Staff Modal ─── */}
            <AnimatePresence>
                {modal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" onClick={() => { setModal(false); setGeneratedPassword(null); }} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Add User Account</h3>
                                <button onClick={() => { setModal(false); setGeneratedPassword(null); }}><X className="h-5 w-5 text-neutral-400 hover:text-neutral-700" /></button>
                            </div>

                            {generatedPassword ? (
                                /* ── Password Reveal ── */
                                <div className="space-y-4">
                                    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                                        <p className="text-xs font-bold text-emerald-700 uppercase mb-2">✅ Account Created Successfully</p>
                                        <p className="text-sm text-neutral-700 mb-3">Share this password with the new staff member. It will <strong>not</strong> be shown again.</p>
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-emerald-200 p-3">
                                            <code className="flex-1 text-lg font-mono font-bold text-neutral-900 tracking-wider select-all">{generatedPassword}</code>
                                            <button onClick={handleCopyPwd} className="rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-700 transition-colors">
                                                {copiedPwd ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => { setModal(false); setGeneratedPassword(null); }} className="w-full rounded-xl bg-brand-purple py-2.5 text-sm font-bold text-white hover:bg-brand-deep">
                                        Done
                                    </button>
                                </div>
                            ) : (
                                /* ── Creation Form ── */
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Full Name *</label>
                                        <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Email *</label>
                                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Role *</label>
                                        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "ADMIN" | "MANAGER" | "STUDENT" })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                            <option value="STUDENT">Student</option>
                                            <option value="MANAGER">Manager</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </div>
                                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700">
                                        <strong>⚠️ Note:</strong> A random secure password will be generated. You must share it with the user directly.
                                    </div>
                                    {msg && <p className={`text-xs font-semibold ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>}
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={() => setModal(false)} className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Cancel</button>
                                        <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
                                            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create Account
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminCMSLayout>
    );
}
