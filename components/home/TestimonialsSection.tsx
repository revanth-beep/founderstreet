"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { FounderStoriesCms } from "@/lib/site-content-defaults";

function clampRating(n: number): number {
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
}

export default function TestimonialsSection({ data }: { data: FounderStoriesCms }) {
  const testimonials = (data.stories || []).filter((s) => String(s.quote || "").trim());
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => {
      const len = testimonials.length;
      if (len === 0) return 0;
      const idx = Math.min(c, len - 1);
      return (idx - 1 + len) % len;
    });
  const next = () =>
    setCurrent((c) => {
      const len = testimonials.length;
      if (len === 0) return 0;
      const idx = Math.min(c, len - 1);
      return (idx + 1) % len;
    });

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => {
      setCurrent((c) => {
        const len = testimonials.length;
        const idx = Math.min(c, len - 1);
        return (idx + 1) % len;
      });
    }, 6000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const activeIdx = Math.min(current, testimonials.length - 1);
  const t = testimonials[activeIdx];
  const rating = clampRating(t.rating);

  return (
    <section style={{ background: "#3d4246" }} className="section-padding">
      <div className="container-custom">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="label-tag-dark" style={{ marginBottom: "1rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9FE670", display: "inline-block" }} />
            {data.eyebrow}
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginTop: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            {data.title}
          </h2>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "clamp(2rem, 4vw, 3.5rem)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ display: "flex", gap: "4px", marginBottom: "1.5rem" }}>
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
              ))}
            </div>

            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                fontWeight: 500,
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.92)",
                marginBottom: "2rem",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  sizes="48px"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(123,201,90,0.4)",
                  }}
                />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#FFFFFF", fontSize: "0.9375rem" }}>
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.8125rem",
                      marginTop: "0.125rem",
                    }}
                  >
                    {t.role} · {t.sector}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(102,187,63,0.6)",
                  border: "1px solid rgba(123,201,90,0.3)",
                  borderRadius: "8px",
                  padding: "0.75rem 1.25rem",
                  textAlign: "center" as const,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "#9FE670",
                    marginBottom: "0.25rem",
                  }}
                >
                  Result
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: "#FFFFFF" }}>
                  {t.result}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  style={{
                    height: "4px",
                    borderRadius: "99px",
                    width: i === activeIdx ? "24px" : "8px",
                    background: i === activeIdx ? "#7BC95A" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { fn: prev, label: "Previous testimonial", Icon: ChevronLeft },
                { fn: next, label: "Next testimonial", Icon: ChevronRight },
              ].map(({ fn, label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  aria-label={label}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(123,201,90,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,201,90,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#9FE670";
                  }}
                  onMouseLeave={(e) => {
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
