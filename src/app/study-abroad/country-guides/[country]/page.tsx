import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export const revalidate = 3600;
import {
    ArrowLeft,
    GraduationCap,
    MapPin,
    Building2,
    ArrowRight,
    Globe,
} from "lucide-react";

export async function generateStaticParams() {
    const countries = await prisma.country.findMany({
        select: { slug: true },
        where: { slug: { not: "" } },
    });
    return countries
        .filter((c) => c.slug)
        .map((c) => ({ country: String(c.slug) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country: slug } = await params;
    const country = await prisma.country.findUnique({ where: { slug } });
    if (!country) return { title: "Country Not Found" };
    return {
        title: `Study in ${country.name} — Orange Studies`,
        description: country.description || `Explore universities and programs in ${country.name} with Orange Studies.`,
    };
}

export default async function CountryDetailPage({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country: slug } = await params;

    const country = await prisma.country.findUnique({
        where: { slug },
    });

    if (!country) {
        notFound();
    }

    const universities = await prisma.university.findMany({
        where: { countryId: country.id },
        include: {
            programs: { select: { id: true } },
        },
        orderBy: { ranking: "asc" },
    });

    return (
        <>
            {/* ─── Hero Section ─── */}
            <section className="relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-deep to-brand-purple" />
                {country.image && (
                    <img
                        src={country.image}
                        alt={country.name}
                        className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
                    {/* Breadcrumb */}
                    <Link
                        href="/study-abroad/country-guides"
                        className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Country Guides
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-6xl md:text-7xl">{country.flag}</span>
                        <div>
                            <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                                Study in {country.name}
                            </h1>
                            <p className="mt-3 max-w-2xl text-base text-white/70 md:text-lg">
                                {country.description || `Discover world-class universities and programs in ${country.name}.`}
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
                            <Building2 className="h-5 w-5 text-brand-orange" />
                            <p className="mt-2 text-2xl font-bold text-white">{universities.length}</p>
                            <p className="text-xs font-medium text-white/50">Universities</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">
                            <GraduationCap className="h-5 w-5 text-brand-orange" />
                            <p className="mt-2 text-2xl font-bold text-white">
                                {universities.reduce((sum, u) => sum + u.programs.length, 0)}
                            </p>
                            <p className="text-xs font-medium text-white/50">Programs Available</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md sm:col-span-1 col-span-2">
                            <Globe className="h-5 w-5 text-brand-orange" />
                            <p className="mt-2 text-2xl font-bold text-white">{country.code}</p>
                            <p className="text-xs font-medium text-white/50">Country Code</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Universities Grid ─── */}
            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl font-[family-name:var(--font-heading)]">
                        Universities in {country.name}
                    </h2>
                    <p className="mt-2 text-sm text-neutral-500">
                        Explore top-ranked institutions and find the right fit for your academic journey.
                    </p>
                </div>

                {universities.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {universities.map((uni) => (
                            <Link
                                key={uni.id}
                                href={`/institutions/${uni.slug}`}
                                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Accent bar */}
                                <div
                                    className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                                    style={{ backgroundColor: uni.colorAccent || "#662D91" }}
                                />

                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm"
                                        style={{ backgroundColor: `${uni.colorAccent || "#662D91"}15` }}
                                    >
                                        {uni.logoPlaceholder || "🏛️"}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-purple transition-colors font-[family-name:var(--font-heading)]">
                                            {uni.name}
                                        </h3>
                                        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                                            <MapPin className="h-3 w-3" />
                                            {uni.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-neutral-600 line-clamp-2">
                                    {uni.description || "Discover programs and opportunities at this institution."}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600">
                                            <GraduationCap className="h-3 w-3" />
                                            {uni.programs.length} Programs
                                        </span>
                                        {uni.ranking && uni.ranking < 999 && (
                                            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                                                #{uni.ranking} Ranked
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
                        <p className="mt-1 text-sm text-neutral-400">Check back soon — we&apos;re adding more institutions.</p>
                    </div>
                )}
            </section>

            <CTABanner />
            <Footer />
        </>
    );
}
