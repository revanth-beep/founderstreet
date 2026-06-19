import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import IncorporationExtrasForm from "../../_components/IncorporationExtrasForm";

export default async function AdminIncorporationPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="incorporation" initial={site.servicePages.incorporation} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <IncorporationExtrasForm
          initialSteps={site.servicePages.incorporation.steps}
          initialBundles={site.servicePages.incorporation.bundles}
        />
      </div>
    </>
  );
}
