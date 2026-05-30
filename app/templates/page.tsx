import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Startup Document Templates | Founderstreet",
  description: "Free and premium startup document templates. Pitch deck templates, financial models, MOA/AOA, investor email scripts, and more.",
};

const freeTemplates = [
  { name: "Seed-Round Pitch Deck Template", format: "PowerPoint + PDF", desc: "12-slide structure used by 73% of our funded clients. Blank version with slide-by-slide guidance.", category: "Pitch Deck" },
  { name: "Startup SWOT Analysis Template", format: "Google Slides", desc: "A clean, investor-ready SWOT framework with example content from a real D2C brand.", category: "Validation" },
  { name: "Investor Outreach Email Scripts", format: "Google Docs", desc: "5 email templates: first intro, warm follow-up, after a no, after a meeting, and a referral ask.", category: "Fundraising" },
  { name: "Cap Table Template (Seed Stage)", format: "Google Sheets", desc: "Simple cap table for pre-seed/seed rounds with ESOP pool, safe notes, and dilution modelling.", category: "Finance" },
];

const premiumTemplates = [
  { name: "5-Year Financial Model", format: "Excel + Google Sheets", desc: "Complete P&L, Balance Sheet, Cash Flow, unit economics, and 3-scenario analysis. Used in due diligence.", category: "Finance", price: "₹1,999" },
  { name: "Term Sheet Checklist & Red Flags Guide", format: "PDF + Google Docs", desc: "19-point term sheet checklist with explanations of founder-unfriendly clauses to watch for.", category: "Legal", price: "₹999" },
  { name: "Investor Update Template (Monthly)", format: "Google Docs", desc: "The exact format institutional investors expect: metrics, burn, asks, highlights. With example.", category: "Fundraising", price: "₹499" },
  { name: "MOA & AOA Template (Pvt Ltd)", format: "Word + PDF", desc: "Startup-optimised Memorandum and Articles of Association. Includes ESOP-compatible clauses.", category: "Legal", price: "₹2,499" },
  { name: "Series A Data Room Checklist", format: "PDF + Notion template", desc: "Complete 47-item Series A data room structure used by Sequoia, Accel, and Blume-backed startups.", category: "Finance", price: "₹1,499" },
  { name: "GTM Strategy Template", format: "Google Slides + Docs", desc: "Channel selection, CAC benchmarks by vertical, 90-day execution plan. Includes 3 real GTM examples.", category: "Marketing", price: "₹1,999" },
];

const catColors: Record<string, string> = {
  "Pitch Deck": "#66BB3F",
  Validation: "#3B82F6",
  Fundraising: "#F59E0B",
  Finance: "#8B5CF6",
  Legal: "#EF4444",
  Marketing: "#EC4899",
};

export default function TemplatesPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Startup Templates
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "600px" }}>
            The Documents Investors Expect. Ready to Use.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.75, marginBottom: "2rem" }}>
            Battle-tested templates used by 150+ Indian startups. Free basics. Premium depth.
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <Download size={20} color="#66BB3F" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#3d4246" }}>Free Templates</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
            {freeTemplates.map(t => (
              <div key={t.name} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: catColors[t.category] ?? "#787878", background: "#F7F7F5", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{t.category}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#56AD32" }}>Free</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#3d4246", marginBottom: "0.5rem", lineHeight: 1.4 }}>{t.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{t.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0" }}>{t.format}</span>
                  <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "#66BB3F", textDecoration: "none" }}>
                    <Download size={13} /> Get Free Template
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <Lock size={20} color="#3d4246" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#3d4246" }}>Premium Templates</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
            {premiumTemplates.map(t => (
              <div key={t.name} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: catColors[t.category] ?? "#787878", background: "#F7F7F5", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{t.category}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#3d4246" }}>{t.price}</span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#3d4246", marginBottom: "0.5rem", lineHeight: 1.4 }}>{t.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{t.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0" }}>{t.format}</span>
                  <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "#3d4246", textDecoration: "none" }}>
                    Buy Template <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Need a custom document?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Our team builds bespoke financial models, pitch decks, and legal documents tailored to your specific business.
          </p>
          <Link href="/contact" className="btn-white">
            Request a Custom Document
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
