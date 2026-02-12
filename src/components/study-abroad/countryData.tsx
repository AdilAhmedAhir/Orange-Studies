"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    GraduationCap,
    DollarSign,
    Clock,
    MapPin,
    Briefcase,
    Heart,
    BookOpen,
    CheckCircle,
    Globe,
} from "lucide-react";

/* ── detailed country data ──────────────────────────── */
export const countryDetails: Record<
    string,
    {
        name: string;
        flag: string;
        tagline: string;
        color: string;
        heroDescription: string;
        quickStats: { label: string; value: string; icon: React.ElementType }[];
        topUniversities: { name: string; ranking: string; programs: string }[];
        whyStudy: string[];
        livingCost: { item: string; range: string }[];
        visaSteps: string[];
        careerProspects: string;
        funFacts: string[];
    }
> = {
    "united-kingdom": {
        name: "United Kingdom",
        flag: "🇬🇧",
        tagline: "World-Class Research & Heritage",
        color: "from-blue-600 to-blue-800",
        heroDescription:
            "The UK has been home to the world's greatest minds for centuries. With universities spanning from medieval Oxford to modern Russell Group institutions, studying in the UK means joining a tradition of excellence.",
        quickStats: [
            { label: "Universities", value: "160+", icon: GraduationCap },
            { label: "Tuition Range", value: "£12K – £38K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "~3 weeks", icon: Clock },
            { label: "Post-Study Visa", value: "2 years", icon: Briefcase },
        ],
        topUniversities: [
            { name: "University of Oxford", ranking: "#1 in the UK", programs: "350+ Courses" },
            { name: "University of Cambridge", ranking: "#2 in the UK", programs: "300+ Courses" },
            { name: "Imperial College London", ranking: "#3 in the UK", programs: "200+ Courses" },
            { name: "University College London (UCL)", ranking: "#4 in the UK", programs: "250+ Courses" },
            { name: "University of Edinburgh", ranking: "#5 in the UK", programs: "180+ Courses" },
            { name: "King's College London", ranking: "#6 in the UK", programs: "150+ Courses" },
        ],
        whyStudy: [
            "One-year Master's programs save time and money",
            "Post-Study Work Visa (Graduate Route) for 2 years",
            "Home to 4 of the world's top 10 universities",
            "Rich cultural heritage and vibrant student cities",
            "NHS healthcare access for international students",
            "Strong alumni networks in finance, tech, and research",
        ],
        livingCost: [
            { item: "Accommodation", range: "£500 – £1,200/month" },
            { item: "Food & Groceries", range: "£150 – £300/month" },
            { item: "Transport", range: "£50 – £150/month" },
            { item: "Utilities & Internet", range: "£80 – £150/month" },
            { item: "Entertainment", range: "£50 – £100/month" },
        ],
        visaSteps: [
            "Receive a CAS (Confirmation of Acceptance for Studies) from your university",
            "Gather documents: passport, finances proof, TB test (if required)",
            "Apply online via the UK Gov visa portal",
            "Pay the visa fee (£363) and Immigration Health Surcharge (£470/yr)",
            "Attend biometrics appointment at a visa center",
            "Receive your visa decision (usually within 3 weeks)",
        ],
        careerProspects:
            "The UK offers a 2-year Post-Study Work Visa (Graduate Route) allowing graduates to work in any field. London is a global hub for finance, tech, and consulting, with average graduate salaries of £25,000–£35,000.",
        funFacts: [
            "The UK invented the World Wide Web, TV, and penicillin",
            "London has more than 170 museums, many of them free",
            "UK universities have produced 120+ Nobel Prize winners",
        ],
    },
    "united-states": {
        name: "United States",
        flag: "🇺🇸",
        tagline: "Innovation, Diversity & Opportunity",
        color: "from-red-600 to-red-800",
        heroDescription:
            "The US is home to the world's most diverse and innovative higher education system. With over 4,000 institutions, it offers unmatched research facilities, cultural exposure, and career opportunities.",
        quickStats: [
            { label: "Universities", value: "4,000+", icon: GraduationCap },
            { label: "Tuition Range", value: "$20K – $55K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "3–5 weeks", icon: Clock },
            { label: "OPT Work Permit", value: "1–3 years", icon: Briefcase },
        ],
        topUniversities: [
            { name: "Massachusetts Institute of Technology (MIT)", ranking: "#1 Global", programs: "400+ Courses" },
            { name: "Stanford University", ranking: "#2 Global", programs: "350+ Courses" },
            { name: "Harvard University", ranking: "#3 Global", programs: "450+ Courses" },
            { name: "California Institute of Technology", ranking: "#6 Global", programs: "100+ Courses" },
            { name: "University of Chicago", ranking: "#10 Global", programs: "300+ Courses" },
            { name: "Columbia University", ranking: "#12 Global", programs: "350+ Courses" },
        ],
        whyStudy: [
            "Flexible curriculum — choose a major after enrollment",
            "OPT allows 1–3 years of work experience after graduation",
            "World-leading research funding and facilities",
            "Diverse campus culture from 195+ countries",
            "Strong industry connections for internships",
            "Assistantships and scholarships offset costs",
        ],
        livingCost: [
            { item: "Accommodation", range: "$800 – $2,000/month" },
            { item: "Food & Groceries", range: "$300 – $600/month" },
            { item: "Transport", range: "$50 – $200/month" },
            { item: "Health Insurance", range: "$100 – $300/month" },
            { item: "Entertainment", range: "$100 – $200/month" },
        ],
        visaSteps: [
            "Receive I-20 form from your admitted university",
            "Pay the SEVIS fee ($350)",
            "Complete the DS-160 visa application form online",
            "Schedule and attend a visa interview at the US Embassy",
            "Bring documents: I-20, passport, financial proof, academic transcripts",
            "Receive your F-1 Student Visa (typically within 2 weeks of interview)",
        ],
        careerProspects:
            "The US offers OPT (Optional Practical Training) — 12 months for general graduates, up to 36 months for STEM. Average graduate salaries range from $55,000–$85,000 in tech and engineering fields.",
        funFacts: [
            "US universities spend more on research ($86B/yr) than most countries' entire GDP",
            "Silicon Valley, Wall Street, and Hollywood all recruit heavily from US campuses",
            "Over 1 million international students study in the US annually",
        ],
    },
    canada: {
        name: "Canada",
        flag: "🇨🇦",
        tagline: "Affordable Excellence & PR Pathway",
        color: "from-red-500 to-rose-700",
        heroDescription:
            "Canada combines world-class education with a clear pathway to permanent residency. With friendly immigration policies and multicultural cities, it's consistently ranked among the best countries for international students.",
        quickStats: [
            { label: "Universities", value: "100+", icon: GraduationCap },
            { label: "Tuition Range", value: "CAD 15K – 35K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "4–8 weeks", icon: Clock },
            { label: "PGWP", value: "Up to 3 years", icon: Briefcase },
        ],
        topUniversities: [
            { name: "University of Toronto", ranking: "#1 in Canada", programs: "700+ Courses" },
            { name: "University of British Columbia", ranking: "#2 in Canada", programs: "500+ Courses" },
            { name: "McGill University", ranking: "#3 in Canada", programs: "400+ Courses" },
            { name: "University of Alberta", ranking: "#4 in Canada", programs: "350+ Courses" },
            { name: "University of Waterloo", ranking: "#5 in Canada", programs: "300+ Courses" },
            { name: "University of Montreal", ranking: "#6 in Canada", programs: "250+ Courses" },
        ],
        whyStudy: [
            "Post-Graduation Work Permit (PGWP) up to 3 years",
            "Clear pathway to Permanent Residency (PR) via Express Entry",
            "Affordable tuition compared to US and UK",
            "Bilingual education opportunities (English & French)",
            "Safe, multicultural, and inclusive society",
            "Co-op programs with paid industry placements",
        ],
        livingCost: [
            { item: "Accommodation", range: "CAD 600 – 1,500/month" },
            { item: "Food & Groceries", range: "CAD 250 – 400/month" },
            { item: "Transport", range: "CAD 80 – 150/month" },
            { item: "Health Insurance", range: "Province-dependent" },
            { item: "Entertainment", range: "CAD 50 – 150/month" },
        ],
        visaSteps: [
            "Receive your Letter of Acceptance from a DLI (Designated Learning Institution)",
            "Gather documents: passport, proof of funds (CAD 10,000+/yr), Letter of Acceptance",
            "Apply online via the IRCC portal for a Study Permit",
            "Provide biometrics at a VAFS center",
            "Wait for processing (4–8 weeks depending on country)",
            "Receive your Study Permit approval and travel to Canada",
        ],
        careerProspects:
            "Canada's PGWP allows 1–3 years of post-graduation work. Many graduates transition to PR through Express Entry or Provincial Nominee Programs. Average graduate salaries range from CAD 50,000–75,000.",
        funFacts: [
            "Canada has the highest percentage of working-age adults with post-secondary education in the OECD",
            "Vancouver, Toronto, and Montreal consistently rank in the world's top 20 student cities",
            "Canada processes more PR applications for international students than any other country",
        ],
    },
    australia: {
        name: "Australia",
        flag: "🇦🇺",
        tagline: "Sunny Campuses & Global Recognition",
        color: "from-amber-600 to-yellow-700",
        heroDescription:
            "Australia offers a unique combination of high-quality education, stunning natural beauty, and excellent post-study work options. Its 43 universities include some of the world's oldest and most innovative institutions.",
        quickStats: [
            { label: "Universities", value: "43", icon: GraduationCap },
            { label: "Tuition Range", value: "AUD 20K – 45K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "2–4 weeks", icon: Clock },
            { label: "Post-Study Work", value: "2–4 years", icon: Briefcase },
        ],
        topUniversities: [
            { name: "University of Melbourne", ranking: "#1 in Australia", programs: "400+ Courses" },
            { name: "University of Sydney", ranking: "#2 in Australia", programs: "400+ Courses" },
            { name: "Australian National University", ranking: "#3 in Australia", programs: "300+ Courses" },
            { name: "University of Queensland", ranking: "#4 in Australia", programs: "350+ Courses" },
            { name: "Monash University", ranking: "#5 in Australia", programs: "300+ Courses" },
            { name: "UNSW Sydney", ranking: "#6 in Australia", programs: "350+ Courses" },
        ],
        whyStudy: [
            "Post-Study Work Visa for 2–4 years depending on qualification",
            "Group of Eight (Go8) universities are world-renowned",
            "Part-time work allowed (48 hrs/fortnight during term)",
            "Stunning lifestyle — beaches, national parks, vibrant cities",
            "Strong support systems for international students",
            "Research-intensive programs with industry partnerships",
        ],
        livingCost: [
            { item: "Accommodation", range: "AUD 800 – 1,800/month" },
            { item: "Food & Groceries", range: "AUD 300 – 500/month" },
            { item: "Transport", range: "AUD 80 – 200/month" },
            { item: "Health Insurance (OSHC)", range: "AUD 50 – 80/month" },
            { item: "Entertainment", range: "AUD 100 – 200/month" },
        ],
        visaSteps: [
            "Receive your CoE (Confirmation of Enrolment) from the university",
            "Arrange Overseas Student Health Cover (OSHC)",
            "Gather documents: CoE, passport, financial proof (AUD 21,041/yr), GTE statement",
            "Apply online via ImmiAccount for Subclass 500 Student Visa",
            "Attend biometrics and/or medical examination if required",
            "Receive your visa grant (typically 2–4 weeks)",
        ],
        careerProspects:
            "Australia's Temporary Graduate Visa (subclass 485) offers 2–4 years of post-study work rights. Key industries include mining, tech, healthcare, and finance. Average graduate salary: AUD 60,000–80,000.",
        funFacts: [
            "Australia has more than 22,000 plant species — most found nowhere else on Earth",
            "6 out of 43 Australian universities rank in the global top 100",
            "International students contribute AUD 40 billion+ annually to the Australian economy",
        ],
    },
    germany: {
        name: "Germany",
        flag: "🇩🇪",
        tagline: "Tuition-Free Education in Europe",
        color: "from-neutral-800 to-neutral-900",
        heroDescription:
            "Germany is Europe's academic powerhouse, offering world-class education — often tuition-free at public universities. With a strong engineering tradition and Europe's largest economy, it's ideal for ambitious students.",
        quickStats: [
            { label: "Universities", value: "400+", icon: GraduationCap },
            { label: "Tuition Range", value: "€0 – €20K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "4–6 weeks", icon: Clock },
            { label: "Job Seeker Visa", value: "18 months", icon: Briefcase },
        ],
        topUniversities: [
            { name: "Technical University of Munich (TUM)", ranking: "#1 in Germany", programs: "180+ Courses" },
            { name: "Ludwig Maximilian University (LMU)", ranking: "#2 in Germany", programs: "200+ Courses" },
            { name: "Heidelberg University", ranking: "#3 in Germany", programs: "160+ Courses" },
            { name: "Humboldt University of Berlin", ranking: "#4 in Germany", programs: "170+ Courses" },
            { name: "RWTH Aachen University", ranking: "#5 in Germany", programs: "150+ Courses" },
            { name: "Freie Universität Berlin", ranking: "#6 in Germany", programs: "180+ Courses" },
        ],
        whyStudy: [
            "Tuition-free education at most public universities",
            "18-month Job Seeker Visa after graduation",
            "Europe's largest economy with strong job market",
            "World leader in engineering, automotive, and manufacturing",
            "Growing number of English-taught programs (1,800+)",
            "Low living costs compared to UK and US",
        ],
        livingCost: [
            { item: "Accommodation", range: "€300 – €700/month" },
            { item: "Food & Groceries", range: "€150 – €250/month" },
            { item: "Transport (semester ticket)", range: "€25 – €50/month" },
            { item: "Health Insurance", range: "€80 – €120/month" },
            { item: "Entertainment", range: "€50 – €100/month" },
        ],
        visaSteps: [
            "Receive admission letter from a German university",
            "Open a blocked account (Sperrkonto) with €11,208/year",
            "Arrange health insurance coverage",
            "Apply for a student visa at the German Embassy/Consulate",
            "Attend the visa interview with all required documents",
            "Receive your visa (usually 4–6 weeks) and fly to Germany",
        ],
        careerProspects:
            "Germany offers an 18-month Job Seeker Visa post-graduation — one of the most generous in Europe. Key industries: automotive (BMW, Mercedes), tech (SAP), engineering (Siemens). Avg salary: €45,000–65,000.",
        funFacts: [
            "Germany is home to the world's oldest university still in operation (Heidelberg, founded 1386)",
            "The country has no speed limits on many sections of the Autobahn",
            "Germany produces over 1,500 types of sausage and 5,000 varieties of beer",
        ],
    },
    malaysia: {
        name: "Malaysia",
        flag: "🇲🇾",
        tagline: "Affordable & Multicultural",
        color: "from-blue-700 to-indigo-800",
        heroDescription:
            "Malaysia is South-East Asia's rising star for international education. With tuition fees a fraction of Western countries, English-medium programs, and a stunning tropical setting, it offers incredible value for money.",
        quickStats: [
            { label: "Universities", value: "70+", icon: GraduationCap },
            { label: "Tuition Range", value: "$3K – $10K/yr", icon: DollarSign },
            { label: "Visa Processing", value: "2–3 weeks", icon: Clock },
            { label: "Part-Time Work", value: "20 hrs/week", icon: Briefcase },
        ],
        topUniversities: [
            { name: "University of Malaya (UM)", ranking: "#1 in Malaysia", programs: "250+ Courses" },
            { name: "Universiti Putra Malaysia (UPM)", ranking: "#2 in Malaysia", programs: "200+ Courses" },
            { name: "Universiti Kebangsaan Malaysia (UKM)", ranking: "#3 in Malaysia", programs: "180+ Courses" },
            { name: "Universiti Teknologi Malaysia (UTM)", ranking: "#4 in Malaysia", programs: "150+ Courses" },
            { name: "Monash University Malaysia", ranking: "Branch Campus", programs: "100+ Courses" },
            { name: "University of Nottingham Malaysia", ranking: "Branch Campus", programs: "80+ Courses" },
        ],
        whyStudy: [
            "Extremely affordable — tuition and living costs are 60-80% lower than Western countries",
            "Many programs taught entirely in English",
            "Branch campuses of UK and Australian universities",
            "Culturally diverse — Malay, Chinese, Indian, and international communities",
            "Tropical climate with modern infrastructure",
            "Halal food widely available for Muslim students",
        ],
        livingCost: [
            { item: "Accommodation", range: "RM 500 – 1,500/month ($110 – $330)" },
            { item: "Food & Groceries", range: "RM 400 – 800/month ($90 – $175)" },
            { item: "Transport", range: "RM 100 – 300/month ($22 – $65)" },
            { item: "Health Insurance", range: "Included in visa" },
            { item: "Entertainment", range: "RM 200 – 500/month ($44 – $110)" },
        ],
        visaSteps: [
            "Receive your offer letter and apply through EMGS (Education Malaysia Global Services)",
            "University submits your Student Pass application online",
            "Provide documents: passport, offer letter, medical report, financial proof",
            "EMGS processes the visa approval letter (VAL) in 2-3 weeks",
            "Fly to Malaysia and collect your Student Pass at the university",
            "Complete medical checkup and finalize enrollment",
        ],
        careerProspects:
            "Malaysia allows part-time work (20 hrs/week during term, full-time during breaks). Growing tech and finance sectors offer opportunities. Average graduate salary: RM 3,000–5,000/month ($660–$1,100).",
        funFacts: [
            "Malaysia is home to the Petronas Twin Towers — the world's tallest twin buildings",
            "Kuala Lumpur was ranked the #2 most affordable student city globally",
            "Malaysia has 7 UNESCO World Heritage Sites",
        ],
    },
};
