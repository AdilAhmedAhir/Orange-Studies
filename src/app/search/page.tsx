import { getAllPrograms } from "@/lib/data";
import SearchClient from "./SearchClient";

export default async function SearchPage() {
    const programs = await getAllPrograms();

    // Serialize to flat course shape matching existing UI
    const courses = programs.map((p) => ({
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
        universityName: p.university.name,
        universitySlug: p.university.slug,
        countryName: p.university.country.name,
        countryFlag: p.university.country.flag,
    }));

    return <SearchClient courses={courses} />;
}
