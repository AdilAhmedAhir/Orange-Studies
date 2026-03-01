"use client";

import { Suspense, useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, KeyRound, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { verifyEmailAccount, generateOtp } from "@/app/actions/otp";
import { sendOtpEmail } from "@/lib/mail";

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [otp, setOtp] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [resent, setResent] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isResending, startResend] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        startTransition(async () => {
            const res = await verifyEmailAccount(email, otp);
            if (res.error) {
                setError(res.error);
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 2000);
            }
        });
    };

    const handleResend = () => {
        setResent(false);
        startResend(async () => {
            const code = await generateOtp(email, "VERIFY");
            await sendOtpEmail(email, code, "VERIFY");
            setResent(true);
            setTimeout(() => setResent(false), 5000);
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
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple/10">
                        <Mail className="h-7 w-7 text-brand-purple" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">Verify Your Email</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        We sent a 6-digit code to your email. Enter it below to complete verification.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl border border-neutral-200/60 bg-white p-8 shadow-sm">

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                <CheckCircle className="h-7 w-7 text-emerald-600" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-800">Email Verified!</h2>
                            <p className="text-sm text-neutral-500">Your account is now active. Redirecting to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-300 transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-neutral-600">6-Digit Verification Code</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        pattern="[0-9]{6}"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-neutral-800 tracking-[0.3em] font-mono font-bold placeholder:text-neutral-300 placeholder:tracking-[0.3em] transition-all focus:border-brand-purple focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600">{error}</div>
                            )}

                            {resent && (
                                <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-600">New code sent! Check your inbox.</div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl disabled:opacity-60"
                            >
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Verify Email</>}
                            </button>

                            <div className="text-center">
                                <button type="button" onClick={handleResend} disabled={isResending}
                                    className="text-xs font-semibold text-brand-purple transition-colors hover:text-brand-deep disabled:opacity-50">
                                    {isResending ? "Sending..." : "Didn't receive a code? Resend"}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-neutral-50">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-purple border-t-transparent" />
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}
