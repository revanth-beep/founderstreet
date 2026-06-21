import { getSiteContent } from "@/lib/site-content";
import FaviconForm from "../_components/FaviconForm";

export default async function AdminFaviconPage() {
  const site = await getSiteContent();
  return <FaviconForm initial={site.favicon ?? ""} />;
}
