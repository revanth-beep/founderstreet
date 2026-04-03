import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, ArrowRight, Monitor, MapPin, Store } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";

export const metadata: Metadata = {
  title: "Marketing & Retail Expansion",
  description:
    "Full-funnel growth engineering. SEO, Google Ads, Meta Ads, OOH billboards, retail distribution. Digital and offline marketing for Indian startups.",
};

const services = [
  {
    category: "Digital & Performance",
    icon: Monitor,
    items: [
      { title: "SEO & Content Marketing", desc: "Dominate organic search for your category. We build topical authority through long-form content, technical SEO, and link building — compounding traffic over time.", metrics: ["3–6 month to page 1", "Evergreen traffic asset"] },
      { title: "Google Ads (Search & Display)", desc: "High-intent leads at the exact moment of need. We manage campaigns with surgical precision — Quality Score optimisation, negative keyword management, and bid strategies.", metrics: ["Target ROAS: 3–5x", "Cost per lead optimisation"] },
      { title: "Meta Ads (Facebook & Instagram)", desc: "Full-funnel social campaigns from cold audience prospecting to warm retargeting. Creative strategy, A/B testing, and dynamic product ads for e-commerce brands.", metrics: ["Creative-led strategy", "Full-funnel attribution"] },
    ],
  },
  {
    category: "Offline OOH & BTL",
    icon: MapPin,
    items: [
      { title: "Billboard & Outdoor Advertising", desc: "Prime billboard locations in Tier-1 and Tier-2 cities. We have direct partnerships with Times OOH, Laqshya Media, and Metro Ads for competitive rates.", metrics: ["Pan-India network", "Geo-targeted placement"] },
      { title: "Mall Kiosks & Pop-Up Activations", desc: "High-footfall retail experiences at Phoenix Malls, Select Citywalk, and Inorbit. From kiosk design to staffing and sales training.", metrics: ["10+ premium malls", "D2C brand launches"] },
      { title: "BTL & Sampling Campaigns", desc: "Product sampling, roadshows, and brand activation events that put your product directly in consumers' hands for direct feedback and conversion.", metrics: ["Measurable footfall", "CRM data capture"] },
    ],
  },
  {
    category: "Retail Distribution",
    icon: Store,
    items: [
      { title: "Super-Stockist Network", desc: "Connect directly with our vetted network of regional distributors and super-stockists across 15+ states. From general trade to modern trade.", metrics: ["15+ states covered", "Vetted distributor network"] },
      { title: "Modern Trade & E-Commerce Marketplaces", desc: "End-to-end listing management on Amazon, Flipkart, Blinkit, Zepto, and Swiggy Instamart. Plus modern trade tie-ups with Big Bazaar and DMart.", metrics: ["Top marketplace coverage", "Listing optimisation"] },
    ],
  },
];

const results = [
  { metric: "₹40L MRR", context: "in 90 days", detail: "D2C nutrition brand via Meta Ads + retail distribution" },
  { metric: "4.8x ROAS", context: "on Google Ads", detail: "B2B SaaS using branded search + competitor conquesting" },
  { metric: "3 states", context: "in 45 days", detail: "FMCG launch via super-stockist network expansion" },
];

const faqs = [
  { question: "What kind of ROAS can we expect from Meta/Google Ads?", answer: "For D2C brands, we typically target a blended ROAS of 3–5x within the first 60–90 days. Performance varies by category, price point, and creative quality. We set realistic benchmarks in a discovery call before committing to targets." },
  { question: "Do you handle the creative/ad design as well?", answer: "Yes. Our performance marketing retainer includes ad creative production — static images, short-form video (reels), and carousel ads. We A/B test creatives continuously and only scale winning formats." },
  { question: "What's the minimum OOH advertising budget?", answer: "For a single billboard in a Tier-1 city (prime location), expect ₹1.5–4L per month. We recommend a minimum 3-month campaign for brand recall. We can help with a ₹5–10L activation budget across multiple formats." },
  { question: "How long does it take to set up retail distribution?", answer: "Initial distributor conversations begin in Week 1. First purchase orders typically come in by Week 4–6. We manage the relationship, credit terms negotiation, and supply chain coordination throughout." },
  { question: "Do you work with early-stage startups with limited budgets?", answer: "Yes. We have a lean-start option for D2C brands at ₹25,000/month for digital-only (SEO + 1 paid channel). We grow the scope as your revenue scales. Our model is outcome-aligned — we grow when you grow." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.25rem, 2vw, 1.375rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
};

export default function MarketingPage() {
  return (
    <>
      <ServiceHero
        label="Marketing & Retail Expansion"
        title="Full-Funnel Growth,"
        titleHighlight="Online and Offline."
        subtitle="We engineer demand across every customer touchpoint — from Google search to highway billboards to retail shelf space. Integrated digital performance and high-impact offline activations."
        ctaText="Plan My Growth"
        icon={Megaphone}
        stats={[
          { value: "4.2x", label: "Average blended ROAS" },
          { value: "15+", label: "States in distributor network" },
          { value: "50+", label: "D2C brands scaled" },
        ]}
      />

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ marginBottom: "2.5rem" }}>
            <ServicePageEyebrow>Growth capabilities</ServicePageEyebrow>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9375rem",
                color: "#5A5A5A",
                maxWidth: "36rem",
                marginTop: "1rem",
                lineHeight: 1.7,
              }}
            >
              Digital performance, offline activations, and retail distribution — orchestrated as one growth system.
            </p>
          </div>
          {services.map((category, idx) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.category} style={{ marginBottom: idx < services.length - 1 ? "3.5rem" : 0 }}>
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

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom" style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#3d4246" }}>Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Ready to engineer your growth?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a free growth audit. We&apos;ll map out your acquisition channels and give you a 90-day action plan.
          </p>
          <Link href="/contact" className="btn-white">
            Get My Growth Audit
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
