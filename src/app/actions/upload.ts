"use server";

import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function uploadFile(formData: FormData): Promise<{ url: string }> {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Unauthorized: You must be logged in to upload files.");
    }

    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
        throw new Error("No file provided.");
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size exceeds 10MB limit.");
    }

    // Allowed MIME types
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Accepted: PDF, JPG, PNG, WebP, DOC, DOCX.");
    }

    const uniqueName = `documents/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const blob = await put(uniqueName, file, { access: "public" });

    return { url: blob.url };
}
