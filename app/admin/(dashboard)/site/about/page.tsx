import { getSiteContent } from "@/lib/site-content";
import AboutPageForm from "../_components/AboutPageForm";

export default async function AdminAboutPage() {
  const site = await getSiteContent();
  return <AboutPageForm initial={site.aboutPage} />;
}
