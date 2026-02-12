"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/* ── Data ──────────────────────────────────────────────────── */
interface Testimonial {
    name: string;
    university: string;
    country: string;
    flag: string;
    quote: string;
    program: string;
    initials: string;
    gradient: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Khan",
        university: "University of Toronto",
        country: "Canada",
        flag: "🇨🇦",
        quote: "Orange Studies transformed my dream of studying abroad into reality. From application to visa, their team was with me every step of the way. I couldn't have done it without them!",
        program: "Computer Science",
        initials: "SK",
        gradient: "from-blue-500 to-brand-purple",
    },
    {
        name: "Rafiq Ahmed",
        university: "University of Melbourne",
        country: "Australia",
        flag: "🇦🇺",
        quote: "The counselors really understood what I was looking for. They matched me with the perfect university and scholarship. Best decision I ever made.",
        program: "Business Analytics",
        initials: "RA",
        gradient: "from-brand-orange to-red-500",
    },
    {
        name: "Nadia Hossain",
        university: "Imperial College London",
        country: "United Kingdom",
        flag: "🇬🇧",
        quote: "I was overwhelmed by the process, but Orange Studies made everything simple. Their visa success rate is no joke — I got mine on the first try!",
        program: "Biomedical Engineering",
        initials: "NH",
        gradient: "from-emerald-500 to-teal-500",
    },
];

/* ── Main Section ──────────────────────────────────────────── */
export function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[current];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <section className="relative z-10 overflow-hidden bg-white px-6 py-24 lg:py-32">
            {/* Animated gradient blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-purple/[0.04] blur-3xl"
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-orange/[0.04] blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            {/* Subtle background gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/[0.015] to-transparent" />

            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto mb-16 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-600">
                    Student Stories
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    What Our Students Say
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Hear from students who trusted us with their global
                    education journey.
                </p>
            </motion.div>

            {/* Testimonial card */}
            <div className="relative mx-auto max-w-3xl">
                {/* Floating quote marks */}
                <motion.div
                    className="pointer-events-none absolute -top-8 -left-4 lg:-left-12"
                    animate={{
                        rotate: [0, 5, -3, 0],
                        y: [0, -6, 4, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Quote className="h-16 w-16 rotate-180 text-brand-orange/15" />
                </motion.div>

                <motion.div
                    className="pointer-events-none absolute -bottom-6 -right-4 lg:-right-12"
                    animate={{
                        rotate: [0, -5, 3, 0],
                        y: [0, 6, -4, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                >
                    <Quote className="h-12 w-12 text-brand-purple/10" />
                </motion.div>

                {/* Card */}
                <div className="relative rounded-3xl border border-neutral-100 bg-gradient-to-br from-white to-neutral-50/80 p-8 shadow-xl shadow-brand-purple/5 sm:p-12 overflow-hidden">
                    {/* Parallax accent ring */}
                    <motion.div
                        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full border border-brand-orange/10"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            {/* Quote text — moves slower for parallax feel */}
                            <motion.p
                                className="text-lg leading-relaxed text-neutral-600 italic sm:text-xl"
                                initial={{ y: 10 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                &ldquo;{t.quote}&rdquo;
                            </motion.p>

                            {/* Student info — moves independently */}
                            <motion.div
                                className="mt-8 flex items-center gap-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.25 }}
                            >
                                {/* Avatar */}
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white shadow-lg`}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-neutral-800">
                                        {t.name}
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                        {t.program} · {t.university} {t.flag}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        onClick={prev}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-300 hover:border-brand-purple hover:text-brand-purple hover:shadow-lg hover:shadow-brand-purple/10 hover:scale-105 active:scale-95"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Morphing dots */}
                    <div className="flex items-center gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > current ? 1 : -1);
                                    setCurrent(i);
                                }}
                                className="relative h-3 overflow-hidden rounded-full transition-all duration-500"
                                style={{
                                    width: i === current ? 32 : 12,
                                }}
                                aria-label={`Go to testimonial ${i + 1}`}
                            >
                                {/* Neutral base */}
                                <div className="absolute inset-0 rounded-full bg-neutral-300" />
                                {/* Gradient overlay — crossfade via opacity */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                                    animate={{ opacity: i === current ? 1 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                                {/* Liquid fill animation */}
                                {i === current && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-orange to-brand-purple"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{
                                            duration: 6,
                                            ease: "linear",
                                        }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-300 hover:border-brand-purple hover:text-brand-purple hover:shadow-lg hover:shadow-brand-purple/10 hover:scale-105 active:scale-95"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
