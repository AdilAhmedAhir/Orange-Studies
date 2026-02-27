import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    const hashedPassword = await bcrypt.hash("password123", 10);

    // ── Admin User ──
    const admin = await prisma.user.upsert({
        where: { email: "admin@orangestudies.com" },
        update: {},
        create: {
            email: "admin@orangestudies.com",
            passwordHash: hashedPassword,
            fullName: "System Admin",
            role: "ADMIN",
            phone: "+92 300 0000000",
            nationality: "Pakistani",
            currentCity: "Lahore",
        },
    });
    console.log(`✅ Admin user created: ${admin.email} (${admin.role})`);

    // ── Student User ──
    const student = await prisma.user.upsert({
        where: { email: "student@orangestudies.com" },
        update: {},
        create: {
            email: "student@orangestudies.com",
            passwordHash: hashedPassword,
            fullName: "Test Student",
            role: "STUDENT",
            phone: "+880 1700 000000",
            nationality: "Bangladeshi",
            currentCity: "Dhaka",
        },
    });
    console.log(`✅ Student user created: ${student.email} (${student.role})`);

    // ── Manager User ──
    const manager = await prisma.user.upsert({
        where: { email: "manager@orangestudies.com" },
        update: {},
        create: {
            email: "manager@orangestudies.com",
            passwordHash: hashedPassword,
            fullName: "Regional Manager",
            role: "MANAGER",
            phone: "+92 300 1111111",
            nationality: "Pakistani",
            currentCity: "Islamabad",
        },
    });
    console.log(`✅ Manager user created: ${manager.email} (${manager.role})`);

    // ── Recruiter User ──
    const recruiter = await prisma.user.upsert({
        where: { email: "recruiter@orangestudies.com" },
        update: {},
        create: {
            email: "recruiter@orangestudies.com",
            passwordHash: hashedPassword,
            fullName: "Test Recruiter",
            role: "RECRUITER",
            phone: "+44 7700 000000",
            nationality: "British",
            currentCity: "London",
        },
    });
    console.log(`✅ Recruiter user created: ${recruiter.email} (${recruiter.role})`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("─────────────────────────────────────");
    console.log("Test Credentials (all accounts):");
    console.log("  Password: password123");
    console.log("─────────────────────────────────────");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
