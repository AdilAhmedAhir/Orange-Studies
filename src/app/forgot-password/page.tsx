"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { forgotPassword } from "@/app/actions/otp";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        startTransition(async () => {
            const res = await forgotPassword(email);
            if (res.error) {
                setError(res.error);
            } else {
                setSent(true);
                // Redirect to reset page with email pre-filled
                setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(email)}`), 1500);
            }
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50">
            <div className="absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-orange/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-purple/5 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, #662D91 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                        <LogoIcon size={48} />
                        <span className="text-2xl font-black text-brand-purple font-[family-name:var(--font-heading)]">
                            Orange<span className="text-brand-orange">Studies</span>
                        </span>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Forgot Password</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Enter your email and we&apos;ll send you a 6-digit code to reset your password.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">

                    {sent ? (
                        <div className="text-center space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                <Mail className="h-7 w-7 text-emerald-600" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-800">Check Your Email</h2>
                            <p className="text-sm text-neutral-500">
                                If an account exists with <span className="font-semibold text-neutral-700">{email}</span>, we&apos;ve sent a reset code. Redirecting...
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl disabled:opacity-60"
                            >
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Send Reset Code</>}
                            </button>
                        </form>
                    )}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-center">
                    <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:text-brand-purple">
                        <ArrowLeft className="h-3 w-3" /> Back to Sign In
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
