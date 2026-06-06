"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import NewsletterForm from "@/components/sections/NewsletterForm";
import type { SiteContent } from "@/lib/site-content-defaults";

const services = [
  { name: "Test Your Idea", href: "/services/validation" },
  { name: "Incorporation & Compliance", href: "/services/incorporation" },
  { name: "Accounting & Taxation", href: "/services/accounting" },
  { name: "Marketing & Retail", href: "/services/marketing" },
  { name: "Web Development", href: "/services/web-development" },
  { name: "Pitch Decks & Valuation", href: "/services/funding" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Team", href: "/team" },
  { name: "Resources", href: "/resources" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Locations", href: "/locations" },
  { name: "Test Your Idea", href: "/startup-health-check" },
  { name: "Contact Us", href: "/contact" },
];

const tools = [
  { name: "Founder's AI Stack", href: "/resources/ai-stack" },
  { name: "AI Validation Tools", href: "/resources/ai-tools" },
  { name: "Startup Templates", href: "/templates" },
];

const colHead: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.6875rem", fontWeight: 700,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "1.25rem"
};

const colLink: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem", color: "rgba(255,255,255,0.5)",
  textDecoration: "none", marginBottom: "0.625rem",
  transition: "color 0.2s ease"
};

export default function Footer({ cms }: { cms: SiteContent["footer"] }) {
  const year = new Date().getFullYear();
  const copyright = cms.copyrightTemplate.replace("{year}", String(year));

  return (
    <footer style={{ background: "#4A5056", color: "#FFFFFF" }}>
      <div className="container-custom" style={{ paddingTop: "4.5rem", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem 2rem" }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "0.5rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cms.logoUrl || "/logos/logo-icon-color.png"}
                alt="Founderstreet"
                style={{ height: "44px", width: "auto", flexShrink: 0 }}
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.125rem", color: "#FFFFFF" }}>
                  {cms.brandName}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.01em" }}>
                  {cms.subsidiaryText}
                </span>
              </div>
            </Link>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem", maxWidth: "240px" }}>
              {cms.description}
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { href: cms.socialLinks?.linkedin || "https://linkedin.com", Icon: LinkedInIcon, label: "LinkedIn" },
                { href: cms.socialLinks?.twitter || "https://twitter.com", Icon: XIcon, label: "X" },
                { href: cms.socialLinks?.instagram || "https://instagram.com", Icon: InstagramIcon, label: "Instagram" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px", height: "36px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(102,187,63,0.6)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,201,90,0.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={colHead}>Core Services</p>
            {services.map(s => (
              <Link key={s.href} href={s.href} style={colLink}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                <ArrowRight size={12} style={{ opacity: 0.4 }} />
                {s.name}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={colHead}>Company</p>
            {company.map(c => (
              <Link key={c.href} href={c.href} style={colLink}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                <ArrowRight size={12} style={{ opacity: 0.4 }} />
                {c.name}
              </Link>
            ))}
          </div>

          {/* Tools & Resources */}
          <div>
            <p style={colHead}>Tools &amp; Resources</p>
            {tools.map(t => (
              <Link key={t.href} href={t.href} style={colLink}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                <ArrowRight size={12} style={{ opacity: 0.4 }} />
                {t.name}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.125rem", fontWeight: 700,
              color: "#FFFFFF", marginBottom: "0.625rem"
            }}>
              {cms.newsletterTitle}
            </h4>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
              {cms.newsletterSubtitle}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2.5rem 0 1.5rem" }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.2)" }}>
            {copyright}
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Admin", href: "/admin" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)", textDecoration: "none",
                transition: "color 0.2s ease"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"; }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.25fr !important; } }
      `}</style>
    </footer>
  );
}
