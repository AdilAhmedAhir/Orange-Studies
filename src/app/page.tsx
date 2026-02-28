import { HeroParticleMap } from "@/components/hero-variants/HeroParticleMap";
import { StatsFloating } from "@/components/home/StatsFloating";
import { UniversityLogos } from "@/components/home/UniversityLogos";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyOrangeStudies } from "@/components/home/WhyOrangeStudies";
import { FAQSection } from "@/components/home/FAQSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { StickyMobileCTA } from "@/components/home/StickyMobileCTA";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HeroParticleMap />
      <StatsFloating />
      <UniversityLogos />
      <HowItWorks />
      <FeaturedDestinations />
      <Testimonials />
      <WhyOrangeStudies />
      <FAQSection />
      <BlogPreview />
      <CTABanner />
      <Footer />
      <ScrollToTop />
      <StickyMobileCTA />
    </>
  );
}
