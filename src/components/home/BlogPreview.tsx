"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Image from "next/image";

/* ── blog data ─────────────────────────────────────────── */
const articles = [
    {
        title: "Top 10 Scholarships for International Students in 2026",
        excerpt:
            "Discover fully-funded scholarships from the Chevening, Fulbright, and DAAD programs that could cover your entire tuition.",
        category: "Scholarships",
        readTime: "5 min read",
        image: "/images/blog/scholarships.jpg",
        color: "from-amber-400 to-orange-500",
        accent: "bg-amber-100 text-amber-700",
    },
    {
        title: "UK vs Canada: Which Country Is Right for You?",
        excerpt:
            "Compare cost of living, work opportunities, and academic culture to make the best choice for your study abroad journey.",
        category: "Guides",
        readTime: "7 min read",
        image: "/images/blog/compare.jpg",
        color: "from-blue-400 to-indigo-500",
        accent: "bg-blue-100 text-blue-700",
    },
    {
        title: "How to Write an SOP That Gets You Accepted",
        excerpt:
            "Our admissions experts share the exact framework used by students accepted to Oxford, MIT, and University of Toronto.",
        category: "Tips",
        readTime: "6 min read",
        image: "/images/blog/sop.jpg",
        color: "from-emerald-400 to-teal-500",
        accent: "bg-emerald-100 text-emerald-700",
    },
];

/* ── single card ───────────────────────────────────────── */
function ArticleCard({
    article,
    index,
}: {
    article: (typeof articles)[0];
    index: number;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group cursor-pointer"
        >
            <div className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-purple/5 hover:-translate-y-1">
                {/* image area */}
                <div className="relative h-48 overflow-hidden">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-90`}
                    />
                    {/* decorative shapes */}
                    <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/10" />
                    <div className="absolute top-6 left-6 h-16 w-16 rounded-full bg-white/10" />
                    {/* icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white/80 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* category badge */}
                    <div className="absolute top-4 left-4">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${article.accent}`}
                        >
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* content */}
                <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug text-neutral-800 transition-colors duration-300 group-hover:text-brand-purple font-[family-name:var(--font-heading)]">
                        {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                        {article.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime}
                        </div>
                        <motion.div
                            className="flex items-center gap-1 text-sm font-medium text-brand-orange"
                            whileHover={{ x: 4 }}
                        >
                            Read More
                            <ArrowRight className="h-3.5 w-3.5" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

/* ── section ──────────────────────────────────────────── */
export function BlogPreview() {
    return (
        <section className="relative z-10 bg-white px-6 py-24 lg:py-32 overflow-hidden">
            {/* heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-14 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">
                    Resources
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Latest from Our Blog
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Expert advice, scholarship tips, and study abroad guides to
                    help you succeed.
                </p>
            </motion.div>

            {/* cards */}
            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, i) => (
                    <ArticleCard key={i} article={article} index={i} />
                ))}
            </div>

            {/* view all link */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
            >
                <a
                    href="/blog"
                    className="group/link inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-300 hover:border-brand-purple hover:text-brand-purple hover:shadow-md"
                >
                    View All Articles
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
            </motion.div>
        </section>
    );
}
