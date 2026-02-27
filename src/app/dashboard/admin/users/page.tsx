import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UsersCMSClient from "./UsersCMSClient";

export default async function UsersCMSPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) redirect("/");

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            _count: { select: { applications: true } },
        },
    });

    const serialized = users.map((u) => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        joinedDate: u.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        applicationCount: u._count.applications,
    }));

    return <UsersCMSClient users={serialized} currentUserId={user.id} isAdmin={user.role === "ADMIN"} />;
}
