"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { del } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth-guards";

function generatePassword(length = 8): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
}

/* ═══════════════════════════════════════════════════════
   CREATE STAFF ACCOUNT
   ═══════════════════════════════════════════════════════ */
export async function createStaffAccount(data: {
    fullName: string;
    email: string;
    role: "ADMIN" | "MANAGER" | "STUDENT";
}): Promise<{ success: boolean; password?: string; error?: string }> {
    try {
        const admin = await requireAdmin(false);
        if (!admin) return { success: false, error: "Only ADMIN users can create staff accounts." };

        if (!data.fullName || !data.email) return { success: false, error: "Name and email are required." };

        // Check if email is already registered
        const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase().trim() } });
        if (existing) return { success: false, error: "A user with this email already exists." };

        const plainPassword = generatePassword(8);
        const passwordHash = await bcrypt.hash(plainPassword, 12);

        await prisma.user.create({
            data: {
                fullName: data.fullName.trim(),
                email: data.email.toLowerCase().trim(),
                passwordHash,
                role: data.role,
            },
        });

        revalidatePath("/dashboard/admin/users");
        return { success: true, password: plainPassword };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to create account.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   CHANGE USER ROLE
   ═══════════════════════════════════════════════════════ */
export async function changeUserRole(
    userId: string,
    newRole: "STUDENT" | "ADMIN" | "MANAGER"
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin(false);
        if (!admin) return { success: false, error: "Only ADMIN users can change roles." };

        // Cannot change own role
        if (admin.id === userId) return { success: false, error: "You cannot change your own role." };

        await prisma.user.update({ where: { id: userId }, data: { role: newRole } });
        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to change role.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   DELETE / SUSPEND USER
   ═══════════════════════════════════════════════════════ */
export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin(false);
        if (!admin) return { success: false, error: "Only ADMIN users can delete accounts." };

        if (admin.id === userId) return { success: false, error: "You cannot delete your own account." };

        // Check for applications
        const appCount = await prisma.application.count({ where: { userId } });
        if (appCount > 0) {
            return { success: false, error: `Cannot delete: user has ${appCount} application(s). Remove applications first.` };
        }

        // Clean up user's document blobs before deletion
        const userDocs = await prisma.document.findMany({
            where: { userId },
            select: { fileUrl: true },
        });
        const blobUrls = userDocs.map((d) => d.fileUrl).filter(Boolean) as string[];
        if (blobUrls.length > 0) {
            try { await del(blobUrls); } catch { /* blobs may already be gone */ }
        }

        await prisma.user.delete({ where: { id: userId } });
        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to delete.";
        return { success: false, error: msg };
    }
}

