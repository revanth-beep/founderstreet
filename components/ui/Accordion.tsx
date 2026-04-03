"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className={className}
      style={{
        border: "1px solid #E0E0DC",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid #F0F0ED" : "none" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1.25rem 1.5rem",
              textAlign: "left",
              background: open === i ? "#FAFAFA" : "#FFFFFF",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => {
              if (open !== i) (e.currentTarget as HTMLElement).style.background = "#FAFAFA";
            }}
            onMouseLeave={e => {
              if (open !== i) (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
            }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: open === i ? "#3d4246" : "#3D3D3D",
              lineHeight: 1.5,
              transition: "color 0.2s ease",
            }}>
              {item.question}
            </span>
            <span style={{
              flexShrink: 0,
              width: "24px", height: "24px",
              background: open === i ? "#66BB3F" : "#F0F0ED",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s ease",
              marginTop: "1px",
            }}>
              <ChevronDown
                size={14}
                color={open === i ? "#FFFFFF" : "#787878"}
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }}
              />
            </span>
          </button>

          <div style={{
            maxHeight: open === i ? "500px" : "0px",
            opacity: open === i ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, opacity 0.3s ease",
          }}>
            <div style={{ padding: "0 1.5rem 1.375rem", background: "#FAFAFA" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "#5A5A5A",
              }}>
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
