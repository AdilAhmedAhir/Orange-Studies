"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitApplication(programId: string) {
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

    // Create application with timeline steps and mock documents
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

    // Create mock document records for the user
    await prisma.document.createMany({
        data: [
            { name: "Passport Copy", fileName: "passport.pdf", fileUrl: "mock_url/passport.pdf", status: "PENDING", userId: user.id },
            { name: "Academic Transcripts", fileName: "transcripts.pdf", fileUrl: "mock_url/transcripts.pdf", status: "PENDING", userId: user.id },
            { name: "IELTS Certificate", fileName: "ielts.pdf", fileUrl: "mock_url/ielts.pdf", status: "PENDING", userId: user.id },
            { name: "Statement of Purpose", fileName: "sop.pdf", fileUrl: "mock_url/sop.pdf", status: "PENDING", userId: user.id },
        ],
    });

    revalidatePath("/dashboard/student");

    return { success: true, applicationId: application.id, refCode: application.refCode };
}
