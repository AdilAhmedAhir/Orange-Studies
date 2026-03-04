import { prisma } from "@/lib/prisma";
import { CountryGuidesHero } from "@/components/study-abroad/CountryGuidesHero";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export const revalidate = 3600;

export default async function CountryGuidesPage() {
    const dbCountries = await prisma.country.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { universities: true } } },
    });

    const countries = dbCountries.map((c) => ({
        slug: c.slug || "",
        name: c.name,
        flag: c.flag,
        tagline: c.tagline || `Explore education in ${c.name}`,
        universities: c._count.universities > 0 ? `${c._count.universities}+ Universities` : "Universities",
        avgTuition: c.avgTuition || "Contact for details",
        visaTime: c.visaTime || "Varies",
        color: c.colorAccent || "#662D91",
        accent: c.colorAccent || "#662D91",
        highlights: c.highlights.length > 0 ? c.highlights : ["Quality Education", "Global Recognition"],
        description: c.description || "",
        image: c.image || "",
    }));

    return (
        <>
            <CountryGuidesHero countries={countries} />
            <CTABanner />
            <Footer />
        </>
    );
}
