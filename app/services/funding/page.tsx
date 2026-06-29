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

const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileText, BarChart3, Users, Search, Shield, Zap, Target, TrendingUp,
};

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

const FUNDING_SERVICES = [
  {
    icon: Target,
    title: "Systematic Investor Outreach",
    desc: "We build a structured, targeted outreach system that gets your deck in front of investors who are actively writing cheques in your sector.",
    features: ["Investor Mapping & Targeting", "Outreach Execution", "Live investor pipeline tracker"],
  },
  {
    icon: BarChart3,
    title: "Financial Projections",
    desc: "Numbers that tell your story and hold up under scrutiny. We build a financial model that is credible, defensible, and built the way investors expect to see it.",
    features: ["Revenue Model", "Cost & Burn Modelling", "Scenario Analysis", "Key Metrics Dashboard"],
  },
  {
    icon: Search,
    title: "Valuation Reports",
    desc: "A valuation isn't just a number, it's an argument. We build a defensible valuation using the methods investors trust, so you never have to guess what your startup is worth.",
    features: ["Comparable Company Analysis", "Discounted Cash Flow (DCF)", "Early-Stage Methods (Berkus & Scorecard)", "Valuation Report"],
  },
  {
    icon: Shield,
    title: "Startup Grant Applications",
    desc: "The Indian government and state bodies have set aside thousands of crores for startups through grants, schemes, and incentive programmes. We identify what you qualify for and handle the entire application process.",
    features: ["Grant Identification & Eligibility Screening", "Application Preparation", "Post-Application Support"],
  },
  {
    icon: TrendingUp,
    title: "Debt Funding",
    desc: "Not every rupee of capital needs to cost you ownership. Debt funding lets you grow, bridge, or scale while keeping your cap table clean. We help you find the right debt product for your stage and structure it correctly.",
    features: ["Debt Product Identification", "Lender Outreach & Matching", "Documentation & Due Diligence Support", "Structuring Advice"],
  },
];

export default async function FundingPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.funding;
  const { hero, faq, pricing, bottomCta, beyondAlgorithm } = cms;

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
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>What We Offer</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Everything Under One Roof</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            {FUNDING_SERVICES.map((service) => {
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

      {/* Pricing strip */}
      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Packages</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Simple, Transparent Packages</h2>
          </div>
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

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
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
              const Icon = SERVICE_ICON_MAP[p.iconName] ?? Search;
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
