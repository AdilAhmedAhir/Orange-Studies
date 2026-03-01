import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/admin/login");

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) redirect("/");

    // Get or create default settings
    let settings = await prisma.systemSetting.findUnique({ where: { id: "global" } });
    if (!settings) {
        settings = await prisma.systemSetting.create({
            data: { id: "global" },
        });
    }

    return (
        <SettingsClient
            initialSettings={{
                smtpHost: settings.smtpHost || "",
                smtpPort: settings.smtpPort || 465,
                smtpUser: settings.smtpUser || "",
                smtpPass: settings.smtpPass || "",
                requireEmailVerification: settings.requireEmailVerification,
            }}
        />
    );
}
