"use client";

import { motion } from "framer-motion";

/* ── partner logo data ──────────────────────────────────── */
const universities = [
    { name: "University of Oxford", short: "Oxford" },
    { name: "Harvard University", short: "Harvard" },
    { name: "MIT", short: "MIT" },
    { name: "University of Toronto", short: "Toronto" },
    { name: "University of Melbourne", short: "Melbourne" },
    { name: "TU Munich", short: "TU Munich" },
    { name: "University of Malaya", short: "Malaya" },
    { name: "Imperial College London", short: "Imperial" },
    { name: "Stanford University", short: "Stanford" },
    { name: "University of Cambridge", short: "Cambridge" },
    { name: "McGill University", short: "McGill" },
    { name: "University of Sydney", short: "Sydney" },
];

/* ── single logo pill ───────────────────────────────────── */
function LogoPill({ name, short }: { name: string; short: string }) {
    return (
        <div
            className="mx-3 flex shrink-0 items-center gap-3 rounded-full border border-neutral-200/60 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand-orange/40 hover:shadow-md hover:shadow-brand-orange/5"
            title={name}
        >
            {/* tiny decorative university icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple/10 to-brand-orange/10">
                <svg
                    className="h-4 w-4 text-brand-purple"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.63 48.63 0 0 1 12 20.904a48.63 48.63 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
                    />
                </svg>
            </div>
            <span className="whitespace-nowrap text-sm font-semibold text-neutral-700">
                {short}
            </span>
        </div>
    );
}

/* ── marquee section ───────────────────────────────────── */
export function UniversityLogos() {
    const doubled = [...universities, ...universities];

    return (
        <section className="relative z-10 overflow-hidden bg-white py-16 lg:py-20">
            {/* section label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-10 max-w-xl text-center"
            >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
                    Trusted by students at
                </p>
                <h3 className="mt-2 text-lg font-bold text-neutral-700 font-[family-name:var(--font-heading)]">
                    200+ Partner Universities Worldwide
                </h3>
            </motion.div>

            {/* Row 1 — scrolls left */}
            <div className="relative mb-4">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
                <div className="flex animate-marquee-left">
                    {doubled.map((uni, i) => (
                        <LogoPill
                            key={`left-${i}`}
                            name={uni.name}
                            short={uni.short}
                        />
                    ))}
                </div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
                <div className="flex animate-marquee-right">
                    {[...doubled].reverse().map((uni, i) => (
                        <LogoPill
                            key={`right-${i}`}
                            name={uni.name}
                            short={uni.short}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
