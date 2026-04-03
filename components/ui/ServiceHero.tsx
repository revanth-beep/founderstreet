import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceHeroProps {
  label: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  icon: LucideIcon;
  stats?: { value: string; label: string }[];
}

export default function ServiceHero({
  label,
  title,
  titleHighlight,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "/contact",
  icon: Icon,
  stats,
}: ServiceHeroProps) {
  return (
    <section style={{
      position: "relative",
      background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)",
      paddingTop: "8rem",
      paddingBottom: "5rem",
      overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "50vw", height: "50vw",
          top: "-10%", left: "-5%",
          background: "radial-gradient(circle, rgba(102,187,63,0.55) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", width: "30vw", height: "30vw",
          bottom: "-10%", right: "5%",
          background: "radial-gradient(circle, rgba(123,201,90,0.2) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(40px)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.5,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />
        {/* Bottom border */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)",
        }} />
      </div>

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "820px" }}>
          {/* Icon + label row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: "44px", height: "44px",
              background: "rgba(123,201,90,0.2)",
              border: "1px solid rgba(123,201,90,0.3)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Icon size={20} color="#9FE670" />
            </div>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6875rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase" as const,
              color: "#9FE670",
            }}>
              {label}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            marginBottom: "1.25rem",
          }}>
            {title}{" "}
            {titleHighlight && (
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #9FE670 0%, #CEEAB8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {titleHighlight}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            marginBottom: "2rem",
          }}>
            {subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href={ctaHref} className="btn-primary" style={{ fontSize: "0.9rem" }}>
              {ctaText}
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/startup-health-check"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.5rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem", fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.25s ease",
                backdropFilter: "blur(6px)",
              }}
            >
              Free Health Check →
            </Link>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    marginBottom: "0.25rem",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(148,213,178,0.8)",
                    fontWeight: 500,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
