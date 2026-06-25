import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import PitchDeckExtrasForm from "../../_components/PitchDeckExtrasForm";

export default async function AdminPitchDeckPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="pitchDeck" initial={site.servicePages.pitchDeck} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <PitchDeckExtrasForm initial={site.servicePages.pitchDeck.serviceCards} />
      </div>
    </>
  );
}
