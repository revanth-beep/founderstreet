"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import type { PostMeta } from "@/lib/cms";
import type { SiteContent } from "@/lib/site-content-defaults";

const PLACEHOLDER = "/og-image.png";

type Props = {
  posts: PostMeta[];
  copy: SiteContent["resourcesPage"];
};

const categories = ["All", "Finance", "Legal", "Fundraising", "Marketing", "Tech", "Strategy"];

const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  Finance:    { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  Legal:      { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  Fundraising:{ bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Marketing:  { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
  Tech:       { bg: "#EEF2FF", color: "#4338CA", border: "#C7D2FE" },
  Strategy:   { bg: "#F0FDFA", color: "#0F766E", border: "#99F6E4" },
};

export default function ResourcesPageClient({ posts: allPosts, copy }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const featuredPost = allPosts.find((p) => p.featured);
  const gridPosts = filtered.filter((p) => !p.featured || filtered.filter((fp) => fp.featured).indexOf(p) > 0);

  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative",
        background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)",
        paddingTop: "8rem", paddingBottom: "5rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", width: "30vw", height: "30vw", bottom: "-5%", right: "5%", background: "radial-gradient(circle, rgba(123,201,90,0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)" }} />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "44px", height: "44px", background: "rgba(123,201,90,0.2)", border: "1px solid rgba(123,201,90,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={20} color="#9FE670" />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670" }}>
              {copy.eyebrow}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1rem" }}>
            {copy.title}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "520px" }}>
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
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "0.25rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ background: "#FAFAFA" }}>
        <div className="container-custom">

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

          {/* Featured post — only shown when "All" or matching category */}
          {featuredPost && (activeCategory === "All" || featuredPost.category === activeCategory) && (
            <Link
              href={`/resources/${featuredPost.slug}`}
              style={{ display: "block", background: "#fff", border: "1px solid #E0E0DC", borderRadius: "8px", overflow: "hidden", textDecoration: "none", marginBottom: "2rem", transition: "box-shadow 0.3s ease" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
                {/* Cover */}
                <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden", background: "#F0F0ED" }}>
                  <Image
                    src={featuredPost.coverImage || PLACEHOLDER}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)" }} />
                  {/* Content overlay on desktop */}
                  <div style={{ position: "absolute", inset: 0, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: "#66BB3F", color: "#fff", padding: "0.2rem 0.75rem", borderRadius: "999px" }}>
                        Featured
                      </span>
                      {categoryColors[featuredPost.category] && (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, background: categoryColors[featuredPost.category].bg, color: categoryColors[featuredPost.category].color, border: `1px solid ${categoryColors[featuredPost.category].border}`, padding: "0.2rem 0.75rem", borderRadius: "999px" }}>
                          {featuredPost.category}
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.375rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                      {featuredPost.title}
                    </h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: "1.25rem", maxWidth: "500px", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
                      {featuredPost.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                        <Clock style={{ width: "12px", height: "12px" }} />
                        {featuredPost.readingTime} min read
                      </span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>{featuredPost.author}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#9FE670", marginLeft: "auto" }}>
                        Read article <ArrowRight style={{ width: "14px", height: "14px" }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

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
                    {/* Cover */}
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#F0F0ED" }}>
                      <Image
                        src={post.coverImage || PLACEHOLDER}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    {/* Body */}
                    <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
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

      {/* Newsletter CTA */}
      <section style={{ background: "#F0F0ED", borderTop: "1px solid #E0E0DC", paddingBlock: "5rem" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <BookOpen style={{ width: "22px", height: "22px", color: "#66BB3F" }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.875rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.75rem", lineHeight: 1.2 }}>
              Get the Founder&apos;s Edge, Every Week.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A", lineHeight: 1.7, marginBottom: "2rem" }}>
              Weekly breakdown of unit economics, pitch tear-downs, and growth tactics. Straight to your inbox. No spam, ever.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", gap: "0.5rem", maxWidth: "400px", margin: "0 auto" }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{ flex: 1, padding: "0.75rem 1rem", border: "1px solid #E0E0DC", borderRadius: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", background: "#fff", outline: "none" }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ flexShrink: 0 }}
              >
                Subscribe
              </button>
            </form>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0", marginTop: "0.75rem" }}>
              Join 2,400+ founders reading every Friday.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
