import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ArrowRight, CheckCircle2, Shield, FileText, Award } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ComparisonTable from "@/components/ui/ComparisonTable";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import EntityAdvisor from "@/components/ui/EntityAdvisor";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.incorporation.meta;
  return { title: m.title, description: m.description };
}

const BUNDLE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  FileText, Shield, Award, Building2,
};

const comparisonColumns = [
  { key: "pvtltd", label: "Private Limited", highlight: true },
  { key: "llp", label: "LLP" },
  { key: "prop", label: "Sole Proprietorship" },
];

const comparisonRows = [
  { feature: "Investor Preferred", values: [true, "partial", false] },
  { feature: "Limited Liability", values: [true, true, false] },
  { feature: "Min. Members Required", values: ["2", "2", "1"] },
  { feature: "ESOPs Available", values: [true, false, false] },
  { feature: "Foreign Investment (FDI)", values: [true, "partial", false] },
  { feature: "Incorporation Time", values: ["7–10 days", "10–15 days", "3–5 days"] },
  { feature: "Tax Rate (Turnover < ₹400Cr)", values: ["22%", "30%", "As per slab"] },
  { feature: "Perpetual Existence", values: [true, true, false] },
  { feature: "Best For", values: ["VC-backed startups", "Professional services", "Freelancers/solo ops"] },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
  letterSpacing: "-0.01em" as const,
};

export default async function IncorporationPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.incorporation;
  const { hero, faq, pricing, bottomCta, steps, bundles } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={Building2}
        stats={hero.stats}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>Entity Comparison</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Which Structure is Right for You?</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Choosing the wrong entity can cost you your next funding round. Here&apos;s the data you need to decide.
            </p>
          </div>
          <ComparisonTable columns={comparisonColumns} rows={comparisonRows} title="Pvt Ltd vs LLP vs Sole Proprietorship" subtitle="A comprehensive comparison for Indian founders making the incorporation decision" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center", marginTop: "1rem" }}>
            * For startups seeking venture capital, Private Limited is the only investor-compatible structure.
          </p>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Our Process</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>
              Company Live in <span className="gradient-text">15 Working Days</span>
            </h2>
          </div>

          <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <Accordion
              items={steps.map(p => ({
                question: `Step ${p.step}: ${p.title}`,
                answer: `${p.desc} Timeline: ${p.time}.`,
              }))}
            />
          </div>

          <div style={{ maxWidth: "56rem", margin: "3rem auto 0", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <ServicePageEyebrow>What You Need to Get Started</ServicePageEyebrow>
              <h3 style={{ ...h2, fontSize: "clamp(1.25rem, 2vw, 1.625rem)", marginTop: "0.75rem" }}>
                Gather these documents, book your kickoff call, and we will have your Certificate of Incorporation in under 15 days.
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="checklist-grid">
              <div style={{ background: "#F7F7F5", borderRadius: "10px", padding: "1.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#66BB3F", marginBottom: "1rem" }}>
                  Your Homework (The Easy Part)
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {["PAN and Aadhaar Card (all directors)", "Bank Statement under 2 months old", "Electricity Bill for the office address", "No Objection Certificate (NOC) from landlord"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>
                      <CheckCircle2 size={16} color="#66BB3F" style={{ flexShrink: 0, marginTop: "2px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#3d4246", borderRadius: "10px", padding: "1.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9FE670", marginBottom: "1rem" }}>
                  Our Job (The Complex Part)
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {["AI-assisted entity structuring (Pvt Ltd vs LLP vs OPC)", "Drafting custom MOA and AOA", "Securing Class-3 DSCs and DINs", "Navigating SPICe+, Agile Pro, PAN and TAN", "Zero rejections: first-time MCA approval"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                      <CheckCircle2 size={16} color="#9FE670" style={{ flexShrink: 0, marginTop: "2px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/contact" className="btn-primary">
                Book Your Incorporation Kickoff
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section style={{ background: "#FFFFFF", paddingBlock: "clamp(3rem, 6vw, 4.5rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 0.5rem" }}>
            <ServicePageEyebrow>AI Entity Advisor</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Not Sure Which Entity to Choose?</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Answer 3 quick questions and get an instant AI-powered recommendation under the Companies Act 2013.
            </p>
          </div>
          <EntityAdvisor />
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
            {bundles.map((bundle) => {
              const Icon = BUNDLE_ICON_MAP[bundle.iconName] ?? FileText;
              return (
                <div key={bundle.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.5rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    <Icon size={20} color="#66BB3F" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#3d4246", marginBottom: "1rem" }}>{bundle.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {bundle.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>
                        <CheckCircle2 size={16} color="#66BB3F" style={{ flexShrink: 0, marginTop: "2px" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Packages</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>The right structure from day one. Pick your bundle.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "52rem", margin: "0 auto" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {p.badge && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>{p.badge}</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.75rem" }}>{p.price}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: p.highlight ? "rgba(255,255,255,0.8)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{p.desc}</p>
                {p.features && p.features.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {p.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.85)" : "#5A5A5A" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.highlight ? "#FFFFFF" : "#66BB3F", flexShrink: 0 }} />{f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/contact?service=${encodeURIComponent("Company Incorporation and Annual Compliance")}&plan=${encodeURIComponent(p.name)}`} style={{ display: "block", textAlign: "center", padding: "0.625rem 1rem", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: p.highlight ? "#FFFFFF" : "#66BB3F", color: p.highlight ? "#66BB3F" : "#FFFFFF" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center", marginTop: "1.5rem" }}>
            All prices include government fees, professional charges, and post-incorporation setup. Delivered in under 15 working days.
          </p>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
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
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
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
