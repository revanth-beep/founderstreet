import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight, FileText, BarChart3, Users, Search, Shield, Zap, Target } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import InvestorMatchQuiz from "@/components/sections/InvestorMatchQuiz";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.funding.meta;
  return { title: m.title, description: m.description };
}

const coreServices = [
  { icon: FileText, title: "Pitch Deck Creation", desc: "The 12-slide master deck designed to make investors lean forward. We combine data storytelling with visual design excellence.", deliverables: ["12-slide investor deck", "Narrative storyboarding", "Visual design (Figma/PowerPoint)", "Investor Q&A script", "Mock pitch session", "3 revision rounds"] },
  { icon: BarChart3, title: "Financial Projections", desc: "5-year Excel models that withstand investor scrutiny. Built bottom-up with clear assumptions, scenario analysis, and key driver sensitivity.", deliverables: ["5-year P&L projection", "Revenue & cost model", "3 scenarios (bear/base/bull)", "Cohort analysis", "Fundraise utilisation plan", "Cap table modelling"] },
  { icon: Users, title: "Investor Matchmaking", desc: "Warm introductions to the right investors at the right stage. No cold emails. We only connect you with investors who've pre-indicated interest.", deliverables: ["Investor database scan", "Stage & sector matching", "Warm email introductions", "Meeting preparation brief", "Pipeline CRM setup (n8n)", "Post-meeting follow-up"] },
];

const beyondAlgorithm = [
  { icon: Search, title: "Portfolio Conflict Checks", desc: "We analyse the fund's active portfolio to ensure they have not quietly invested in your direct competitor in the past 6 months." },
  { icon: Zap, title: "Dry Powder & Deployment Velocity", desc: "We track exactly where a fund is in its lifecycle: actively deploying or just taking coffee chats with no capital to deploy." },
  { icon: Users, title: "Partner-Level Profiling", desc: "Funds do not write cheques. Partners do. We identify exactly which General Partner holds the mandate for your specific sector and stage." },
  { icon: Target, title: "Follow-On Capacity & Strategic Fit", desc: "We analyse past deals to assess the investor's track record of participating in subsequent rounds (Series A/B)." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

export default async function FundingPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.funding;
  const { hero, faq, pricing, bottomCta } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={TrendingUp}
        stats={hero.stats}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} color="#66BB3F" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#3d4246", marginBottom: "0.5rem" }}>{service.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{service.desc}</p>
                  <div style={{ borderTop: "1px solid #E0E0DC", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.75rem" }}>Deliverables</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {service.deliverables.map((d) => (
                        <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#66BB3F", flexShrink: 0 }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing strip */}
      <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", borderBottom: "1px solid #E0E0DC", paddingBlock: "2.5rem" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "56rem", margin: "0 auto" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {(p.badge || p.highlight) && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>{p.badge || "Featured"}</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.75rem" }}>{p.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
                {p.features && p.features.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {p.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.85)" : "#5A5A5A" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.highlight ? "#FFFFFF" : "#66BB3F", flexShrink: 0 }} />{f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "0.625rem 1rem", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: p.highlight ? "#FFFFFF" : "#66BB3F", color: p.highlight ? "#66BB3F" : "#FFFFFF" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>AI Investor Matchmaker</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Find Your Top 3 Investor Matches in 60 Seconds</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              5 quick questions. No pitch deck upload. No friction. Our AI cross-references your profile against 775+ active investor mandates and surfaces the 3 best fits.
            </p>
          </div>
          <InvestorMatchQuiz />
        </div>
      </section>

      <section style={{ background: "#3d4246", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9FE670" }}>Beyond the Algorithm</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#FFFFFF", marginTop: "1rem", lineHeight: 1.2 }}>
              The AI found the fund. We find the strategy.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Here is how we go deeper than any algorithm can.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {beyondAlgorithm.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(102,187,63,0.15)", border: "1px solid rgba(102,187,63,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={18} color="#9FE670" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", maxWidth: "32rem", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              Do not guess your way through fundraising. Let us build your custom investor dossier and facilitate the warm introductions.
            </p>
            <Link href="/contact" className="btn-primary">
              Book Your Capital Strategy Call
              <ArrowRight size={15} />
            </Link>
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

      <CaseStudyBanner />

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
