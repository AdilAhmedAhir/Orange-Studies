// ============================================
// Orange Studies — Mock Data Architecture
// ============================================

export interface Country {
    name: string;
    code: string;
    flag: string;
}

export interface Course {
    id: string;
    title: string;
    level: "Bachelor" | "Master" | "PhD" | "Diploma";
    duration: string;
    tuitionFee: number;
    currency: string;
    intakeDates: string[];
    description: string;
}

export interface University {
    id: string;
    name: string;
    location: string;
    country: Country;
    ranking: number;
    logoPlaceholder: string;
    tuitionRange: { min: number; max: number; currency: string };
    courses: Course[];
    description: string;
    established: number;
    totalStudents: number;
    internationalStudents: number;
    acceptanceRate: number;
    tags: string[];
}

// ============================================
// Countries
// ============================================
export const countries: Country[] = [
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
];

// ============================================
// Universities & Courses
// ============================================
export const universities: University[] = [
    {
        id: "uni-001",
        name: "University of Manchester",
        location: "Manchester",
        country: countries[0],
        ranking: 28,
        logoPlaceholder: "UoM",
        tuitionRange: { min: 19000, max: 46000, currency: "GBP" },
        established: 1824,
        totalStudents: 40000,
        internationalStudents: 12000,
        acceptanceRate: 63,
        tags: ["Russell Group", "Research Intensive", "City Campus"],
        description: "A world-leading university in the heart of one of the UK's most vibrant cities.",
        courses: [
            {
                id: "crs-001",
                title: "MSc Computer Science",
                level: "Master",
                duration: "1 year",
                tuitionFee: 29000,
                currency: "GBP",
                intakeDates: ["Sep 2025"],
                description: "Comprehensive computer science program covering AI, software engineering, and data science.",
            },
            {
                id: "crs-002",
                title: "BSc Business Management",
                level: "Bachelor",
                duration: "3 years",
                tuitionFee: 22000,
                currency: "GBP",
                intakeDates: ["Sep 2025", "Jan 2026"],
                description: "Develop essential management skills with a global business perspective.",
            },
        ],
    },
    {
        id: "uni-002",
        name: "University of Toronto",
        location: "Toronto, Ontario",
        country: countries[2],
        ranking: 18,
        logoPlaceholder: "UoT",
        tuitionRange: { min: 45000, max: 65000, currency: "CAD" },
        established: 1827,
        totalStudents: 73000,
        internationalStudents: 21000,
        acceptanceRate: 43,
        tags: ["U15 Group", "Research Intensive", "Urban Campus"],
        description: "Canada's leading research university, located in the heart of Toronto.",
        courses: [
            {
                id: "crs-003",
                title: "Master of Engineering",
                level: "Master",
                duration: "1.5 years",
                tuitionFee: 52000,
                currency: "CAD",
                intakeDates: ["Sep 2025"],
                description: "Advanced engineering program with specializations in multiple disciplines.",
            },
            {
                id: "crs-004",
                title: "BSc Data Science",
                level: "Bachelor",
                duration: "4 years",
                tuitionFee: 58000,
                currency: "CAD",
                intakeDates: ["Sep 2025"],
                description: "Cutting-edge program combining statistics, computing, and domain knowledge.",
            },
        ],
    },
    {
        id: "uni-003",
        name: "University of Melbourne",
        location: "Melbourne, Victoria",
        country: countries[3],
        ranking: 14,
        logoPlaceholder: "UoM",
        tuitionRange: { min: 35000, max: 50000, currency: "AUD" },
        established: 1853,
        totalStudents: 52000,
        internationalStudents: 18000,
        acceptanceRate: 70,
        tags: ["Group of Eight", "Research Intensive", "Sandstone University"],
        description: "Australia's finest university, renowned for its research output and academic excellence.",
        courses: [
            {
                id: "crs-005",
                title: "Master of Information Technology",
                level: "Master",
                duration: "2 years",
                tuitionFee: 47000,
                currency: "AUD",
                intakeDates: ["Feb 2025", "Jul 2025"],
                description: "Develop expertise in IT with specializations in AI, cybersecurity, and distributed systems.",
            },
            {
                id: "crs-006",
                title: "Bachelor of Commerce",
                level: "Bachelor",
                duration: "3 years",
                tuitionFee: 42000,
                currency: "AUD",
                intakeDates: ["Feb 2025", "Jul 2025"],
                description: "A globally recognized commerce degree with extensive industry connections.",
            },
        ],
    },
    {
        id: "uni-004",
        name: "Technical University of Munich",
        location: "Munich, Bavaria",
        country: countries[4],
        ranking: 37,
        logoPlaceholder: "TUM",
        tuitionRange: { min: 500, max: 3000, currency: "EUR" },
        established: 1868,
        totalStudents: 48000,
        internationalStudents: 14000,
        acceptanceRate: 8,
        tags: ["TU9", "Excellence University", "STEM Focus"],
        description: "One of Europe's top technical universities, virtually tuition-free for all students.",
        courses: [
            {
                id: "crs-007",
                title: "MSc Robotics, Cognition, Intelligence",
                level: "Master",
                duration: "2 years",
                tuitionFee: 258,
                currency: "EUR",
                intakeDates: ["Oct 2025"],
                description: "World-class robotics program combining AI, computer vision, and autonomous systems.",
            },
            {
                id: "crs-008",
                title: "BSc Mechanical Engineering",
                level: "Bachelor",
                duration: "3 years",
                tuitionFee: 258,
                currency: "EUR",
                intakeDates: ["Oct 2025"],
                description: "German engineering excellence with a focus on practical applications.",
            },
        ],
    },
    {
        id: "uni-005",
        name: "Imperial College London",
        location: "London",
        country: countries[0],
        ranking: 6,
        logoPlaceholder: "ICL",
        tuitionRange: { min: 35000, max: 52000, currency: "GBP" },
        established: 1907,
        totalStudents: 20000,
        internationalStudents: 10000,
        acceptanceRate: 14,
        tags: ["Golden Triangle", "Russell Group", "STEM Focus"],
        description: "A world-class research university specializing in science, engineering, medicine, and business.",
        courses: [
            {
                id: "crs-009",
                title: "MSc Artificial Intelligence",
                level: "Master",
                duration: "1 year",
                tuitionFee: 39000,
                currency: "GBP",
                intakeDates: ["Oct 2025"],
                description: "Pioneering AI program at one of the world's top technology universities.",
            },
            {
                id: "crs-010",
                title: "MEng Biomedical Engineering",
                level: "Master",
                duration: "4 years",
                tuitionFee: 40000,
                currency: "GBP",
                intakeDates: ["Oct 2025"],
                description: "Innovative program at the intersection of engineering and medicine.",
            },
        ],
    },
    {
        id: "uni-006",
        name: "Massachusetts Institute of Technology",
        location: "Cambridge, Massachusetts",
        country: countries[1],
        ranking: 1,
        logoPlaceholder: "MIT",
        tuitionRange: { min: 55000, max: 60000, currency: "USD" },
        established: 1861,
        totalStudents: 11000,
        internationalStudents: 3500,
        acceptanceRate: 4,
        tags: ["Ivy League Adjacent", "Research Intensive", "Innovation Hub"],
        description: "The world's leading university for technology, engineering, and innovation.",
        courses: [
            {
                id: "crs-011",
                title: "MSc Electrical Engineering & Computer Science",
                level: "Master",
                duration: "2 years",
                tuitionFee: 58000,
                currency: "USD",
                intakeDates: ["Sep 2025"],
                description: "MIT's flagship engineering program combining electrical engineering with CS.",
            },
        ],
    },
    {
        id: "uni-007",
        name: "University of British Columbia",
        location: "Vancouver, British Columbia",
        country: countries[2],
        ranking: 34,
        logoPlaceholder: "UBC",
        tuitionRange: { min: 40000, max: 55000, currency: "CAD" },
        established: 1908,
        totalStudents: 66000,
        internationalStudents: 17000,
        acceptanceRate: 52,
        tags: ["U15 Group", "Scenic Campus", "Sustainability Leader"],
        description: "A globally renowned university set on a stunning Pacific coast campus.",
        courses: [
            {
                id: "crs-012",
                title: "MSc Environmental Engineering",
                level: "Master",
                duration: "2 years",
                tuitionFee: 48000,
                currency: "CAD",
                intakeDates: ["Sep 2025", "Jan 2026"],
                description: "Tackle environmental challenges with cutting-edge engineering solutions.",
            },
            {
                id: "crs-013",
                title: "BSc Computer Science",
                level: "Bachelor",
                duration: "4 years",
                tuitionFee: 53000,
                currency: "CAD",
                intakeDates: ["Sep 2025"],
                description: "A top-tier CS program with a focus on research and innovation.",
            },
        ],
    },
    {
        id: "uni-008",
        name: "University of Sydney",
        location: "Sydney, New South Wales",
        country: countries[3],
        ranking: 19,
        logoPlaceholder: "USyd",
        tuitionRange: { min: 38000, max: 55000, currency: "AUD" },
        established: 1850,
        totalStudents: 53000,
        internationalStudents: 20000,
        acceptanceRate: 30,
        tags: ["Group of Eight", "Heritage Campus", "Global Top 20"],
        description: "Australia's first university, consistently ranked among the world's best.",
        courses: [
            {
                id: "crs-014",
                title: "Master of Data Science",
                level: "Master",
                duration: "1.5 years",
                tuitionFee: 49000,
                currency: "AUD",
                intakeDates: ["Feb 2025", "Aug 2025"],
                description: "Advanced data science training with a focus on real-world applications.",
            },
        ],
    },
    {
        id: "uni-009",
        name: "University of Edinburgh",
        location: "Edinburgh",
        country: countries[0],
        ranking: 22,
        logoPlaceholder: "UoE",
        tuitionRange: { min: 23000, max: 38000, currency: "GBP" },
        established: 1583,
        totalStudents: 35000,
        internationalStudents: 15000,
        acceptanceRate: 37,
        tags: ["Russell Group", "Ancient University", "UNESCO City"],
        description: "One of the world's oldest and most prestigious universities in a stunning historic city.",
        courses: [
            {
                id: "crs-015",
                title: "MSc Informatics",
                level: "Master",
                duration: "1 year",
                tuitionFee: 35000,
                currency: "GBP",
                intakeDates: ["Sep 2025"],
                description: "A world-leading informatics program with AI, NLP, and machine learning specializations.",
            },
            {
                id: "crs-016",
                title: "MA International Relations",
                level: "Master",
                duration: "1 year",
                tuitionFee: 25000,
                currency: "GBP",
                intakeDates: ["Sep 2025"],
                description: "Explore global politics and diplomacy at a top-tier institution.",
            },
        ],
    },
    {
        id: "uni-010",
        name: "RWTH Aachen University",
        location: "Aachen, North Rhine-Westphalia",
        country: countries[4],
        ranking: 87,
        logoPlaceholder: "RWTH",
        tuitionRange: { min: 500, max: 2000, currency: "EUR" },
        established: 1870,
        totalStudents: 47000,
        internationalStudents: 11000,
        acceptanceRate: 25,
        tags: ["TU9", "Excellence University", "Industry Connections"],
        description: "Germany's largest technical university with deep ties to industry and research.",
        courses: [
            {
                id: "crs-017",
                title: "MSc Computer Science",
                level: "Master",
                duration: "2 years",
                tuitionFee: 580,
                currency: "EUR",
                intakeDates: ["Oct 2025", "Apr 2026"],
                description: "Comprehensive CS master with research opportunities in a hub of innovation.",
            },
            {
                id: "crs-018",
                title: "BSc Business Administration & Engineering",
                level: "Bachelor",
                duration: "3 years",
                tuitionFee: 580,
                currency: "EUR",
                intakeDates: ["Oct 2025"],
                description: "Unique interdisciplinary program combining business and engineering expertise.",
            },
        ],
    },
];

// ============================================
// Helper: Get all courses (flattened)
// ============================================
export function getAllCourses(): (Course & { universityName: string; universityId: string })[] {
    return universities.flatMap((uni) =>
        uni.courses.map((course) => ({
            ...course,
            universityName: uni.name,
            universityId: uni.id,
        }))
    );
}
