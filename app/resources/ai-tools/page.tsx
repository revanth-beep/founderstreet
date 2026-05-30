import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools for Market Sizing & Validation | Founderstreet",
  description: "Curated directory of the best AI tools for startup idea validation, market sizing, SWOT analysis, and competitor research. Tested by Founderstreet with 150+ Indian founders.",
};

const tools = [
  { name: "WorthBuild", desc: "Free TAM/SAM/SOM calculator, idea scorer, and customer discovery tool.", bestFor: "Market Sizing", link: "https://worthbuild.io", recommended: true },
  { name: "IdeaProof", desc: "AI validates your idea across 50+ criteria with TAM/SAM/SOM, full SWOT, and an investor-style report.", bestFor: "Market Sizing + SWOT", link: "https://ideaproof.io", recommended: true },
  { name: "ValidatorAI", desc: "Conversational AI that stress-tests your idea with real-time competitor research and pushback.", bestFor: "USP + Risk Analysis", link: "https://validatorai.com", recommended: true },
  { name: "DimeADozen", desc: "Analyses competitor strategies, uncovers market gaps, and scales business ideas with AI.", bestFor: "Competitor Analysis", link: "https://dimeadozen.ai", recommended: false },
  { name: "Founderpal.ai", desc: "Quick 10-second idea feedback on audience, pain point, and differentiation.", bestFor: "Rapid Validation", link: "https://founderpal.ai", recommended: false },
  { name: "Inodash", desc: "Full report: target audience, competitors, revenue models, and GTM strategy from one prompt.", bestFor: "Full Business Plan", link: "https://inodash.com", recommended: false },
  { name: "Perplexity AI", desc: "Real-time AI research to validate market trends and competitor news instantly.", bestFor: "Market Research", link: "https://perplexity.ai", recommended: false },
  { name: "Glimpse", desc: "Google Trends on steroids. Shows rising search demand for your category before it peaks.", bestFor: "Trend Validation", link: "https://meetglimpse.com", recommended: false },
  { name: "Stratup.ai", desc: "Generates startup ideas with full SWOT, monetisation plans, and competitor mapping.", bestFor: "Idea Generation + SWOT", link: "https://stratup.ai", recommended: false },
  { name: "ValidateMySaaS", desc: "Deep competitor intelligence with real review data and SEO gap analysis.", bestFor: "Competitor Positioning", link: "https://validatemysaas.com", recommended: false },
  { name: "GrowthGrid", desc: "Specialist AI for live SWOT, blue ocean gap analysis, and 72-section business plans.", bestFor: "SWOT + Business Plan", link: "https://growth-grid.ai", recommended: false },
  { name: "Similarweb", desc: "Tracks competitor web traffic, audience demographics, and channel performance.", bestFor: "Competitor Traffic Intel", link: "https://similarweb.com", recommended: false },
];

const h2 = { fontFamily: "'Playfair Display', Georgia, serif" as const, fontWeight: 700 as const, color: "#3d4246", lineHeight: 1.2 as const };

export default function AIToolsPage() {
  const recommended = tools.filter(t => t.recommended);
  const rest = tools.filter(t => !t.recommended);

  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Market Sizing &amp; Validation
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "640px" }}>
            AI Tools for Idea Validation
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "2rem" }}>
            12 tools we&apos;ve tested with Indian founders. Ranked by how useful they actually are for pre-seed validation.
          </p>
          <Link href="/startup-health-check" className="btn-primary">
            Start with Our Free SWOT Tool
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Star size={16} color="#66BB3F" fill="#66BB3F" />
              <h2 style={{ ...h2, fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>Founderstreet Recommended</h2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A" }}>Tools we actively use with our portfolio companies at Founderstreet.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
            {recommended.map(tool => (
              <a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer" className="ait-card-rec" style={{ display: "block", background: "#FFFFFF", border: "1px solid #CEEAB8", borderRadius: "10px", padding: "1.5rem", textDecoration: "none", transition: "box-shadow 0.2s ease" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "#56AD32", background: "#E9F6E4", padding: "0.15rem 0.5rem", borderRadius: "4px", marginBottom: "0.375rem", display: "inline-block" }}>Recommended</span>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#3d4246" }}>{tool.name}</h3>
                  </div>
                  <ExternalLink size={14} color="#A0A0A0" style={{ flexShrink: 0, marginTop: "4px" }} />
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "0.75rem" }}>{tool.desc}</p>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#66BB3F", background: "#E9F6E4", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>Best for: {tool.bestFor}</span>
              </a>
            ))}
          </div>

          <h2 style={{ ...h2, fontSize: "clamp(1.25rem, 2vw, 1.5rem)", marginBottom: "1.5rem" }}>All Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
            {rest.map(tool => (
              <a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer" className="ait-card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.25rem", textDecoration: "none", transition: "border-color 0.2s ease" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#3d4246" }}>{tool.name}</h3>
                  <ExternalLink size={13} color="#A0A0A0" />
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", lineHeight: 1.6 }}>{tool.desc}</p>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#787878" }}>Best for: {tool.bestFor}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`.ait-card-rec:hover { box-shadow: 0 4px 20px rgba(102,187,63,0.15); } .ait-card:hover { border-color: #66BB3F !important; }`}</style>
      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Want us to run the validation for you?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Our team does the full market sizing, SWOT, and unit economics in 14 working days.
          </p>
          <Link href="/services/validation" className="btn-white">
            See Our Validation Service
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
