import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { StatsStrip } from "@/components/about/StatsStrip";
import { OurValues } from "@/components/about/OurValues";
import { TeamSection } from "@/components/about/TeamSection";
import { Timeline } from "@/components/about/Timeline";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <MissionVision />
            <StatsStrip />
            <OurValues />
            <TeamSection />
            <Timeline />
            <CTABanner />
            <Footer />
        </>
    );
}
