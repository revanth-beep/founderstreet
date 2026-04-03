import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, TrendingUp, FileText, Receipt, PieChart } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";

export const metadata: Metadata = {
  title: "Accounting & Taxation — Virtual CFO",
  description:
    "Institutional-grade financial plumbing. Virtual CFO services, bookkeeping, payroll, GST compliance, and strategic runway management.",
};

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

const plans = [
  { name: "Seed", price: "₹8,000", period: "/month", desc: "For pre-revenue startups", features: ["Monthly bookkeeping", "GST return filing", "Bank reconciliation", "Annual ITR filing", "Email support"], cta: "Get Started", highlight: false },
  { name: "Growth", price: "₹18,000", period: "/month", desc: "For revenue-generating startups", features: ["Everything in Seed", "Payroll processing", "TDS deduction & filing", "Investor MIS reports", "Priority support", "Quarterly strategy call"], cta: "Most Popular", highlight: true },
  { name: "Scale", price: "₹35,000", period: "/month", desc: "For pre-Series A startups", features: ["Everything in Growth", "Virtual CFO services", "Fundraising model", "Board reporting", "Due diligence prep", "Dedicated CFO partner"], cta: "Get Started", highlight: false },
];

const faqs = [
  { question: "How is a Virtual CFO different from a regular CA?", answer: "A CA handles compliance — taxes, audits, and filings. A Virtual CFO handles strategy — financial modelling, fundraising preparation, runway management, and board reporting. We provide both under one roof, so you don't need to manage two separate relationships." },
  { question: "What accounting software do you use?", answer: "We primarily work with Zoho Books, QuickBooks, and Tally depending on client preference. We also integrate with Razorpay, Stripe, and other payment platforms for automated reconciliation. All clients get read-only access to their accounts in real time." },
  { question: "Can you help us prepare for a due diligence audit?", answer: "Absolutely. We maintain your accounts in investor-ready condition from Day 1. When due diligence begins, we provide a complete data room with audited financials, tax returns, GST filings, payroll records, and cap table documentation." },
  { question: "How do you handle startups with foreign investment?", answer: "We manage all FEMA compliance, RBI reporting requirements (FC-GPR, FC-TRS), and transfer pricing documentation required when a company receives foreign direct investment or has foreign directors." },
  { question: "What is the pricing structure?", answer: "We offer three packages: Seed (bookkeeping + GST, from ₹8,000/month), Growth (adds payroll + TDS + investor reporting, from ₹18,000/month), and Scale (full Virtual CFO with fundraising support, from ₹35,000/month). Custom pricing for companies with more complex needs." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#111111",
  lineHeight: 1.2 as const,
};

export default function AccountingPage() {
  return (
    <>
      <ServiceHero
        label="Accounting & Virtual CFO"
        title="Financial Plumbing"
        titleHighlight="That Impresses Investors."
        subtitle="Institutional-grade accounting, GST compliance, and virtual CFO services so you can focus 100% on product and growth — not spreadsheets."
        ctaText="Get Started"
        icon={Calculator}
        stats={[
          { value: "₹0", label: "Penalties across all clients" },
          { value: "48hr", label: "Monthly close cycle" },
          { value: "3x", label: "Faster due diligence" },
        ]}
      />

      <section style={{ background: "#FAFAF8", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
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
                    <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#EDFAF2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color="#1B4332" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#111111" }}>{service.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.35rem", lineHeight: 1.65 }}>{service.desc}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #E0E0DC", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.75rem" }}>What&apos;s included</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.35rem" }}>
                      {service.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1B4332", flexShrink: 0 }} />
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

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Pricing</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Transparent Monthly Pricing</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem", maxWidth: "56rem", margin: "0 auto" }}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRadius: "8px",
                  border: plan.highlight ? "1px solid #1B4332" : "1px solid #E0E0DC",
                  padding: "1.5rem",
                  background: plan.highlight ? "#1B4332" : "#FFFFFF",
                  color: plan.highlight ? "#FFFFFF" : "inherit",
                  boxShadow: plan.highlight ? "0 0 40px rgba(27,67,50,0.35), 0 10px 40px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {plan.highlight && (
                  <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.65rem", borderRadius: "999px", marginBottom: "0.75rem" }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem", color: plan.highlight ? "#FFFFFF" : "#111111" }}>{plan.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", marginBottom: "1rem", color: plan.highlight ? "rgba(255,255,255,0.75)" : "#787878" }}>{plan.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.125rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: plan.highlight ? "#FFFFFF" : "#111111" }}>{plan.price}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.7)" : "#787878" }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.92)" : "#5A5A5A" }}>
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: plan.highlight ? "rgba(255,255,255,0.2)" : "#EDFAF2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: plan.highlight ? "#FFFFFF" : "#1B4332" }} />
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
                    background: plan.highlight ? "#FFFFFF" : "#1B4332",
                    color: plan.highlight ? "#1B4332" : "#FFFFFF",
                  }}
                >
                  {plan.cta === "Most Popular" ? "Get Started" : plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAF8", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={h2}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Get investor-grade financials from Day One</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Stop managing spreadsheets. Get a dedicated finance team for less than the cost of a part-time accountant.
          </p>
          <Link href="/contact" className="btn-white">
            Start Financial Setup
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
