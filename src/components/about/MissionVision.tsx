"use client";

import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eye, Target } from "lucide-react";

export function MissionVision() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
            <SectionHeading
                label="Our Purpose"
                title="Mission & Vision"
                subtitle="What drives us every day and the future we're building."
            />

            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2"
            >
                {/* Mission Card */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, x: -40 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple to-brand-deep p-10 text-white"
                >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative z-10">
                        <div className="mb-6 inline-flex rounded-xl bg-white/10 p-3">
                            <Target className="h-7 w-7 text-brand-orange" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold font-[family-name:var(--font-heading)]">
                            Our Mission
                        </h3>
                        <p className="leading-relaxed text-white/80">
                            To democratize access to international education by providing transparent,
                            personalized guidance that empowers students from all backgrounds to study
                            at the world&apos;s best institutions. We believe geography shouldn&apos;t
                            determine opportunity.
                        </p>
                    </div>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, x: 40 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="group relative overflow-hidden rounded-3xl border-2 border-brand-purple/10 bg-white p-10"
                >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-purple/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative z-10">
                        <div className="mb-6 inline-flex rounded-xl bg-brand-purple/8 p-3">
                            <Eye className="h-7 w-7 text-brand-purple" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-brand-purple font-[family-name:var(--font-heading)]">
                            Our Vision
                        </h3>
                        <p className="leading-relaxed text-neutral-600">
                            To become the most trusted global education platform — connecting 1 million
                            students with their dream universities by 2030, while building the largest
                            network of ethical recruitment partners worldwide.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
