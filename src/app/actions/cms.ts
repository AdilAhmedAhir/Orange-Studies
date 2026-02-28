"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";

/* ── Helper: auth gate ── */
async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) return null;
    return user;
}

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function revalidateCMS() {
    revalidatePath("/institutions");
    revalidatePath("/programs");
    revalidatePath("/search");
    revalidatePath("/dashboard/admin");
    revalidatePath("/dashboard/admin/universities");
    revalidatePath("/dashboard/admin/programs");
    revalidatePath("/dashboard/admin/countries");
}

/* ═══════════════════════════════════════════════════════
   COUNTRY CRUD
   ═══════════════════════════════════════════════════════ */
export interface CountryPayload {
    id?: string;          // if present → update, otherwise → create
    name: string;
    code: string;
    flag: string;
    description?: string;
    image?: string;
}

export async function upsertCountry(data: CountryPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };
        if (!data.name || !data.code || !data.flag) return { success: false, error: "Name, code, and flag are required." };

        if (data.id) {
            // Preserve existing slug on update for SEO
            await prisma.country.update({
                where: { id: data.id },
                data: {
                    name: data.name.trim(),
                    code: data.code.trim().toUpperCase(),
                    flag: data.flag.trim(),
                    description: data.description || null,
                    image: data.image || null,
                },
            });
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
                },
            });
        }
        revalidateCMS();
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
        await prisma.country.delete({ where: { id } });
        revalidateCMS();
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
            ranking: data.ranking || 999,
            logoPlaceholder: data.logoPlaceholder || "🏛️",
            tuitionMin: data.tuitionMin || 0,
            tuitionMax: data.tuitionMax || 0,
            tuitionCurrency: data.tuitionCurrency || "GBP",
            established: data.established || new Date().getFullYear(),
            totalStudents: data.totalStudents || 0,
            internationalStudents: data.internationalStudents || 0,
            acceptanceRate: data.acceptanceRate || 0,
            description: data.description || "",
            detailedDescription: data.detailedDescription || data.description || "",
            highlights: [] as string[],
            facilities: [] as string[],
            campusLife: "",
            admissionRequirements: [] as string[],
            accommodationInfo: "",
            colorAccent: data.colorAccent || "#662D91",
            tags: [] as string[],
            countryId: data.countryId,
        };

        if (data.id) {
            // Preserve existing slug on update for SEO
            const { slug: _unused, ...updatePayload } = payload;
            void _unused;
            await prisma.university.update({ where: { id: data.id }, data: updatePayload });
        } else {
            // Collision-safe slug
            const existingSlug = await prisma.university.findUnique({ where: { slug: payload.slug } });
            if (existingSlug) payload.slug += `-${randomBytes(2).toString("hex")}`;
            await prisma.university.create({ data: payload });
        }
        revalidateCMS();
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
        await prisma.university.delete({ where: { id } });
        revalidateCMS();
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
            tuitionFee: data.tuitionFee || 0,
            currency: data.currency || "GBP",
            intakeDates: ["September"],
            description: data.description || "",
            detailedDescription: data.description || "",
            modules: [] as string[],
            entryRequirements: [] as string[],
            careerOutcomes: [] as string[],
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
            await prisma.program.update({ where: { id: data.id }, data: updatePayload });
        } else {
            // Collision-safe slug
            const existingSlug = await prisma.program.findUnique({ where: { slug: payload.slug } });
            if (existingSlug) payload.slug += `-${randomBytes(2).toString("hex")}`;
            await prisma.program.create({ data: payload });
        }
        revalidateCMS();
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
        await prisma.program.delete({ where: { id } });
        revalidateCMS();
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete.";
        return { success: false, error: msg };
    }
}
