"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight, Eye, EyeOff, Mail, Lock,
    Users, Building2, Shield, ArrowLeft,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

const roles = [
    {
        id: "recruiter",
        title: "Recruiter",
        description: "Manage student pipeline and commissions.",
        icon: Users,
        color: "from-brand-purple to-brand-purple-light",
        dashboardUrl: "/dashboard/recruiter",
    },
    {
        id: "institution",
        title: "Institution",
        description: "Review applications and manage listings.",
        icon: Building2,
        color: "from-blue-600 to-blue-700",
        dashboardUrl: "/dashboard/institution",
    },
    {
        id: "admin",
        title: "Admin",
        description: "Full system access and configuration.",
        icon: Shield,
        color: "from-brand-deep to-brand-purple",
        dashboardUrl: "/dashboard/admin",
    },
];

export default function StaffLoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>("recruiter");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const role = roles.find((r) => r.id === selectedRole);
        setTimeout(() => {
            router.push(role?.dashboardUrl || "/dashboard/recruiter");
        }, 1200);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-900">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-purple/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-deep/10 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 w-full max-w-lg px-6 py-12">
                {/* Logo */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                        <LogoIcon size={48} />
                        <span className="text-2xl font-black font-[family-name:var(--font-heading)]">
                            <span className="text-white">Orange</span>
                            <span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">Staff & Partner Portal</h1>
                    <p className="mt-2 text-sm text-neutral-400">Select your role and sign in to your workspace.</p>
                </motion.div>

                {/* Role Selection */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="mb-6 grid grid-cols-3 gap-3">
                    {roles.map((role, i) => (
                        <motion.button
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.06 }}
                            whileHover={{ y: -3, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedRole(role.id)}
                            className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-center transition-all duration-300 ${selectedRole === role.id
                                    ? `border-transparent bg-gradient-to-br ${role.color} shadow-xl text-white`
                                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                }`}
                        >
                            {selectedRole === role.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                </motion.div>
                            )}
                            <role.icon className={`mx-auto h-6 w-6 ${selectedRole === role.id ? "text-white" : "text-neutral-400"}`} />
                            <h3 className={`mt-2 text-xs font-bold font-[family-name:var(--font-heading)] ${selectedRole === role.id ? "text-white" : "text-neutral-300"}`}>
                                {role.title}
                            </h3>
                            <p className={`mt-1 text-[10px] leading-tight ${selectedRole === role.id ? "text-white/70" : "text-neutral-500"}`}>
                                {role.description}
                            </p>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-neutral-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition-all focus:border-brand-purple focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-neutral-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-sm text-white placeholder:text-neutral-500 transition-all focus:border-brand-purple focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple/30"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl hover:shadow-brand-purple/30"
                        >
                            {isLoading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                <>Sign In as {roles.find((r) => r.id === selectedRole)?.title} <ArrowRight className="h-4 w-4" /></>
                            )}
                        </motion.button>
                    </div>
                </motion.form>

                {/* Demo notice */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-4 text-center text-[10px] text-neutral-500">
                    🔒 Demo portal — no real authentication. Select a role and click sign in.
                </motion.p>

                {/* Back to student login */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="mt-6 text-center">
                    <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-brand-orange">
                        <ArrowLeft className="h-3 w-3" /> Back to Student Login
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
