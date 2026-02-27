import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Map program slugs to their discipline
const disciplineMap: Record<string, string> = {
    // Manchester
    "msc-computer-science-manchester": "Computer Science & IT",
    "bsc-business-management-manchester": "Business & Management",
    // Toronto
    "master-of-engineering-toronto": "Engineering & Technology",
    "bsc-data-science-toronto": "Computer Science & IT",
    // Melbourne
    "master-of-it-melbourne": "Computer Science & IT",
    "bachelor-of-commerce-melbourne": "Business & Management",
    // TUM
    "msc-robotics-cognition-intelligence-tum": "Engineering & Technology",
    "bsc-mechanical-engineering-tum": "Engineering & Technology",
    // Imperial
    "msc-artificial-intelligence-imperial": "Computer Science & IT",
    "meng-biomedical-engineering-imperial": "Health & Medicine",
    // MIT
    "msc-eecs-mit": "Engineering & Technology",
    // UBC
    "msc-environmental-engineering-ubc": "Environmental Science",
    "bsc-computer-science-ubc": "Computer Science & IT",
    // Sydney
    "master-of-data-science-sydney": "Computer Science & IT",
    // Edinburgh
    "msc-informatics-edinburgh": "Computer Science & IT",
    "ma-international-relations-edinburgh": "Social Sciences & Humanities",
    // RWTH Aachen
    "msc-computer-science-rwth": "Computer Science & IT",
    "bsc-business-administration-engineering-rwth": "Business & Management",
};

async function main() {
    console.log("🔧 Updating discipline fields for all programs...\n");

    let updated = 0;
    for (const [slug, discipline] of Object.entries(disciplineMap)) {
        try {
            await prisma.program.update({
                where: { slug },
                data: { discipline },
            });
            updated++;
            console.log(`  ✅ ${slug} → ${discipline}`);
        } catch {
            console.log(`  ⚠️  Not found: ${slug}`);
        }
    }

    console.log(`\n✅ Updated ${updated}/${Object.keys(disciplineMap).length} programs with discipline values.`);
}

main()
    .catch((e) => {
        console.error("❌ Failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
