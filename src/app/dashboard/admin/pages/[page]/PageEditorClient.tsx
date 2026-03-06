"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Save, Loader2, Eye, EyeOff, ChevronDown, ChevronRight,
    Settings2, Sparkles, X, GripVertical,
} from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import { upsertPageSection, togglePageSection, seedPageSections } from "@/app/actions/page-sections";

interface SectionDef {
    key: string;
    label: string;
    description: string;
}

interface ExistingSection {
    id: string;
    page: string;
    section: string;
    title: string | null;
    subtitle: string | null;
    description: string | null;
    items: unknown;
    image: string | null;
    enabled: boolean;
    displayOrder: number;
    updatedAt: string;
}

interface Props {
    pageKey: string;
    pageLabel: string;
    sectionDefs: SectionDef[];
    existingSections: ExistingSection[];
}

export default function PageEditorClient({ pageKey, pageLabel, sectionDefs, existingSections }: Props) {
    const router = useRouter();
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [saving, setSaving] = useState<string | null>(null);
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [isSeeding, startSeedTransition] = useTransition();
    const [seedMsg, setSeedMsg] = useState<string | null>(null);

    // Build form data from existing sections
    const [forms, setForms] = useState<Record<string, Record<string, string>>>(() => {
        const initial: Record<string, Record<string, string>> = {};
        for (const def of sectionDefs) {
            const existing = existingSections.find((s) => s.section === def.key);
            initial[def.key] = {
                title: existing?.title || "",
                subtitle: existing?.subtitle || "",
                description: existing?.description || "",
                items: existing?.items ? JSON.stringify(existing.items, null, 2) : "",
                image: existing?.image || "",
            };
        }
        return initial;
    });

    const [enabledState, setEnabledState] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        for (const def of sectionDefs) {
            const existing = existingSections.find((s) => s.section === def.key);
            initial[def.key] = existing?.enabled ?? true;
        }
        return initial;
    });

    const updateForm = (section: string, field: string, value: string) => {
        setForms((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSave = async (sectionKey: string) => {
        setSaving(sectionKey);
        setMsg(null);

        const form = forms[sectionKey];
        let parsedItems = undefined;
        if (form.items.trim()) {
            try {
                parsedItems = JSON.parse(form.items);
            } catch {
                setMsg({ type: "err", text: "Invalid JSON in items field." });
                setSaving(null);
                return;
            }
        }

        const res = await upsertPageSection({
            page: pageKey,
            section: sectionKey,
            title: form.title || null,
            subtitle: form.subtitle || null,
            description: form.description || null,
            items: parsedItems,
            image: form.image || null,
            enabled: enabledState[sectionKey] ?? true,
        });

        setSaving(null);
        if (res.success) {
            setMsg({ type: "ok", text: `✅ Saved "${sectionDefs.find((d) => d.key === sectionKey)?.label}"` });
            router.refresh();
            setTimeout(() => setMsg(null), 3000);
        } else {
            setMsg({ type: "err", text: res.error || "Failed to save." });
        }
    };

    const handleToggle = async (sectionKey: string) => {
        const newState = !enabledState[sectionKey];
        setEnabledState((prev) => ({ ...prev, [sectionKey]: newState }));

        const res = await togglePageSection(pageKey, sectionKey, newState);
        if (!res.success) {
            setEnabledState((prev) => ({ ...prev, [sectionKey]: !newState }));
            setMsg({ type: "err", text: res.error || "Toggle failed." });
        } else {
            router.refresh();
        }
    };

    const isConfigured = (sectionKey: string) => {
        return existingSections.some((s) => s.section === sectionKey);
    };

    return (
        <AdminCMSLayout title={`${pageLabel} Settings`}>
            {/* Top bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between -mt-2 mb-6">
                <Link
                    href="/dashboard/admin/pages"
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-purple transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Pages
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        disabled={isSeeding}
                        onClick={() => {
                            setSeedMsg(null);
                            startSeedTransition(async () => {
                                const res = await seedPageSections(pageKey);
                                if (res.success) {
                                    setSeedMsg(`✅ Initialized ${res.count} sections!`);
                                    router.refresh();
                                } else {
                                    setSeedMsg(`❌ ${res.error}`);
                                }
                            });
                        }}
                        className="flex items-center gap-2 rounded-xl border border-brand-purple/30 bg-brand-purple/5 px-4 py-2.5 text-sm font-medium text-brand-purple hover:bg-brand-purple/10 transition-colors disabled:opacity-50"
                    >
                        {isSeeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                        Initialize All Sections
                    </button>
                </div>
            </div>

            {seedMsg && (
                <div className={`mb-4 rounded-xl px-4 py-2.5 text-sm ${seedMsg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {seedMsg}
                </div>
            )}

            {/* Status message */}
            <AnimatePresence>
                {msg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-4 flex items-center justify-between rounded-xl px-4 py-3 text-sm ${msg.type === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                    >
                        {msg.text}
                        <button onClick={() => setMsg(null)}>
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section accordion list */}
            <div className="space-y-3">
                {sectionDefs.map((def, index) => {
                    const isExpanded = expandedSection === def.key;
                    const configured = isConfigured(def.key);
                    const enabled = enabledState[def.key] ?? true;
                    const form = forms[def.key] || {};
                    const existingData = existingSections.find((s) => s.section === def.key);

                    return (
                        <motion.div
                            key={def.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`rounded-2xl border transition-all ${isExpanded
                                ? "border-brand-purple/30 shadow-md shadow-brand-purple/5 bg-white"
                                : "border-neutral-200/60 bg-white hover:border-neutral-300"
                                }`}
                        >
                            {/* Section header */}
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : def.key)}
                                className="w-full flex items-center gap-3 px-5 py-4 text-left"
                            >
                                <GripVertical className="h-4 w-4 text-neutral-300 flex-shrink-0" />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-neutral-800">
                                            {def.label}
                                        </h3>
                                        {configured && (
                                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                                                Configured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-neutral-400 mt-0.5 truncate">{def.description}</p>
                                </div>

                                {/* Toggle switch */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(def.key);
                                    }}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-brand-purple" : "bg-neutral-200"
                                        }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
                                            }`}
                                    />
                                </button>

                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                                )}
                            </button>

                            {/* Expanded editor */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-neutral-100 px-5 py-5 space-y-4">
                                            {existingData && (
                                                <p className="text-[10px] text-neutral-400">
                                                    Last updated: {new Date(existingData.updatedAt).toLocaleString()}
                                                </p>
                                            )}

                                            {/* Title */}
                                            <div>
                                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Title</label>
                                                <input
                                                    value={form.title || ""}
                                                    onChange={(e) => updateForm(def.key, "title", e.target.value)}
                                                    placeholder={`Section title for ${def.label}`}
                                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                                                />
                                            </div>

                                            {/* Subtitle */}
                                            <div>
                                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Subtitle</label>
                                                <input
                                                    value={form.subtitle || ""}
                                                    onChange={(e) => updateForm(def.key, "subtitle", e.target.value)}
                                                    placeholder="Optional subtitle or tagline"
                                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Description</label>
                                                <textarea
                                                    value={form.description || ""}
                                                    onChange={(e) => updateForm(def.key, "description", e.target.value)}
                                                    placeholder="Section body text or description"
                                                    rows={3}
                                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all resize-none"
                                                />
                                            </div>

                                            {/* Image URL */}
                                            <div>
                                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Image URL</label>
                                                <input
                                                    value={form.image || ""}
                                                    onChange={(e) => updateForm(def.key, "image", e.target.value)}
                                                    placeholder="https://... or /images/..."
                                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-800 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                                                />
                                            </div>

                                            {/* Items (JSON) */}
                                            <div>
                                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                                                    Structured Items <span className="text-neutral-400 font-normal">(JSON format)</span>
                                                </label>
                                                <textarea
                                                    value={form.items || ""}
                                                    onChange={(e) => updateForm(def.key, "items", e.target.value)}
                                                    placeholder={`[\n  { "title": "Item 1", "description": "..." },\n  { "title": "Item 2", "description": "..." }\n]`}
                                                    rows={5}
                                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-neutral-800 font-mono text-xs focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all resize-none"
                                                />
                                            </div>

                                            {/* Save button */}
                                            <div className="flex items-center justify-end gap-3 pt-2">
                                                <button
                                                    onClick={() => handleSave(def.key)}
                                                    disabled={saving === def.key}
                                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-purple/80 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-brand-purple/20 hover:shadow-md hover:shadow-brand-purple/30 transition-all disabled:opacity-50"
                                                >
                                                    {saving === def.key ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Save className="h-4 w-4" />
                                                    )}
                                                    Save Section
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </AdminCMSLayout>
    );
}
