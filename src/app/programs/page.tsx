import { getAllProgramsForBrowse, getDistinctDisciplines } from "@/lib/data";
import ProgramsClient from "./ProgramsClient";

export const dynamic = "force-dynamic";

interface Props {
    searchParams: Promise<{ discipline?: string }>;
}

export default async function ProgramsPage({ searchParams }: Props) {
    const params = await searchParams;
    const discipline = params.discipline || null;

    const [programs, disciplines] = await Promise.all([
        getAllProgramsForBrowse(discipline ?? undefined),
        getDistinctDisciplines(),
    ]);

    const serialized = programs.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        level: p.level,
        duration: p.duration,
        tuitionFee: p.tuitionFee,
        currency: p.currency,
        intakeDates: p.intakeDates,
        description: p.description,
        scholarshipAvailable: p.scholarshipAvailable,
        studyMode: p.studyMode,
        discipline: p.discipline,
        universityName: p.university.name,
        universitySlug: p.university.slug,
        countryName: p.university.country.name,
        countryFlag: p.university.country.flag,
    }));

    return (
        <ProgramsClient
            programs={serialized}
            disciplines={disciplines}
            activeDiscipline={discipline}
        />
    );
}
