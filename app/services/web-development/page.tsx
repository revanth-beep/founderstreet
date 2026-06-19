import type { Metadata } from "next";
import Link from "next/link";
import { Code2, ArrowRight, ShoppingCart, Globe, Palette, Smartphone } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.servicePages.webDevelopment.meta;
  return { title: m.title, description: m.description };
}

const services = [
  { icon: ShoppingCart, number: "01", title: "E-Commerce & Shopify Builds", desc: "Conversion-optimised storefronts built on Shopify, WooCommerce, or custom stacks. Mobile-first, fast, and built to sell.", features: ["Custom Shopify theme development", "One-click checkout optimisation", "Product page CRO", "Payment gateway integration", "Inventory & ERP sync", "Mobile-first design"] },
  { icon: Globe, number: "02", title: "Custom Web Apps & Platforms", desc: "Bespoke technology stacks for SaaS products, marketplace platforms, and complex business applications.", features: ["SaaS product development", "B2B marketplace platforms", "API development & integration", "Admin dashboards & analytics", "Scalable cloud architecture", "Auth & subscription systems"] },
  { icon: Palette, number: "03", title: "UI/UX Design", desc: "Wireframing, prototyping, and high-fidelity design systems. Every interface we design has a measurable conversion objective.", features: ["User journey mapping", "Wireframes & prototypes", "Design system & component library", "Figma-to-code handoff", "A/B test design variants", "Accessibility compliance"] },
  { icon: Smartphone, number: "04", title: "Mobile App Development", desc: "React Native and Flutter apps that feel native on iOS and Android. From consumer apps to B2B tools.", features: ["Cross-platform (iOS & Android)", "Offline-first architecture", "Push notifications", "In-app purchases", "App Store optimisation", "Analytics integration"] },
];

const techStack = ["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Shopify", "Tailwind CSS", "AWS", "Vercel", "Figma", "Flutter", "React Native", "GraphQL", "Stripe"];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

export default async function WebDevPage() {
  const site = await getSiteContent();
  const cms = site.servicePages.webDevelopment;
  const { hero, faq, pricing, bottomCta } = cms;

  return (
    <>
      <ServiceHero
        label={hero.label}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        icon={Code2}
        stats={hero.stats}
      />

      <section style={{ background: "#F0F0ED", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 2.5rem" }}>
            <ServicePageEyebrow>The Founderstreet Difference</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Before & After</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Drag the slider to see how we transform underperforming websites into high-converting digital assets.
            </p>
          </div>
          <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=700&fit=crop"
              afterSrc="https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=700&fit=crop"
              beforeLabel="Before Founderstreet"
              afterLabel="After Founderstreet"
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", textAlign: "center", marginTop: "0.75rem" }}>
              Actual client project. D2C nutrition brand. Conversion rate improved from 1.2% to 4.8%.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Our Services</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>What We Build</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "clamp(1.25rem, 3vw, 2rem)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div>
                      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.25rem", fontWeight: 700, color: "#F0F0ED", lineHeight: 1, display: "block", marginBottom: "0.5rem" }}>{service.number}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={18} color="#66BB3F" />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.0625rem", color: "#3d4246" }}>{service.title}</h3>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "1rem" }}>{service.desc}</p>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", borderBottom: "1px solid #E0E0DC", paddingBlock: "3.5rem" }}>
        <div className="container-custom">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A0A0A0", textAlign: "center", marginBottom: "2rem" }}>Technologies We Build With</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {techStack.map((tech) => (
              <span key={tech} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#3D3D3D", padding: "0.5rem 1rem", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "4px" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto 3rem" }}>
            <ServicePageEyebrow>Pricing</ServicePageEyebrow>
            <h2 style={{ ...h2, marginTop: "1rem" }}>Simple Project Pricing</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", marginTop: "0.75rem", lineHeight: 1.7 }}>Starting at <strong>&#8377;10,999</strong>. Custom quotes for complex projects.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "56rem", margin: "0 auto" }}>
            {pricing.map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {(p.badge || p.highlight) && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>{p.badge || "Featured"}</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246" }}>{p.price}</span>
                  {p.period && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.65)" : "#787878" }}> {p.period}</span>}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{p.desc}</p>
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
