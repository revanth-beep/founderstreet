"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Founder, AgriConnect",
    sector: "B2B AgriTech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "Founderstreet handled everything from our Pvt Ltd incorporation to building our MVP in just 6 weeks. We closed our pre-seed round of ₹1.2Cr within 4 months of launch.",
    result: "₹1.2Cr Pre-Seed",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Co-founder, NourishKart",
    sector: "D2C Nutrition",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=100&h=100&fit=crop&crop=face",
    quote: "The Virtual CFO service was a game-changer. Our burn rate clarity and unit economics model convinced investors we had a tight grip on our business.",
    result: "₹75L Angel Round",
    rating: 5,
  },
  {
    name: "Arjun Kapoor",
    role: "Founder, ZippyLogistics",
    sector: "Last-Mile Delivery",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    quote: "Our Shopify store went from 0 to ₹40L monthly GMV in 3 months. The marketing team's ROAS on Meta Ads alone was 4.2x. Worth every paisa.",
    result: "₹40L MRR in 90 days",
    rating: 5,
  },
  {
    name: "Kavya Reddy",
    role: "Founder, LearnIQ",
    sector: "EdTech SaaS",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "The pitch deck they built was the sharpest 12 slides I've ever seen. Every VC we presented to mentioned it. We ended up oversubscribed.",
    result: "₹3Cr Seed (Oversubscribed)",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[current];

  return (
    <section style={{ background: "#0d1f16" }} className="section-padding">
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="label-tag-dark" style={{ marginBottom: "1rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#74C69D", display: "inline-block" }} />
            Founder Stories
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 700, color: "#FFFFFF",
            marginTop: "0.75rem", lineHeight: 1.2
          }}>
            Results That Speak for Themselves
          </h2>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Main card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            backdropFilter: "blur(10px)",
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "1.5rem" }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>

            {/* Quote */}
            <blockquote style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.92)",
              marginBottom: "2rem",
            }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Footer row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(64,145,108,0.4)" }}
                />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#FFFFFF", fontSize: "0.9375rem" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.8125rem", marginTop: "0.125rem" }}>
                    {t.role} · {t.sector}
                  </p>
                </div>
              </div>

              {/* Result pill */}
              <div style={{
                background: "rgba(27,67,50,0.6)",
                border: "1px solid rgba(64,145,108,0.3)",
                borderRadius: "8px",
                padding: "0.75rem 1.25rem",
                textAlign: "center" as const
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#74C69D", marginBottom: "0.25rem" }}>Result</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: "#FFFFFF" }}>{t.result}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    height: "4px", borderRadius: "99px",
                    width: i === current ? "24px" : "8px",
                    background: i === current ? "#40916C" : "rgba(255,255,255,0.2)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ fn: prev, label: "Prev", Icon: ChevronLeft }, { fn: next, label: "Next", Icon: ChevronRight }].map(({ fn, label, Icon }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "rgba(255,255,255,0.5)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(64,145,108,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(64,145,108,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#74C69D";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
