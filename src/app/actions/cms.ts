"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { requireAdmin } from "@/lib/auth-guards";

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Parse newline-separated textarea strings into clean arrays */
function parseArray(str?: string | null): string[] {
    return str ? str.split("\n").map((s) => s.trim()).filter(Boolean) : [];
}

function revalidateCMS(opts?: { universitySlug?: string; programSlug?: string; countrySlug?: string }) {
    // Always purge listing pages and admin dashboards
    revalidatePath("/");
    revalidatePath("/institutions");
    revalidatePath("/programs");
    revalidatePath("/search");
    revalidatePath("/study-abroad");
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/admin/universities");
    revalidatePath("/dashboard/admin/programs");
    revalidatePath("/dashboard/admin/countries");

    // Precise slug-level purges for SSG/ISR detail pages
    if (opts?.universitySlug) revalidatePath(`/institutions/${opts.universitySlug}`);
    if (opts?.programSlug) revalidatePath(`/programs/${opts.programSlug}`);
    if (opts?.countrySlug) revalidatePath(`/study-abroad/country-guides/${opts.countrySlug}`);
}

/* ═══════════════════════════════════════════════════════
   COUNTRY CRUD
   ═══════════════════════════════════════════════════════ */
export interface CountryPayload {
    id?: string;
    name: string;
    code: string;
    flag: string;
    description?: string;
    image?: string;
    tagline?: string;
    avgTuition?: string;
    visaTime?: string;
    highlights?: string;   // newline-separated
    colorAccent?: string;
}

export async function upsertCountry(data: CountryPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        if (!data.name || !data.code || !data.flag) return { success: false, error: "Name, code, and flag are required." };

        if (data.id) {
            // Preserve existing slug on update for SEO
            const result = await prisma.country.update({
                where: { id: data.id },
                data: {
                    name: data.name.trim(),
                    code: data.code.trim().toUpperCase(),
                    flag: data.flag.trim(),
                    description: data.description || null,
                    image: data.image || null,
                    tagline: data.tagline || null,
                    avgTuition: data.avgTuition || null,
                    visaTime: data.visaTime || null,
                    highlights: parseArray(data.highlights),
                    colorAccent: data.colorAccent || null,
                },
            });
            revalidateCMS({ countrySlug: result.slug || undefined });
        } else {
            // Collision-safe slug
            let slug = slugify(data.name);
            const existing = await prisma.country.findUnique({ where: { slug } });
            if (existing) slug += `-${randomBytes(2).toString("hex")}`;

            await prisma.country.create({
                data: {
                    name: data.name.trim(),
                    code: data.code.trim().toUpperCase(),
                    flag: data.flag.trim(),
                    slug,
                    description: data.description || null,
                    image: data.image || null,
                    tagline: data.tagline || null,
                    avgTuition: data.avgTuition || null,
                    visaTime: data.visaTime || null,
                    highlights: parseArray(data.highlights),
                    colorAccent: data.colorAccent || null,
                },
            });
        }
        revalidateCMS({ countrySlug: data.id ? undefined : slugify(data.name) });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}

export async function deleteCountry(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        // Check for related universities first
        const uniCount = await prisma.university.count({ where: { countryId: id } });
        if (uniCount > 0) return { success: false, error: `Cannot delete: ${uniCount} universities belong to this country.` };
        const deleted = await prisma.country.delete({ where: { id } });
        revalidateCMS({ countrySlug: deleted.slug || undefined });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   UNIVERSITY CRUD
   ═══════════════════════════════════════════════════════ */
export interface UniversityPayload {
    id?: string;
    name: string;
    location: string;
    countryId: string;
    ranking: number;
    description: string;
    detailedDescription?: string;
    logoPlaceholder?: string;
    tuitionMin?: number;
    tuitionMax?: number;
    tuitionCurrency?: string;
    established?: number;
    totalStudents?: number;
    internationalStudents?: number;
    acceptanceRate?: number;
    colorAccent?: string;
    highlights?: string;           // newline-separated
    facilities?: string;           // newline-separated
    campusLife?: string;
    admissionRequirements?: string; // newline-separated
    accommodationInfo?: string;
    tags?: string;                 // newline-separated
}

export async function upsertUniversity(data: UniversityPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        if (!data.name || !data.countryId) return { success: false, error: "Name and country are required." };

        const payload = {
            slug: slugify(data.name),
            name: data.name.trim(),
            location: data.location?.trim() || "",
            ranking: Number(data.ranking) || 999,
            logoPlaceholder: data.logoPlaceholder || "🏛️",
            tuitionMin: Number(data.tuitionMin) || 0,
            tuitionMax: Number(data.tuitionMax) || 0,
            tuitionCurrency: data.tuitionCurrency || "GBP",
            established: Number(data.established) || new Date().getFullYear(),
            totalStudents: Number(data.totalStudents) || 0,
            internationalStudents: Number(data.internationalStudents) || 0,
            acceptanceRate: Number(data.acceptanceRate) || 0,
            description: data.description || "",
            detailedDescription: data.detailedDescription || data.description || "",
            highlights: parseArray(data.highlights),
            facilities: parseArray(data.facilities),
            campusLife: data.campusLife || "",
            admissionRequirements: parseArray(data.admissionRequirements),
            accommodationInfo: data.accommodationInfo || "",
            colorAccent: data.colorAccent || "#662D91",
            tags: parseArray(data.tags),
            countryId: data.countryId,
        };

        if (data.id) {
            // Preserve existing slug on update for SEO
            const { slug: _unused, ...updatePayload } = payload;
            void _unused;
            const updated = await prisma.university.update({ where: { id: data.id }, data: updatePayload });
            revalidateCMS({ universitySlug: updated.slug });
        } else {
            // Collision-safe slug
            const existingSlug = await prisma.university.findUnique({ where: { slug: payload.slug } });
            if (existingSlug) payload.slug += `-${randomBytes(2).toString("hex")}`;
            await prisma.university.create({ data: payload });
        }
        if (!data.id) revalidateCMS({ universitySlug: payload.slug });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}

export async function deleteUniversity(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        const progCount = await prisma.program.count({ where: { universityId: id } });
        if (progCount > 0) return { success: false, error: `Cannot delete: ${progCount} programs belong to this university.` };
        const deleted = await prisma.university.delete({ where: { id } });
        revalidateCMS({ universitySlug: deleted.slug });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   PROGRAM CRUD
   ═══════════════════════════════════════════════════════ */
export interface ProgramPayload {
    id?: string;
    title: string;
    universityId: string;
    level: string;
    duration: string;
    tuitionFee: number;
    currency: string;
    description: string;
    discipline: string;
    studyMode: string;
    scholarshipAvailable?: boolean;
    applicationDeadline?: string;
    detailedDescription?: string;
    intakeDates?: string;          // newline-separated
    modules?: string;              // newline-separated
    entryRequirements?: string;    // newline-separated
    careerOutcomes?: string;       // newline-separated
}

export async function upsertProgram(data: ProgramPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        if (!data.title || !data.universityId) return { success: false, error: "Title and university are required." };

        const payload = {
            slug: slugify(data.title),
            title: data.title.trim(),
            level: data.level || "Bachelor",
            duration: data.duration || "4 years",
            tuitionFee: Number(data.tuitionFee) || 0,
            currency: data.currency || "GBP",
            intakeDates: parseArray(data.intakeDates),
            description: data.description || "",
            detailedDescription: data.detailedDescription || data.description || "",
            modules: parseArray(data.modules),
            entryRequirements: parseArray(data.entryRequirements),
            careerOutcomes: parseArray(data.careerOutcomes),
            scholarshipAvailable: data.scholarshipAvailable || false,
            applicationDeadline: data.applicationDeadline || "Rolling",
            studyMode: data.studyMode || "Full-time",
            discipline: data.discipline || "",
            universityId: data.universityId,
        };

        if (data.id) {
            // Preserve existing slug on update for SEO
            const { slug: _unused, ...updatePayload } = payload;
            void _unused;
            const updated = await prisma.program.update({ where: { id: data.id }, data: updatePayload });
            revalidateCMS({ programSlug: updated.slug });
        } else {
            // Collision-safe slug
            const existingSlug = await prisma.program.findUnique({ where: { slug: payload.slug } });
            if (existingSlug) payload.slug += `-${randomBytes(2).toString("hex")}`;
            await prisma.program.create({ data: payload });
        }
        if (!data.id) revalidateCMS({ programSlug: payload.slug });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}

export async function deleteProgram(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        const appCount = await prisma.application.count({ where: { programId: id } });
        if (appCount > 0) return { success: false, error: `Cannot delete: ${appCount} applications reference this program.` };
        const deleted = await prisma.program.delete({ where: { id } });
        revalidateCMS({ programSlug: deleted.slug });
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   COUNTRY SEEDING — 1-click population
   ═══════════════════════════════════════════════════════ */
const DEFAULT_COUNTRIES = [
    {
        name: "United Kingdom",
        code: "GB",
        flag: "🇬🇧",
        slug: "united-kingdom",
        description: "Home to world-renowned universities like Oxford and Cambridge, the UK offers a rich academic tradition, diverse cultural experiences, and globally recognized qualifications. With programs typically shorter than other countries, students benefit from excellent value and strong post-study work opportunities.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000",
    },
    {
        name: "Australia",
        code: "AU",
        flag: "🇦🇺",
        slug: "australia",
        description: "Australia combines world-class education with an unbeatable lifestyle. With 7 of the world's top 100 universities, stunning natural landscapes, and generous post-study work visas, Australia is one of the most popular destinations for international students seeking quality education and adventure.",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=2000",
    },
    {
        name: "Canada",
        code: "CA",
        flag: "🇨🇦",
        slug: "canada",
        description: "Canada is celebrated for its inclusive multicultural society, affordable tuition, and welcoming immigration policies. Canadian degrees are recognized worldwide, and graduates benefit from excellent pathways to permanent residency, making it an ideal destination for long-term career planning.",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=2000",
    },
    {
        name: "Germany",
        code: "DE",
        flag: "🇩🇪",
        slug: "germany",
        description: "Germany offers tuition-free education at many public universities, making it one of the most affordable study destinations in Europe. Known for engineering and technology excellence, Germany provides strong industry connections, cutting-edge research facilities, and a vibrant international student community.",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000",
    },
    {
        name: "United States",
        code: "US",
        flag: "🇺🇸",
        slug: "united-states",
        description: "The United States hosts the largest number of international students worldwide, with unparalleled academic diversity and research opportunities. From Ivy League institutions to innovative tech hubs, American universities offer flexible curricula, cutting-edge facilities, and extensive scholarship programs.",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?auto=format&fit=crop&q=80&w=2000",
    },
    {
        name: "Malaysia",
        code: "MY",
        flag: "🇲🇾",
        slug: "malaysia",
        description: "Malaysia offers affordable world-class education in a vibrant multicultural setting. With English-medium programs, low living costs, and a strategic location in Southeast Asia, Malaysia is an increasingly popular destination for international students seeking quality education at exceptional value.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=2000",
    },
];

export async function seedDefaultCountries(): Promise<{ success: boolean; count: number; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, count: 0, error: "Unauthorized." };

        let count = 0;
        for (const c of DEFAULT_COUNTRIES) {
            await prisma.country.upsert({
                where: { slug: c.slug },
                update: {},            // Don't overwrite if already customized
                create: c,
            });
            count++;
        }

        revalidatePath("/", "layout");
        revalidateCMS();
        return { success: true, count };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Seeding failed.";
        return { success: false, count: 0, error: msg };
    }
}
