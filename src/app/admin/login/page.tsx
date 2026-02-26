"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Mail, Lock, Shield, UserCog, AlertTriangle } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

const roles = [
    { id: "admin", title: "Admin", icon: Shield },
    { id: "manager", title: "Manager", icon: UserCog },
];

export default function AdminLoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("admin");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        // Simulated admin auth — redirect after short delay
        setTimeout(() => {
            router.push("/dashboard/admin");
        }, 1200);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #4D2075 50%, #2d1250 100%)" }}>
            <div className="absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-purple/15 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-orange/10 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                        <LogoIcon size={44} />
                        <span className="text-2xl font-black font-[family-name:var(--font-heading)]">
                            <span className="text-white">Orange</span><span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>
                    <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                        <Shield className="h-3.5 w-3.5 text-brand-orange" />
                        <span className="text-[11px] font-bold text-white/70 tracking-wide uppercase">Internal Portal</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">Admin Sign In</h1>
                    <p className="mt-1.5 text-sm text-white/40">Authorized personnel only.</p>
                </motion.div>

                {/* Role Toggle */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="relative mb-6 flex rounded-xl bg-white/5 border border-white/10 p-1">
                    {roles.map((role) => (
                        <button key={role.id} onClick={() => setSelectedRole(role.id)}
                            className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${selectedRole === role.id ? "text-white" : "text-white/40"}`}>
                            <role.icon className="h-4 w-4" /> {role.title}
                        </button>
                    ))}
                    <motion.div
                        className="absolute top-1 bottom-1 rounded-lg bg-brand-orange shadow-lg shadow-brand-orange/30"
                        layout transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{ width: "calc(50% - 4px)", left: selectedRole === "admin" ? 4 : "calc(50%)" }}
                    />
                </motion.div>

                {/* Form */}
                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-white/50">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@orangestudies.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 transition-all focus:border-brand-orange focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-orange/30" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-white/50">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-sm text-white placeholder:text-white/20 transition-all focus:border-brand-orange focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-orange/30" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/30 transition-all hover:shadow-xl hover:shadow-brand-orange/40">
                        {isLoading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                            <>Sign In as {roles.find((r) => r.id === selectedRole)?.title} <ArrowRight className="h-4 w-4" /></>
                        )}
                    </motion.button>
                </motion.form>

                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs font-semibold text-red-400">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {error}
                    </motion.div>
                )}

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-center text-[10px] text-white/25">
                    🔒 Authorized personnel only.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 text-center">
                    <Link href="/login" className="text-xs text-white/30 transition-colors hover:text-brand-orange">
                        ← Back to Student Portal
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
