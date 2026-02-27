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

    // KPI metrics
    const [totalStudents, totalApplications, pendingReviewCount, totalPrograms, totalUniversities] = await Promise.all([
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.application.count(),
        prisma.application.count({ where: { status: "SUBMITTED" } }),
        prisma.program.count(),
        prisma.university.count(),
    ]);

    // Status breakdown
    const statusCounts = await prisma.application.groupBy({
        by: ["status"],
        _count: { _all: true },
    });

    const statusBreakdown = statusCounts.map((s) => ({
        status: s.status,
        count: s._count._all,
    }));

    // Recent applications (last 10)
    const recentApps = await prisma.application.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { fullName: true, email: true } },
            program: {
                include: {
                    university: { select: { name: true } },
                },
            },
        },
    });

    const serializedRecent = recentApps.map((app) => ({
        id: app.refCode,
        studentName: app.user.fullName,
        studentEmail: app.user.email,
        program: app.program.title,
        university: app.program.university.name,
        status: app.status,
        date: app.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
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
            adminName={user.fullName}
        />
    );
}
