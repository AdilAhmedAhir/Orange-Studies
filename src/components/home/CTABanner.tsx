"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

/* ── Magnetic Button ───────────────────────────────────────── */
function MagneticButton({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!btnRef.current || !isHovered) return;
            const rect = btnRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.25;
            const dy = (e.clientY - cy) * 0.25;
            setOffset({ x: dx, y: dy });
        },
        [isHovered]
    );

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setOffset({ x: 0, y: 0 });
    }, []);

    return (
        <motion.button
            ref={btnRef}
            className={className}
            animate={{
                x: offset.x,
                y: offset.y,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {/* Glow pulse on hover */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-full bg-white/20 blur-xl"
                animate={{ scale: isHovered ? 1.5 : 0, opacity: isHovered ? 0.3 : 0 }}
                transition={{ duration: 0.4 }}
            />
        </motion.button>
    );
}

/* ── Particle field ────────────────────────────────────────── */
function ParticleField() {
    const [particles, setParticles] = useState<
        Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
    >([]);

    useEffect(() => {
        const pts = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 6,
        }));
        setParticles(pts);
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, (Math.random() - 0.5) * 20, 0],
                        opacity: [0.05, 0.3, 0.05],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

/* ── CTA Section ───────────────────────────────────────────── */
export function CTABanner() {
    return (
        <section className="relative z-10 overflow-hidden">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-brand-deep to-[#0d0520]" />

            {/* Mesh gradient overlay */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-brand-purple/20 blur-[120px]"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-brand-orange/15 blur-[120px]"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                />
            </div>

            {/* Particle field */}
            <ParticleField />

            {/* Grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 py-24 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                        <span className="text-xs font-medium uppercase tracking-widest text-brand-orange-light">
                            Ready to Begin?
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                        Start Your Global{" "}
                        <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
                            Education Journey
                        </span>
                    </h2>

                    <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto">
                        Join thousands of students who&apos;ve found their dream
                        university through Orange Studies. Your future starts
                        with a single step.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/contact">
                            <MagneticButton className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-dark px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-brand-orange/30 transition-shadow duration-300 hover:shadow-brand-orange/50">
                                <span className="relative z-10">
                                    Get Started Free
                                </span>
                                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </MagneticButton>
                        </Link>

                        <Link href="/contact">
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5"
                            >
                                Talk to a Counselor
                            </motion.span>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-10 flex items-center justify-center gap-6 text-sm text-white/30"
                    >
                        <span>✓ Free Consultation</span>
                        <span className="h-3 w-px bg-white/10" />
                        <span>✓ No Hidden Fees</span>
                        <span className="h-3 w-px bg-white/10" />
                        <span>✓ 24/7 Support</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
