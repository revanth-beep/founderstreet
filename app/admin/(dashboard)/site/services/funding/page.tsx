import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import FundingExtrasForm from "../../_components/FundingExtrasForm";

export default async function AdminFundingPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="funding" initial={site.servicePages.funding} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <FundingExtrasForm
          initialCore={site.servicePages.funding.coreServices}
          initialBeyond={site.servicePages.funding.beyondAlgorithm}
        />
      </div>
    </>
  );
}
