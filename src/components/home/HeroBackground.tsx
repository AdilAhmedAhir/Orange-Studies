"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO_SRC =
    "https://videos.pexels.com/video-files/3196238/3196238-uhd_2560_1440_25fps.mp4";
const POSTER_SRC =
    "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=80&auto=format";

export function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax: video moves slower than scroll, creating depth
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    // Subtle scale on scroll for cinematic depth
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    // Overlay darkens as user scrolls
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.85]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            {/* Video Layer — GPU‑accelerated transforms only */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 will-change-transform"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={POSTER_SRC}
                    preload="metadata"
                    className="h-full w-full object-cover"
                >
                    <source src={VIDEO_SRC} type="video/mp4" />
                </video>
            </motion.div>

            {/* Brand Gradient Overlay */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/70 via-brand-purple/60 to-brand-deep/90" />
            </motion.div>

            {/* Subtle animated grain for premium texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />
        </div>
    );
}
