import { prisma } from "@/lib/prisma";

// ─── University Queries ──────────────────────────────

export async function getUniversityBySlug(slug: string) {
    return prisma.university.findUnique({
        where: { slug },
        include: {
            country: true,
            programs: true,
        },
    });
}

export async function getAllUniversities() {
    return prisma.university.findMany({
        include: { country: true, programs: true },
        orderBy: { ranking: "asc" },
    });
}

// ─── Program Queries ─────────────────────────────────

export async function getProgramBySlug(slug: string) {
    return prisma.program.findUnique({
        where: { slug },
        include: {
            university: {
                include: { country: true },
            },
        },
    });
}

export async function getAllPrograms() {
    return prisma.program.findMany({
        include: {
            university: {
                include: { country: true },
            },
        },
        orderBy: { title: "asc" },
    });
}

export async function searchPrograms(filters: {
    query?: string;
    country?: string;
    level?: string;
    discipline?: string;
}) {
    const where: Record<string, unknown> = {};

    if (filters.query) {
        where.OR = [
            { title: { contains: filters.query, mode: "insensitive" } },
            { description: { contains: filters.query, mode: "insensitive" } },
            { university: { name: { contains: filters.query, mode: "insensitive" } } },
        ];
    }

    if (filters.country) {
        where.university = {
            ...(where.university as object || {}),
            country: { name: { contains: filters.country, mode: "insensitive" } },
        };
    }

    if (filters.level) {
        where.level = { contains: filters.level, mode: "insensitive" };
    }

    return prisma.program.findMany({
        where,
        include: {
            university: {
                include: { country: true },
            },
        },
        orderBy: { title: "asc" },
    });
}

// ─── Programs Browse (with optional discipline filter) ──

export async function getAllProgramsForBrowse(discipline?: string) {
    const where: Record<string, unknown> = {};
    if (discipline) {
        where.discipline = { contains: discipline, mode: "insensitive" };
    }

    return prisma.program.findMany({
        where,
        include: {
            university: {
                include: { country: true },
            },
        },
        orderBy: { title: "asc" },
    });
}

// ─── Distinct disciplines from DB ──────────────────────

export async function getDistinctDisciplines(): Promise<string[]> {
    const results = await prisma.program.findMany({
        select: { discipline: true },
        distinct: ["discipline"],
        where: { discipline: { not: "" } },
        orderBy: { discipline: "asc" },
    });
    return results.map((r) => r.discipline);
}
