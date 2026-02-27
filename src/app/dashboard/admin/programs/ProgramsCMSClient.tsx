"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import { upsertProgram, deleteProgram } from "@/app/actions/cms";

interface Prog {
    id: string; title: string; slug: string; level: string; duration: string;
    tuitionFee: number; currency: string; discipline: string; studyMode: string;
    universityId: string; universityName: string; applicationCount: number;
    scholarshipAvailable: boolean; description: string;
}
interface UniOpt { id: string; name: string; }

const LEVELS = ["Bachelor", "Master", "PhD", "Diploma", "Foundation", "Certificate"];
const MODES = ["Full-time", "Part-time", "Both", "Online"];
const DISCIPLINES = ["Engineering & Technology", "Business & Management", "Computer Science & IT", "Medicine & Health", "Arts & Humanities", "Law", "Social Sciences", "Natural Sciences", "Education", "Architecture"];

const EMPTY = { title: "", universityId: "", level: "Bachelor", duration: "", tuitionFee: "", currency: "GBP", description: "", discipline: "", studyMode: "Full-time", scholarship: false, deadline: "" };

export default function ProgramsCMSClient({ programs, universities }: { programs: Prog[]; universities: UniOpt[] }) {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState<Record<string, string | boolean>>(EMPTY);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const filtered = programs.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.universityName.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setForm(EMPTY); setEditId(null); setModal(true); setMsg(null); };
    const openEdit = (p: Prog) => {
        setForm({ title: p.title, universityId: p.universityId, level: p.level, duration: p.duration, tuitionFee: String(p.tuitionFee), currency: p.currency, description: p.description, discipline: p.discipline, studyMode: p.studyMode, scholarship: p.scholarshipAvailable, deadline: "" });
        setEditId(p.id); setModal(true); setMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setMsg(null);
        const res = await upsertProgram({
            id: editId || undefined,
            title: form.title as string, universityId: form.universityId as string, level: form.level as string,
            duration: form.duration as string, tuitionFee: parseInt(form.tuitionFee as string) || 0,
            currency: form.currency as string, description: form.description as string,
            discipline: form.discipline as string, studyMode: form.studyMode as string,
            scholarshipAvailable: form.scholarship as boolean,
            applicationDeadline: (form.deadline as string) || "Rolling",
        });
        setLoading(false);
        if (res.success) { setModal(false); setForm(EMPTY); setEditId(null); }
        else setMsg({ type: "err", text: res.error || "Failed." });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this program? This cannot be undone.")) return;
        setDeleting(id);
        const res = await deleteProgram(id);
        if (!res.success) alert(res.error || "Delete failed.");
        setDeleting(null);
    };

    return (
        <AdminCMSLayout title="Programs">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search programs..."
                        className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                    <Plus className="h-4 w-4" /> Add Program
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-neutral-100 bg-neutral-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-neutral-500">Program</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500">University</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500">Level</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500">Discipline</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500">Tuition</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500">Apps</th>
                                <th className="px-6 py-3 font-semibold text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filtered.map((p) => (
                                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/10">
                                                <GraduationCap className="h-4 w-4 text-brand-orange" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-800 max-w-[200px] truncate">{p.title}</p>
                                                <p className="text-xs text-neutral-400">{p.duration} • {p.studyMode}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 max-w-[150px] truncate">{p.universityName}</td>
                                    <td className="px-6 py-4"><span className="rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-xs font-bold text-brand-purple">{p.level}</span></td>
                                    <td className="px-6 py-4 text-xs text-neutral-500 max-w-[120px] truncate">{p.discipline || "—"}</td>
                                    <td className="px-6 py-4 text-xs text-neutral-500">{p.currency} {p.tuitionFee.toLocaleString()}</td>
                                    <td className="px-6 py-4"><span className="font-semibold text-neutral-800">{p.applicationCount}</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-brand-purple/10 hover:text-brand-purple"><Pencil className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50">
                                                {deleting === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-neutral-400">No programs found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-3 text-xs text-neutral-400">{programs.length} total programs</div>
            </div>

            {/* ─── Modal ─── */}
            <AnimatePresence>
                {modal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-lg -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{editId ? "Edit Program" : "Add Program"}</h3>
                                <button onClick={() => setModal(false)}><X className="h-5 w-5 text-neutral-400 hover:text-neutral-700" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Title *</label>
                                    <input required value={form.title as string} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">University *</label>
                                    <select required value={form.universityId as string} onChange={(e) => setForm({ ...form, universityId: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                        <option value="">Select…</option>
                                        {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Level</label>
                                        <select value={form.level as string} onChange={(e) => setForm({ ...form, level: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Study Mode</label>
                                        <select value={form.studyMode as string} onChange={(e) => setForm({ ...form, studyMode: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                            {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Duration</label>
                                        <input value={form.duration as string} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 years"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Discipline</label>
                                        <select value={form.discipline as string} onChange={(e) => setForm({ ...form, discipline: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                            <option value="">Select…</option>
                                            {DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Tuition Fee</label>
                                        <input type="number" value={form.tuitionFee as string} onChange={(e) => setForm({ ...form, tuitionFee: e.target.value })} placeholder="0"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Currency</label>
                                        <input value={form.currency as string} onChange={(e) => setForm({ ...form, currency: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Description</label>
                                    <textarea value={form.description as string} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="scholarship" checked={form.scholarship as boolean} onChange={(e) => setForm({ ...form, scholarship: e.target.checked })} className="rounded" />
                                    <label htmlFor="scholarship" className="text-sm text-neutral-700">Scholarship Available</label>
                                </div>
                                {msg && <p className={`text-xs font-semibold ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>}
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(false)} className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Cancel</button>
                                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-brand-orange py-2.5 text-sm font-bold text-white hover:bg-brand-orange-dark disabled:opacity-50 flex items-center justify-center gap-2">
                                        {loading && <Loader2 className="h-4 w-4 animate-spin" />} {editId ? "Update" : "Create"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminCMSLayout>
    );
}
