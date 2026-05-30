"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function StyleworkPerks() {
  return (
    <div style={{ background: "#FFFFFF", paddingInline: "clamp(1rem, 5vw, 2rem)", paddingBottom: "clamp(2rem, 4vw, 3rem)" }}>
      <div className="container-custom">
        <div style={{
          background: "#3d4246",
          borderRadius: "12px",
          padding: "clamp(1.25rem, 3vw, 2rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1.5rem",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: "1 1 320px" }}>
            <div style={{
              width: "44px", height: "44px", flexShrink: 0,
              background: "rgba(102,187,63,0.15)",
              border: "1px solid rgba(102,187,63,0.25)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MapPin size={18} color="#9FE670" />
            </div>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#9FE670", marginBottom: "0.375rem",
              }}>
                Exclusive Ecosystem Perk
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", fontWeight: 700,
                color: "#FFFFFF", marginBottom: "0.5rem", lineHeight: 1.3,
              }}>
                Priority co-working access for Founderstreet portfolio companies
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65, maxWidth: "540px",
              }}>
                Because Founderstreet operates as your infrastructure layer, portfolio companies receive priority onboarding and discounted desk and cabin rates at{" "}
                <a href="https://www.stylework.city/" target="_blank" rel="noopener noreferrer" style={{ color: "#9FE670", textDecoration: "underline" }}>
                  Stylework
                </a>{" "}
                co-working locations across India.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.75rem 1.375rem",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "6px",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              whiteSpace: "nowrap" as const,
              transition: "background 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
          >
            Explore Ecosystem Perks
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
