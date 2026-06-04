import { getSiteContent } from "@/lib/site-content";
import ContactPageForm from "../_components/ContactPageForm";

export default async function AdminContactPage() {
  const site = await getSiteContent();
  return <ContactPageForm initial={site.contactPage} />;
}
