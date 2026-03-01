import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guards";
import AdminCMSLayout from "@/components/admin/AdminCMSLayout";
import AdminProfileClient from "./AdminProfileClient";

export default async function AdminProfilePage() {
    const admin = await requireAdmin(false);
    if (!admin) redirect("/admin/login");

    const user = await prisma.user.findUnique({ where: { id: admin.id } });
    if (!user) redirect("/admin/login");

    return (
        <AdminCMSLayout title="My Profile">
            <AdminProfileClient
                user={{
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone || "",
                    nationality: user.nationality || "",
                    currentCity: user.currentCity || "",
                    role: user.role,
                    joinedDate: user.createdAt.toLocaleDateString("en-US", { dateStyle: "long" }),
                }}
            />
        </AdminCMSLayout>
    );
}
