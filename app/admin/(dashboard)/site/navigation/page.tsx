import { getSiteContent } from "@/lib/site-content";
import NavigationSectionForm from "../_components/NavigationSectionForm";

export default async function AdminNavigationPage() {
  const site = await getSiteContent();
  return <NavigationSectionForm initial={site.nav} />;
}
