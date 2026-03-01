"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import UserDetailClient from "./UserDetailClient";

interface Params { params: Promise<{ id: string }> }

export default async function UserDetailPage({ params }: Params) {
    const { id } = await params;
    const admin = await requireAdmin(false);
    if (!admin) redirect("/admin/login");

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            applications: {
                include: { program: { include: { university: true } } },
                orderBy: { createdAt: "desc" },
            },
            documents: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!user) redirect("/dashboard/admin/users");

    const serialized = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "—",
        role: user.role,
        nationality: user.nationality || "—",
        currentCity: user.currentCity || "—",
        emailVerified: user.emailVerified ? user.emailVerified.toLocaleDateString("en-US", { dateStyle: "medium" }) : null,
        joinedDate: user.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" }),
        applications: user.applications.map((a) => ({
            id: a.id,
            program: a.program.title,
            university: a.program.university.name,
            status: a.status,
            date: a.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" }),
        })),
        documents: user.documents.map((d) => ({
            id: d.id,
            name: d.name,
            status: d.status,
            fileUrl: d.fileUrl || "",
            date: d.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" }),
        })),
    };

    return (
        <AdminCMSLayout title={`User: ${user.fullName}`}>
            <UserDetailClient user={serialized} />
        </AdminCMSLayout>
    );
}
