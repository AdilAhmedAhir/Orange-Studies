import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ─── Country Data ────────────────────────────────────
const countriesData = [
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
];

// ─── University Data ─────────────────────────────────
const universitiesData = [
    {
        slug: "university-of-manchester",
        name: "University of Manchester",
        location: "Manchester",
        countryCode: "GB",
        ranking: 28,
        logoPlaceholder: "UoM",
        tuitionMin: 19000, tuitionMax: 46000, tuitionCurrency: "GBP",
        established: 1824,
        totalStudents: 40000,
        internationalStudents: 12000,
        acceptanceRate: 63,
        tags: ["Russell Group", "Research Intensive", "City Campus"],
        colorAccent: "from-red-600 to-red-800",
        description: "A world-leading university in the heart of one of the UK's most vibrant cities.",
        detailedDescription: "The University of Manchester is a prestigious Russell Group university with a rich history dating back to 1824. It consistently ranks within the world's top 30 universities and is famed for its groundbreaking research, including the splitting of the atom and the discovery of graphene.",
        highlights: ["Birthplace of graphene (Nobel Prize 2010)", "Largest single-campus university in the UK", "25 Nobel Prize winners affiliated", "£1B investment in campus transformation"],
        facilities: ["Alan Turing Building", "Jodrell Bank Observatory", "Manchester Museum", "Aquatics Centre", "Whitworth Art Gallery"],
        campusLife: "Manchester offers one of the most vibrant student experiences in the UK. From the Northern Quarter's independent shops and cafes to Old Trafford and the Etihad Stadium, students enjoy a rich cultural life.",
        admissionRequirements: ["Minimum IELTS 6.5 (no band below 6.0)", "Relevant undergraduate degree for masters", "Two academic references", "Personal statement"],
        accommodationInfo: "Over 8,000 rooms across 12 halls of residence, from Fallowfield campus to city-centre options. Prices range from £110-£200/week including utilities and Wi-Fi.",
    },
    {
        slug: "university-of-toronto",
        name: "University of Toronto",
        location: "Toronto, Ontario",
        countryCode: "CA",
        ranking: 18,
        logoPlaceholder: "UoT",
        tuitionMin: 45000, tuitionMax: 65000, tuitionCurrency: "CAD",
        established: 1827, totalStudents: 73000, internationalStudents: 21000, acceptanceRate: 43,
        tags: ["U15 Group", "Research Intensive", "Urban Campus"],
        colorAccent: "from-blue-700 to-blue-900",
        description: "Canada's leading research university, located in the heart of Toronto.",
        detailedDescription: "The University of Toronto is a globally renowned institution consistently ranked among the top 20 universities worldwide. Founded in 1827, it offers an unmatched breadth of programs across three campuses in the Greater Toronto Area.",
        highlights: ["#1 university in Canada for 10+ consecutive years", "Birthplace of insulin discovery", "Over 700 undergraduate programs", "Largest university library system in Canada"],
        facilities: ["Robarts Library (largest in Canada)", "Hart House cultural centre", "Varsity Centre athletics complex", "Bahen Centre for Information Technology", "MedSci research labs"],
        campusLife: "Located in downtown Toronto, U of T offers a dynamic urban campus experience. Students enjoy easy access to Toronto's vibrant arts, food, and entertainment scenes.",
        admissionRequirements: ["Minimum GPA 3.6 on 4.0 scale", "IELTS 6.5 with no band below 6.0", "Proof of English proficiency", "Two academic references"],
        accommodationInfo: "Multiple residence halls across three campuses. Single rooms from CAD 8,000-14,000 per academic year. First-year students are guaranteed housing.",
    },
    {
        slug: "university-of-melbourne",
        name: "University of Melbourne",
        location: "Melbourne, Victoria",
        countryCode: "AU",
        ranking: 14,
        logoPlaceholder: "UoM",
        tuitionMin: 35000, tuitionMax: 50000, tuitionCurrency: "AUD",
        established: 1853, totalStudents: 52000, internationalStudents: 18000, acceptanceRate: 70,
        tags: ["Group of Eight", "Research Intensive", "Sandstone University"],
        colorAccent: "from-blue-600 to-indigo-700",
        description: "Australia's finest university, renowned for its research output and academic excellence.",
        detailedDescription: "The University of Melbourne is Australia's leading university and consistently ranks among the world's best. Located in the heart of Melbourne — consistently voted the world's most liveable city.",
        highlights: ["#1 university in Australia", "Melbourne Model — breadth + depth curriculum", "150+ research centres and institutes", "Largest alumni network in Australia (500,000+)"],
        facilities: ["Baillieu Library", "Melbourne Brain Centre", "Bio21 Institute", "Melbourne Sports Precinct", "Arts West digital hub"],
        campusLife: "Melbourne's famous laneways, world-class dining, and thriving arts scene make it an unbeatable place to be a student.",
        admissionRequirements: ["GPA equivalent to Australian H2A (75%+)", "IELTS 6.5 overall (6.0 each band)", "Statement of Purpose", "Two referee reports"],
        accommodationInfo: "12 residential colleges and university-managed accommodation. Costs range from AUD 250-500 per week.",
    },
    {
        slug: "technical-university-of-munich",
        name: "Technical University of Munich",
        location: "Munich, Bavaria",
        countryCode: "DE",
        ranking: 37,
        logoPlaceholder: "TUM",
        tuitionMin: 500, tuitionMax: 3000, tuitionCurrency: "EUR",
        established: 1868, totalStudents: 48000, internationalStudents: 14000, acceptanceRate: 8,
        tags: ["TU9", "Excellence University", "STEM Focus"],
        colorAccent: "from-blue-800 to-blue-950",
        description: "One of Europe's top technical universities, virtually tuition-free for all students.",
        detailedDescription: "The Technical University of Munich (TUM) is one of Europe's most prestigious universities, renowned for its world-class engineering and natural science programs.",
        highlights: ["#1 technical university in Germany", "Most entrepreneurial university in Germany", "Partnerships with BMW, Siemens, SAP", "€600M annual research budget"],
        facilities: ["TUM Hyperloop Lab", "Robotics Lab", "Brewery & Food Technology Centre", "Galileo research engine", "Munich School of Robotics"],
        campusLife: "Munich offers an unparalleled quality of life — from Bavarian beer gardens to the Alps, which are just an hour away.",
        admissionRequirements: ["Recognized bachelor's degree in relevant field", "GPA equivalent to 2.5 German scale (top 30%)", "English proficiency (TOEFL 88+ or IELTS 6.5+)", "Motivation letter and CV"],
        accommodationInfo: "Studentenwerk München manages 11,000 rooms across Munich. Rent ranges from €300-600/month.",
    },
    {
        slug: "imperial-college-london",
        name: "Imperial College London",
        location: "London",
        countryCode: "GB",
        ranking: 6,
        logoPlaceholder: "ICL",
        tuitionMin: 35000, tuitionMax: 52000, tuitionCurrency: "GBP",
        established: 1907, totalStudents: 20000, internationalStudents: 10000, acceptanceRate: 14,
        tags: ["Golden Triangle", "Russell Group", "STEM Focus"],
        colorAccent: "from-blue-900 to-indigo-900",
        description: "A world-class research university specializing in science, engineering, medicine, and business.",
        detailedDescription: "Imperial College London is one of the world's most prestigious universities, focused exclusively on science, engineering, medicine, and business. Located in South Kensington, London.",
        highlights: ["#2 in Europe for STEM", "14 Nobel Laureates", "Highest graduate starting salaries in the UK", "Located in South Kensington, London"],
        facilities: ["Sir Alexander Fleming Building", "Imperial White City Campus", "Data Science Institute", "Advanced Hackspace", "Imperial College Healthcare NHS Trust"],
        campusLife: "Imperial's South Kensington campus puts students in the heart of London, surrounded by world-class museums, Hyde Park, and the Royal Albert Hall.",
        admissionRequirements: ["A*A*A at A-Level (or equivalent)", "IELTS 7.0 (6.5 minimum per component)", "Strong personal statement", "Academic references"],
        accommodationInfo: "11 halls of residence. First-year students guaranteed accommodation. Costs from £180-£340/week.",
    },
    {
        slug: "massachusetts-institute-of-technology",
        name: "Massachusetts Institute of Technology",
        location: "Cambridge, Massachusetts",
        countryCode: "US",
        ranking: 1,
        logoPlaceholder: "MIT",
        tuitionMin: 55000, tuitionMax: 60000, tuitionCurrency: "USD",
        established: 1861, totalStudents: 11000, internationalStudents: 3500, acceptanceRate: 4,
        tags: ["Ivy League Adjacent", "Research Intensive", "Innovation Hub"],
        colorAccent: "from-red-700 to-red-900",
        description: "The world's leading university for technology, engineering, and innovation.",
        detailedDescription: "MIT is the gold standard for science and technology education. With a $27 billion endowment, unparalleled research output, and an entrepreneurial ecosystem.",
        highlights: ["#1 university globally (QS)", "School's alumni created companies worth $2T+", "97 Nobel Laureates", "$2B annual research budget"],
        facilities: ["MIT Media Lab", "Lincoln Laboratory", "Koch Institute for Cancer Research", "Stata Center", "MIT.nano fabrication facility"],
        campusLife: "Located along the Charles River in Cambridge, minutes from Boston's cultural hub, MIT offers a unique blend of intense academics and vibrant social life.",
        admissionRequirements: ["Top 1% academic performance globally", "SAT 1550+ or ACT 35+", "TOEFL 100+ or IELTS 7.5+", "Exceptional extracurriculars and research experience"],
        accommodationInfo: "All undergraduate students guaranteed on-campus housing for all 4 years. Costs from $1,000-$1,500/month.",
    },
    {
        slug: "university-of-british-columbia",
        name: "University of British Columbia",
        location: "Vancouver, British Columbia",
        countryCode: "CA",
        ranking: 34,
        logoPlaceholder: "UBC",
        tuitionMin: 40000, tuitionMax: 55000, tuitionCurrency: "CAD",
        established: 1908, totalStudents: 66000, internationalStudents: 17000, acceptanceRate: 52,
        tags: ["U15 Group", "Scenic Campus", "Sustainability Leader"],
        colorAccent: "from-blue-600 to-cyan-700",
        description: "A globally renowned university set on a stunning Pacific coast campus.",
        detailedDescription: "UBC is one of the world's most beautiful campuses, nestled between mountains and ocean in Vancouver.",
        highlights: ["World's most beautiful campus", "Top 3 in Canada", "Leader in sustainability research", "Co-op programs with 4,500+ employers"],
        facilities: ["TRIUMF particle accelerator", "Beaty Biodiversity Museum", "UBC Farm", "Liu Institute", "ARC fitness centre"],
        campusLife: "UBC's Point Grey campus feels like a self-contained city by the ocean.",
        admissionRequirements: ["Strong academic record (top 20% of class)", "IELTS 6.5 overall (6.0 each)", "Personal profile and activities list", "Supplemental application for competitive programs"],
        accommodationInfo: "Year-round housing for 11,000+ students at Point Grey campus. First-year guarantee. Costs from CAD 800-1,400/month.",
    },
    {
        slug: "university-of-sydney",
        name: "University of Sydney",
        location: "Sydney, New South Wales",
        countryCode: "AU",
        ranking: 19,
        logoPlaceholder: "USyd",
        tuitionMin: 38000, tuitionMax: 55000, tuitionCurrency: "AUD",
        established: 1850, totalStudents: 53000, internationalStudents: 20000, acceptanceRate: 30,
        tags: ["Group of Eight", "Heritage Campus", "Global Top 20"],
        colorAccent: "from-amber-600 to-orange-700",
        description: "Australia's first university, consistently ranked among the world's best.",
        detailedDescription: "The University of Sydney is Australia's first university and one of the most prestigious in the southern hemisphere.",
        highlights: ["Australia's first university (1850)", "#1 in Australia for graduate employability", "100+ research centres", "Harry Potter-esque Quadrangle campus"],
        facilities: ["Fisher Library", "Charles Perkins Centre", "Sydney Nanoscience Hub", "Quadrangle (heritage-listed)", "Sydney Uni Sport & Fitness"],
        campusLife: "Located in inner-city Camperdown, just minutes from Sydney Harbour and Bondi Beach.",
        admissionRequirements: ["GPA 5.0/7.0 or higher", "IELTS 6.5 (6.0 each component)", "Personal statement for competitive programs", "Relevant work experience may be considered"],
        accommodationInfo: "9 residential colleges and 2 self-catered residences. Costs from AUD 300-600/week.",
    },
    {
        slug: "university-of-edinburgh",
        name: "University of Edinburgh",
        location: "Edinburgh",
        countryCode: "GB",
        ranking: 22,
        logoPlaceholder: "UoE",
        tuitionMin: 23000, tuitionMax: 38000, tuitionCurrency: "GBP",
        established: 1583, totalStudents: 35000, internationalStudents: 15000, acceptanceRate: 37,
        tags: ["Russell Group", "Ancient University", "UNESCO City"],
        colorAccent: "from-neutral-700 to-neutral-900",
        description: "One of the world's oldest and most prestigious universities in a stunning historic city.",
        detailedDescription: "The University of Edinburgh is one of the world's oldest and most respected universities, founded in 1583 during the Scottish Enlightenment.",
        highlights: ["Founded 1583 — 6th oldest English-speaking university", "UNESCO World Heritage city", "World-leading School of Informatics", "Alumni include Darwin, Doyle, and J.K. Rowling"],
        facilities: ["Main Library (world-class collections)", "Edinburgh Centre for Robotics", "Edinburgh Genome Foundry", "Pleasance Sports Complex", "Potterrow Student Centre"],
        campusLife: "Edinburgh is regularly voted the UK's best student city.",
        admissionRequirements: ["Strong academic transcripts", "IELTS 6.5 overall (6.0 each)", "Personal statement or research proposal", "Two academic references"],
        accommodationInfo: "Over 4,000 rooms available from Pollock Halls to Holyrood. First-year undergraduates guaranteed a place. Costs from £130-£230/week.",
    },
    {
        slug: "rwth-aachen-university",
        name: "RWTH Aachen University",
        location: "Aachen, North Rhine-Westphalia",
        countryCode: "DE",
        ranking: 87,
        logoPlaceholder: "RWTH",
        tuitionMin: 500, tuitionMax: 2000, tuitionCurrency: "EUR",
        established: 1870, totalStudents: 47000, internationalStudents: 11000, acceptanceRate: 25,
        tags: ["TU9", "Excellence University", "Industry Connections"],
        colorAccent: "from-blue-700 to-blue-900",
        description: "Germany's largest technical university with deep ties to industry and research.",
        detailedDescription: "RWTH Aachen is Germany's largest technical university and one of Europe's most prestigious engineering schools.",
        highlights: ["Germany's largest technical university", "50+ spin-off companies annually", "Partnerships with Ford, Ericsson, Philips", "Located at the heart of European industry"],
        facilities: ["e.GO Mobile factory (EV startup)", "Cluster of Excellence research centres", "IT Center (high-performance computing)", "University Sport Centre", "SuperC Student Services"],
        campusLife: "Aachen is a charming medieval city with a modern, international student culture.",
        admissionRequirements: ["University entrance qualification (Abitur equivalent)", "German B1+ or English C1 depending on program", "Subject-specific grades reviewed", "Application via uni-assist portal"],
        accommodationInfo: "Studentenwerk Aachen offers 5,200 rooms from €210-€400/month. Aachen is one of Germany's most affordable student cities.",
    },
];

// ─── Programs Data (mapped by university slug) ──────
const programsData: Record<string, Array<{
    slug: string; title: string; level: string; duration: string;
    tuitionFee: number; currency: string; intakeDates: string[];
    description: string; detailedDescription: string; modules: string[];
    entryRequirements: string[]; careerOutcomes: string[];
    scholarshipAvailable: boolean; applicationDeadline: string; studyMode: string;
}>> = {
    "university-of-manchester": [
        { slug: "msc-computer-science-manchester", title: "MSc Computer Science", level: "Master", duration: "1 year", tuitionFee: 29000, currency: "GBP", intakeDates: ["Sep 2025"], description: "Comprehensive computer science program covering AI, software engineering, and data science.", detailedDescription: "This MSc programme provides a thorough grounding in the principles and practices of computer science. It is suitable for graduates from non-computing disciplines who want to develop skills for a career in computing.", modules: ["Machine Learning", "Software Engineering", "Database Systems", "Algorithms & Data Structures", "Cloud Computing", "AI & Intelligent Systems", "Dissertation Project"], entryRequirements: ["2:1 honours degree (or international equivalent)", "IELTS 6.5 overall (6.0 in each component)", "No prior computing degree required"], careerOutcomes: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cloud Architect", "Tech Consultant"], scholarshipAvailable: true, applicationDeadline: "June 30, 2025", studyMode: "Full-time" },
        { slug: "bsc-business-management-manchester", title: "BSc Business Management", level: "Bachelor", duration: "3 years", tuitionFee: 22000, currency: "GBP", intakeDates: ["Sep 2025", "Jan 2026"], description: "Develop essential management skills with a global business perspective.", detailedDescription: "This programme develops a broad understanding of the business environment and equips students with the analytical, interpersonal, and professional skills needed for a successful career in management.", modules: ["Principles of Management", "Financial Accounting", "Business Economics", "Marketing Strategy", "Organisational Behaviour", "Strategic Management"], entryRequirements: ["A-Levels: AAB including Maths", "IELTS 6.5 overall (6.0 in each)", "GCSE English Language grade C/4"], careerOutcomes: ["Management Consultant", "Business Analyst", "Marketing Manager", "Finance Analyst", "Entrepreneur"], scholarshipAvailable: true, applicationDeadline: "January 15, 2025", studyMode: "Full-time" },
    ],
    "university-of-toronto": [
        { slug: "master-of-engineering-toronto", title: "Master of Engineering", level: "Master", duration: "1.5 years", tuitionFee: 52000, currency: "CAD", intakeDates: ["Sep 2025"], description: "Advanced engineering program with specializations in multiple disciplines.", detailedDescription: "The Master of Engineering (MEng) at U of T is a professional, course-based graduate program that prepares students for leadership roles in industry.", modules: ["Advanced Fluid Mechanics", "Design Optimization", "Robotics & Mechatronics", "Engineering Economics", "Capstone Design Project", "Technical Communication"], entryRequirements: ["B+ average in undergraduate engineering", "IELTS 7.0 overall (6.5 writing)", "Resume and statement of purpose", "Two academic references"], careerOutcomes: ["Engineering Manager", "Product Designer", "Project Engineer", "Technical Director", "Systems Architect"], scholarshipAvailable: true, applicationDeadline: "March 1, 2025", studyMode: "Full-time" },
        { slug: "bsc-data-science-toronto", title: "BSc Data Science", level: "Bachelor", duration: "4 years", tuitionFee: 58000, currency: "CAD", intakeDates: ["Sep 2025"], description: "Cutting-edge program combining statistics, computing, and domain knowledge.", detailedDescription: "This program bridges statistical theory and modern computing, offering co-op placements at leading tech companies.", modules: ["Statistical Inference", "Machine Learning", "Data Visualization", "Linear Algebra", "Database Systems", "Ethics in Data Science", "Capstone Research Project"], entryRequirements: ["Ontario Grade 12 Advanced Functions", "Ontario Grade 12 Calculus & Vectors", "Minimum 87% admission average", "IELTS 6.5 (6.0 minimum)"], careerOutcomes: ["Data Scientist", "Machine Learning Engineer", "Statistical Analyst", "Quantitative Researcher", "Business Intelligence Analyst"], scholarshipAvailable: true, applicationDeadline: "January 15, 2025", studyMode: "Full-time" },
    ],
    "university-of-melbourne": [
        { slug: "master-of-it-melbourne", title: "Master of Information Technology", level: "Master", duration: "2 years", tuitionFee: 47000, currency: "AUD", intakeDates: ["Feb 2025", "Jul 2025"], description: "Develop expertise in IT with specializations in AI, cybersecurity, and distributed systems.", detailedDescription: "The Master of IT at Melbourne provides a comprehensive foundation in computing and information systems.", modules: ["Software Modelling & Design", "Internet Technologies", "AI Planning", "Cybersecurity", "Distributed Systems", "Capstone Project"], entryRequirements: ["Undergraduate degree in any discipline", "Minimum 65% WAM or GPA equivalent", "IELTS 6.5 overall (6.0 each band)", "Statement of purpose"], careerOutcomes: ["Software Developer", "Cybersecurity Analyst", "IT Project Manager", "Systems Engineer", "UX Researcher"], scholarshipAvailable: true, applicationDeadline: "October 31, 2024", studyMode: "Full-time" },
        { slug: "bachelor-of-commerce-melbourne", title: "Bachelor of Commerce", level: "Bachelor", duration: "3 years", tuitionFee: 42000, currency: "AUD", intakeDates: ["Feb 2025", "Jul 2025"], description: "A globally recognized commerce degree with extensive industry connections.", detailedDescription: "The Bachelor of Commerce at Melbourne is one of Australia's most prestigious business degrees.", modules: ["Introductory Microeconomics", "Financial Accounting", "Quantitative Methods", "Marketing Management", "Corporate Finance", "Capstone Business Project"], entryRequirements: ["ATAR 95+ (or international equivalent)", "IELTS 6.5 overall (6.0 each)", "Strong maths background recommended"], careerOutcomes: ["Investment Banker", "Management Consultant", "Chartered Accountant", "Marketing Director", "Financial Analyst"], scholarshipAvailable: true, applicationDeadline: "November 30, 2024", studyMode: "Full-time" },
    ],
    "technical-university-of-munich": [
        { slug: "msc-robotics-cognition-intelligence-tum", title: "MSc Robotics, Cognition, Intelligence", level: "Master", duration: "2 years", tuitionFee: 258, currency: "EUR", intakeDates: ["Oct 2025"], description: "World-class robotics program combining AI, computer vision, and autonomous systems.", detailedDescription: "This elite interdisciplinary program at TUM combines mechanical engineering, electrical engineering, and computer science.", modules: ["Robot Motion Planning", "Computer Vision", "Machine Learning for Robotics", "Embedded Systems", "Autonomous Navigation", "Human-Robot Interaction", "Master's Thesis"], entryRequirements: ["Bachelor's in engineering, CS, or maths (GPA ≤ 2.5 German)", "TOEFL 88+ or IELTS 6.5+", "Programming experience in C++/Python", "Motivation letter"], careerOutcomes: ["Robotics Engineer", "Autonomous Systems Developer", "AI Researcher", "R&D Lead (Automotive)", "CTO / Startup Founder"], scholarshipAvailable: true, applicationDeadline: "May 31, 2025", studyMode: "Full-time" },
        { slug: "bsc-mechanical-engineering-tum", title: "BSc Mechanical Engineering", level: "Bachelor", duration: "3 years", tuitionFee: 258, currency: "EUR", intakeDates: ["Oct 2025"], description: "German engineering excellence with a focus on practical applications.", detailedDescription: "TUM's BSc in Mechanical Engineering is one of the most competitive in Europe.", modules: ["Engineering Mechanics", "Thermodynamics", "Materials Science", "CAD & Manufacturing", "Control Systems", "Bachelor's Thesis Project"], entryRequirements: ["University entrance qualification (Abitur equivalent)", "Strong maths and physics grades", "German language proficiency (DSH-2 or TestDaF 4)", "Application via uni-assist"], careerOutcomes: ["Mechanical Engineer", "Automotive Engineer", "Product Development Engineer", "Manufacturing Specialist", "Research Associate"], scholarshipAvailable: false, applicationDeadline: "July 15, 2025", studyMode: "Full-time" },
    ],
    "imperial-college-london": [
        { slug: "msc-artificial-intelligence-imperial", title: "MSc Artificial Intelligence", level: "Master", duration: "1 year", tuitionFee: 39000, currency: "GBP", intakeDates: ["Oct 2025"], description: "Pioneering AI program at one of the world's top technology universities.", detailedDescription: "Imperial's MSc in AI is one of the world's most competitive and highly regarded programmes.", modules: ["Deep Learning", "Machine Learning", "Computer Vision", "Natural Language Processing", "Reinforcement Learning", "Mathematics for Machine Learning", "Individual Research Project"], entryRequirements: ["First-class degree in CS, maths, or engineering", "Strong mathematical ability", "IELTS 7.0 overall (6.5 each component)", "Programming proficiency in Python"], careerOutcomes: ["AI Research Scientist", "ML Engineer at FAANG", "Quantitative Analyst", "NLP Engineer", "AI Startup Founder"], scholarshipAvailable: true, applicationDeadline: "March 31, 2025", studyMode: "Full-time" },
        { slug: "meng-biomedical-engineering-imperial", title: "MEng Biomedical Engineering", level: "Master", duration: "4 years", tuitionFee: 40000, currency: "GBP", intakeDates: ["Oct 2025"], description: "Innovative program at the intersection of engineering and medicine.", detailedDescription: "This integrated master's programme trains engineers to solve healthcare's biggest challenges.", modules: ["Biomechanics", "Medical Imaging", "Neural Engineering", "Biodevice Design", "Clinical Placement", "Research Project"], entryRequirements: ["A*A*A including Maths and one science", "IELTS 7.0 (6.5 minimum per component)", "Strong interest in healthcare technology"], careerOutcomes: ["Biomedical Engineer", "Medical Device Designer", "Healthcare Consultant", "Clinical Research Engineer", "Regulatory Affairs Specialist"], scholarshipAvailable: true, applicationDeadline: "January 15, 2025", studyMode: "Full-time" },
    ],
    "massachusetts-institute-of-technology": [
        { slug: "msc-eecs-mit", title: "MSc Electrical Engineering & Computer Science", level: "Master", duration: "2 years", tuitionFee: 58000, currency: "USD", intakeDates: ["Sep 2025"], description: "MIT's flagship engineering program combining electrical engineering with CS.", detailedDescription: "The EECS master's at MIT is among the most prestigious graduate programs in the world.", modules: ["Advanced Algorithms", "Computer Architecture", "Signal Processing", "Machine Learning Theory", "Quantum Computing", "Master's Thesis Research"], entryRequirements: ["BS in EE, CS, or related field with GPA 3.9+", "GRE (recommended)", "TOEFL 100+ or IELTS 7.5+", "Research experience strongly preferred", "3 letters of recommendation"], careerOutcomes: ["Research Scientist", "Principal Engineer", "CTO / Startup Founder", "Quantitative Researcher", "AI Research Lead"], scholarshipAvailable: true, applicationDeadline: "December 15, 2024", studyMode: "Full-time" },
    ],
    "university-of-british-columbia": [
        { slug: "msc-environmental-engineering-ubc", title: "MSc Environmental Engineering", level: "Master", duration: "2 years", tuitionFee: 48000, currency: "CAD", intakeDates: ["Sep 2025", "Jan 2026"], description: "Tackle environmental challenges with cutting-edge engineering solutions.", detailedDescription: "UBC's MSc in Environmental Engineering addresses the world's most pressing sustainability challenges.", modules: ["Water Treatment Systems", "Air Quality Engineering", "Environmental Impact Assessment", "Green Infrastructure", "Climate Change Adaptation", "Research Thesis"], entryRequirements: ["BSc in Engineering or related field", "B+ average or higher", "IELTS 6.5 (6.0 each)", "Statement of research interest"], careerOutcomes: ["Environmental Engineer", "Sustainability Consultant", "Water Resources Engineer", "Climate Policy Analyst", "Green Tech Researcher"], scholarshipAvailable: true, applicationDeadline: "February 1, 2025", studyMode: "Full-time" },
        { slug: "bsc-computer-science-ubc", title: "BSc Computer Science", level: "Bachelor", duration: "4 years", tuitionFee: 53000, currency: "CAD", intakeDates: ["Sep 2025"], description: "A top-tier CS program with a focus on research and innovation.", detailedDescription: "UBC's BSc in Computer Science is one of the most competitive in Canada.", modules: ["Data Structures & Algorithms", "Operating Systems", "Software Engineering", "Artificial Intelligence", "Computer Graphics", "Capstone Project"], entryRequirements: ["Top 15% in high school graduating class", "Strong grades in Math and English", "IELTS 6.5 (6.0 each)", "Personal profile submission"], careerOutcomes: ["Software Developer", "Full-Stack Engineer", "Product Manager", "Tech Entrepreneur", "Game Developer"], scholarshipAvailable: true, applicationDeadline: "January 15, 2025", studyMode: "Full-time" },
    ],
    "university-of-sydney": [
        { slug: "master-of-data-science-sydney", title: "Master of Data Science", level: "Master", duration: "1.5 years", tuitionFee: 49000, currency: "AUD", intakeDates: ["Feb 2025", "Aug 2025"], description: "Advanced data science training with a focus on real-world applications.", detailedDescription: "The Master of Data Science at USyd equips students with the quantitative and computational skills to extract insights from complex datasets.", modules: ["Statistical Thinking", "Machine Learning & Data Mining", "Natural Language Processing", "Data Visualization", "Deep Learning", "Industry Capstone Project"], entryRequirements: ["Bachelor's degree with 65% average", "Background in maths, stats, or CS recommended", "IELTS 6.5 (6.0 each)", "Quantitative aptitude demonstrated"], careerOutcomes: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Manager", "Research Data Analyst", "AI Consultant"], scholarshipAvailable: true, applicationDeadline: "October 30, 2024", studyMode: "Full-time" },
    ],
    "university-of-edinburgh": [
        { slug: "msc-informatics-edinburgh", title: "MSc Informatics", level: "Master", duration: "1 year", tuitionFee: 35000, currency: "GBP", intakeDates: ["Sep 2025"], description: "A world-leading informatics program with AI, NLP, and machine learning specializations.", detailedDescription: "Edinburgh's School of Informatics is one of the largest and most respected computing schools in Europe.", modules: ["Machine Learning & Pattern Recognition", "Natural Language Processing", "Computer Vision", "Probabilistic Modelling", "Reinforcement Learning", "Dissertation"], entryRequirements: ["First or strong 2:1 degree in CS, maths, or engineering", "IELTS 6.5 (6.0 each)", "Strong mathematical foundation", "Programming experience"], careerOutcomes: ["AI Researcher", "NLP Engineer", "Data Scientist", "Machine Learning Engineer", "Research Scientist"], scholarshipAvailable: true, applicationDeadline: "April 30, 2025", studyMode: "Full-time" },
        { slug: "ma-international-relations-edinburgh", title: "MA International Relations", level: "Master", duration: "1 year", tuitionFee: 25000, currency: "GBP", intakeDates: ["Sep 2025"], description: "Explore global politics and diplomacy at a top-tier institution.", detailedDescription: "Edinburgh's MA in International Relations provides a comprehensive grounding in global politics, security studies, and international law.", modules: ["International Relations Theory", "Global Security", "International Political Economy", "Conflict & Peace Studies", "Diplomacy & Foreign Policy", "Dissertation"], entryRequirements: ["2:1 degree in politics, history, or related field", "IELTS 7.0 overall (6.5 each)", "Personal statement", "Two academic references"], careerOutcomes: ["Diplomat", "Policy Analyst", "NGO Programme Officer", "International Journalist", "Government Researcher"], scholarshipAvailable: true, applicationDeadline: "March 31, 2025", studyMode: "Full-time" },
    ],
    "rwth-aachen-university": [
        { slug: "msc-computer-science-rwth", title: "MSc Computer Science", level: "Master", duration: "2 years", tuitionFee: 580, currency: "EUR", intakeDates: ["Oct 2025", "Apr 2026"], description: "Comprehensive CS master with research opportunities in a hub of innovation.", detailedDescription: "RWTH Aachen's MSc CS is one of Germany's most respected computing programmes.", modules: ["Software Architecture", "Data Science", "Media Informatics", "Theoretical CS", "Practical Project", "Master's Thesis"], entryRequirements: ["BSc in CS or closely related field", "TOEFL 90+ or IELTS 6.5+", "GPA ≤ 2.7 on German scale", "Motivation letter"], careerOutcomes: ["Software Architect", "Data Engineer", "Research Scientist", "Tech Lead", "IT Consultant"], scholarshipAvailable: true, applicationDeadline: "March 1, 2025", studyMode: "Full-time" },
        { slug: "bsc-business-administration-engineering-rwth", title: "BSc Business Administration & Engineering", level: "Bachelor", duration: "3 years", tuitionFee: 580, currency: "EUR", intakeDates: ["Oct 2025"], description: "Unique interdisciplinary program combining business and engineering expertise.", detailedDescription: "This highly selective programme trains 'Wirtschaftsingenieure' — a uniquely German profession that bridges technical engineering and business management.", modules: ["Engineering Mechanics", "Business Economics", "Operations Research", "Production Engineering", "Marketing", "Bachelor's Thesis"], entryRequirements: ["Abitur or international equivalent", "Strong maths and physics grades", "German C1 proficiency", "Application via uni-assist"], careerOutcomes: ["Industrial Engineer", "Management Consultant", "Operations Manager", "Supply Chain Director", "Strategy Analyst"], scholarshipAvailable: false, applicationDeadline: "July 15, 2025", studyMode: "Full-time" },
    ],
};

async function main() {
    console.log("🌱 Seeding database...\n");

    // ── 1. Hash password ──
    const hashedPassword = await bcrypt.hash("password123", 10);

    // ── 2. Seed Users ──
    const users = [
        { email: "admin@orangestudies.com", fullName: "System Admin", role: "ADMIN" as const, phone: "+92 300 0000000", nationality: "Pakistani", currentCity: "Lahore" },
        { email: "student@orangestudies.com", fullName: "Test Student", role: "STUDENT" as const, phone: "+880 1700 000000", nationality: "Bangladeshi", currentCity: "Dhaka" },
        { email: "manager@orangestudies.com", fullName: "Regional Manager", role: "MANAGER" as const, phone: "+92 300 1111111", nationality: "Pakistani", currentCity: "Islamabad" },
        { email: "recruiter@orangestudies.com", fullName: "Test Recruiter", role: "RECRUITER" as const, phone: "+44 7700 000000", nationality: "British", currentCity: "London" },
    ];

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: { ...u, passwordHash: hashedPassword },
        });
        console.log(`  ✅ User: ${u.email} (${u.role})`);
    }

    // ── 3. Seed Countries ──
    console.log("");
    const countryMap: Record<string, string> = {};
    for (const c of countriesData) {
        const country = await prisma.country.upsert({
            where: { code: c.code },
            update: {},
            create: c,
        });
        countryMap[c.code] = country.id;
        console.log(`  🌍 Country: ${c.flag} ${c.name}`);
    }

    // ── 4. Seed Universities ──
    console.log("");
    const uniMap: Record<string, string> = {};
    for (const u of universitiesData) {
        const { countryCode, ...uniData } = u;
        const uni = await prisma.university.upsert({
            where: { slug: u.slug },
            update: {},
            create: {
                ...uniData,
                countryId: countryMap[countryCode],
            },
        });
        uniMap[u.slug] = uni.id;
        console.log(`  🏛️  University: ${u.name} (${u.slug})`);
    }

    // ── 5. Seed Programs ──
    console.log("");
    let programCount = 0;
    for (const [uniSlug, programs] of Object.entries(programsData)) {
        const universityId = uniMap[uniSlug];
        if (!universityId) {
            console.error(`  ❌ University not found: ${uniSlug}`);
            continue;
        }
        for (const p of programs) {
            await prisma.program.upsert({
                where: { slug: p.slug },
                update: {},
                create: { ...p, universityId },
            });
            programCount++;
            console.log(`  📚 Program: ${p.title} → ${uniSlug}`);
        }
    }

    console.log(`\n🎉 Database seeded: ${users.length} users, ${countriesData.length} countries, ${universitiesData.length} universities, ${programCount} programs`);
    console.log("─────────────────────────────────────");
    console.log("Test Credentials: password123");
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
