import { getSiteContent } from "@/lib/site-content";
import HeroSectionForm from "../../_components/HeroSectionForm";

export default async function AdminHeroPage() {
  const site = await getSiteContent();
  return <HeroSectionForm initial={site.home.hero} />;
}
