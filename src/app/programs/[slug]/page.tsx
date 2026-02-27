import { notFound } from "next/navigation";
import { getProgramBySlug } from "@/lib/data";
import ProgramDetailClient from "./ProgramDetailClient";

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
        country: program.university.country,
    };

    return <ProgramDetailClient course={course} university={university} />;
}
