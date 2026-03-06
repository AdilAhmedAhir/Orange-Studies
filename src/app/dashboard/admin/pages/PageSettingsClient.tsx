"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Info, Globe, Mail, Building2, ChevronRight, Settings2, CheckCircle2, Circle } from "lucide-react";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Home, Info, Globe, Mail, Building2,
};

interface PageStat {
    key: string;
    label: string;
    icon: string;
    totalSections: number;
    configuredSections: number;
    enabledSections: number;
}

export default function PageSettingsClient({ pages }: { pages: PageStat[] }) {
    return (
        <AdminCMSLayout title="Page Settings">
            <p className="text-neutral-500 text-sm -mt-2 mb-6">
                Control the content and visibility of each section on your frontend pages.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((page, index) => {
                    const Icon = ICON_MAP[page.icon] || Settings2;
                    const progress = page.totalSections > 0
                        ? Math.round((page.configuredSections / page.totalSections) * 100)
                        : 0;

                    return (
                        <Link key={page.key} href={`/dashboard/admin/pages/${page.key}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.4 }}
                                className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-brand-purple/5 hover:border-brand-purple/30 cursor-pointer"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 group-hover:from-brand-purple/20 group-hover:to-brand-orange/20 transition-colors">
                                            <Icon className="h-5 w-5 text-brand-purple" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                                {page.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-purple transition-colors" />
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Settings2 className="h-3 w-3" />
                                        {page.totalSections} sections
                                    </span>
                                    <span className="flex items-center gap-1">
                                        {page.configuredSections > 0 ? (
                                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        ) : (
                                            <Circle className="h-3 w-3 text-neutral-300" />
                                        )}
                                        {page.configuredSections} configured
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-orange"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-400 mt-1.5">
                                    {progress}% configured
                                </p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </AdminCMSLayout>
    );
}
