"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Blog", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
    ],
    "study abroad": [
        { name: "Explore Programs", href: "/programs" },
        { name: "Overview", href: "/study-abroad" },
        { name: "Country Guides", href: "/study-abroad/country-guides" },
        { name: "Cost & Scholarships", href: "/study-abroad/cost-scholarships" },
        { name: "Application Checklist", href: "/study-abroad/application-checklist" },
        { name: "SOP & Visa Guides", href: "/study-abroad/sop-visa-guides" },
        { name: "FAQs", href: "/study-abroad/faqs" },
    ],
    partners: [
        { name: "For Recruiters", href: "/recruiters" },
        { name: "For Institutions", href: "/institutions" },
    ],
};

const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
    const { ref, isInView } = useScrollReveal({ preset: "fade-up" });

    return (
        <footer className="relative z-10 bg-neutral-900 text-neutral-300">
            {/* Top wave separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8"
            >
                {/* Main grid */}
                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Brand column */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center gap-2">
                            <LogoIcon size={40} />
                            <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                                <span className="text-white">Orange</span>
                                <span className="text-brand-orange">Studies</span>
                            </span>
                        </div>

                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
                            Making global education accessible, transparent, and effortless.
                            Connecting students with 200+ universities across 15 countries.
                        </p>

                        {/* Contact info */}
                        <div className="mt-6 space-y-3">
                            <a href="mailto:info@orangestudies.com" className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-brand-orange">
                                <Mail className="h-4 w-4" />
                                info@orangestudies.com
                            </a>
                            <a href="tel:+880123456789" className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-brand-orange">
                                <Phone className="h-4 w-4" />
                                +880 1234 567 89
                            </a>
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <MapPin className="h-4 w-4 shrink-0" />
                                Dhaka, Bangladesh
                            </div>
                        </div>
                    </motion.div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links], colIdx) => (
                        <motion.div
                            key={category}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ delay: (colIdx + 1) * 0.1 }}
                        >
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 transition-colors duration-200 hover:text-brand-orange"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    transition={{ delay: 0.5 }}
                    className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 sm:flex-row"
                >
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-neutral-500">
                            © {new Date().getFullYear()} Orange Studies. All rights reserved.
                        </p>
                        <span className="hidden h-3 w-px bg-neutral-700 sm:block" />
                        <div className="flex items-center gap-3">
                            <Link href="/privacy" className="text-xs text-neutral-500 transition-colors hover:text-brand-orange">Privacy Policy</Link>
                            <Link href="/terms" className="text-xs text-neutral-500 transition-colors hover:text-brand-orange">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-all duration-300 hover:bg-brand-orange hover:text-white hover:scale-110"
                            >
                                <social.icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
