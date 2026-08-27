"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import type { CtaSectionCms } from "@/lib/site-content-defaults";

export default function CTASection({ cms }: { cms: CtaSectionCms }) {
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(15,28,20,0.95) 0%, rgba(15,28,20,0.78) 38%, rgba(15,28,20,0.28) 66%, rgba(15,28,20,0) 100%), url('/visuals/cta-handshake.png')",
        backgroundSize: "100% 100%, contain", backgroundRepeat: "no-repeat, no-repeat", backgroundPosition: "center, center right", backgroundColor: "#0f1c14",
        position: "relative", overflow: "hidden",
      }}
      className="section-padding"
    >
      {/* Background pattern */}
      <div className="dot-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-30%", right: "-10%",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(123,201,90,0.2) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-30%", left: "-10%",
        width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(102,187,63,0.4) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none"
      }} />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "left", maxWidth: "600px" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 800, lineHeight: 1.1,
            color: "#FFFFFF", marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)"
          }}>
            {cms.title}{" "}
            <span style={{ fontStyle: "italic", color: "#B5E890" }}>{cms.titleItalic}</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.0625rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.8)",
            maxWidth: "520px", marginBottom: "2.5rem"
          }}>
            {cms.subtitle}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "flex-start" }}>
            <Link href={cms.primaryHref} className="btn-white">
              <CalendarCheck size={16} />
              {cms.primaryLabel}
            </Link>
            <Link
              href={cms.secondaryHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem",
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem", fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
            >
              {cms.secondaryLabel}
              <ArrowRight size={15} />
            </Link>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.5)",
            marginTop: "1.5rem"
          }}>
            {cms.note}
          </p>
        </div>
      </div>
    </section>
  );
}
