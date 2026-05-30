import type { Metadata } from "next";
import Link from "next/link";
import { Code2, ArrowRight, ShoppingCart, Globe, Palette, Smartphone } from "lucide-react";
import ServiceHero from "@/components/ui/ServiceHero";
import Accordion from "@/components/ui/Accordion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ServicePageEyebrow from "@/components/services/ServicePageEyebrow";
import CaseStudyBanner from "@/components/ui/CaseStudyBanner";

export const metadata: Metadata = {
  title: "Web & Tech Development",
  description:
    "Shopify stores, custom web apps, SaaS platforms, and UI/UX design. Scalable digital storefronts built for high conversion.",
};

const services = [
  { icon: ShoppingCart, number: "01", title: "E-Commerce & Shopify Builds", desc: "Conversion-optimised storefronts built on Shopify, WooCommerce, or custom stacks. Average checkout conversion increase: 35%.", features: ["Custom Shopify theme development", "One-click checkout optimisation", "Product page CRO", "Payment gateway integration", "Inventory & ERP sync", "Mobile-first design"] },
  { icon: Globe, number: "02", title: "Custom Web Apps & Platforms", desc: "Bespoke technology stacks for SaaS products, marketplace platforms, and complex business applications.", features: ["SaaS product development", "B2B marketplace platforms", "API development & integration", "Admin dashboards & analytics", "Scalable cloud architecture", "Auth & subscription systems"] },
  { icon: Palette, number: "03", title: "UI/UX Design", desc: "Wireframing, prototyping, and high-fidelity design systems. Every interface we design has a measurable conversion objective.", features: ["User journey mapping", "Wireframes & prototypes", "Design system & component library", "Figma-to-code handoff", "A/B test design variants", "Accessibility compliance"] },
  { icon: Smartphone, number: "04", title: "Mobile App Development", desc: "React Native and Flutter apps that feel native on iOS and Android. From consumer apps to B2B tools.", features: ["Cross-platform (iOS & Android)", "Offline-first architecture", "Push notifications", "In-app purchases", "App Store optimisation", "Analytics integration"] },
];

const techStack = ["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Shopify", "Tailwind CSS", "AWS", "Vercel", "Figma", "Flutter", "React Native", "GraphQL", "Stripe"];

const faqs = [
  { question: "What technologies do you use?", answer: "Our frontend stack: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python (FastAPI), PostgreSQL, Redis. Cloud: AWS and Vercel for deployment. For e-commerce, we specialise in Shopify (plus custom themes) and WooCommerce." },
  { question: "How long does a typical e-commerce build take?", answer: "A standard Shopify build (custom theme, up to 5 collection pages, checkout customisation) takes 2–3 weeks. A fully custom e-commerce platform with advanced features takes 6–10 weeks. We work in 2-week sprints with demos at every stage." },
  { question: "Do you provide ongoing maintenance and support?", answer: "Yes. We offer monthly retainer packages for ongoing development, bug fixes, performance monitoring, and feature additions. Retainers start at ₹20,000/month for basic maintenance up to ₹80,000/month for dedicated development capacity." },
  { question: "Can you redesign our existing website?", answer: "Yes, and this is where we often see the biggest wins. We start with a conversion audit of your existing site, identify the biggest drop-off points, and redesign with a clear CRO strategy. Typical result: 30–60% improvement in lead generation." },
  { question: "Who owns the code after the project is complete?", answer: "You own 100% of the code, design assets, and intellectual property. We provide full source code handoff via GitHub. No lock-in, no licensing fees. You can take the code anywhere." },
];

const h2 = {
  fontFamily: "'Playfair Display', Georgia, serif" as const,
  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  fontWeight: 700 as const,
  color: "#3d4246",
  lineHeight: 1.2 as const,
};

export default function WebDevPage() {
  return (
    <>
      <ServiceHero
        label="Web & Tech Development"
        title="Scalable Digital Storefronts"
        titleHighlight="Built to Convert."
        subtitle="From Shopify builds to custom SaaS platforms, we engineer every digital experience with one obsession: conversion. Beautiful design meets technical rigour."
        ctaText="Start a Project"
        icon={Code2}
        stats={[
          { value: "35%", label: "Avg. checkout conversion increase" },
          { value: "< 2s", label: "Target page load time" },
          { value: "60+", label: "Products shipped" },
        ]}
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
            <h2 style={{ ...h2, marginTop: "1rem" }}>Transparent Project Pricing</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem", maxWidth: "56rem", margin: "0 auto" }}>
            {[
              { name: "Shopify Build", price: "₹24,999", period: "one-time", desc: "Custom Shopify theme, product pages, checkout, and payment gateway. Delivered in 2–3 weeks.", cta: "Start Shopify Project", highlight: false },
              { name: "Custom Web App", price: "₹74,999+", period: "one-time", desc: "Bespoke SaaS or platform. Full-stack, cloud-deployed, handed off via GitHub. 6–10 week sprints.", cta: "Scope My App", highlight: true },
              { name: "Monthly Retainer", price: "₹20,000", period: "/month", desc: "Ongoing development, bug fixes, performance monitoring, and feature additions.", cta: "Start Retainer", highlight: false },
            ].map(p => (
              <div key={p.name} style={{ background: p.highlight ? "#66BB3F" : "#FFFFFF", border: p.highlight ? "none" : "1px solid #E0E0DC", borderRadius: "10px", padding: "1.5rem", boxShadow: p.highlight ? "0 0 40px rgba(102,187,63,0.3)" : "none" }}>
                {p.highlight && <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(255,255,255,0.2)", color: "#FFFFFF", padding: "0.2rem 0.625rem", borderRadius: "999px", marginBottom: "0.75rem" }}>Most Common</span>}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.0625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246", marginBottom: "0.25rem" }}>{p.name}</h3>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.625rem", fontWeight: 700, color: p.highlight ? "#FFFFFF" : "#3d4246" }}>{p.price}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: p.highlight ? "rgba(255,255,255,0.65)" : "#787878" }}> {p.period}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: p.highlight ? "rgba(255,255,255,0.75)" : "#5A5A5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>{p.desc}</p>
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
          <Accordion items={faqs} />
        </div>
      </section>

      <CaseStudyBanner />

      <section style={{ background: "linear-gradient(135deg, #66BB3F 0%, #56AD32 100%)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>Let&apos;s build something exceptional.</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.72)", maxWidth: "28rem", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Share your brief and we&apos;ll come back with a scoped proposal within 48 hours.
          </p>
          <Link href="/contact" className="btn-white">
            Start a Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
