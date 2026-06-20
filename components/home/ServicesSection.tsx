"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FlaskConical, Building2, Calculator, Megaphone, Code2, TrendingUp, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCardCms, ServicesHeaderCms } from "@/lib/site-content-defaults";

const ICONS: LucideIcon[] = [
  FlaskConical, Building2, Calculator, Megaphone, Code2, TrendingUp,
];

export default function ServicesSection({
  header,
  serviceCards,
}: {
  header: ServicesHeaderCms;
  serviceCards: ServiceCardCms[];
}) {
  const services = serviceCards.map((c, i) => ({
    ...c,
    icon: ICONS[i] ?? FlaskConical,
    accent: "#66BB3F",
  }));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const cards = sectionRef.current?.querySelectorAll(".svc-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true }
          }
        );
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding" style={{ background: "#FAFAFA" }}>
      <div className="container-custom">

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3.5rem" }}>
          <span className="label-tag" style={{ alignSelf: "flex-start" }}>
            {header.label}
          </span>
          <h2 className="heading-lg" style={{ maxWidth: "600px" }}>
            {header.title}{" "}
            <span className="gradient-text">{header.titleGradient}</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: "460px" }}>
            {header.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "1px",
          background: "#E0E0DC",
          border: "1px solid #E0E0DC",
          borderRadius: "12px",
          overflow: "hidden",
        }} className="svc-grid">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.href}
                href={svc.href}
                className="svc-card"
                style={{
                  display: "block",
                  background: "#FFFFFF",
                  padding: "2.25rem 2rem",
                  position: "relative",
                  textDecoration: "none",
                  transition: "background 0.35s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#4A5056";
                  const num = el.querySelector(".svc-num") as HTMLElement;
                  const tag = el.querySelector(".svc-tag") as HTMLElement;
                  const name = el.querySelector(".svc-name") as HTMLElement;
                  const desc = el.querySelector(".svc-desc") as HTMLElement;
                  const price = el.querySelector(".svc-price") as HTMLElement;
                  const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                  const iconWrap = el.querySelector(".svc-icon") as HTMLElement;
                  if (num) num.style.color = "rgba(255,255,255,0.07)";
                  if (tag) { tag.style.color = "#9FE670"; tag.style.background = "rgba(123,201,90,0.15)"; }
                  if (name) name.style.color = "#FFFFFF";
                  if (desc) desc.style.color = "rgba(255,255,255,0.55)";
                  if (price) { price.style.color = "rgba(255,255,255,0.5)"; price.style.background = "rgba(255,255,255,0.08)"; price.style.borderColor = "rgba(255,255,255,0.12)"; }
                  if (arrow) { arrow.style.color = "#9FE670"; arrow.style.transform = "translateX(5px)"; }
                  if (iconWrap) { iconWrap.style.background = "rgba(123,201,90,0.2)"; iconWrap.style.borderColor = "rgba(123,201,90,0.3)"; }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#FFFFFF";
                  const num = el.querySelector(".svc-num") as HTMLElement;
                  const tag = el.querySelector(".svc-tag") as HTMLElement;
                  const name = el.querySelector(".svc-name") as HTMLElement;
                  const desc = el.querySelector(".svc-desc") as HTMLElement;
                  const price = el.querySelector(".svc-price") as HTMLElement;
                  const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                  const iconWrap = el.querySelector(".svc-icon") as HTMLElement;
                  if (num) num.style.color = "#F0F0ED";
                  if (tag) { tag.style.color = "#66BB3F"; tag.style.background = "#E9F6E4"; }
                  if (name) name.style.color = "#3d4246";
                  if (desc) desc.style.color = "#5A5A5A";
                  if (price) { price.style.color = "#5A5A5A"; price.style.background = "#F0F0ED"; price.style.borderColor = "#E0E0DC"; }
                  if (arrow) { arrow.style.color = "#66BB3F"; arrow.style.transform = "translateX(0)"; }
                  if (iconWrap) { iconWrap.style.background = "#F0F0ED"; iconWrap.style.borderColor = "#E0E0DC"; }
                }}
              >
                {/* Big number */}
                <span className="svc-num" style={{
                  position: "absolute", top: "1.25rem", right: "1.5rem",
                  fontFamily: "'Playfair Display', serif", fontSize: "4.5rem",
                  fontWeight: 800, color: "#F0F0ED",
                  lineHeight: 1, userSelect: "none",
                  transition: "color 0.35s ease"
                }}>
                  {svc.n}
                </span>

                {/* Icon */}
                <div className="svc-icon" style={{
                  width: "44px", height: "44px",
                  background: "#F0F0ED",
                  border: "1px solid #E0E0DC",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                  transition: "background 0.35s ease, border-color 0.35s ease",
                }}>
                  <Icon size={20} color="#66BB3F" />
                </div>

                {/* Tag */}
                <span className="svc-tag" style={{
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6875rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#66BB3F", background: "#E9F6E4",
                  padding: "0.2rem 0.625rem", borderRadius: "99px",
                  marginBottom: "0.625rem",
                  transition: "color 0.35s ease, background 0.35s ease",
                }}>
                  {svc.tag}
                </span>

                {/* Name */}
                <h3 className="svc-name" style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.25rem", fontWeight: 700,
                  color: "#3d4246",
                  marginBottom: "0.625rem",
                  transition: "color 0.35s ease",
                }}>
                  {svc.name}
                </h3>

                {/* Desc */}
                <p className="svc-desc" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem", lineHeight: 1.65,
                  color: "#5A5A5A",
                  transition: "color 0.35s ease",
                  marginBottom: "0.875rem",
                }}>
                  {svc.desc}
                </p>

                {/* Price badge */}
                {svc.price && (
                  <span className="svc-price" style={{
                    display: "inline-block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6875rem", fontWeight: 600,
                    color: "#5A5A5A", background: "#F0F0ED",
                    border: "1px solid #E0E0DC",
                    padding: "0.2rem 0.625rem", borderRadius: "4px",
                    marginBottom: "1.25rem",
                    transition: "color 0.35s ease, background 0.35s ease, border-color 0.35s ease",
                  }}>
                    {svc.price}
                  </span>
                )}

                {/* Arrow */}
                <span className="svc-arrow" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8125rem", fontWeight: 600,
                  color: "#66BB3F",
                  transition: "color 0.35s ease, transform 0.3s ease",
                }}>
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "0.75rem", marginTop: "3rem"
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A" }}>
            Not sure where to start?
          </p>
          <Link href="/startup-health-check" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
            Take the 5-minute Health Check
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

          </section>
  );
}
