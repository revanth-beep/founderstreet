import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AIStackClient from "./AIStackClient";

export const metadata: Metadata = {
  title: "The Founder's AI Stack | Founderstreet",
  description: "30+ AI tools Founderstreet uses with its portfolio companies. Curated by category: automation, financial modeling, pitch decks, incorporation, investor matching, and marketing.",
};

const categories = [
  {
    id: "automation",
    label: "Workflow Automation",
    tools: [
      { name: "n8n", desc: "Self-hosted or cloud automation. The backend brain for Founderstreet's investor matching and lead flows.", bestFor: "Backend infrastructure", cost: "Free self-hosted / €20+/mo cloud", verdict: "Recommended" },
      { name: "Make.com", desc: "Visual drag-and-drop alternative to n8n. Easier for non-developers to build and maintain.", bestFor: "Backend infrastructure", cost: "Free 1,000 tasks/mo / $10.59+/mo", verdict: "Good" },
    ],
  },
  {
    id: "financial",
    label: "Financial Modeling",
    tools: [
      { name: "ProAI", desc: "Generates full financial model + pitch deck from one prompt. Outputs to Google Slides and Sheets.", bestFor: "Virtual CFO backend", cost: "Freemium", verdict: "Recommended" },
      { name: "Sturppy", desc: "Plain-English questions generate P&L, Balance Sheet, Cash Flow. Built for founders with no finance background.", bestFor: "Seed-stage clients", cost: "From $29/mo", verdict: "Recommended" },
      { name: "Causal", desc: "Plain-text formulas replace Excel. Interactive investor charts embeddable in startup profiles.", bestFor: "Series A+ clients", cost: "Free tier / $250+/mo", verdict: "Situational" },
      { name: "Lucid Financials", desc: "Dynamic forecasting, scenario planning, QuickBooks integration, and board-ready reports.", bestFor: "Virtual CFO tool", cost: "Freemium", verdict: "Good" },
      { name: "Setu (Pine Labs)", desc: "India's leading Account Aggregator API. Real bank data, UPI, BBPS, KYC, and lending data.", bestFor: "Verified financial inputs", cost: "Usage-based API", verdict: "Recommended" },
    ],
  },
  {
    id: "pitch",
    label: "Pitch Decks",
    tools: [
      { name: "Gamma.app", desc: "First-draft pitch deck in under 60 seconds from a prompt. 70M+ users globally.", bestFor: "Quick first drafts", cost: "Free / $8/mo", verdict: "Recommended" },
      { name: "Chronicle HQ", desc: "Interactive block-based deck builder. Indian-founded, Accel-backed. Notion-like UX.", bestFor: "Polished investor decks", cost: "Free / $15/mo Pro", verdict: "Recommended" },
      { name: "Slidebean", desc: "Investor-proven templates from Airbnb, Intercom, Buffer. Slide-level analytics.", bestFor: "Bespoke investor-grade decks", cost: "Freemium ($7/mo)", verdict: "Good" },
      { name: "Beautiful.ai", desc: "DesignerBot auto-formatting with brand consistency and Smart Slides.", bestFor: "Polished corporate decks", cost: "Freemium ($12/mo)", verdict: "Situational" },
    ],
  },
  {
    id: "incorporation",
    label: "Company Registration",
    tools: [
      { name: "Razorpay Rize", desc: "AI-assisted incorporation for Pvt Ltd, LLP, OPC. Handles MCA SPICe+ filing, PAN, TAN, GST, DPIIT.", bestFor: "Primary incorporation partner", cost: "From ₹7,999", verdict: "Recommended" },
      { name: "ClearTax (Clear)", desc: "AI-powered GST, ITR, TDS, and corporate tax compliance for 6M+ Indian businesses.", bestFor: "Tax compliance stack", cost: "Freemium", verdict: "Recommended" },
      { name: "Ebizfiling", desc: "AI-guided registration, GST filing, trademark, and annual returns. CA-backed.", bestFor: "Secondary incorporation", cost: "From ₹7,399", verdict: "Good" },
    ],
  },
  {
    id: "investors",
    label: "Investor Matching",
    tools: [
      { name: "LetsVenture (LVX)", desc: "India's largest early-stage platform. 14,000+ investors, 900+ portfolio companies.", bestFor: "Primary match source", cost: "Free to list", verdict: "Recommended" },
      { name: "AngelList India", desc: "Rolling funds and SAFE notes. Ranked #1 by deal count in 2024.", bestFor: "Pre-seed match source", cost: "Free to list", verdict: "Recommended" },
      { name: "Tracxn", desc: "Tracks 125,000+ investors across 49,000+ funding rounds. Used by Accel, Peak XV, Blume.", bestFor: "Series A+ data", cost: "Enterprise paid", verdict: "Situational" },
      { name: "Qubit Capital", desc: "Global investor matching. Secured $215M+ for 237+ startups. US, SEA, Middle East.", bestFor: "International investors", cost: "Success fee", verdict: "Good" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing Creatives",
    tools: [
      { name: "Predis.ai", desc: "India-founded. Generates image, video, caption, and hashtags from one text prompt.", bestFor: "Social content", cost: "Free / $29+/mo", verdict: "Recommended" },
      { name: "AdCreative.ai", desc: "High-converting ad creatives for LinkedIn, Google, Meta. Pre-scores for click-through rate.", bestFor: "Paid ad creatives", cost: "From $29/mo", verdict: "Recommended" },
      { name: "Robolly", desc: "Template-based bulk image and video API. Native n8n node. Outputs JPG, PNG, PDF, MP4.", bestFor: "Bulk branded content", cost: "~€15+/mo", verdict: "Good" },
      { name: "RenderForm", desc: "Dynamic image and PDF generation API. Pixel-perfect output in under 2 seconds.", bestFor: "Dynamic PDFs and reports", cost: "~€19+/mo", verdict: "Good" },
    ],
  },
];

export default function AIStackPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            The Founder&apos;s AI Stack
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "640px" }}>
            30+ Tools We Actually Use With Our Portfolio
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "0.5rem" }}>
            Curated from 150+ Indian startup founders. Every tool here is tested with real clients, organised by use case.
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <AIStackClient categories={categories} />
        </div>
      </section>

      <section style={{ background: "#3d4246", paddingBlock: "clamp(4rem, 8vw, 5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
            Want us to set these up for your startup?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a Tech Stack Consultation. We&apos;ll identify exactly which tools fit your stage and wire them up for you.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a Tech Stack Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
