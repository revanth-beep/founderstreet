import { getSiteContent } from "@/lib/site-content";
import FounderStoriesSectionForm from "../../_components/FounderStoriesSectionForm";

export default async function AdminFounderStoriesPage() {
  const site = await getSiteContent();
  return <FounderStoriesSectionForm initial={site.home.founderStories} />;
}
