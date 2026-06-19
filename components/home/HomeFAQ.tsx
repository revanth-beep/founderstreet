"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { HomeFaqCms } from "@/lib/site-content-defaults";

export default function HomeFAQ({ cms }: { cms: HomeFaqCms }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#F7F7F5", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="container-custom" style={{ maxWidth: "54rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="label-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            {cms.eyebrow}
          </span>
          <h2 className="heading-lg" style={{ marginTop: "0.5rem" }}>
            {cms.title}{" "}
            <span className="gradient-text">{cms.titleGradient}</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {cms.items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid",
                  borderColor: isOpen ? "#CEEAB8" : "#E0E0DC",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.25rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                    color: "#3d4246",
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    color="#66BB3F"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#5A5A5A",
                    lineHeight: 1.75,
                    padding: "0 1.5rem 1.25rem",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
