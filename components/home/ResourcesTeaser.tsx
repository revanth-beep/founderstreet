"use client";

import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const posts = [
  {
    category: "Strategy",
    title: "Why 70% of Indian Startups Fail at the Compliance Stage — and How to Not Be One",
    excerpt: "Regulatory oversights kill more startups than bad products. We break down the five most common compliance failures and how to systematically avoid them.",
    readTime: "6 min",
    href: "/resources/why-startups-fail-compliance",
  },
  {
    category: "Finance",
    title: "The Unit Economics Cheat Sheet Every Pre-Seed Founder Needs",
    excerpt: "CAC, LTV, gross margin, payback period — explained simply with the exact benchmarks VCs use in their first screening call.",
    readTime: "8 min",
    href: "/resources/unit-economics-cheat-sheet",
  },
  {
    category: "Fundraising",
    title: "How to Build a ₹1Cr+ Angel Round Without a Warm Intro",
    excerpt: "A step-by-step playbook from our team on cold outreach, deck structure, and how to position a pre-revenue startup compellingly.",
    readTime: "10 min",
    href: "/resources/angel-round-without-warm-intro",
  },
];

const catColor: Record<string, { bg: string; text: string }> = {
  Strategy:    { bg: "#EDFAF2", text: "#1B4332" },
  Finance:     { bg: "#EFF6FF", text: "#1E40AF" },
  Fundraising: { bg: "#FEF9C3", text: "#92400E" },
};

export default function ResourcesTeaser() {
  return (
    <section className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <span className="label-tag" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
              <BookOpen size={11} color="#1B4332" />
              The Founder&apos;s Brief
            </span>
            <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
              Thinking Built for{" "}
              <span className="gradient-text">Builders</span>
            </h2>
          </div>
          <Link href="/resources" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem",
            color: "#1B4332", textDecoration: "none",
            padding: "0.5rem 0",
            borderBottom: "1.5px solid #D8F3DC",
            transition: "border-color 0.2s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1B4332"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D8F3DC"; }}
          >
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "#E0E0DC", border: "1px solid #E0E0DC", borderRadius: "12px", overflow: "hidden" }} className="res-grid">
          {posts.map((post, i) => {
            const colors = catColor[post.category] || catColor.Strategy;
            return (
              <Link
                key={post.href}
                href={post.href}
                style={{
                  display: "block",
                  background: "#FFFFFF",
                  padding: "2rem",
                  textDecoration: "none",
                  transition: "background 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAFAF8"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
              >
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: i === 0 ? "#1B4332" : "#E0E0DC" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6875rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: colors.text,
                    background: colors.bg,
                    padding: "0.2rem 0.625rem",
                    borderRadius: "99px"
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.125rem", fontWeight: 700,
                  color: "#111111", lineHeight: 1.4,
                  marginBottom: "0.75rem"
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem", lineHeight: 1.65,
                  color: "#5A5A5A",
                  marginBottom: "1.25rem"
                }}>
                  {post.excerpt}
                </p>

                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8125rem", fontWeight: 600,
                  color: "#1B4332",
                }}>
                  Read article <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px)  { .res-grid { grid-template-columns: repeat(3,1fr) !important; } }
      `}</style>
    </section>
  );
}
