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

/* Subset of links for the collapsed pill (too many links would overflow) */
const pillLinks: { name: string; href: string }[] = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Study Abroad", href: "/study-abroad" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const isPortal = pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/staff-login') || pathname.startsWith('/apply');

    const [isScrolled, setIsScrolled] = useState(false);
    const [showPill, setShowPill] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    if (isPortal) return null;

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsScrolled(y > 20);
            setShowPill(y > 600);
        };
        /* run once on mount to set initial state */
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    return (
        <>
            {/* ════════════════════════════════════════════════════
             * FULL-WIDTH NAVBAR — always visible at top, fades out when pill appears
             * ════════════════════════════════════════════════════ */}
            <header
                className={`absolute top-0 left-0 right-0 z-50 lg:fixed transition-all duration-500 ${showPill
                    ? "lg:pointer-events-none lg:-translate-y-full lg:opacity-0"
                    : "translate-y-0 opacity-100"
                    } ${isScrolled && !showPill
                        ? "lg:bg-neutral-900/80 lg:backdrop-blur-xl lg:shadow-lg lg:shadow-black/10"
                        : "bg-transparent"
                    }`}
            >
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <LogoIcon size={40} className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 drop-shadow-md" />
                        <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                            <span className="text-white">Orange</span>
                            <span className="text-brand-orange-light">Studies</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <div key={link.name} className="group relative">
                                <Link
                                    href={link.href}
                                    className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:text-brand-orange-light"
                                >
                                    {link.name}
                                    {link.children && <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />}
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-orange transition-all duration-300 group-hover:w-3/4" />
                                </Link>
                                {link.children && (
                                    <div className="pointer-events-none absolute left-1/2 top-full pt-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                        <div className="w-56 rounded-xl border border-white/10 bg-neutral-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white hover:pl-4"
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

                    {/* CTA Button + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="hidden rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-105 lg:block"
                        >
                            Get Started
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="relative z-[70] rounded-lg p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors lg:hidden text-white hover:bg-white/10"
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

            {/* ════════════════════════════════════════════════════
             * COLLAPSED: DESKTOP FLOATING PILL
             * Shows only after scrolling past hero (600px)
             * ════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {showPill && !isMobileOpen && (
                    <motion.div
                        key="pill-nav-desktop"
                        initial={{ y: -60, opacity: 0, scale: 0.85 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -40, opacity: 0, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 24,
                            mass: 0.6,
                        }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-2 backdrop-blur-2xl shadow-2xl shadow-black/40"
                    >
                        {/* Mini logo */}
                        <Link href="/" className="mr-1">
                            <LogoIcon size={32} className="transition-transform hover:rotate-6 hover:scale-110 drop-shadow-md" />
                        </Link>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/10 mx-1" />

                        {/* Nav links (subset) */}
                        {pillLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:text-white hover:bg-white/10"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/10 mx-1" />

                        {/* CTA */}
                        <Link
                            href="/contact"
                            className="rounded-full bg-brand-orange px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-brand-orange/30 transition-colors hover:bg-brand-orange-dark"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════════════════════════════════════
             * COLLAPSED: MOBILE FLOATING BAR
             * ════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {showPill && !isMobileOpen && (
                    <motion.div
                        key="pill-nav-mobile"
                        initial={{ y: -50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -30, opacity: 0, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 24,
                            mass: 0.6,
                        }}
                        className="fixed top-3 left-3 right-3 z-50 flex lg:hidden items-center justify-between rounded-2xl border border-white/15 bg-black/60 px-4 py-2.5 backdrop-blur-2xl shadow-2xl shadow-black/40"
                    >
                        {/* Mini logo + brand */}
                        <Link href="/" className="flex items-center gap-2">
                            <LogoIcon size={28} className="transition-transform hover:rotate-6 hover:scale-110 drop-shadow-md" />
                            <span className="text-sm font-bold font-[family-name:var(--font-heading)]">
                                <span className="text-white">Orange</span>
                                <span className="text-brand-orange-light">Studies</span>
                            </span>
                        </Link>

                        {/* Right side: CTA + Hamburger */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/contact"
                                className="rounded-full bg-brand-orange px-3.5 py-1.5 text-[11px] font-bold text-white shadow-md shadow-brand-orange/30"
                            >
                                Get Started
                            </Link>
                            <button
                                onClick={() => setIsMobileOpen(true)}
                                className="rounded-lg p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                aria-label="Open menu"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════════════════════════════════════════════
             * MOBILE FULLSCREEN OVERLAY MENU
             * ════════════════════════════════════════════════════ */}
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
                                className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
                            >
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
