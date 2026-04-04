import { getSiteContent } from "@/lib/site-content";
import ServicesSectionForm from "../../_components/ServicesSectionForm";

export default async function AdminServicesSectionPage() {
  const site = await getSiteContent();
  const cards = site.home.serviceCards.length >= 6 ? site.home.serviceCards : [...site.home.serviceCards];
  while (cards.length < 6) {
    cards.push({
      n: String(cards.length + 1).padStart(2, "0"),
      tag: "",
      name: "",
      desc: "",
      href: "/services/validation",
    });
  }
  return (
    <ServicesSectionForm
      header={site.home.services}
      serviceCards={cards.slice(0, 6)}
    />
  );
}
