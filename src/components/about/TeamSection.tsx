"use client";

import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Linkedin, Mail } from "lucide-react";

interface Member {
    name: string;
    role: string;
    bio: string;
    initials: string;
    gradient: string;
}

const team: Member[] = [
    {
        name: "Ahmed Rahman",
        role: "Founder & CEO",
        bio: "15+ years in international education. Former university admissions officer turned ed-tech entrepreneur.",
        initials: "AR",
        gradient: "from-brand-purple to-brand-deep",
    },
    {
        name: "Sarah Begum",
        role: "Head of Counseling",
        bio: "Certified career counselor with a passion for helping students find their perfect academic fit worldwide.",
        initials: "SB",
        gradient: "from-brand-orange to-amber-600",
    },
    {
        name: "Mohammad Karim",
        role: "Visa & Immigration Lead",
        bio: "Immigration specialist with 98% visa success rate. Expert in UK, Canada, and Australia visa processes.",
        initials: "MK",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        name: "Nusrat Jahan",
        role: "Partner Relations Manager",
        bio: "Manages relationships with 200+ institutions and recruitment partners across 15 countries.",
        initials: "NJ",
        gradient: "from-blue-500 to-indigo-600",
    },
];

function TeamCard({ member, index }: { member: Member; index: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white text-center transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-brand-purple/10"
        >
            {/* Avatar area */}
            <div className={`relative h-40 bg-gradient-to-br ${member.gradient} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/30 font-[family-name:var(--font-heading)]">
                        {member.initials}
                    </span>
                </div>
                {/* Decorative circles */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10" />
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-white/5" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                    {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-orange">
                    {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    {member.bio}
                </p>

                {/* Social links */}
                <div className="mt-5 flex items-center justify-center gap-2">
                    <a
                        href="#"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-all duration-300 hover:bg-brand-purple hover:text-white"
                        aria-label={`${member.name} LinkedIn`}
                    >
                        <Linkedin className="h-3.5 w-3.5" />
                    </a>
                    <a
                        href="#"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-all duration-300 hover:bg-brand-orange hover:text-white"
                        aria-label={`${member.name} Email`}
                    >
                        <Mail className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export function TeamSection() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
            <SectionHeading
                label="Meet the Team"
                title="The People Behind Your Success"
                subtitle="Our diverse team of experts is dedicated to guiding you through every step of your journey."
            />

            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {team.map((member, i) => (
                    <TeamCard key={member.name} member={member} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
