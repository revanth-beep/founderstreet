import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, TrendingUp, FileText, Receipt, PieChart } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.accounting.meta;
  return { title: m.title, description: m.description };
}

const services = [
  {
    icon: TrendingUp,
    title: "Virtual CFO Services",
    desc: "High-level financial forecasting and runway management for early-stage startups. You get the strategic clarity of a ₹40L/yr CFO at a fraction of the cost.",
    features: ["Monthly financial health reports", "12-month cash flow forecasting", "Fundraising financial modelling", "Board-ready P&L presentations", "Burn rate optimisation", "Scenario planning (3 cases)"],
  },
  {
    icon: FileText,
    title: "Bookkeeping & Payroll",
    desc: "Automated, accurate, and on time. We use cloud accounting tools to give you real-time visibility into your finances without any manual reconciliation.",
    features: ["Monthly bookkeeping & reconciliation", "Payroll processing & payslips", "Vendor payment management", "Bank statement reconciliation", "TDS deduction & filing", "Expense management"],
  },
  {
    icon: Receipt,
    title: "GST & Taxation",
    desc: "Zero penalties. Optimised tax structures. We ensure every filing is on time and your tax structure is designed to minimise liability legally.",
    features: ["GST registration & filing (GSTR-1, 3B)", "Advance tax computation", "Annual income tax filing", "Tax audit support", "Transfer pricing advisory", "Startup tax exemptions (80-IAC)"],
  },
  {
    icon: PieChart,
    title: "Investor Reporting",
    desc: "Institutional-grade reporting for your angel investors, lead funds, and board. Structured exactly as institutional investors expect to see it.",
    features: ["Monthly MIS reports", "Investor deck financials", "KPI dashboards", "Cohort analysis", "Due diligence data room", "ESOP accounting"],
  },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

export default async function AccountingPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.accounting;
  const { hero, faq, pricing, bottomCta } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={Calculator}
        stats={hero.stats}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Services</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Everything Under One Roof</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "clamp(1.25rem, 3vw, 2rem)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color="#66BB3F" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#3d4246" }}>{service.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.35rem", lineHeight: 1.65 }}>{service.desc}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #E0E0DC", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.75rem" }}>What&apos;s included</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.35rem" }}>
                      {service.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#66BB3F", flexShrink: 0 }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="ai-model-grid">
            <div>
              <ServicePageEyebrow>AI-Powered Deliverable</ServicePageEyebrow>
              <h2 style={{ ...h2, marginTop: "1rem", marginBottom: "1rem" }}>
                AI-Generated 5-Year Financial Model
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#5A5A5A", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "480px" }}>
                Revenue projections, unit economics, P&amp;L, Balance Sheet, and Cash Flow, built from your actual business inputs in under 48 hours. Investor-ready and auditable.
              </p>
              <div style={{ background: "#F7F7F5", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.25rem", marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9FE670", marginBottom: "0.75rem" }}>
                  Powered by Setu Account Aggregator
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65 }}>
                  Clients who opt in connect their bank accounts via{" "}
                  <a href="https://setu.co" target="_blank" rel="noopener noreferrer" style={{ color: "#66BB3F", textDecoration: "underline" }}>Setu</a>
                  {" "}— India&apos;s leading Account Aggregator (5M+ daily AA requests, Pine Labs). Real bank data flows directly into your model, replacing manual estimates with verified financial inputs.
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {["5-year P&L, Balance Sheet, Cash Flow", "Revenue model built from your actual inputs", "3 scenarios: conservative, base, optimistic", "Delivered to Google Sheets, investor-ready", "Analyst review before delivery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#66BB3F" }} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary">
                Request Financial Model
                <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ background: "#3d4246", borderRadius: "14px", padding: "1.75rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
                Sample Output Preview
              </p>
              {[
                { label: "Year 1 Revenue", val: "₹24.6L", note: "Based on your inputs" },
                { label: "Year 3 Revenue", val: "₹1.8Cr", note: "Base scenario" },
                { label: "Break-even Month", val: "Month 14", note: "Conservative estimate" },
                { label: "LTV / CAC Ratio", val: "4.2x", note: "By cohort" },
                { label: "Gross Margin", val: "68%", note: "Year 2 onwards" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)" }}>{row.label}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)" }}>{row.note}</p>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: "#9FE670" }}>{row.val}</p>
                </div>
              ))}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", color: "rgba(255,255,255,0.25)", marginTop: "1rem", textAlign: "center" }}>
                Illustrative only. Actual outputs based on your real business inputs.
              </p>
            </div>
          </div>
        </div>
        <style>{`@media (min-width: 1024px) { .ai-model-grid { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; } }`}</style>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Pricing</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Transparent Monthly Pricing</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem", maxWidth: "56rem", margin: "0 auto" }}>
            {pricing.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRadius: "8px",
                  border: plan.highlight ? "1px solid #66BB3F" : "1px solid #E0E0DC",
                  padding: "1.5rem",
                  background: plan.highlight ? "#66BB3F" : "#FFFFFF",
                  color: plan.highlight ? "#FFFFFF" : "inherit",
                  boxShadow: plan.highlight ? "0 0 40px rgba(102,187,63,0.35), 0 10px 40px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {(plan.badge || plan.highlight) && (
                  <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.65rem", borderRadius: "999px", marginBottom: "0.75rem" }}>
                    {plan.badge || "Featured"}
                  </span>
                )}
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem", color: plan.highlight ? "#FFFFFF" : "#3d4246" }}>{plan.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", marginBottom: "1rem", color: plan.highlight ? "rgba(255,255,255,0.75)" : "#787878" }}>{plan.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.125rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: plan.highlight ? "#FFFFFF" : "#3d4246" }}>{plan.price}</span>
                  {plan.period && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.7)" : "#787878" }}>{plan.period}</span>}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.92)" : "#5A5A5A" }}>
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: plan.highlight ? "rgba(255,255,255,0.2)" : "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: plan.highlight ? "#FFFFFF" : "#66BB3F" }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "0.625rem 1rem",
                    borderRadius: "4px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    background: plan.highlight ? "#FFFFFF" : "#66BB3F",
                    color: plan.highlight ? "#66BB3F" : "#FFFFFF",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={h2}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faq} />
        </div>
      </section>

      <CaseStudyBanner
        quote="The team at Founderstreet has been incredibly professional and significantly helped us organise our accounting system."
        company="706 Pictures, Film Production"
      />

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>{bottomCta.title}</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            {bottomCta.subtitle}
          </p>
          <Link href="/contact" className="btn-white">
            {bottomCta.buttonLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
