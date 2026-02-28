import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/admin/login");
    }

    // Verify admin/manager role
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
        redirect("/");
    }

    // Concurrent SSR queries — all execute in parallel
    const [
        totalStudents,
        totalApplications,
        pendingReviewCount,
        totalPrograms,
        totalUniversities,
        statusCounts,
        recentApps,
        recentLeads,
        universities,
        countries,
    ] = await Promise.all([
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.application.count(),
        prisma.application.count({ where: { status: "SUBMITTED" } }),
        prisma.program.count(),
        prisma.university.count(),
        prisma.application.groupBy({ by: ["status"], _count: { _all: true } }),
        prisma.application.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { fullName: true, email: true } },
                program: { include: { university: { select: { name: true } } } },
            },
        }),
        prisma.lead.findMany({ take: 10, orderBy: { createdAt: "desc" } }),
        prisma.university.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
        prisma.country.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, flag: true } }),
    ]);

    // Serialize raw query results
    const statusBreakdown = statusCounts.map((s) => ({
        status: s.status,
        count: s._count._all,
    }));

    const serializedRecent = recentApps.map((app) => ({
        id: app.refCode,
        appId: app.id,
        studentName: app.user.fullName,
        studentEmail: app.user.email,
        program: app.program.title,
        university: app.program.university.name,
        status: app.status,
        date: app.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));

    const serializedLeads = recentLeads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        type: lead.type,
        status: lead.status,
        date: lead.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }));

    return (
        <AdminDashboardClient
            kpi={{
                totalStudents,
                totalApplications,
                pendingReview: pendingReviewCount,
                totalPrograms,
                totalUniversities,
            }}
            statusBreakdown={statusBreakdown}
            recentApplications={serializedRecent}
            recentLeads={serializedLeads}
            adminName={user.fullName}
            universities={universities}
            countries={countries}
        />
    );
}
