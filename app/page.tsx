import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import WhySection from "@/components/home/WhySection";
import ResourcesTeaser from "@/components/home/ResourcesTeaser";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <PartnerMarquee />
      <TestimonialsSection />
      <ResourcesTeaser />
      <CTASection />
    </>
  );
}
