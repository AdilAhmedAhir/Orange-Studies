"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import {
    LayoutDashboard, Building2, GraduationCap, Globe, LogOut, ArrowLeft, Users,
} from "lucide-react";

const NAV_ITEMS = [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/universities", label: "Universities", icon: Building2 },
    { href: "/dashboard/admin/programs", label: "Programs", icon: GraduationCap },
    { href: "/dashboard/admin/countries", label: "Countries", icon: Globe },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
];

export default function AdminCMSLayout({ children, title }: { children: React.ReactNode; title: string }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* ─── TOP HEADER ─── */}
            <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <LogoIcon size={32} />
                        <span className="text-lg font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                        <span className="ml-2 rounded-full bg-brand-purple/10 px-3 py-1 text-[10px] font-bold text-brand-purple uppercase">CMS</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/admin" className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors">
                            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
                        </Link>
                        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors">
                            <LogOut className="h-3.5 w-3.5" /> Exit
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
                {/* ─── Sub-Navigation ─── */}
                <div className="flex gap-1 rounded-xl bg-neutral-100 p-1 overflow-x-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.href === "/dashboard/admin"
                            ? pathname === "/dashboard/admin"
                            : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? "bg-white text-brand-purple shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* ─── Page Title ─── */}
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">{title}</h1>
                </div>

                {/* ─── Content ─── */}
                {children}
            </div>
        </div>
    );
}
