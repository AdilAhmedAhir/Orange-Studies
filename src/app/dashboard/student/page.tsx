import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StudentDashboardClient from "./StudentDashboardClient";

export default async function StudentDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) redirect("/login");

    // Fetch applications with related data
    const applications = await prisma.application.findMany({
        where: { userId: user.id },
        include: {
            program: {
                include: {
                    university: {
                        include: { country: true },
                    },
                },
            },
            timeline: {
                orderBy: { order: "asc" },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Fetch documents for this user
    const documents = await prisma.document.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
    });

    // Serialize for client
    const serializedApps = applications.map((app) => ({
        id: app.refCode,
        program: app.program.title,
        university: app.program.university.name,
        country: app.program.university.country.flag,
        status: app.status.toLowerCase().replace("_", "-"),
        statusLabel: formatStatus(app.status),
        statusColor: statusColor(app.status),
        submittedDate: app.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        lastUpdate: app.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        progress: app.progress,
        timeline: app.timeline.map((t) => ({
            step: t.step,
            date: t.date,
            done: t.done,
            active: t.active,
        })),
    }));

    const serializedDocs = documents.map((doc) => ({
        id: doc.id,
        name: doc.name,
        status: doc.status.toLowerCase(),
        fileUrl: doc.fileUrl || "",
        date: doc.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        requiresReupload: doc.requiresReupload,
        adminFeedback: doc.adminFeedback || "",
    }));

    const userData = {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
        nationality: user.nationality || "",
        currentCity: user.currentCity || "",
        initials: user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    };

    return (
        <StudentDashboardClient
            applications={serializedApps}
            documents={serializedDocs}
            user={userData}
        />
    );
}

function formatStatus(status: string): string {
    const map: Record<string, string> = {
        SUBMITTED: "Submitted",
        UNDER_REVIEW: "Under Review",
        OFFER_RECEIVED: "Offer Received 🎉",
        OFFER_ACCEPTED: "Offer Accepted",
        VISA_PROCESSING: "Visa Processing",
        ENROLLED: "Enrolled ✅",
        REJECTED: "Rejected",
    };
    return map[status] || status;
}

function statusColor(status: string): string {
    const map: Record<string, string> = {
        SUBMITTED: "bg-blue-100 text-blue-700",
        UNDER_REVIEW: "bg-amber-100 text-amber-700",
        OFFER_RECEIVED: "bg-emerald-100 text-emerald-700",
        OFFER_ACCEPTED: "bg-emerald-100 text-emerald-700",
        VISA_PROCESSING: "bg-purple-100 text-purple-700",
        ENROLLED: "bg-green-100 text-green-700",
        REJECTED: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-neutral-100 text-neutral-700";
}
