/* ── Page definitions (source of truth for available pages + sections) ── */
export const PAGE_DEFINITIONS = {
    home: {
        label: "Homepage",
        icon: "Home",
        sections: [
            { key: "hero", label: "Hero Section", description: "Main hero banner with title, subtitle, and CTA" },
            { key: "stats", label: "Stats & Numbers", description: "Key statistics about students, universities, etc." },
            { key: "university-logos", label: "University Logos", description: "Partner university logo carousel" },
            { key: "how-it-works", label: "How It Works", description: "Step-by-step process guide" },
            { key: "featured-destinations", label: "Featured Destinations", description: "Country cards section (managed via Countries CMS)" },
            { key: "testimonials", label: "Testimonials", description: "Student testimonials and reviews" },
            { key: "why-orange-studies", label: "Why Orange Studies", description: "Value proposition and key benefits" },
            { key: "faq", label: "FAQ Section", description: "Frequently asked questions" },
            { key: "blog-preview", label: "Blog Preview", description: "Latest blog articles preview" },
            { key: "cta-banner", label: "CTA Banner", description: "Call-to-action section at bottom" },
        ],
    },
    about: {
        label: "About Us",
        icon: "Info",
        sections: [
            { key: "hero", label: "Hero Section", description: "About page main banner" },
            { key: "mission", label: "Mission Statement", description: "Company mission and vision" },
            { key: "team", label: "Our Team", description: "Team members" },
            { key: "values", label: "Our Values", description: "Core company values" },
        ],
    },
    "study-abroad": {
        label: "Study Abroad",
        icon: "Globe",
        sections: [
            { key: "hero", label: "Hero Section", description: "Study abroad landing page banner" },
            { key: "process", label: "Application Process", description: "Steps to apply" },
            { key: "resources", label: "Resources", description: "Study abroad resources and guides" },
        ],
    },
    contact: {
        label: "Contact",
        icon: "Mail",
        sections: [
            { key: "hero", label: "Hero Section", description: "Contact page banner" },
            { key: "offices", label: "Branch Offices", description: "Office locations and details" },
        ],
    },
    institutions: {
        label: "Institutions",
        icon: "Building2",
        sections: [
            { key: "hero", label: "Hero Section", description: "Institutions page banner" },
            { key: "services", label: "Services List", description: "Services offered to institutions" },
        ],
    },
} as const;

export type PageKey = keyof typeof PAGE_DEFINITIONS;
export type SectionDef = { key: string; label: string; description: string };
