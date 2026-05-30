"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

const ALL = "All";

type Tool = { name: string; desc: string; bestFor: string; cost: string; verdict: string };
type Category = { id: string; label: string; tools: Tool[] };

const verdictColors: Record<string, { bg: string; text: string }> = {
  Recommended: { bg: "#E9F6E4", text: "#56AD32" },
  Good:        { bg: "#EFF6FF", text: "#3B82F6" },
  Situational: { bg: "#F7F7F5", text: "#787878" },
};

export default function AIStackClient({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(ALL);

  const allFilters = [ALL, ...categories.map(c => c.label)];
  const visible = active === ALL ? categories : categories.filter(c => c.label === active);

  return (
    <>
      {/* Filter chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
        {allFilters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: "0.4375rem 1rem",
              borderRadius: "999px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 500,
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ...(active === f
                ? { background: "#66BB3F", color: "#FFFFFF", borderColor: "#66BB3F" }
                : { background: "#FFFFFF", color: "#5A5A5A", borderColor: "#E0E0DC" }),
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tool categories */}
      {visible.map((cat, ci) => (
        <div key={cat.id} style={{ marginBottom: ci < visible.length - 1 ? "3.5rem" : 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#3d4246", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid #E0E0DC" }}>
            {cat.label}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1rem" }}>
            {cat.tools.map(tool => {
              const vc = verdictColors[tool.verdict] ?? verdictColors.Situational;
              return (
                <div key={tool.name} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.625rem" }}>
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#3d4246" }}>{tool.name}</h3>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: vc.text, background: vc.bg, padding: "0.15rem 0.5rem", borderRadius: "4px", flexShrink: 0 }}>
                      {tool.verdict}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", lineHeight: 1.65, marginBottom: "0.75rem" }}>{tool.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.6875rem", fontFamily: "'Inter', sans-serif" }}>
                    <span style={{ color: "#787878" }}>Best for: <strong style={{ color: "#3d4246" }}>{tool.bestFor}</strong></span>
                    <span style={{ color: "#A0A0A0" }}>·</span>
                    <span style={{ color: "#66BB3F", fontWeight: 600 }}>{tool.cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
