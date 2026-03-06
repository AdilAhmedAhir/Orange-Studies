"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";
import { PAGE_DEFINITIONS, type PageKey } from "@/lib/page-definitions";

/* ── Types ────────────────────────────────────────────── */
export interface PageSectionPayload {
    page: string;
    section: string;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    items?: unknown;
    image?: string | null;
    enabled?: boolean;
    displayOrder?: number;
}

/* ── Revalidation ── */
function revalidatePages(page: string) {
    revalidatePath("/");
    revalidatePath(`/${page === "home" ? "" : page}`);
    revalidatePath("/dashboard/admin/pages");
    revalidatePath(`/dashboard/admin/pages/${page}`);
}

/* ── Get all sections for a page ── */
export async function getPageSections(page: string) {
    const sections = await prisma.pageSection.findMany({
        where: { page },
        orderBy: { displayOrder: "asc" },
    });
    return sections;
}

/* ── Get all pages with their section counts ── */
export async function getAllPageStats() {
    const counts = await prisma.pageSection.groupBy({
        by: ["page"],
        _count: { id: true },
    });

    const enabledCounts = await prisma.pageSection.groupBy({
        by: ["page"],
        where: { enabled: true },
        _count: { id: true },
    });

    const countMap = Object.fromEntries(counts.map((c) => [c.page, c._count.id]));
    const enabledMap = Object.fromEntries(enabledCounts.map((c) => [c.page, c._count.id]));

    return Object.entries(PAGE_DEFINITIONS).map(([key, def]) => ({
        key,
        label: def.label,
        icon: def.icon,
        totalSections: def.sections.length,
        configuredSections: countMap[key] || 0,
        enabledSections: enabledMap[key] || 0,
    }));
}

/* ── Upsert a page section ── */
export async function upsertPageSection(data: PageSectionPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        if (!data.page || !data.section) return { success: false, error: "Page and section are required." };

        await prisma.pageSection.upsert({
            where: { page_section: { page: data.page, section: data.section } },
            create: {
                page: data.page,
                section: data.section,
                title: data.title || null,
                subtitle: data.subtitle || null,
                description: data.description || null,
                items: data.items ?? undefined,
                image: data.image || null,
                enabled: data.enabled ?? true,
                displayOrder: data.displayOrder ?? 0,
            },
            update: {
                title: data.title || null,
                subtitle: data.subtitle || null,
                description: data.description || null,
                items: data.items ?? undefined,
                image: data.image || null,
                enabled: data.enabled ?? true,
                displayOrder: data.displayOrder ?? 0,
            },
        });

        revalidatePages(data.page);
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}

/* ── Toggle section visibility ── */
export async function togglePageSection(page: string, section: string, enabled: boolean): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        await prisma.pageSection.upsert({
            where: { page_section: { page, section } },
            create: { page, section, enabled },
            update: { enabled },
        });

        revalidatePages(page);
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}

/* ── Seed default sections for a page ── */
export async function seedPageSections(page: string): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
        const admin = await requireAdmin();
        if (!admin) return { success: false, error: "Unauthorized." };

        const pageDef = PAGE_DEFINITIONS[page as PageKey];
        if (!pageDef) return { success: false, error: `Unknown page: ${page}` };

        let count = 0;
        for (let i = 0; i < pageDef.sections.length; i++) {
            const section = pageDef.sections[i];
            const existing = await prisma.pageSection.findUnique({
                where: { page_section: { page, section: section.key } },
            });
            if (!existing) {
                await prisma.pageSection.create({
                    data: {
                        page,
                        section: section.key,
                        title: section.label,
                        subtitle: section.description,
                        enabled: true,
                        displayOrder: i,
                    },
                });
                count++;
            }
        }

        revalidatePages(page);
        return { success: true, count };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed.";
        return { success: false, error: msg };
    }
}
