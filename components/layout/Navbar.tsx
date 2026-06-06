"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, FlaskConical, Building2, Calculator, Megaphone, Code2, TrendingUp, Phone, MessageCircle } from "lucide-react";
import type { SiteContent } from "@/lib/site-content-defaults";

const services = [
  { name: "Test Your Idea", href: "/services/validation", icon: FlaskConical, desc: "Market sizing, SWOT & unit economics" },
  { name: "Incorporation & Compliance", href: "/services/incorporation", icon: Building2, desc: "End-to-end company registration" },
  { name: "Accounting & Virtual CFO", href: "/services/accounting", icon: Calculator, desc: "Financial plumbing for founders" },
  { name: "Marketing & Retail", href: "/services/marketing", icon: Megaphone, desc: "Full-funnel digital and offline growth" },
  { name: "Web & Tech Development", href: "/services/web-development", icon: Code2, desc: "Scalable storefronts and platforms" },
  { name: "Investor Funding", href: "/services/funding", icon: TrendingUp, desc: "Pitch decks, projections & matchmaking" },
];

type NavbarContentProps = {
  solid: boolean;
  nav: SiteContent["nav"];
};

function NavbarContent({ solid, nav }: NavbarContentProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: solid ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "1px solid #E0E0DC" : "none",
        boxShadow: solid ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={nav.logoUrl || "/logos/logo-icon-color.png"}
              alt="Founderstreet"
              style={{
                height: "44px",
                width: "auto",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontSize: "1.1875rem",
                color: solid ? "#3d4246" : "#FFFFFF",
                letterSpacing: "-0.01em",
                transition: "color 0.3s ease"
              }}>
                {nav.brandName}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400, fontSize: "0.6rem",
                color: solid ? "#909090" : "rgba(255,255,255,0.55)",
                letterSpacing: "0.01em",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}>
                {nav.subsidiaryText}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "none", alignItems: "center", gap: "2px" }} className="desktop-nav">
            {/* Services dropdown */}
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                onClick={() => setServicesOpen(o => !o)}
                style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "8px 14px",
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem",
                  color: solid ? "#3D3D3D" : "rgba(255,255,255,0.85)",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = solid ? "#F0F0ED" : "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                Services
                <ChevronDown size={14} style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
              </button>

              {servicesOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", left: "50%",
                  transform: "translateX(-50%)",
                  width: "500px",
                  background: "#FFFFFF",
                  border: "1px solid #E0E0DC",
                  borderRadius: "12px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                  padding: "1rem",
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px",
                }}>
                  {services.map(svc => {
                    const Icon = svc.icon;
                    return (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "12px",
                          padding: "12px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F7F7F5"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >
                        <div style={{
                          width: "34px", height: "34px",
                          background: "#E9F6E4", borderRadius: "7px",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                          <Icon size={16} color="#66BB3F" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "#3d4246", marginBottom: "2px" }}>
                            {svc.name}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#787878", lineHeight: 1.5 }}>
                            {svc.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  {/* Health check CTA */}
                  <div style={{ gridColumn: "span 2", paddingTop: "0.5rem", borderTop: "1px solid #F0F0ED", marginTop: "0.25rem" }}>
                    <Link
                      href="/startup-health-check"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 14px",
                        background: "#E9F6E4",
                        borderRadius: "8px",
                        textDecoration: "none",
                        transition: "background 0.2s ease"
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#DEF3D4"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#E9F6E4"; }}
                    >
                      <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "#66BB3F" }}>{nav.healthPromoTitle}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#56AD32", marginTop: "2px" }}>{nav.healthPromoSubtitle}</p>
                      </div>
                      <ArrowRight size={15} color="#66BB3F" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {[
              { name: "About", href: "/about" },
              { name: "Team", href: "/team" },
              { name: "Resources", href: "/resources" },
              { name: "Contact", href: "/contact" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 14px",
                  fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem",
                  color: solid ? "#3D3D3D" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = solid ? "#F0F0ED" : "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = solid ? "#3d4246" : "#FFFFFF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = solid ? "#3D3D3D" : "rgba(255,255,255,0.85)";
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div style={{ display: "none", alignItems: "center", gap: "10px" }} className="desktop-cta">
            {/* Phone */}
            <a
              href={`tel:${nav.phone}`}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.8125rem",
                color: solid ? "#5A5A5A" : "rgba(255,255,255,0.7)",
                textDecoration: "none", padding: "8px 4px",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = solid ? "#66BB3F" : "#FFFFFF"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = solid ? "#5A5A5A" : "rgba(255,255,255,0.7)"; }}
            >
              <Phone size={13} />
              {nav.phone}
            </a>
            {/* WhatsApp */}
            <a
              href={nav.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "6px 12px",
                background: solid ? "#E9F6E4" : "rgba(102,187,63,0.15)",
                border: `1px solid ${solid ? "#CEEAB8" : "rgba(102,187,63,0.3)"}`,
                borderRadius: "6px",
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8125rem",
                color: solid ? "#56AD32" : "#9FE670",
                textDecoration: "none",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap" as const,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = solid ? "#DEF3D4" : "rgba(102,187,63,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = solid ? "#E9F6E4" : "rgba(102,187,63,0.15)"; }}
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.8125rem", padding: "0.6rem 1.25rem" }}>
              Pitch Your Idea
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "40px", height: "40px",
              background: "transparent", border: "none", cursor: "pointer",
              color: solid ? "#3d4246" : "#FFFFFF",
            }}
            className="mobile-burger"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(320px, 90vw)",
        background: "#FFFFFF",
        zIndex: 999,
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        overflowY: "auto",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.15)"
      }}>
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid #F0F0ED" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nav.logoUrl || "/logos/logo-icon-color.png"} alt="Founderstreet" style={{ height: "38px", width: "auto", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#3d4246", fontSize: "1rem" }}>{nav.brandName}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.55rem", color: "#909090", letterSpacing: "0.01em" }}>{nav.subsidiaryText}</span>
            </div>
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#787878" }}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav */}
        <div style={{ padding: "1rem 1.5rem" }}>
          <button
            onClick={() => setMobileServicesOpen(o => !o)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.75rem 0.5rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.9375rem",
              color: "#3d4246", background: "none", border: "none", cursor: "pointer",
              borderBottom: "1px solid #F0F0ED"
            }}
          >
            Services
            <ChevronDown size={16} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease" }} />
          </button>

          {mobileServicesOpen && (
            <div style={{ paddingLeft: "0.75rem", paddingTop: "0.5rem" }}>
              {services.map(svc => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.625rem 0.5rem", textDecoration: "none", borderRadius: "6px" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={15} color="#66BB3F" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3D3D3D" }}>{svc.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {[
            { name: "About", href: "/about" },
            { name: "Our Team", href: "/team" },
            { name: "Resources", href: "/resources" },
            { name: nav.healthPromoTitle, href: "/startup-health-check" },
            { name: "Contact", href: "/contact" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block", padding: "0.75rem 0.5rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.9375rem",
                color: "#3d4246", textDecoration: "none",
                borderBottom: "1px solid #F0F0ED"
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div style={{ paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a
              href={nav.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "0.75rem 1rem",
                background: "#E9F6E4", border: "1px solid #CEEAB8", borderRadius: "6px",
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9375rem",
                color: "#56AD32", textDecoration: "none",
              }}
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${nav.phone}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                padding: "0.625rem 1rem",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem",
                color: "#5A5A5A", textDecoration: "none",
              }}
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={14} />
              {nav.phone}
            </a>
            <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
              Pitch Your Idea <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default function Navbar({ cms }: { cms: SiteContent["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return <NavbarContent key={pathname} solid={solid} nav={cms} />;
}
