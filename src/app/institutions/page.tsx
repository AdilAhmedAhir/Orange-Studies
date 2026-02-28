import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    GraduationCap, Users, Globe, BarChart3, Target, Zap,
    CheckCircle, ArrowRight, Building2, Award, MapPin,
} from "lucide-react";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export const revalidate = 3600;

const servicesOffered = [
    { title: "Student Recruitment", description: "We source, screen, and refer quality international students to your programs, ensuring they meet your admission criteria.", icon: Users, color: "from-brand-orange to-amber-400" },
    { title: "Regional Representation", description: "Act as your official representative in South Asia, East Asia, and the Middle East — managing inquiries and applications.", icon: Globe, color: "from-blue-500 to-indigo-500" },
    { title: "Application Processing", description: "We handle the complete student application workflow — from document collection to SOP review to offer acceptance.", icon: GraduationCap, color: "from-brand-purple to-brand-purple-light" },
    { title: "Marketing & Branding", description: "Promote your programs through our digital channels, webinars, education fairs, and in-person counseling sessions.", icon: Target, color: "from-rose-500 to-pink-500" },
    { title: "Pre-Departure Support", description: "We prepare students for enrollment with visa guidance, accommodation assistance, and pre-departure orientations.", icon: Zap, color: "from-emerald-500 to-teal-500" },
    { title: "Data & Insights", description: "Receive detailed reports on student demographics, conversion rates, and market trends to optimize your recruitment strategy.", icon: BarChart3, color: "from-amber-500 to-orange-500" },
];

export default async function InstitutionsPage() {
    const universities = await prisma.university.findMany({
        include: { country: true, programs: { select: { id: true } } },
        orderBy: { ranking: "asc" },
        take: 50,
    });

    return (
        <>
            {/* Hero */}
            <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-brand-purple">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-brand-deep to-brand-purple" />
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/8 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 lg:pt-32 pb-12 text-center">
                    <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-300">For Institutions</span>
                    <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] sm:text-5xl lg:text-6xl">
                        Partner With <span className="text-brand-orange">Orange Studies</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Connect with a pipeline of qualified, motivated international students. We handle recruitment, so you can focus on education.
                    </p>
                    <a href="#partner-universities" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-orange/25 transition-all hover:bg-brand-orange-dark hover:-translate-y-0.5">
                        View Our Partners <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 52 1440 56V60H0Z" fill="white" /></svg></div>
            </section>

            {/* Services */}
            <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">Our Services</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl font-[family-name:var(--font-heading)]">What We Offer Institutions</h2>
                </div>
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesOffered.map((s) => (
                        <div key={s.title} className="group rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-sm transition-transform group-hover:scale-110`}>
                                <s.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 font-[family-name:var(--font-heading)]">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partner Universities — LIVE DATA */}
            <section id="partner-universities" className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-28">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-orange-dark">Our Network</span>
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Universities We Work With</h2>
                    <p className="mt-3 text-sm text-neutral-500">{universities.length} partner institutions across the globe</p>
                </div>

                {universities.length > 0 ? (
                    <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {universities.map((uni) => (
                            <Link
                                key={uni.id}
                                href={`/institutions/${uni.slug}`}
                                prefetch={true}
                                className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl" style={{ backgroundColor: uni.colorAccent || "#662D91" }} />
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm" style={{ backgroundColor: `${uni.colorAccent || "#662D91"}15` }}>
                                        {uni.logoPlaceholder || "🏛️"}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-purple transition-colors font-[family-name:var(--font-heading)]">
                                            {uni.name}
                                        </h3>
                                        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                                            <MapPin className="h-3 w-3" /> {uni.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-neutral-600 line-clamp-2">{uni.description || "Explore programs and opportunities at this institution."}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600">
                                            {uni.country.flag} {uni.country.name}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600">
                                            <GraduationCap className="h-3 w-3" /> {uni.programs.length} Programs
                                        </span>
                                        {uni.ranking && uni.ranking < 999 && (
                                            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                                                <Award className="h-3 w-3 inline mr-0.5" />#{uni.ranking}
                                            </span>
                                        )}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-neutral-300 transition-all group-hover:text-brand-purple group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <Building2 className="h-12 w-12 text-neutral-200" />
                        <p className="mt-4 text-lg font-semibold text-neutral-400">No universities listed yet</p>
                    </div>
                )}
            </section>

            {/* Partnership CTA */}
            <section className="relative z-10 bg-white px-6 py-24 lg:py-32">
                <div className="mx-auto max-w-xl text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-brand-orange" />
                    <h2 className="mt-4 text-3xl font-bold text-neutral-800 font-[family-name:var(--font-heading)]">Become a Partner</h2>
                    <p className="mt-2 text-neutral-500">Want to list your institution on Orange Studies? Get in touch with our partnerships team.</p>
                    <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-purple px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-purple/20 transition-all hover:bg-brand-deep hover:shadow-lg">
                        Contact Us <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <CTABanner />
            <Footer />
        </>
    );
}
