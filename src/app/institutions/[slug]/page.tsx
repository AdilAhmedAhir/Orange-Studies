import { notFound } from "next/navigation";
import { getUniversityBySlug } from "@/lib/data";
import UniversityDetailClient from "./UniversityDetailClient";

export default async function UniversityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const university = await getUniversityBySlug(slug);

    if (!university) notFound();

    // Serialize for client component
    const uni = {
        ...university,
        country: {
            name: university.country.name,
            code: university.country.code,
            flag: university.country.flag,
            slug: university.country.slug || "",
        },
        courses: university.programs,
        tuitionRange: {
            min: university.tuitionMin,
            max: university.tuitionMax,
            currency: university.tuitionCurrency,
        },
    };

    return <UniversityDetailClient uni={uni} />;
}
