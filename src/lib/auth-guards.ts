"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Shared auth guard for admin actions.
 * @param allowManager - If true, MANAGER role is also permitted (default: true).
 *                        Pass false to restrict to ADMIN-only operations.
 * @returns The authenticated user, or null if unauthorized.
 */
export async function requireAdmin(allowManager = true) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return null;
    if (user.role === "ADMIN") return user;
    if (allowManager && user.role === "MANAGER") return user;
    return null;
}
