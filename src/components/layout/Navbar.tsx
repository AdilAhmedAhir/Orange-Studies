"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/ui/LogoIcon";

interface NavChild {
    name: string;
    href: string;
}

interface NavLink {
    name: string;
    href: string;
    children?: NavChild[];
}

const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Institutions", href: "/institutions" },
    {
        name: "Study Abroad",
        href: "/study-abroad",
        children: [
            { name: "Country Guides", href: "/study-abroad/country-guides" },
            { name: "Cost & Scholarships", href: "/study-abroad/cost-scholarships" },
            { name: "Application Checklist", href: "/study-abroad/application-checklist" },
            { name: "SOP & Visa Guides", href: "/study-abroad/sop-visa-guides" },
            { name: "FAQs", href: "/study-abroad/faqs" },
        ],
    },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const isPortal = pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/admin') || pathname.startsWith('/apply');

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    if (isPortal) return null;

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    return (
        <>
            {/* ═══════════════════════════════════════════
             * PERMANENT FIXED WHITE NAVBAR
             * ═══════════════════════════════════════════ */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100 h-[80px]">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <LogoIcon size={40} className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 drop-shadow-md" />
                        <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                            <span className="text-neutral-900">Orange</span>
                            <span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <div key={link.name} className="group relative">
                                <Link
                                    href={link.href}
                                    className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-brand-purple"
                                >
                                    {link.name}
                                    {link.children && <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />}
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-orange transition-all duration-300 group-hover:w-3/4" />
                                </Link>
                                {link.children && (
                                    <div className="pointer-events-none absolute left-1/2 top-full pt-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                        <div className="w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/5">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-lg px-3 py-2.5 text-[13px] font-medium text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-900 hover:pl-4"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="hidden rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-all hover:border-neutral-300 hover:text-neutral-900 lg:block"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/contact"
                            className="hidden rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-105 lg:block"
                        >
                            Get Started
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="relative z-[70] rounded-lg p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors lg:hidden text-neutral-700 hover:bg-neutral-100"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </nav>
            </header>

            {/* ═══════════════════════════════════════════
             * MOBILE FULLSCREEN OVERLAY MENU
             * ═══════════════════════════════════════════ */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-[60] lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Slide-in panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-neutral-900 via-neutral-900 to-brand-deep shadow-2xl"
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
                                <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                                    <LogoIcon size={36} className="drop-shadow-md" />
                                    <span className="text-lg font-bold font-[family-name:var(--font-heading)]">
                                        <span className="text-white">Orange</span>
                                        <span className="text-brand-orange-light">Studies</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                                    aria-label="Close menu"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            {/* Nav links */}
                            <div className="flex flex-col gap-1 px-4 py-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: 40, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.08 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className="block rounded-xl px-4 py-3.5 text-[15px] font-medium text-white/80 transition-all hover:bg-white/5 hover:text-white hover:pl-5"
                                        >
                                            {link.name}
                                        </Link>
                                        {link.children && (
                                            <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="block rounded-lg px-3 py-2 text-[13px] font-medium text-white/50 transition-all hover:bg-white/5 hover:text-white/80"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom CTA */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 space-y-3"
                            >
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block rounded-xl border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block rounded-xl bg-brand-orange px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all hover:bg-brand-orange-dark hover:shadow-xl"
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
