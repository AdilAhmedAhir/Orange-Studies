"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Milestone {
    year: string;
    title: string;
    desc: string;
}

const milestones: Milestone[] = [
    {
        year: "2012",
        title: "Founded in Dhaka",
        desc: "Started as a small student counseling office with a dream of making global education accessible.",
    },
    {
        year: "2015",
        title: "50+ University Partners",
        desc: "Expanded our partner network across UK, Canada, and Australia.",
    },
    {
        year: "2018",
        title: "1000th Student Placed",
        desc: "Hit a major milestone — our 1000th student enrolled at an international university.",
    },
    {
        year: "2020",
        title: "Digital Transformation",
        desc: "Launched our online counseling platform, making guidance accessible remotely during COVID-19.",
    },
    {
        year: "2023",
        title: "200+ Partners · 15 Countries",
        desc: "Grew to 200+ university partnerships across 15 countries with 5000+ students placed.",
    },
    {
        year: "2025",
        title: "Platform Launch",
        desc: "Launched our B2B platform connecting recruiters and institutions worldwide.",
    },
];

export function Timeline() {
    const { ref, isInView } = useScrollReveal();

    return (
        <section className="relative z-10 bg-neutral-50/50 px-6 py-24 lg:py-32">
            <SectionHeading
                label="Our Journey"
                title="Milestones That Define Us"
                subtitle="From a small office in Dhaka to a global education platform."
            />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative mx-auto mt-16 max-w-3xl"
            >
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/30 via-brand-orange/30 to-transparent lg:left-1/2 lg:-translate-x-px" />

                {milestones.map((milestone, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                        <motion.div
                            key={milestone.year}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: isLeft ? -30 : 30,
                                },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className={`relative mb-10 flex items-start gap-6 lg:mb-12 ${isLeft
                                    ? "lg:flex-row lg:text-right"
                                    : "lg:flex-row-reverse lg:text-left"
                                }`}
                        >
                            {/* Dot */}
                            <div
                                className={`absolute left-6 top-1 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-purple bg-white lg:left-1/2 ${i === milestones.length - 1
                                        ? "border-brand-orange bg-brand-orange"
                                        : ""
                                    }`}
                            />

                            {/* Content */}
                            <div
                                className={`ml-12 w-full lg:ml-0 lg:w-[calc(50%-2rem)] ${isLeft ? "lg:pr-0" : "lg:pl-0"
                                    }`}
                            >
                                <div className="rounded-xl border border-neutral-100 bg-white p-6 transition-all duration-300 hover:border-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/5">
                                    <span className="mb-2 inline-block rounded-full bg-brand-purple/8 px-3 py-1 text-xs font-bold text-brand-purple">
                                        {milestone.year}
                                    </span>
                                    <h3 className="mb-2 text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-neutral-500">
                                        {milestone.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
