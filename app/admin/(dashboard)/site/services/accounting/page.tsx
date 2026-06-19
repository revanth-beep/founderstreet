import { getSiteContent } from "@/lib/site-content";
import ServicePageForm from "../../_components/ServicePageForm";
import AccountingExtrasForm from "../../_components/AccountingExtrasForm";

export default async function AdminAccountingPage() {
  const site = await getSiteContent();
  return (
    <>
      <ServicePageForm serviceKey="accounting" initial={site.servicePages.accounting} />
      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <AccountingExtrasForm initial={site.servicePages.accounting.serviceCards} />
      </div>
    </>
  );
}
