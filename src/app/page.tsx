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
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function Home() {
  const countries = await prisma.country.findMany({
    select: {
      name: true,
      flag: true,
      slug: true,
      image: true,
      colorAccent: true,
      universities: {
        select: { _count: { select: { programs: true } } },
      },
    },
    orderBy: { name: "asc" },
  });

  const dynamicDestinations = countries.map((c) => ({
    name: c.name,
    flag: c.flag,
    slug: c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    programCount: c.universities.reduce((sum, u) => sum + u._count.programs, 0),
    image: c.image,
    colorAccent: c.colorAccent,
  }));

  return (
    <>
      <HeroParticleMap />
      <StatsFloating />
      <UniversityLogos />
      <HowItWorks />
      <FeaturedDestinations dynamicDestinations={dynamicDestinations} />
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
