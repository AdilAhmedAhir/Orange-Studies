"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { staggerContainer, useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Data ──────────────────────────────────────────────────── */
interface Destination {
    country: string;
    flag: string;
    programs: string;
    color: string;
    gradient: string;
    accent: string;
    image: string;
}

const destinations: Destination[] = [
    {
        country: "United Kingdom",
        flag: "🇬🇧",
        programs: "120+ Programs",
        color: "from-blue-600 to-blue-800",
        gradient: "from-blue-500/20 to-blue-700/20",
        accent: "#3b82f6",
        image: "/images/destinations/uk.png",
    },
    {
        country: "United States",
        flag: "🇺🇸",
        programs: "150+ Programs",
        color: "from-red-600 to-blue-700",
        gradient: "from-red-500/20 to-blue-600/20",
        accent: "#ef4444",
        image: "/images/destinations/usa.png",
    },
    {
        country: "Canada",
        flag: "🇨🇦",
        programs: "90+ Programs",
        color: "from-red-600 to-red-800",
        gradient: "from-red-500/20 to-red-700/20",
        accent: "#dc2626",
        image: "/images/destinations/canada.png",
    },
    {
        country: "Australia",
        flag: "🇦🇺",
        programs: "80+ Programs",
        color: "from-blue-700 to-indigo-900",
        gradient: "from-blue-600/20 to-indigo-800/20",
        accent: "#4f46e5",
        image: "/images/destinations/australia.png",
    },
    {
        country: "Germany",
        flag: "🇩🇪",
        programs: "60+ Programs",
        color: "from-yellow-500 to-red-600",
        gradient: "from-yellow-400/20 to-red-500/20",
        accent: "#eab308",
        image: "/images/destinations/germany.png",
    },
    {
        country: "Malaysia",
        flag: "🇲🇾",
        programs: "45+ Programs",
        color: "from-blue-600 to-yellow-500",
        gradient: "from-blue-500/20 to-yellow-400/20",
        accent: "#2563eb",
        image: "/images/destinations/malaysia.png",
    },
];

/* ── 3D Tilt Card ──────────────────────────────────────────── */
function DestinationCard({
    dest,
    index,
}: {
    dest: Destination;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setTilt({
                x: (y - 0.5) * -15,
                y: (x - 0.5) * 15,
            });
            setGlare({ x: x * 100, y: y * 100 });
        },
        []
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            variants={{
                hidden: { opacity: 0, y: 50, rotateX: -5 },
                visible: { opacity: 1, y: 0, rotateX: 0 },
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group cursor-pointer perspective-[1000px]"
        >
            <motion.div
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-purple/10"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Glare overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                    style={{
                        background: isHovered
                            ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
                            : "none",
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Image header */}
                <div
                    className="relative h-44 overflow-hidden transition-transform duration-700"
                    style={{ transform: "translateZ(10px)" }}
                >
                    {/* Country photo */}
                    <Image
                        src={dest.image}
                        alt={dest.country}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Animated flag */}
                    <motion.span
                        className="absolute right-4 top-4 text-5xl drop-shadow-lg"
                        animate={
                            isHovered
                                ? { scale: [1, 1.3, 1.2], rotate: [0, 8, 0] }
                                : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.5 }}
                    >
                        {dest.flag}
                    </motion.span>

                    {/* Decorative circles */}
                    <motion.div
                        className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10"
                        animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                        transition={{ duration: 0.7 }}
                    />
                    <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/5" />

                    {/* Particle burst on hover */}
                    {isHovered &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-1.5 w-1.5 rounded-full bg-white/60"
                                initial={{
                                    x: "70%",
                                    y: "30%",
                                    scale: 0,
                                    opacity: 1,
                                }}
                                animate={{
                                    x: `${70 + (Math.random() - 0.5) * 60}%`,
                                    y: `${30 + (Math.random() - 0.5) * 60}%`,
                                    scale: [0, 1, 0],
                                    opacity: [1, 0.8, 0],
                                }}
                                transition={{
                                    duration: 0.6 + Math.random() * 0.4,
                                    delay: i * 0.05,
                                }}
                            />
                        ))}
                </div>

                {/* Content */}
                <div
                    className="relative p-6"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                        {dest.country}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
                        <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                        {dest.programs}
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                        className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-purple"
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        Explore Programs
                        <ArrowRight className="h-4 w-4" />
                    </motion.div>
                </div>

                {/* Bottom accent */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ background: dest.accent }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ── Section ───────────────────────────────────────────────── */
export function FeaturedDestinations() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-32 overflow-hidden">
            {/* Animated dot grid background */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute inset-0 opacity-[0.03]"
                    animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, var(--color-brand-purple) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-16 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                    Explore Destinations
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Study in the World&apos;s Best Countries
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Discover universities across our partner countries — each
                    offering a unique academic experience.
                </p>
            </motion.div>

            {/* Cards grid */}
            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {destinations.map((dest, i) => (
                    <DestinationCard key={dest.country} dest={dest} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
