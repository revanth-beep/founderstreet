"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { HeroCms } from "@/lib/site-content-defaults";

export default function HeroSection({ hero }: { hero: HeroCms }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const el = wrapRef.current;
      if (!el) return;
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(el.querySelector(".hero-eyebrow"),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .fromTo(el.querySelector(".hero-h1"),
          { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.45")
        .fromTo(el.querySelector(".hero-sub"),
          { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(el.querySelector(".hero-ctas"),
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(el.querySelector(".hero-stats"),
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    };
    init();
  }, []);

  return (
    <section
      style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 40%, #3d5240 100%)" }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "45vw", height: "45vw",
          top: "-10%", left: "-8%",
          background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(40px)"
        }} />
        <div style={{
          position: "absolute", width: "35vw", height: "35vw",
          bottom: "-5%", right: "-5%",
          background: "radial-gradient(circle, rgba(123,201,90,0.25) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(50px)"
        }} />
        {/* Dot grid */}
        <div className="dot-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        {/* Subtle border at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.4), transparent)"
        }} />
      </div>

      {/* Floating decoration */}
      <div style={{
        position: "absolute", top: "30%", right: "8%",
        width: "180px", height: "180px",
        border: "1px solid rgba(123,201,90,0.15)",
        borderRadius: "50%", animation: "float 7s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", top: "28%", right: "9.5%",
        width: "90px", height: "90px",
        border: "1px solid rgba(123,201,90,0.25)",
        borderRadius: "50%"
      }} />

      {/* Main content */}
      <div ref={wrapRef} className="container-custom relative z-10" style={{ paddingTop: "9rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "820px" }}>

          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{ marginBottom: "1.75rem", opacity: 0 }}>
            <span className="label-tag-dark">
              {hero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-h1"
            style={{
              opacity: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              marginBottom: "1.75rem",
            }}
          >
            {hero.titleBefore.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}{" "}
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #9FE670 0%, #CEEAB8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {hero.titleAccent}
            </span>{" "}
            {hero.titleAfter}
          </h1>

          {/* Subheadline */}
          <p
            className="hero-sub"
            style={{
              opacity: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1875rem)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              maxWidth: "600px",
              marginBottom: "2.5rem",
            }}
          >
            {hero.subtitle}{" "}
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
              {hero.subtitleEmphasis}
            </span>
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "4rem", opacity: 0 }}>
            <Link href={hero.ctaPrimaryHref} className="btn-primary" style={{ fontSize: "0.9375rem", padding: "0.9375rem 2rem" }}>
              {hero.ctaPrimaryLabel}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={hero.ctaSecondaryHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "0.9375rem 1.75rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9375rem", fontWeight: 600,
                borderRadius: "4px",
                textDecoration: "none",
                transition: "all 0.25s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
            >
              <span style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Play size={12} fill="white" color="white" />
              </span>
              {hero.ctaSecondaryLabel}
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{ opacity: 0 }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6875rem", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "1.25rem"
            }}>
              {hero.statsLabel}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem 2.5rem" }} className="sm-stats-grid">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    marginBottom: "0.25rem"
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(148,213,178,0.8)",
                    fontWeight: 500
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem"
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.625rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)"
        }}>
          Scroll
        </span>
        <div style={{
          width: "1px", height: "40px",
          background: "linear-gradient(to bottom, rgba(123,201,90,0.6), transparent)"
        }} />
      </div>

          </section>
  );
}
