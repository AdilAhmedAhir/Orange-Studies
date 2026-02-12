"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Users, Building2 } from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";

const WHATSAPP_NUMBER = "923001234567"; // Replace with actual number

const menuItems = [
    {
        label: "I am a Student",
        icon: GraduationCap,
        message: "Hi! I'm a student interested in studying abroad. I'd like to know more about the programs and universities available through Orange Studies.",
        color: "from-brand-orange to-amber-400",
    },
    {
        label: "I am a Recruiter",
        icon: Users,
        message: "Hi! I'm a recruiter looking to partner with Orange Studies. I'd like to discuss potential collaboration opportunities.",
        color: "from-brand-purple to-brand-purple-light",
    },
    {
        label: "I am an Institution",
        icon: Building2,
        message: "Hi! I represent an institution and I'm interested in collaborating with Orange Studies to connect with international students.",
        color: "from-brand-deep to-brand-purple",
    },
];

export function WhatsAppFAB() {
    const [isOpen, setIsOpen] = useState(false);

    const openWhatsApp = (message: string) => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Menu Items */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative z-50 flex flex-col gap-2"
                        >
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 }}
                                className="mb-1 rounded-2xl bg-white p-4 shadow-xl shadow-black/10"
                            >
                                <p className="text-sm font-semibold text-brand-purple font-[family-name:var(--font-heading)]">
                                    How can we help you?
                                </p>
                                <p className="mt-0.5 text-xs text-neutral-500">
                                    Chat with us on WhatsApp
                                </p>
                            </motion.div>

                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, x: 40, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 40, scale: 0.8 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 20,
                                        delay: 0.08 * (index + 1),
                                    }}
                                    whileHover={{ scale: 1.03, x: -4 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => openWhatsApp(item.message)}
                                    className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/5 transition-shadow hover:shadow-xl"
                                >
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}
                                    >
                                        <item.icon size={20} className="text-white" />
                                    </div>
                                    <span className="whitespace-nowrap text-sm font-semibold text-neutral-800">
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* FAB Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-deep ring-2 ring-brand-orange/40 shadow-lg shadow-brand-orange/20 transition-shadow hover:shadow-xl hover:shadow-brand-orange/30"
            >
                {/* Pulse ring */}
                {!isOpen && (
                    <span className="absolute inset-0 animate-pulse-soft rounded-full bg-brand-orange/20" />
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 90, scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: -90, scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <LogoIcon size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
