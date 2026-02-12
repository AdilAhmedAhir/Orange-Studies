"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Check, X, AlertCircle } from "lucide-react";

/* ── self-eval data ──────────────────────────────────── */
const countries = [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
    "Malaysia",
];

const studyLevels = ["Undergraduate", "Postgraduate (Masters)", "PhD / Research", "Diploma / Foundation"];

const fields = [
    "Business & Management",
    "Engineering & Technology",
    "Computer Science & IT",
    "Medicine & Health Sciences",
    "Arts & Social Sciences",
    "Law",
    "Natural Sciences",
    "Other",
];

type Result = "eligible" | "maybe" | "not-eligible" | null;

export function SelfEvaluation() {
    const [step, setStep] = useState(0);
    const [country, setCountry] = useState("");
    const [level, setLevel] = useState("");
    const [field, setField] = useState("");
    const [gpa, setGpa] = useState("");
    const [ielts, setIelts] = useState("");
    const [budget, setBudget] = useState("");
    const [result, setResult] = useState<Result>(null);

    const evaluate = () => {
        const gpaNum = parseFloat(gpa);
        const ieltsNum = parseFloat(ielts);
        const budgetNum = parseInt(budget);

        // Simplified eligibility logic
        let score = 0;
        if (gpaNum >= 3.5) score += 3;
        else if (gpaNum >= 3.0) score += 2;
        else if (gpaNum >= 2.5) score += 1;

        if (ieltsNum >= 7.0) score += 3;
        else if (ieltsNum >= 6.5) score += 2;
        else if (ieltsNum >= 6.0) score += 1;

        if (budgetNum >= 30000) score += 2;
        else if (budgetNum >= 15000) score += 1;

        if (score >= 6) setResult("eligible");
        else if (score >= 3) setResult("maybe");
        else setResult("not-eligible");

        setStep(4);
    };

    const reset = () => {
        setStep(0);
        setCountry("");
        setLevel("");
        setField("");
        setGpa("");
        setIelts("");
        setBudget("");
        setResult(null);
    };

    const resultConfig = {
        eligible: {
            icon: Check,
            title: "You're Likely Eligible!",
            description:
                "Based on your profile, you have a strong chance of getting accepted. Let our counselors help you apply to the best-fit universities.",
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-200",
            iconBg: "bg-emerald-500",
        },
        maybe: {
            icon: AlertCircle,
            title: "You May Be Eligible",
            description:
                "Your profile shows potential! Some programs may accept you. A counselor can identify the best options and strengthen your application.",
            color: "text-amber-600",
            bg: "bg-amber-50 border-amber-200",
            iconBg: "bg-amber-500",
        },
        "not-eligible": {
            icon: X,
            title: "More Preparation Needed",
            description:
                "Your current profile may need improvement. Our counselors can help you with IELTS prep, GPA strategies, and alternative pathways.",
            color: "text-red-600",
            bg: "bg-red-50 border-red-200",
            iconBg: "bg-red-500",
        },
    };

    return (
        <section
            id="self-evaluation"
            className="relative z-10 bg-white px-6 py-24 lg:py-32 overflow-hidden"
        >
            <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-orange/5 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-12 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                    Self-Evaluation Tool
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Check Your Eligibility
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Answer a few quick questions to see if you qualify for your dream university.
                </p>
            </motion.div>

            <div className="mx-auto max-w-xl">
                {/* Progress bar */}
                <div className="mb-8 flex items-center gap-2">
                    {[0, 1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${s <= step
                                    ? "bg-brand-orange"
                                    : "bg-neutral-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Step 0: Country + Level */}
                {step === 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                Where do you want to study?
                            </label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {countries.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setCountry(c)}
                                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${country === c
                                                ? "border-brand-orange bg-brand-orange/10 text-brand-orange-dark"
                                                : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                            }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                What level of study?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {studyLevels.map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLevel(l)}
                                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${level === l
                                                ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                                                : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => country && level && setStep(1)}
                            disabled={!country || !level}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-orange-dark disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    </motion.div>
                )}

                {/* Step 1: Field */}
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                What field do you want to study?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {fields.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setField(f)}
                                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${field === f
                                                ? "border-brand-orange bg-brand-orange/10 text-brand-orange-dark"
                                                : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(0)}
                                className="flex-1 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => field && setStep(2)}
                                disabled={!field}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-orange-dark disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: GPA + IELTS + Budget */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                Your GPA (out of 4.0)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="4"
                                step="0.1"
                                value={gpa}
                                onChange={(e) => setGpa(e.target.value)}
                                placeholder="e.g. 3.5"
                                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                IELTS / TOEFL Score
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="9"
                                step="0.5"
                                value={ielts}
                                onChange={(e) => setIelts(e.target.value)}
                                placeholder="e.g. 6.5"
                                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                Annual Budget (USD)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="e.g. 25000"
                                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={() =>
                                    gpa && ielts && budget && setStep(3)
                                }
                                disabled={!gpa || !ielts || !budget}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-orange-dark disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Country</span>
                                <span className="font-semibold text-neutral-800">{country}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Level</span>
                                <span className="font-semibold text-neutral-800">{level}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Field</span>
                                <span className="font-semibold text-neutral-800">{field}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">GPA</span>
                                <span className="font-semibold text-neutral-800">{gpa}/4.0</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">IELTS</span>
                                <span className="font-semibold text-neutral-800">{ielts}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Budget</span>
                                <span className="font-semibold text-neutral-800">
                                    ${parseInt(budget).toLocaleString()}/yr
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="flex-1 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={evaluate}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-deep"
                            >
                                Check Eligibility
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Result */}
                {step === 4 && result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div
                            className={`rounded-2xl border p-6 text-center ${resultConfig[result].bg}`}
                        >
                            <div
                                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${resultConfig[result].iconBg}`}
                            >
                                {(() => {
                                    const Icon = resultConfig[result].icon;
                                    return <Icon className="h-7 w-7 text-white" />;
                                })()}
                            </div>
                            <h3
                                className={`text-xl font-bold font-[family-name:var(--font-heading)] ${resultConfig[result].color}`}
                            >
                                {resultConfig[result].title}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                {resultConfig[result].description}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={reset}
                                className="flex-1 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                                Try Again
                            </button>
                            <a
                                href="https://wa.me/923001234567?text=Hi!%20I%20just%20completed%20the%20self-evaluation%20on%20Orange%20Studies%20and%20I%27d%20like%20to%20talk%20to%20a%20counselor."
                                target="_blank"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-orange-dark"
                            >
                                Talk to a Counselor
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
