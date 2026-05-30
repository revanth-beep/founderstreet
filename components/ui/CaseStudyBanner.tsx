import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CaseStudyBanner({ quote, company }: { quote?: string; company?: string }) {
  return (
    <div style={{ background: "#FFFFFF", borderTop: "1px solid #E0E0DC", borderBottom: "1px solid #E0E0DC", paddingBlock: "2rem" }}>
      <div className="container-custom" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
        <div style={{ flex: "1 1 300px" }}>
          {quote && (
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontStyle: "italic", color: "#3d4246", lineHeight: 1.65, marginBottom: "0.375rem" }}>
              &ldquo;{quote}&rdquo;
            </p>
          )}
          {company && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#A0A0A0" }}>— {company}</p>
          )}
          {!quote && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", color: "#5A5A5A" }}>
              See how we&apos;ve helped founders like you get results.
            </p>
          )}
        </div>
        <Link href="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#66BB3F", textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
          Read case studies <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
