"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import type { PostMeta } from "@/lib/cms";
import type { SiteContent } from "@/lib/site-content-defaults";

type Props = {
  posts: PostMeta[];
  copy: SiteContent["resourcesPage"];
};

const categories = ["All", "Funding", "Startups"];

const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  Funding:   { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Startups:  { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
};

export default function ResourcesPageClient({ posts: allPosts, copy }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const gridPosts = filtered;

  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(90deg, rgba(16,28,21,0.96) 0%, rgba(16,28,21,0.9) 35%, rgba(16,28,21,0.55) 65%, rgba(16,28,21,0.2) 100%), url('/visuals/resources-hero.jpg')",
        backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "right top", backgroundColor: "#101c15",
        paddingTop: "9rem", paddingBottom: "7rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", width: "30vw", height: "30vw", bottom: "-5%", right: "5%", background: "radial-gradient(circle, rgba(123,201,90,0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)" }} />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "44px", height: "44px", background: "rgba(123,201,90,0.2)", border: "1px solid rgba(123,201,90,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={20} color="#9FE670" />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670" }}>
                {copy.eyebrow}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1rem", textShadow: "0 2px 20px rgba(0,0,0,0.35)" }}>
              {copy.title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.78)", maxWidth: "520px" }}>
              {copy.subtitle}
            </p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {[
                { value: `${allPosts.length}+`, label: copy.statArticlesLabel },
                { value: "6", label: copy.statCategoriesLabel },
                { value: copy.statReadersValue, label: copy.statReadersLabel },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: "0.25rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: "#FAFAFA" }}>
        <div className="container-custom">

          {/* Section label */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#66BB3F", marginBottom: "0.25rem" }}>
              The Founder&apos;s Brief
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#3d4246" }}>
              Frameworks, not fluff.
            </h2>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.4375rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.8125rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  ...(activeCategory === cat
                    ? { background: "#66BB3F", color: "#fff", borderColor: "#66BB3F" }
                    : { background: "#fff", color: "#5A5A5A", borderColor: "#E0E0DC" }),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {gridPosts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {gridPosts.map((post) => {
                const catStyle = categoryColors[post.category];
                return (
                  <Link
                    key={post.slug}
                    href={`/resources/${post.slug}`}
                    style={{ display: "block", background: "#fff", border: "1px solid #E0E0DC", borderRadius: "8px", overflow: "hidden", textDecoration: "none", transition: "box-shadow 0.3s ease, border-color 0.2s ease" }}
                  >
                    {/* Body */}
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        {catStyle && (
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}`, padding: "0.2rem 0.625rem", borderRadius: "999px" }}>
                            {post.category}
                          </span>
                        )}
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0" }}>
                          <Clock style={{ width: "11px", height: "11px" }} />
                          {post.readingTime} min
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.0625rem", fontWeight: 700, color: "#3d4246", lineHeight: 1.4, marginBottom: "0.5rem" }}>
                        {post.title}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#66BB3F", marginTop: "1rem" }}>
                        Read article <ArrowRight style={{ width: "14px", height: "14px" }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <Search style={{ width: "40px", height: "40px", color: "#C4C4C4", margin: "0 auto 1rem" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#A0A0A0", fontSize: "0.9375rem" }}>
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", paddingBlock: "2rem" }}>
        <div className="container-custom">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878", textAlign: "center", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
            <strong style={{ color: "#5A5A5A" }}>Disclaimer:</strong> All articles on this platform are for knowledge sharing purposes only and do not constitute professional legal, financial, or business advice. Please consult a qualified professional before making any business decisions.
          </p>
        </div>
      </section>
    </>
  );
}
