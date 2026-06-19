import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import MarketingExtrasForm from "../../_components/MarketingExtrasForm";

export default async function AdminMarketingPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="marketing" initial={site.servicePages.marketing} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <MarketingExtrasForm
          initialCategories={site.servicePages.marketing.serviceCategories}
          initialResults={site.servicePages.marketing.results}
          initialAiStudio={site.servicePages.marketing.aiStudio}
        />
      </div>
    </>
  );
}
