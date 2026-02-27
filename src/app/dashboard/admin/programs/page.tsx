import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProgramsCMSClient from "./ProgramsCMSClient";

export default async function ProgramsCMSPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) redirect("/");

    const [programs, universities] = await Promise.all([
        prisma.program.findMany({
            orderBy: { title: "asc" },
            include: {
                university: { select: { name: true } },
                _count: { select: { applications: true } },
            },
        }),
        prisma.university.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    ]);

    const serialized = programs.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        level: p.level,
        duration: p.duration,
        tuitionFee: p.tuitionFee,
        currency: p.currency,
        discipline: p.discipline,
        studyMode: p.studyMode,
        universityId: p.universityId,
        universityName: p.university.name,
        applicationCount: p._count.applications,
        scholarshipAvailable: p.scholarshipAvailable,
        description: p.description,
    }));

    return <ProgramsCMSClient programs={serialized} universities={universities} />;
}
