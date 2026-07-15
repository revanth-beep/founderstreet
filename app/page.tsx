import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestYourIdeaBlock from "@/components/home/TestYourIdeaBlock";
import ProcessSection from "@/components/home/ProcessSection";
import WhySection from "@/components/home/WhySection";
import StyleworkPerks from "@/components/home/StyleworkPerks";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ResourcesTeaser from "@/components/home/ResourcesTeaser";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";
import { getSiteContent } from "@/lib/site-content";
import { getAllPosts } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const [site, posts] = await Promise.all([getSiteContent(), getAllPosts("published")]);
  const featured = [...posts].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (
    <>
      <HeroSection hero={site.home.hero} />
      <ServicesSection header={site.home.services} serviceCards={site.home.serviceCards} />
      <TestYourIdeaBlock cms={site.home.healthCheckBlock} />
      <WhySection cms={site.home.why} />
      <StyleworkPerks cms={site.home.stylework} hireTalent={site.home.hireTalentPerk} />
      <ProcessSection cms={site.home.process} />
      <PartnerMarquee data={site.home.partnerMarquee} />
      <TestimonialsSection data={site.home.founderStories} />
      <ResourcesTeaser teaser={site.home.resourcesTeaser} posts={featured} />
      <HomeFAQ cms={site.home.faq} />
      <CTASection cms={site.home.cta} />
    </>
  );
}
