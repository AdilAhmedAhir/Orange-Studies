"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import { upsertUniversity, deleteUniversity } from "@/app/actions/cms";

interface Uni {
    id: string; name: string; slug: string; location: string; ranking: number;
    countryId: string; countryName: string; countryFlag: string; programCount: number;
    tuitionMin: number; tuitionMax: number; tuitionCurrency: string;
    established: number; description: string;
}
interface CountryOpt { id: string; name: string; flag: string; }

const EMPTY = { name: "", location: "", countryId: "", ranking: "", description: "", established: "", tuitionMin: "", tuitionMax: "", tuitionCurrency: "GBP" };

export default function UniversitiesCMSClient({ universities, countries }: { universities: Uni[]; countries: CountryOpt[] }) {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState<Record<string, string>>(EMPTY);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const filtered = universities.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setForm(EMPTY); setEditId(null); setModal(true); setMsg(null); };
    const openEdit = (u: Uni) => {
        setForm({ name: u.name, location: u.location, countryId: u.countryId, ranking: String(u.ranking), description: u.description, established: String(u.established), tuitionMin: String(u.tuitionMin), tuitionMax: String(u.tuitionMax), tuitionCurrency: u.tuitionCurrency });
        setEditId(u.id); setModal(true); setMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setMsg(null);
        const res = await upsertUniversity({
            id: editId || undefined,
            name: form.name, location: form.location, countryId: form.countryId,
            ranking: parseInt(form.ranking) || 999, description: form.description,
            established: parseInt(form.established) || new Date().getFullYear(),
            tuitionMin: parseInt(form.tuitionMin) || 0, tuitionMax: parseInt(form.tuitionMax) || 0,
            tuitionCurrency: form.tuitionCurrency,
        });
        setLoading(false);
        if (res.success) { setModal(false); setForm(EMPTY); setEditId(null); }
        else setMsg({ type: "err", text: res.error || "Failed." });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this university? This cannot be undone.")) return;
        setDeleting(id);
        const res = await deleteUniversity(id);
        if (!res.success) alert(res.error || "Delete failed.");
        setDeleting(null);
    };

    return (
        <AdminCMSLayout title="Universities">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search universities..."
                        className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                    <Plus className="h-4 w-4" /> Add University
                </button>
            </div>

            {/* Data Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full md:min-w-[700px] text-left text-sm">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">University</th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Country</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Ranking</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Programs</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Tuition</th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((u) => (
                                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-purple/10">
                                                <Building2 className="h-4 w-4 text-brand-purple" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-800">{u.name}</p>
                                                <p className="text-xs text-neutral-400">{u.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className="text-lg mr-1">{u.countryFlag}</span> {u.countryName}</td>
                                    <td className="hidden md:table-cell px-6 py-4"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">#{u.ranking}</span></td>
                                    <td className="hidden md:table-cell px-6 py-4"><span className="font-semibold text-neutral-800">{u.programCount}</span></td>
                                    <td className="hidden md:table-cell px-6 py-4 text-xs text-neutral-500">{u.tuitionCurrency} {u.tuitionMin.toLocaleString()} – {u.tuitionMax.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => openEdit(u)} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-brand-purple/10 hover:text-brand-purple"><Pencil className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(u.id)} disabled={deleting === u.id} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50">
                                                {deleting === u.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm text-neutral-400">No universities found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-400">
                    {universities.length} total universities
                </div>
            </div>

            {/* ─── Modal ─── */}
            <AnimatePresence>
                {modal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-lg -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{editId ? "Edit University" : "Add University"}</h3>
                                <button onClick={() => setModal(false)}><X className="h-5 w-5 text-neutral-400 hover:text-neutral-700" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Name *</label>
                                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Location *</label>
                                        <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Country *</label>
                                        <select required value={form.countryId} onChange={(e) => setForm({ ...form, countryId: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20">
                                            <option value="">Select…</option>
                                            {countries.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Ranking</label>
                                        <input type="number" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} placeholder="999"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Established</label>
                                        <input type="number" value={form.established} onChange={(e) => setForm({ ...form, established: e.target.value })} placeholder="1990"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Currency</label>
                                        <input value={form.tuitionCurrency} onChange={(e) => setForm({ ...form, tuitionCurrency: e.target.value })}
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Tuition Min</label>
                                        <input type="number" value={form.tuitionMin} onChange={(e) => setForm({ ...form, tuitionMin: e.target.value })} placeholder="0"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Tuition Max</label>
                                        <input type="number" value={form.tuitionMax} onChange={(e) => setForm({ ...form, tuitionMax: e.target.value })} placeholder="0"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Description</label>
                                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                {msg && <p className={`text-xs font-semibold ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>}
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(false)} className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Cancel</button>
                                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-brand-purple py-2.5 text-sm font-bold text-white hover:bg-brand-deep disabled:opacity-50 flex items-center justify-center gap-2">
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
