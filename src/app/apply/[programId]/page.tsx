import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ApplicationWizardClient from "./ApplicationWizardClient";

export default async function ApplyPage({ params }: { params: Promise<{ programId: string }> }) {
    const { programId } = await params;

    // programId is actually a slug in the URL
    const program = await prisma.program.findUnique({
        where: { slug: programId },
        include: {
            university: {
                include: { country: true },
            },
        },
    });

    if (!program) notFound();

    const courseData = {
        id: program.id,
        slug: program.slug,
        title: program.title,
        level: program.level,
        duration: program.duration,
        tuitionFee: program.tuitionFee,
        currency: program.currency,
    };

    const universityData = {
        slug: program.university.slug,
        name: program.university.name,
        location: program.university.location,
        logoPlaceholder: program.university.logoPlaceholder,
        country: {
            name: program.university.country.name,
            code: program.university.country.code,
            flag: program.university.country.flag,
        },
    };

    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
            </div>
        }>
            <ApplicationWizardClient
                programId={program.id}
                course={courseData}
                university={universityData}
            />
        </Suspense>
    );
}

