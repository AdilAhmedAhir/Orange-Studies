"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import {
    LayoutDashboard, Building2, GraduationCap, Globe, Users,
    LogOut, Menu, X, FileText, ChevronRight, Settings, User,
} from "lucide-react";

/* ── Navigation Map ── */
const NAV_SECTIONS = [
    {
        label: "Overview",
        items: [
            { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        ],
    },
    {
        label: "Content Management",
        items: [
            { href: "/dashboard/admin/universities", label: "Universities", icon: Building2 },
            { href: "/dashboard/admin/programs", label: "Programs", icon: GraduationCap },
            { href: "/dashboard/admin/countries", label: "Countries", icon: Globe },
        ],
    },
    {
        label: "People",
        items: [
            { href: "/dashboard/admin/users", label: "Users", icon: Users },
        ],
    },
    {
        label: "System",
        items: [
            { href: "/dashboard/admin/profile", label: "My Profile", icon: User },
            { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
        ],
    },
];

export default function AdminCMSLayout({ children, adminName, title }: { children: React.ReactNode; adminName?: string; title?: string }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* ── Active check ── */
    function isActive(href: string, exact?: boolean) {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    }

    /* ── Sidebar content (shared desktop/mobile) ── */
    const sidebarContent = (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 py-5 border-b border-neutral-200/60">
                <LogoIcon size={28} />
                <span className="text-base font-black text-brand-purple font-[family-name:var(--font-heading)]">
                    Orange<span className="text-brand-orange">Studies</span>
                </span>
            </div>

            {/* Nav Sections */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
                {NAV_SECTIONS.map((section) => (
                    <div key={section.label}>
                        <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">{section.label}</p>
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const active = isActive(item.href, (item as { exact?: boolean }).exact);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        prefetch={true}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active
                                            ? "bg-brand-purple text-white shadow-sm shadow-brand-purple/20"
                                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                            }`}
                                    >
                                        <item.icon className={`h-4 w-4 ${active ? "text-white" : "text-neutral-400 group-hover:text-neutral-600"}`} />
                                        {item.label}
                                        {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-white/50" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Profile / Logout */}
            <div className="border-t border-neutral-200/60 p-4">
                {adminName && (
                    <div className="mb-3 flex items-center gap-3 px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-[10px] font-bold text-white">
                            {adminName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-800 truncate">{adminName}</p>
                            <p className="text-[10px] text-neutral-400">Administrator</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-500 transition-all hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="h-4 w-4" /> Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* ─── Desktop Sidebar ─── */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-neutral-200/60 bg-white">
                {sidebarContent}
            </aside>

            {/* ─── Mobile Overlay ─── */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden" onClick={() => setSidebarOpen(false)} />
                    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden">
                        <button onClick={() => setSidebarOpen(false)} className="absolute right-3 top-4 rounded-lg p-1 text-neutral-400 hover:text-neutral-700">
                            <X className="h-5 w-5" />
                        </button>
                        {sidebarContent}
                    </aside>
                </>
            )}

            {/* ─── Main Content ─── */}
            <div className="flex-1 lg:pl-64">
                {/* Mobile top bar */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200/60 bg-white/90 backdrop-blur-md px-4 py-3 lg:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100">
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <LogoIcon size={24} />
                        <span className="text-sm font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                    </div>
                    <div className="w-9" /> {/* spacer */}
                </header>

                {/* Desktop top bar - breadcrumb style */}
                <header className="hidden lg:flex sticky top-0 z-30 items-center justify-between border-b border-neutral-200/60 bg-white/90 backdrop-blur-md px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <FileText className="h-4 w-4" />
                        <span>Admin Panel</span>
                        {pathname !== "/dashboard/admin" && (
                            <>
                                <ChevronRight className="h-3 w-3" />
                                <span className="font-semibold text-neutral-700 capitalize">
                                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                                </span>
                            </>
                        )}
                    </div>
                    {adminName && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-neutral-500">{adminName}</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-[10px] font-bold text-white">
                                {adminName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                        </div>
                    )}
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-8 space-y-6">
                    {title && (
                        <h1 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{title}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
