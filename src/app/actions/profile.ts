"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/* ═══════════════════════════════════════════════════════
   UPDATE PROFILE (any role)
   ═══════════════════════════════════════════════════════ */
export async function updateProfile(data: {
    fullName: string;
    phone?: string;
    nationality?: string;
    currentCity?: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { success: false, error: "Not authenticated." };

        if (!data.fullName?.trim()) return { success: false, error: "Full name is required." };

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                fullName: data.fullName.trim(),
                phone: data.phone?.trim() || null,
                nationality: data.nationality?.trim() || null,
                currentCity: data.currentCity?.trim() || null,
            },
        });

        revalidatePath("/dashboard/admin/profile");
        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to update profile.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   CHANGE PASSWORD (any role)
   ═══════════════════════════════════════════════════════ */
export async function changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { success: false, error: "Not authenticated." };

        if (!data.currentPassword || !data.newPassword || !data.confirmPassword)
            return { success: false, error: "All fields are required." };

        if (data.newPassword.length < 6)
            return { success: false, error: "New password must be at least 6 characters." };

        if (data.newPassword !== data.confirmPassword)
            return { success: false, error: "New passwords do not match." };

        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user) return { success: false, error: "User not found." };

        const valid = await bcrypt.compare(data.currentPassword, user.passwordHash);
        if (!valid) return { success: false, error: "Current password is incorrect." };

        const newHash = await bcrypt.hash(data.newPassword, 12);
        await prisma.user.update({
            where: { id: session.user.id },
            data: { passwordHash: newHash },
        });

        return { success: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to change password.";
        return { success: false, error: msg };
    }
}

/* ═══════════════════════════════════════════════════════
   UPLOAD PROFILE PICTURE (any role)
   ═══════════════════════════════════════════════════════ */
export async function uploadProfilePicture(
    formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { success: false, error: "Not authenticated." };

        const file = formData.get("file") as File | null;
        if (!file || file.size === 0) return { success: false, error: "No file provided." };

        // Validate file type
        const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowed.includes(file.type)) return { success: false, error: "Only JPEG, PNG, WebP, and GIF images are allowed." };

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) return { success: false, error: "Image must be under 5MB." };

        const { put } = await import("@vercel/blob");
        const blob = await put(`avatars/${session.user.id}-${Date.now()}.${file.type.split("/")[1]}`, file, {
            access: "public",
        });

        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: blob.url },
        });

        revalidatePath("/dashboard/student");
        revalidatePath("/dashboard/admin/profile");
        return { success: true, url: blob.url };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to upload picture.";
        return { success: false, error: msg };
    }
}

