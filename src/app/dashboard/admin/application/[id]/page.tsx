import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminApplicationClient from "./AdminApplicationClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminApplicationDetailPage({ params }: PageProps) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/admin/login");
    }

    const adminUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!adminUser || (adminUser.role !== "ADMIN" && adminUser.role !== "MANAGER")) {
        redirect("/");
    }

    const application = await prisma.application.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                    nationality: true,
                    currentCity: true,
                    createdAt: true,
                },
            },
            program: {
                include: {
                    university: {
                        select: { name: true, location: true, slug: true },
                    },
                },
            },
            timeline: {
                orderBy: { order: "asc" },
            },
        },
    });

    if (!application) {
        notFound();
    }

    // Documents are on User, not Application
    const studentDocuments = await prisma.document.findMany({
        where: { userId: application.user.id },
    });

    const serialized = {
        id: application.id,
        refCode: application.refCode,
        status: application.status,
        progress: application.progress,
        createdAt: application.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        updatedAt: application.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        student: {
            fullName: application.user.fullName,
            email: application.user.email,
            phone: application.user.phone || "N/A",
            nationality: application.user.nationality || "N/A",
            currentCity: application.user.currentCity || "N/A",
            memberSince: application.user.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        },
        program: {
            title: application.program.title,
            level: application.program.level,
            duration: application.program.duration,
            tuitionFee: application.program.tuitionFee,
            currency: application.program.currency,
        },
        university: {
            name: application.program.university.name,
            location: application.program.university.location,
        },
        timeline: application.timeline.map((t: { step: string; date: string; done: boolean; active: boolean }) => ({
            step: t.step,
            date: t.date,
            done: t.done,
            active: t.active,
        })),
        documents: studentDocuments.map((doc) => ({
            id: doc.id,
            name: doc.name,
            fileName: doc.fileName || "",
            fileUrl: doc.fileUrl || "",
            status: doc.status,
            date: doc.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        })),
    };

    return <AdminApplicationClient application={serialized} />;
}
