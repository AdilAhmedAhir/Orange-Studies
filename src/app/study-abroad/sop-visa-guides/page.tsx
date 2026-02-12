import { SOPGuide } from "@/components/study-abroad/SOPGuide";
import { VisaGuides } from "@/components/study-abroad/VisaGuides";
import { SOPVisaHero } from "@/components/study-abroad/SOPVisaHero";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export default function SOPVisaGuidesPage() {
    return (
        <>
            <SOPVisaHero />
            <SOPGuide />
            <VisaGuides />
            <CTABanner />
            <Footer />
        </>
    );
}
