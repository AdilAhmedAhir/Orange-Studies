import { notFound } from "next/navigation";
import { getProgramBySlug } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import ProgramDetailClient from "./ProgramDetailClient";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    const programs = await prisma.program.findMany({ select: { slug: true } });
    return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const program = await getProgramBySlug(slug);

    if (!program) notFound();

    // Serialize for client component, mapping to match existing UI expectations
    const course = {
        id: program.id,
        slug: program.slug,
        title: program.title,
        level: program.level,
        duration: program.duration,
        tuitionFee: program.tuitionFee,
        currency: program.currency,
        intakeDates: program.intakeDates,
        description: program.description,
        detailedDescription: program.detailedDescription,
        modules: program.modules,
        entryRequirements: program.entryRequirements,
        careerOutcomes: program.careerOutcomes,
        scholarshipAvailable: program.scholarshipAvailable,
        applicationDeadline: program.applicationDeadline,
        studyMode: program.studyMode,
    };

    const university = {
        id: program.university.id,
        slug: program.university.slug,
        name: program.university.name,
        location: program.university.location,
        ranking: program.university.ranking,
        logoPlaceholder: program.university.logoPlaceholder,
        colorAccent: program.university.colorAccent,
        description: program.university.description,
        country: {
            name: program.university.country.name,
            code: program.university.country.code,
            flag: program.university.country.flag,
            slug: program.university.country.slug || "",
        },
    };

    return <ProgramDetailClient course={course} university={university} />;
}
