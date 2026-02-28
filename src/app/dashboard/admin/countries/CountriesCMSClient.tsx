"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import { upsertCountry, deleteCountry, seedDefaultCountries } from "@/app/actions/cms";

interface Country {
    id: string; name: string; code: string; flag: string; slug: string;
    description: string; image: string; universityCount: number;
}

const EMPTY = { name: "", code: "", flag: "", description: "", image: "" };

export default function CountriesCMSClient({ countries }: { countries: Country[] }) {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState<Record<string, string>>(EMPTY);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [isSeeding, startSeedTransition] = useTransition();
    const [seedMsg, setSeedMsg] = useState<string | null>(null);

    const filtered = countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setForm(EMPTY); setEditId(null); setModal(true); setMsg(null); };
    const openEdit = (c: Country) => {
        setForm({ name: c.name, code: c.code, flag: c.flag, description: c.description, image: c.image });
        setEditId(c.id); setModal(true); setMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setMsg(null);
        const res = await upsertCountry({
            id: editId || undefined,
            name: form.name, code: form.code, flag: form.flag,
            description: form.description, image: form.image,
        });
        setLoading(false);
        if (res.success) { setModal(false); setForm(EMPTY); setEditId(null); }
        else setMsg({ type: "err", text: res.error || "Failed." });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this country? This cannot be undone.")) return;
        setDeleting(id);
        const res = await deleteCountry(id);
        if (!res.success) alert(res.error || "Delete failed.");
        setDeleting(null);
    };

    return (
        <AdminCMSLayout title="Countries">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search countries..."
                        className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSeedMsg(null);
                            startSeedTransition(async () => {
                                const res = await seedDefaultCountries();
                                if (res.success) setSeedMsg(`✅ Seeded ${res.count} countries!`);
                                else setSeedMsg(`❌ ${res.error}`);
                            });
                        }}
                        disabled={isSeeding}
                        className="inline-flex items-center gap-2 rounded-xl border border-brand-purple px-5 py-2.5 text-sm font-bold text-brand-purple shadow-sm transition-all hover:bg-brand-purple/5 hover:shadow-md disabled:opacity-50"
                    >
                        {isSeeding ? <><Loader2 className="h-4 w-4 animate-spin" /> Seeding...</> : <><Globe className="h-4 w-4" /> Seed Defaults</>}
                    </button>
                    <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-105">
                        <Plus className="h-4 w-4" /> Add Country
                    </button>
                </div>
            </div>

            {seedMsg && (
                <div className={`rounded-xl px-4 py-3 text-sm font-medium ${seedMsg.startsWith("✅") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                    {seedMsg}
                </div>
            )}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[600px] text-left text-sm">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Country</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Code</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Universities</th>
                                <th className="hidden md:table-cell px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">Description</th>
                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((c) => (
                                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{c.flag}</span>
                                            <div>
                                                <p className="font-semibold text-neutral-800">{c.name}</p>
                                                <p className="text-xs text-neutral-400">/{c.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4"><span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-600">{c.code}</span></td>
                                    <td className="hidden md:table-cell px-6 py-4"><span className="font-semibold text-neutral-800">{c.universityCount}</span></td>
                                    <td className="hidden md:table-cell px-6 py-4 text-xs text-neutral-500 max-w-[200px] truncate">{c.description || "—"}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button onClick={() => openEdit(c)} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-brand-purple/10 hover:text-brand-purple"><Pencil className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id} className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:opacity-50">
                                                {deleting === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-neutral-400">No countries found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-400">{countries.length} total countries</div>
            </div>

            {/* ─── Modal ─── */}
            <AnimatePresence>
                {modal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" onClick={() => setModal(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{editId ? "Edit Country" : "Add Country"}</h3>
                                <button onClick={() => setModal(false)}><X className="h-5 w-5 text-neutral-400 hover:text-neutral-700" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Name *</label>
                                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="United Kingdom"
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Code * <span className="normal-case text-neutral-400">(ISO 2-letter)</span></label>
                                        <input required maxLength={3} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="GB"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-mono focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase">Flag * <span className="normal-case text-neutral-400">(emoji)</span></label>
                                        <input required value={form.flag} onChange={(e) => setForm({ ...form, flag: e.target.value })} placeholder="🇬🇧"
                                            className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-center text-2xl focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Hero Image URL</label>
                                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..."
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase">Description</label>
                                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                                        className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20" />
                                </div>
                                {msg && <p className={`text-xs font-semibold ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>}
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(false)} className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">Cancel</button>
                                    <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
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
