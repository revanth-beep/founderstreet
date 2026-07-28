import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | FounderStreet",
  description: "Real results for Indian startups. See how FounderStreet helped founders launch, scale, and raise funding.",
};

const caseStudies = [
  {
    startup: "706 Pictures",
    industry: "Media & Entertainment",
    challenge: "A fast-growing film production company with no structured accounting system. GST filings were manual, TDS was inconsistent, and the team had no financial visibility.",
    services: ["Accounting & Virtual CFO", "GST & Tax Compliance", "Investor Reporting"],
    result: "Full-service accounting partnership. GST, TDS, and ITR compliance fully handled. Monthly financial reporting implemented. Zero penalties.",
    quote: "The team at FounderStreet has been incredibly professional and significantly helped us organise our accounting system.",
    quoteAuthor: "706 Pictures",
    metrics: [{ value: "₹0", label: "Penalties" }, { value: "100%", label: "Filing accuracy" }, { value: "48hrs", label: "Monthly close" }],
    color: "#3d4246",
  },
  {
    startup: "Early-Stage D2C Brand",
    industry: "Consumer Goods (D2C)",
    challenge: "Founder had a validated product idea but no legal entity, no accounting, and no digital presence. Needed to go from zero to operational in 30 days.",
    services: ["Company Incorporation", "GST Registration", "Shopify Store Build", "Meta Ads Launch"],
    result: "Pvt Ltd incorporated in 8 days. Shopify store live in 3 weeks. First Meta Ads campaign generated ₹2.4L in revenue within 45 days of launch.",
    quote: null,
    quoteAuthor: null,
    metrics: [{ value: "8 Days", label: "Incorporation" }, { value: "₹2.4L", label: "Month 1 revenue" }, { value: "3 Weeks", label: "Store live" }],
    color: "#66BB3F",
  },
  {
    startup: "B2B SaaS Startup",
    industry: "B2B Software",
    challenge: "Pre-seed founder with a working MVP and early traction but no pitch deck, no financial model, and no investor network.",
    services: ["Pitch Deck Creation", "Financial Projections", "Investor Matchmaking"],
    result: "12-slide pitch deck completed in 2 weeks. 5-year financial model built. Warm introductions to 6 investors, 3 meetings secured, term sheet in discussion.",
    quote: null,
    quoteAuthor: null,
    metrics: [{ value: "6", label: "Investor intros" }, { value: "3", label: "Meetings secured" }, { value: "2 Weeks", label: "Deck turnaround" }],
    color: "#4A5056",
  },
  {
    startup: "White Stone Legal",
    industry: "Legal Services",
    challenge: "Legal firms operate under strict Bar Council guidelines that prohibit promotional or superlative marketing language. Building a website that was compelling and conversion-focused without crossing regulatory lines required a completely different content approach. Standard marketing copy was off the table.",
    services: ["Web Development", "SEO"],
    result: "Professional legal website designed, built, and launched in 1 week. Content was carefully crafted to be informative and trust-building while staying fully compliant with legal advertising standards. SEO foundations laid with practice-area pages, structured schema markup, and local search optimisation targeting Delhi NCR.",
    quote: null,
    quoteAuthor: null,
    metrics: [{ value: "1 Week", label: "Website live" }, { value: "100%", label: "Compliance maintained" }, { value: "On-going", label: "SEO partnership" }],
    color: "#1B4332",
  },
  {
    startup: "Novelty Homes",
    industry: "Interior Decor & Real Estate",
    challenge: "Novelty Homes operates a 20,000 sq ft showroom in Delhi and was generating leads through word of mouth alone. Their paid acquisition was unstructured, cost per lead was high, and the quality of inbound enquiries was inconsistent. They needed a full performance marketing setup and content that could showcase their showroom and portfolio at scale.",
    services: ["Meta Ads", "Google Ads", "Content Creation"],
    result: "End-to-end paid media strategy implemented across Meta and Google. Audience segmentation, creative testing, and funnel optimisation reduced cost per lead by 30%. Improved targeting and content quality lifted lead quality scores by 40%. Content creation for social channels gave the showroom a consistent visual identity online.",
    quote: null,
    quoteAuthor: null,
    metrics: [{ value: "30%", label: "Reduction in CAC" }, { value: "40%", label: "Better lead quality" }, { value: "20K sqft", label: "Showroom showcased" }],
    color: "#66BB3F",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Client Results
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "600px" }}>
            Real Founders. Real Results.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.75 }}>
            How FounderStreet helped Indian founders launch, scale, and raise.
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {caseStudies.map((cs, i) => (
              <div key={cs.startup} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ borderLeft: `4px solid ${cs.color}`, padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem", alignItems: "center", marginBottom: "1rem" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#3d4246" }}>{cs.startup}</h2>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#787878", background: "#F0F0ED", padding: "0.2rem 0.625rem", borderRadius: "4px" }}>{cs.industry}</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className={`cs-grid-${i}`}>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.5rem" }}>Challenge</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.7 }}>{cs.challenge}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.5rem" }}>Services Used</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {cs.services.map(s => <span key={s} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#66BB3F", background: "#E9F6E4", padding: "0.25rem 0.625rem", borderRadius: "4px" }}>{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.5rem" }}>Result</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.7 }}>{cs.result}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #F0F0ED" }}>
                    {cs.metrics.map(m => (
                      <div key={m.label}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#3d4246" }}>{m.value}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#787878" }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {cs.quote && (
                    <blockquote style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #F0F0ED" }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontStyle: "italic", color: "#3d4246", lineHeight: 1.7 }}>&ldquo;{cs.quote}&rdquo;</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#A0A0A0", marginTop: "0.5rem" }}>{cs.quoteAuthor}</p>
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
              </section>

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Ready to be our next case study?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a free discovery call and let us map out exactly how we can help your startup move faster.
          </p>
          <Link href="/contact" className="btn-white">
            Book a Free Call
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
