"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 800);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200/50 bg-white/90 px-4 py-3 backdrop-blur-lg md:hidden"
                >
                    <a
                        href="/get-started"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-dark py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all duration-300 active:scale-[0.98]"
                    >
                        Get Started Free
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
