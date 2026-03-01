import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CountriesCMSClient from "./CountriesCMSClient";

export default async function CountriesCMSPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) redirect("/");

    const countries = await prisma.country.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { universities: true } } },
    });

    const serialized = countries.map((c) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        flag: c.flag,
        slug: c.slug || "",
        description: c.description || "",
        image: c.image || "",
        universityCount: c._count.universities,
        tagline: c.tagline || "",
        avgTuition: c.avgTuition || "",
        visaTime: c.visaTime || "",
        highlights: c.highlights || [],
        colorAccent: c.colorAccent || "",
    }));

    return <CountriesCMSClient countries={serialized} />;
}
