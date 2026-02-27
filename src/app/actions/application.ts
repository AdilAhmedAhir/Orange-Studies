"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface DocumentUrls {
    passportUrl?: string;
    transcriptsUrl?: string;
    ieltsUrl?: string;
    sopUrl?: string;
}

export async function submitApplication(programId: string, documentUrls: DocumentUrls = {}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return { success: false, error: "You must be logged in to submit an application." };
    }

    // Get the user from DB
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { success: false, error: "User account not found." };
    }

    // Verify program exists
    const program = await prisma.program.findUnique({
        where: { id: programId },
    });

    if (!program) {
        return { success: false, error: "Program not found." };
    }

    // Check if application already exists
    const existing = await prisma.application.findFirst({
        where: { userId: user.id, programId },
    });

    if (existing) {
        return { success: false, error: "You have already applied to this program." };
    }

    // Create application with timeline steps
    const application = await prisma.application.create({
        data: {
            userId: user.id,
            programId,
            status: "SUBMITTED",
            progress: 15,
            timeline: {
                create: [
                    { step: "Application Submitted", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), done: true, active: false, order: 1 },
                    { step: "Document Verification", date: "Pending", done: false, active: true, order: 2 },
                    { step: "University Review", date: "Pending", done: false, active: false, order: 3 },
                    { step: "Offer Letter", date: "Pending", done: false, active: false, order: 4 },
                    { step: "Visa Processing", date: "Pending", done: false, active: false, order: 5 },
                    { step: "Enrolled", date: "Pending", done: false, active: false, order: 6 },
                ],
            },
        },
    });

    // Create document records with real URLs (or skip if not uploaded)
    const docEntries: { name: string; fileName: string; fileUrl: string; status: "PENDING" | "MISSING"; userId: string }[] = [];

    const docMap: { key: keyof DocumentUrls; name: string; fileName: string }[] = [
        { key: "passportUrl", name: "Passport Copy", fileName: "passport.pdf" },
        { key: "transcriptsUrl", name: "Academic Transcripts", fileName: "transcripts.pdf" },
        { key: "ieltsUrl", name: "IELTS Certificate", fileName: "ielts.pdf" },
        { key: "sopUrl", name: "Statement of Purpose", fileName: "sop.pdf" },
    ];

    for (const doc of docMap) {
        const url = documentUrls[doc.key];
        docEntries.push({
            name: doc.name,
            fileName: doc.fileName,
            fileUrl: url || "",
            status: url ? "PENDING" : "MISSING",
            userId: user.id,
        });
    }

    if (docEntries.length > 0) {
        await prisma.document.createMany({ data: docEntries });
    }

    revalidatePath("/dashboard/student");
    revalidatePath("/dashboard/admin");

    return { success: true, applicationId: application.id, refCode: application.refCode };
}
