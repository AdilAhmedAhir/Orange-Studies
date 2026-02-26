"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight, Eye, EyeOff, Mail, Lock, User, Phone,
    GraduationCap, AlertTriangle,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });

    const updateForm = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        // Simulated auth — redirect after short delay
        setTimeout(() => {
            router.push("/dashboard/student");
        }, 1200);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-orange/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-purple/5 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, #662D91 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                {/* Logo */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                        <LogoIcon size={48} />
                        <span className="text-2xl font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Student Badge */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                    className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2">
                    <GraduationCap className="h-4 w-4 text-brand-orange" />
                    <span className="text-xs font-bold text-brand-orange">Student Portal</span>
                </motion.div>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                        {isLogin ? "Welcome Back" : "Create Your Account"}
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        {isLogin ? "Sign in to track your applications and more." : "Start your study abroad journey today."}
                    </p>
                </motion.div>

                {/* Toggle Tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="relative mb-6 flex rounded-xl bg-neutral-100 p-1">
                    <button onClick={() => setIsLogin(true)}
                        className={`relative z-10 flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${isLogin ? "text-white" : "text-neutral-500"}`}>
                        Sign In
                    </button>
                    <button onClick={() => setIsLogin(false)}
                        className={`relative z-10 flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${!isLogin ? "text-white" : "text-neutral-500"}`}>
                        Create Account
                    </button>
                    <motion.div
                        className="absolute top-1 bottom-1 rounded-lg bg-brand-orange shadow-md"
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{ width: "calc(50% - 4px)", left: isLogin ? 4 : "calc(50% + 0px)" }}
                    />
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                        >
                            {/* Full Name — sign up only */}
                            {!isLogin && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                        <input
                                            type="text"
                                            value={form.fullName}
                                            onChange={(e) => updateForm("fullName", e.target.value)}
                                            placeholder="Adil Ahmed"
                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => updateForm("email", e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                </div>
                            </div>

                            {/* Phone — sign up only */}
                            {!isLogin && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => updateForm("phone", e.target.value)}
                                            placeholder="+880 1700-000000"
                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) => updateForm("password", e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-12 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me / Forgot (login only) */}
                            {isLogin && (
                                <div className="flex items-center justify-between text-xs">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-neutral-300 accent-brand-purple" />
                                        <span className="text-neutral-500">Remember me</span>
                                    </label>
                                    <button type="button" className="font-semibold text-brand-purple hover:text-brand-deep transition-colors">
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl hover:shadow-brand-orange/30"
                            >
                                {isLoading ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                                ) : (
                                    <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight className="h-4 w-4" /></>
                                )}
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                </motion.form>

                {/* Error Banner */}
                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-semibold text-red-600">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        {error}
                    </motion.div>
                )}

                {/* Demo Notice */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-4 text-center text-[10px] text-neutral-400">
                    🔒 Sign in with your registered credentials.
                </motion.p>

                {/* Staff / Partner ghost link */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="mt-8 text-center">
                    <Link href="/admin/login" className="text-xs text-neutral-400 transition-colors hover:text-brand-purple">
                        Admin &amp; Manager Portal? <span className="font-semibold underline underline-offset-2">Log in here</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
