import { config } from "dotenv";
config(); // Load .env

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    // ─── 1. Audit existing data ───
    const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
    const universities = await prisma.university.findMany({ orderBy: { name: "asc" } });
    const programs = await prisma.program.findMany({ orderBy: { title: "asc" } });

    console.log(`Found: ${countries.length} countries, ${universities.length} universities, ${programs.length} programs\n`);

    // ─── 2. COUNTRY SEED DATA ───
    const countryData: Record<string, {
        tagline: string; avgTuition: string; visaTime: string; highlights: string[]; colorAccent: string; description: string;
    }> = {
        "United Kingdom": {
            tagline: "World-class education with centuries of academic tradition",
            avgTuition: "£12,000 – £38,000/year",
            visaTime: "3–8 weeks",
            highlights: [
                "Home to 4 of the world's top 10 universities",
                "2-year post-study work visa (Graduate Route)",
                "Shorter degree programs (3-year Bachelor's, 1-year Master's)",
                "Multicultural student community from 150+ countries",
                "Strong research funding and industry partnerships",
            ],
            colorAccent: "#1e3a5f",
            description: "The United Kingdom has been a global leader in higher education for centuries. With institutions like Oxford, Cambridge, Imperial College London, and UCL consistently ranked among the world's best, the UK offers an unparalleled academic experience. Students benefit from a rich cultural heritage, cutting-edge research facilities, and strong connections to industry. The UK's Graduate Route visa allows international students to stay and work for up to 2 years after completing their degree, making it an excellent launchpad for global careers.",
        },
        "Canada": {
            tagline: "Affordable excellence with clear pathways to permanent residency",
            avgTuition: "CAD 15,000 – CAD 35,000/year",
            visaTime: "4–12 weeks",
            highlights: [
                "Post-Graduation Work Permit (PGWP) up to 3 years",
                "Direct pathway to Permanent Residency (PR) via Express Entry",
                "Affordable tuition compared to US and UK",
                "Safe, multicultural cities consistently ranked world's most livable",
                "Co-op and internship programs integrated into degrees",
            ],
            colorAccent: "#d42e16",
            description: "Canada is one of the most popular destinations for international students, offering a unique combination of high-quality education, affordable tuition, and clear immigration pathways. Canadian universities are globally recognized for research excellence, with institutions like the University of Toronto, UBC, and McGill leading the way. The country's Post-Graduation Work Permit program and Express Entry immigration system make it one of the easiest countries to transition from student to permanent resident. With its stunning natural landscapes, safe cities, and welcoming multicultural society, Canada offers an exceptional quality of life.",
        },
        "Australia": {
            tagline: "Innovation-driven education in a vibrant, sun-soaked setting",
            avgTuition: "AUD 20,000 – AUD 45,000/year",
            visaTime: "4–6 weeks",
            highlights: [
                "7 universities in the global top 100 (QS Rankings)",
                "2–4 year post-study work visa depending on degree level",
                "Strong focus on practical, industry-linked learning",
                "Year-round warm climate and outdoor lifestyle",
                "Part-time work rights: 48 hours/fortnight during term",
            ],
            colorAccent: "#003f72",
            description: "Australia offers a world-class education system with seven universities consistently ranked in the global top 100. Known for its innovative approach to teaching and research, Australian universities provide students with practical, industry-focused learning experiences. International students enjoy generous post-study work rights, allowing them to gain valuable professional experience. The country's exceptional quality of life, diverse landscapes from the Great Barrier Reef to vibrant cities like Sydney and Melbourne, and welcoming multicultural society make it a top choice for students worldwide.",
        },
        "Malaysia": {
            tagline: "Asia's rising education hub with globally recognized qualifications",
            avgTuition: "MYR 15,000 – MYR 50,000/year",
            visaTime: "2–4 weeks",
            highlights: [
                "Extremely affordable tuition and cost of living",
                "Branch campuses of top UK and Australian universities",
                "English-medium instruction across all major universities",
                "Strategic location in Southeast Asia for travel and networking",
                "Rich cultural diversity with Malay, Chinese, and Indian influences",
            ],
            colorAccent: "#0c2340",
            description: "Malaysia has rapidly emerged as a premier study destination in Asia, offering affordable yet high-quality education to international students. The country hosts branch campuses of prestigious universities from the UK, Australia, and the US, allowing students to earn internationally recognized degrees at a fraction of the cost. With English as the medium of instruction, a tropical climate, incredibly low cost of living, and a rich multicultural society, Malaysia provides an exceptional value proposition for students seeking a global education in a vibrant Asian setting.",
        },
        "Ireland": {
            tagline: "Europe's English-speaking tech powerhouse with stay-back options",
            avgTuition: "€10,000 – €25,000/year",
            visaTime: "4–8 weeks",
            highlights: [
                "1-year stay-back visa for Bachelor's, 2 years for Master's",
                "European HQ for Google, Meta, Apple, Microsoft & more",
                "English-speaking country with strong literary tradition",
                "Small class sizes with personalized attention",
                "Gateway to working across the European Union",
            ],
            colorAccent: "#169b62",
            description: "Ireland has become one of Europe's most attractive study destinations, combining world-class education with exceptional career opportunities. As the European headquarters for major tech companies including Google, Apple, Meta, and Microsoft, Ireland offers unparalleled networking and internship possibilities. Irish universities are known for their research excellence, small class sizes, and supportive learning environments. The country's stay-back visa program gives graduates the opportunity to gain work experience after their studies, while its position within the EU provides access to the broader European job market.",
        },
        "United States": {
            tagline: "The world's largest higher education system with unmatched diversity",
            avgTuition: "USD 20,000 – USD 55,000/year",
            visaTime: "3–5 weeks",
            highlights: [
                "Home to the majority of the world's top 50 universities",
                "Optional Practical Training (OPT) — 1 to 3 years post-study work",
                "Incredible variety: 5,000+ institutions across all 50 states",
                "Flexible curriculum with freedom to explore multiple majors",
                "World-leading research, innovation, and startup ecosystem",
            ],
            colorAccent: "#002868",
            description: "The United States remains the world's leading study destination, home to more top-ranked universities than any other country. American higher education is defined by its flexibility, allowing students to explore various subjects before declaring a major, and its unmatched research facilities and resources. The OPT program enables STEM graduates to work for up to 3 years after completing their degree, providing valuable professional experience in the world's largest economy. From the tech hubs of Silicon Valley to the financial centers of New York, the US offers limitless career and personal growth opportunities.",
        },
    };

    // ─── 3. UNIVERSITY SEED DATA ───
    const universityData: Record<string, {
        totalStudents: number; internationalStudents: number; acceptanceRate: number;
        detailedDescription: string; highlights: string[]; facilities: string[];
        campusLife: string; admissionRequirements: string[]; accommodationInfo: string;
        colorAccent: string; tags: string[];
    }> = {};

    // Map existing universities dynamically
    for (const uni of universities) {
        const country = countries.find(c => c.id === uni.countryId);
        const countryName = country?.name || "Unknown";

        universityData[uni.name] = {
            totalStudents: uni.totalStudents || Math.floor(30000 + Math.random() * 20000),
            internationalStudents: uni.internationalStudents || Math.floor(8000 + Math.random() * 12000),
            acceptanceRate: uni.acceptanceRate || Math.floor(15 + Math.random() * 40),
            detailedDescription: uni.detailedDescription || `${uni.name} is a prestigious institution located in ${uni.location}. Founded with a mission to advance knowledge and educate students, it has grown into one of ${countryName}'s premier universities. The university is renowned for its rigorous academic programs, groundbreaking research, and vibrant campus community. Students benefit from world-class faculty, state-of-the-art facilities, and strong connections to industry leaders. With a diverse student body representing over 100 nationalities, ${uni.name} offers a truly global learning environment that prepares graduates for success in an interconnected world.`,
            highlights: uni.highlights.length > 0 ? uni.highlights : [
                `Top ${Math.floor(50 + Math.random() * 200)} globally (QS World Rankings)`,
                "Strong industry partnerships with Fortune 500 companies",
                "Cutting-edge research centers and innovation labs",
                "Dedicated career services with 90%+ graduate employment",
                "Active alumni network across 100+ countries",
            ],
            facilities: uni.facilities.length > 0 ? uni.facilities : [
                "Modern library with 24/7 access and digital resources",
                "State-of-the-art science and engineering laboratories",
                "Olympic-standard sports complex and fitness center",
                "Student union with cafes, shops, and social spaces",
                "High-speed Wi-Fi across the entire campus",
                "On-site medical center and counseling services",
            ],
            campusLife: uni.campusLife || `Campus life at ${uni.name} is vibrant and inclusive. With over 200 student societies and clubs, there's something for everyone — from academic and professional groups to arts, sports, and cultural organizations. The university hosts regular events including guest lectures, career fairs, festivals, and networking nights. Students enjoy modern accommodation, diverse dining options, and excellent wellness facilities. The surrounding area of ${uni.location} offers a rich urban experience with cafes, parks, theaters, and entertainment venues all within easy reach.`,
            admissionRequirements: uni.admissionRequirements.length > 0 ? uni.admissionRequirements : [
                "Completed secondary education with strong grades (minimum GPA 3.0 or equivalent)",
                "English language proficiency: IELTS 6.5+ overall (no band below 6.0) or TOEFL iBT 90+",
                "Personal statement / Statement of Purpose (500-1000 words)",
                "Two academic or professional reference letters",
                "Valid passport and student visa documentation",
                "Portfolio required for creative programs (if applicable)",
            ],
            accommodationInfo: uni.accommodationInfo || `${uni.name} offers a range of accommodation options to suit every budget and preference. On-campus halls of residence provide a convenient and social living experience, with single and shared rooms available. All university accommodation includes Wi-Fi, utilities, and access to communal facilities. First-year international students are guaranteed a place in university housing. Off-campus options include private student apartments, shared houses, and homestay arrangements. The university's accommodation office provides dedicated support to help students find the perfect place to live.`,
            colorAccent: uni.colorAccent || ["#1e3a5f", "#8b0000", "#003366", "#2c5f2d", "#4a2c7a"][Math.floor(Math.random() * 5)],
            tags: uni.tags.length > 0 ? uni.tags : [
                "Research Intensive", "International Community", "Career Focused",
                "Modern Campus", "Student Satisfaction",
            ],
        };
    }

    // ─── 4. PROGRAM SEED DATA ───
    // We'll generate contextual data for each program based on its title, level, and university
    const programUpdates: { id: string; data: { detailedDescription: string; intakeDates: string[]; modules: string[]; entryRequirements: string[]; careerOutcomes: string[] } }[] = [];

    for (const prog of programs) {
        if (prog.detailedDescription && prog.modules.length > 0 && prog.entryRequirements.length > 0 && prog.careerOutcomes.length > 0 && prog.intakeDates.length > 0) {
            continue; // Already fully populated
        }

        const uni = universities.find(u => u.id === prog.universityId);
        const uniName = uni?.name || "the university";
        const isSTEM = /engineer|computer|data|science|math|physics|chemistry|biology|tech/i.test(prog.title);
        const isBusiness = /business|management|finance|economics|marketing|mba|accounting/i.test(prog.title);
        const isArts = /art|design|media|film|music|creative|journalism|communication/i.test(prog.title);
        const isHealth = /health|medicine|nurs|pharmacy|bio|psychology/i.test(prog.title);
        const isLaw = /law|legal|criminal/i.test(prog.title);

        let modules: string[] = [];
        let careerOutcomes: string[] = [];

        if (isSTEM) {
            modules = [
                "Mathematics and Statistical Methods", "Programming and Software Development",
                "Data Structures and Algorithms", "Research Methodology",
                "Applied Project and Capstone", "Industry Placement Module",
                "Advanced Topics and Specialization Elective", "Professional Ethics and Communication",
            ];
            careerOutcomes = [
                "Software Engineer / Developer", "Data Scientist / Analyst",
                "Research Scientist", "Systems Architect",
                "Technical Consultant", "Product Manager",
            ];
        } else if (isBusiness) {
            modules = [
                "Strategic Management and Leadership", "Financial Accounting and Analysis",
                "Marketing Strategy and Consumer Behavior", "Operations and Supply Chain Management",
                "Business Analytics and Decision Making", "Entrepreneurship and Innovation",
                "International Business and Economics", "Capstone Business Consulting Project",
            ];
            careerOutcomes = [
                "Management Consultant", "Financial Analyst",
                "Marketing Manager", "Business Development Director",
                "Investment Banker", "Startup Founder / Entrepreneur",
            ];
        } else if (isArts) {
            modules = [
                "Creative Theory and Practice", "Digital Media Production",
                "Visual Communication and Design Thinking", "Contemporary Culture and Society",
                "Portfolio Development Workshop", "Research and Critical Analysis",
                "Industry Collaboration Project", "Professional Practice and Exhibition",
            ];
            careerOutcomes = [
                "Creative Director", "UX/UI Designer",
                "Media Producer", "Brand Strategist",
                "Content Creator / Manager", "Gallery or Event Curator",
            ];
        } else if (isHealth) {
            modules = [
                "Human Anatomy and Physiology", "Clinical Research Methods",
                "Public Health and Epidemiology", "Healthcare Ethics and Law",
                "Patient Care and Communication", "Evidence-Based Practice",
                "Supervised Clinical Placement", "Health Policy and Management",
            ];
            careerOutcomes = [
                "Clinical Practitioner", "Public Health Specialist",
                "Healthcare Manager", "Pharmaceutical Researcher",
                "Health Policy Advisor", "Biomedical Scientist",
            ];
        } else if (isLaw) {
            modules = [
                "Constitutional and Administrative Law", "Contract Law and Commercial Transactions",
                "Criminal Law and Justice", "International Law and Human Rights",
                "Legal Research and Writing", "Moot Court and Advocacy Skills",
                "Jurisprudence and Legal Philosophy", "Dissertation or Legal Research Project",
            ];
            careerOutcomes = [
                "Solicitor / Barrister", "Legal Consultant",
                "Corporate Counsel", "Human Rights Advocate",
                "Policy Analyst", "Judicial Clerk",
            ];
        } else {
            modules = [
                "Core Theory and Foundations", "Research Methods and Academic Writing",
                "Applied Studies and Fieldwork", "Contemporary Issues and Debates",
                "Elective Specialization Module", "Professional Development and Ethics",
                "Dissertation / Final Year Project", "Industry Engagement Seminar",
            ];
            careerOutcomes = [
                "Specialist Practitioner", "Research Associate",
                "Policy Analyst", "Consultant",
                "Project Manager", "Academic / Lecturer",
            ];
        }

        programUpdates.push({
            id: prog.id,
            data: {
                detailedDescription: prog.detailedDescription || `This ${prog.level} program in ${prog.title} at ${uniName} is designed to equip students with both theoretical knowledge and practical skills needed to excel in their chosen field. The curriculum blends rigorous academic study with hands-on projects, industry placements, and research opportunities. Students work alongside expert faculty who bring real-world experience into the classroom. The program emphasizes critical thinking, innovation, and professional development, preparing graduates for competitive careers or further academic study. With access to ${uniName}'s extensive resources, research centers, and global alumni network, students gain a truly world-class education.`,
                intakeDates: prog.intakeDates.length > 0 ? prog.intakeDates : ["September 2026", "January 2027"],
                modules: prog.modules.length > 0 ? prog.modules : modules,
                entryRequirements: prog.entryRequirements.length > 0 ? prog.entryRequirements : [
                    `${prog.level === "Master" || prog.level === "PhD" ? "Bachelor's degree" : "High school diploma"} with strong academic record`,
                    "IELTS 6.5+ overall (no band below 6.0) or equivalent",
                    "Personal statement demonstrating motivation and goals",
                    "Academic transcripts and reference letters",
                    ...(prog.level === "PhD" ? ["Research proposal (2,000–3,000 words)"] : []),
                ],
                careerOutcomes: prog.careerOutcomes.length > 0 ? prog.careerOutcomes : careerOutcomes,
            },
        });
    }

    // ─── 5. EXECUTE UPDATES ───
    console.log("Updating countries...");
    for (const c of countries) {
        const seed = countryData[c.name];
        if (!seed) {
            console.log(`  ⚠ No seed data for country: ${c.name}`);
            continue;
        }
        // Only update fields that are currently empty
        await prisma.country.update({
            where: { id: c.id },
            data: {
                tagline: c.tagline || seed.tagline,
                avgTuition: c.avgTuition || seed.avgTuition,
                visaTime: c.visaTime || seed.visaTime,
                highlights: c.highlights.length > 0 ? undefined : seed.highlights,
                colorAccent: c.colorAccent || seed.colorAccent,
                description: c.description || seed.description,
            },
        });
        console.log(`  ✓ ${c.name}`);
    }

    console.log("\nUpdating universities...");
    for (const u of universities) {
        const seed = universityData[u.name];
        if (!seed) continue;
        await prisma.university.update({
            where: { id: u.id },
            data: {
                totalStudents: u.totalStudents || seed.totalStudents,
                internationalStudents: u.internationalStudents || seed.internationalStudents,
                acceptanceRate: u.acceptanceRate || seed.acceptanceRate,
                detailedDescription: u.detailedDescription || seed.detailedDescription,
                highlights: u.highlights.length > 0 ? undefined : seed.highlights,
                facilities: u.facilities.length > 0 ? undefined : seed.facilities,
                campusLife: u.campusLife || seed.campusLife,
                admissionRequirements: u.admissionRequirements.length > 0 ? undefined : seed.admissionRequirements,
                accommodationInfo: u.accommodationInfo || seed.accommodationInfo,
                colorAccent: u.colorAccent || seed.colorAccent,
                tags: u.tags.length > 0 ? undefined : seed.tags,
            },
        });
        console.log(`  ✓ ${u.name}`);
    }

    console.log("\nUpdating programs...");
    for (const upd of programUpdates) {
        await prisma.program.update({
            where: { id: upd.id },
            data: upd.data,
        });
        const prog = programs.find(p => p.id === upd.id);
        console.log(`  ✓ ${prog?.title || upd.id}`);
    }

    console.log(`\n✅ Seed complete! Updated ${countries.length} countries, ${universities.length} universities, ${programUpdates.length} programs.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
