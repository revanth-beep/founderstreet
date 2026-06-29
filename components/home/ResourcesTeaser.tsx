"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/cms";
import type { ResourcesTeaserCms } from "@/lib/site-content-defaults";

const catColor: Record<string, { bg: string; text: string }> = {
  Strategy: { bg: "#E9F6E4", text: "#66BB3F" },
  Finance: { bg: "#EFF6FF", text: "#1E40AF" },
  Legal: { bg: "#F5F3FF", text: "#7C3AED" },
  Fundraising: { bg: "#FEF9C3", text: "#92400E" },
  Marketing: { bg: "#FFF7ED", text: "#C2410C" },
  Tech: { bg: "#EEF2FF", text: "#4338CA" },
};

type Props = {
  teaser: ResourcesTeaserCms;
  posts: PostMeta[];
};

export default function ResourcesTeaser({ teaser, posts }: Props) {
  const cards = posts.slice(0, teaser.maxPosts || 3);

  return (
    <section className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container-custom">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <span className="label-tag" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
              {teaser.eyebrow}
            </span>
            <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
              {teaser.titleBefore}{" "}
              <span className="gradient-text">{teaser.titleGradient}</span>
            </h2>
          </div>
          <Link
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#66BB3F",
              textDecoration: "none",
              padding: "0.5rem 0",
              borderBottom: "1.5px solid #DEF3D4",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#66BB3F";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#DEF3D4";
            }}
          >
            {teaser.viewAllLabel} <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "#E0E0DC",
            border: "1px solid #E0E0DC",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          className="res-grid"
        >
          {cards.map((post, i) => {
            const colors = catColor[post.category] || catColor.Strategy;
            return (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                style={{
                  display: "block",
                  background: "#FFFFFF",
                  textDecoration: "none",
                  transition: "background 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FAFAFA";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                }}
              >
                <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: i === 0 ? "#66BB3F" : "#E0E0DC",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: colors.text,
                      background: colors.bg,
                      padding: "0.2rem 0.625rem",
                      borderRadius: "99px",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      color: "#A0A0A0",
                    }}
                  >
                    <Clock size={11} />
                    {post.readingTime} min
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#3d4246",
                    lineHeight: 1.4,
                    marginBottom: "0.75rem",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    color: "#5A5A5A",
                    marginBottom: "1.25rem",
                  }}
                >
                  {post.excerpt}
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "#66BB3F",
                  }}
                >
                  Read article <ArrowRight size={13} />
                </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

          </section>
  );
}
