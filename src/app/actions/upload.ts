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

    const uniqueName = `documents/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const blob = await put(uniqueName, file, { access: "public" });

    return { url: blob.url };
}
