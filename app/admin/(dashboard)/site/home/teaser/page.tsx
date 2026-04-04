import { getSiteContent } from "@/lib/site-content";
import TeaserSectionForm from "../../_components/TeaserSectionForm";

export default async function AdminTeaserPage() {
  const site = await getSiteContent();
  return <TeaserSectionForm initial={site.home.resourcesTeaser} />;
}
