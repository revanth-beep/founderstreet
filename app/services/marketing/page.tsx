import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, ArrowRight, Monitor, MapPin, Store } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.marketing.meta;
  return { title: m.title, description: m.description };
}

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Monitor, MapPin, Store, Megaphone,
};

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.25rem, 2vw, 1.375rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
};

export default async function MarketingPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.marketing;
  const { hero, faq, pricing, bottomCta, serviceCategories, results, aiStudio } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={Megaphone}
        stats={hero.stats}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ marginBottom: "2.5rem" }}>
            <ServicePageEyebrow>Growth capabilities</ServicePageEyebrow>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", maxWidth: "36rem", marginTop: "1rem", lineHeight: 1.7 }}>
              Digital performance, offline activations, and retail distribution orchestrated as one growth system.
            </p>
          </div>
          {serviceCategories.map((category, idx) => {
            const CategoryIcon = CATEGORY_ICON_MAP[category.iconName] ?? Monitor;
            return (
              <div key={category.category} style={{ marginBottom: idx < serviceCategories.length - 1 ? "3.5rem" : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CategoryIcon size={16} color="#66BB3F" />
                  </div>
                  <h2 style={h2}>{category.category}</h2>
                  <div style={{ flex: "1 1 120px", height: "1px", background: "#E0E0DC", minWidth: "40px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
                  {category.items.map((item) => (
                    <div key={item.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.25rem" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.0625rem", color: "#3d4246", marginBottom: "0.5rem" }}>{item.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{item.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {item.metrics.map((m) => (
                          <span key={m} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#66BB3F", background: "#E9F6E4", padding: "0.25rem 0.625rem", borderRadius: "999px" }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>AI Creative Studio</ServicePageEyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#3d4246", marginTop: "1rem", lineHeight: 1.2 }}>
              Scale Your Brand Without an In-House Design Team
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              We generate high-converting social posts, ad creatives, and bulk branded content at a fraction of the cost. Powered by AI. Reviewed by our team.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.25rem" }}>
            {aiStudio.map(card => (
              <div key={card.n} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#F0F0ED" }}>{card.n}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.25rem" }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginBottom: "0.75rem" }}>{card.sub}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{card.note}</p>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#66BB3F" }}>
                  Powered by {card.tool}
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/contact" className="btn-primary">
              Request a Sample Creative
              <ArrowRight size={15} />
            </Link>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginTop: "0.75rem" }}>We generate a test render and email it to you within 24 hours.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "#4A5056", paddingBlock: "clamp(4rem, 8vw, 6rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(102,187,63,0.35) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem" }}>
            {results.map((result) => (
              <div key={result.metric} style={{ background: "rgba(17,17,17,0.72)", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1.5rem", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.25rem" }}>{result.metric}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#9FE670", marginBottom: "0.75rem" }}>{result.context}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", lineHeight: 1.65 }}>{result.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Packages</ServicePageEyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#3d4246", lineHeight: 1.2, marginTop: "1rem" }}>
              Simple, Outcome-Aligned Packages
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "56rem", margin: "0 auto" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {(p.badge || p.highlight) && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>{p.badge || "Featured"}</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.125rem", marginBottom: "0.625rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246" }}>{p.price}</span>
                  {p.period && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.65)" : "#787878" }}>{p.period}</span>}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.85)" : "#5A5A5A" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.highlight ? "#FFFFFF" : "#66BB3F", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "0.625rem 1rem", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", background: p.highlight ? "#FFFFFF" : "#66BB3F", color: p.highlight ? "#66BB3F" : "#FFFFFF" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#3d4246" }}>Frequently Asked Questions</h2>
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
