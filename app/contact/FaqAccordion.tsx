"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/site-content-defaults";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.875rem" }}>Common Questions</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.8125rem 1rem",
                background: "transparent", border: "none", cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3D3D3D", fontWeight: 500 }}>{item.q}</span>
              <ChevronDown
                size={16}
                color="#787878"
                style={{ flexShrink: 0, marginLeft: "0.5rem", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
              />
            </button>
            {open === i && item.a && (
              <div style={{ padding: "0 1rem 0.875rem", borderTop: "1px solid #F0F0ED" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.65, color: "#5A5A5A", marginTop: "0.75rem" }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
