"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    GraduationCap, Users, Building2, Shield,
    ArrowRight, Eye, EyeOff, Mail, Lock,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

const roles = [
    {
        id: "student",
        title: "Student",
        description: "Track applications, upload documents, and manage your study abroad journey.",
        icon: GraduationCap,
        color: "from-brand-orange to-amber-500",
        shadowColor: "shadow-brand-orange/20",
        dashboardUrl: "/dashboard/student",
    },
    {
        id: "recruiter",
        title: "Recruiter",
        description: "Manage your student pipeline, track commissions, and access partner tools.",
        icon: Users,
        color: "from-brand-purple to-brand-purple-light",
        shadowColor: "shadow-brand-purple/20",
        dashboardUrl: "/dashboard/recruiter",
    },
    {
        id: "institution",
        title: "Institution",
        description: "Monitor enrolled students, review applications, and manage program listings.",
        icon: Building2,
        color: "from-blue-600 to-blue-700",
        shadowColor: "shadow-blue-500/20",
        dashboardUrl: "/dashboard/institution",
    },
    {
        id: "admin",
        title: "Admin",
        description: "Full system access — analytics, user management, and platform configuration.",
        icon: Shield,
        color: "from-brand-deep to-brand-purple",
        shadowColor: "shadow-brand-deep/20",
        dashboardUrl: "/dashboard/admin",
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;
        setIsLoading(true);
        // Simulated login — redirect after a short delay
        const role = roles.find((r) => r.id === selectedRole);
        setTimeout(() => {
            router.push(role?.dashboardUrl || "/dashboard/student");
        }, 1200);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-orange/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-purple/5 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-deep/3 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, #662D91 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 py-12">
                {/* Logo + Back */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                        <LogoIcon size={48} />
                        <span className="text-2xl font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-[family-name:var(--font-heading)] sm:text-4xl">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-neutral-500">Select your role and sign in to your portal.</p>
                </motion.div>

                {/* Role Selection Cards */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {roles.map((role, i) => (
                        <motion.button
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.06 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedRole(role.id)}
                            className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${selectedRole === role.id
                                    ? `border-transparent bg-gradient-to-br ${role.color} shadow-xl ${role.shadowColor} text-white`
                                    : "border-neutral-200/60 bg-white hover:border-neutral-300 hover:shadow-md"
                                }`}
                        >
                            {/* Selected checkmark */}
                            {selectedRole === role.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
                                >
                                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                                </motion.div>
                            )}

                            <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${selectedRole === role.id ? "bg-white/20" : "bg-neutral-100 group-hover:bg-neutral-200/80"
                                }`}>
                                <role.icon className={`h-5 w-5 ${selectedRole === role.id ? "text-white" : "text-neutral-600"}`} />
                            </div>

                            <h3 className={`mt-3 text-sm font-bold font-[family-name:var(--font-heading)] ${selectedRole === role.id ? "text-white" : "text-neutral-800"
                                }`}>
                                {role.title}
                            </h3>
                            <p className={`mt-1 text-[11px] leading-relaxed ${selectedRole === role.id ? "text-white/80" : "text-neutral-400"
                                }`}>
                                {role.description}
                            </p>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: selectedRole ? 1 : 0.4, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mx-auto max-w-md"
                >
                    <form onSubmit={handleLogin} className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">
                        <div className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-12 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-neutral-300 accent-brand-purple" />
                                    <span className="text-neutral-500">Remember me</span>
                                </label>
                                <button type="button" className="font-semibold text-brand-purple hover:text-brand-deep transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={!selectedRole || isLoading}
                                whileHover={selectedRole ? { scale: 1.02 } : {}}
                                whileTap={selectedRole ? { scale: 0.98 } : {}}
                                className={`relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all ${selectedRole
                                        ? "bg-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/30"
                                        : "cursor-not-allowed bg-neutral-300"
                                    }`}
                            >
                                {isLoading ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                                ) : (
                                    <>Sign In <ArrowRight className="h-4 w-4" /></>
                                )}
                            </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-neutral-200" />
                            <span className="text-[10px] font-semibold text-neutral-400">OR</span>
                            <div className="h-px flex-1 bg-neutral-200" />
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-neutral-500">
                            Don&apos;t have an account?{" "}
                            <button type="button" className="font-bold text-brand-purple hover:text-brand-deep transition-colors">
                                Create Account
                            </button>
                        </p>
                    </form>

                    {/* Demo Notice */}
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="mt-4 text-center text-[10px] text-neutral-400">
                        🔒 This is a demo login — no real authentication. Click sign in with any role to explore the dashboard.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
