import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowRight, CheckCircle2, BarChart3, Target, TrendingUp } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import StartupQuiz from "@/components/sections/StartupQuiz";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.validation.meta;
  return { title: m.title, description: m.description };
}

const DELIVERABLE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  BarChart3, Target, TrendingUp, FlaskConical,
};

export default async function ValidationPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.validation;
  const { hero, faq, pricing, bottomCta, deliverables } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={FlaskConical}
        stats={hero.stats}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>What You Get</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Three Reports. Zero Guesswork.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {deliverables.map((d, i) => {
              const Icon = DELIVERABLE_ICON_MAP[d.iconName] ?? BarChart3;
              return (
                <div
                  key={d.title}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    padding: "clamp(1.25rem, 3vw, 2rem)",
                    background: "#FFFFFF",
                    border: "1px solid #E0E0DC",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "6px",
                          background: "#E9F6E4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={20} color="#66BB3F" />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "#A0A0A0",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Deliverable {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#3d4246",
                        lineHeight: 1.3,
                      }}
                    >
                      {d.title}
                    </h3>
                  </div>
                  <div style={{ flex: "2 1 280px", minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "#5A5A5A",
                        marginBottom: "1rem",
                      }}
                    >
                      {d.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {d.points.map((p) => (
                        <span
                          key={p}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "#66BB3F",
                            background: "#E9F6E4",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "999px",
                          }}
                        >
                          <CheckCircle2 size={12} color="#66BB3F" />
                          {p}
                        </span>
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
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>Test Your Idea, Free</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
                lineHeight: 1.2,
              }}
            >
              Get a Free SWOT Report
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#5A5A5A",
                marginTop: "0.75rem",
                lineHeight: 1.7,
              }}
            >
              Answer 6 questions about your startup. We&apos;ll send a personalised sample SWOT report to your inbox instantly.
            </p>
          </div>
          <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <StartupQuiz />
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <ServicePageEyebrow>FAQ</ServicePageEyebrow>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "1rem",
              }}
            >
              Common Questions
            </h2>
          </div>
          <Accordion items={faq} />
        </div>
      </section>

      <section style={{ background: "#FFFFFF", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Pricing</ServicePageEyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#3d4246", marginTop: "1rem" }}>
              Simple, Transparent Pricing
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "52rem", margin: "0 auto" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {(p.badge || p.highlight) && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>{p.badge || "Featured"}</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246" }}>{p.price}</span>
                  {p.period && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.65)" : "#787878" }}> {p.period}</span>}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {p.features.map(f => <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.85)" : "#5A5A5A" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.highlight ? "#FFFFFF" : "#66BB3F", flexShrink: 0 }} />{f}</li>)}
                </ul>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "0.625rem 1rem", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: p.highlight ? "#FFFFFF" : "#66BB3F", color: p.highlight ? "#66BB3F" : "#FFFFFF" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyBanner />

      <section
        style={{
          background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)",
          paddingBlock: "clamp(4rem, 8vw, 5.5rem)",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            {bottomCta.title}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.72)",
              maxWidth: "28rem",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
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
