import { notFound } from "next/navigation";
import { countryDetails } from "@/components/study-abroad/countryData";
import { CountryDetailView } from "@/components/study-abroad/CountryDetailView";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

// Generate static paths for all 6 countries
export function generateStaticParams() {
    return Object.keys(countryDetails).map((slug) => ({ country: slug }));
}

export default async function CountryDetailPage({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country } = await params;
    const data = countryDetails[country];

    if (!data) {
        notFound();
    }

    return (
        <>
            <CountryDetailView data={data} />
            <CTABanner />
            <Footer />
        </>
    );
}
