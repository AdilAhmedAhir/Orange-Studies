"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, BookOpen } from "lucide-react";

const tabs = ["Universities", "Courses"] as const;
type Tab = (typeof tabs)[number];

const fadeSlideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.85,
            type: "spring" as const,
            stiffness: 70,
            damping: 18,
        },
    },
};

export function GlobalSearch() {
    const [activeTab, setActiveTab] = useState<Tab>("Universities");

    return (
        <motion.div
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto mt-10 w-full max-w-3xl px-6 sm:mt-12"
        >
            {/* Glassmorphic Card */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
                {/* Tabs */}
                <div className="mb-5 flex gap-1 rounded-xl bg-white/5 p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab
                                ? "text-white"
                                : "text-white/50 hover:text-white/70"
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 rounded-lg bg-white/10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            {/* Active tab underline */}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-orange"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Search Inputs */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    {/* What */}
                    <div className="group flex flex-1 items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5 transition-all hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-1 focus-within:ring-brand-orange/50">
                        <BookOpen size={18} className="shrink-0 text-brand-orange" />
                        <input
                            type="text"
                            placeholder={
                                activeTab === "Universities"
                                    ? "What do you want to study?"
                                    : "Search for a course..."
                            }
                            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                        />
                    </div>

                    {/* Where */}
                    <div className="group flex flex-1 items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5 transition-all hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-1 focus-within:ring-brand-orange/50">
                        <MapPin size={18} className="shrink-0 text-brand-orange" />
                        <input
                            type="text"
                            placeholder="Where?"
                            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                        />
                    </div>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-colors hover:bg-brand-orange-dark sm:rounded-full"
                    >
                        <Search size={16} />
                        <span>Search</span>
                    </motion.button>
                </div>

                {/* Quick Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/30">Popular:</span>
                    {["Computer Science", "MBA", "Engineering", "Medicine", "UK", "Canada"].map(
                        (tag) => (
                            <button
                                key={tag}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition-all hover:border-brand-orange/40 hover:text-white/80"
                            >
                                {tag}
                            </button>
                        )
                    )}
                </div>
            </div>
        </motion.div>
    );
}
