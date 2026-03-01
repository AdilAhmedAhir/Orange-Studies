import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UniversitiesCMSClient from "./UniversitiesCMSClient";

export default async function UniversitiesCMSPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) redirect("/");

    const [universities, countries] = await Promise.all([
        prisma.university.findMany({
            orderBy: { name: "asc" },
            include: {
                country: { select: { name: true, flag: true } },
                _count: { select: { programs: true } },
            },
        }),
        prisma.country.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, flag: true } }),
    ]);

    const serialized = universities.map((u) => ({
        id: u.id,
        name: u.name,
        slug: u.slug,
        location: u.location,
        ranking: u.ranking,
        countryId: u.countryId,
        countryName: u.country.name,
        countryFlag: u.country.flag,
        programCount: u._count.programs,
        tuitionMin: u.tuitionMin,
        tuitionMax: u.tuitionMax,
        tuitionCurrency: u.tuitionCurrency,
        established: u.established,
        description: u.description,
        logoPlaceholder: u.logoPlaceholder,
        totalStudents: u.totalStudents,
        internationalStudents: u.internationalStudents,
        acceptanceRate: u.acceptanceRate,
        detailedDescription: u.detailedDescription,
        colorAccent: u.colorAccent,
        highlights: u.highlights,
        facilities: u.facilities,
        campusLife: u.campusLife,
        admissionRequirements: u.admissionRequirements,
        accommodationInfo: u.accommodationInfo,
        tags: u.tags,
    }));

    return <UniversitiesCMSClient universities={serialized} countries={countries} />;
}
