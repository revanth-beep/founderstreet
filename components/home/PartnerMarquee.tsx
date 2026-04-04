import type { PartnerMarqueeCms } from "@/lib/site-content-defaults";

function PartnerPill({ name, cat }: { name: string; cat: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        background: "#FFFFFF",
        border: "1px solid #E0E0DC",
        borderRadius: "99px",
        marginInline: "8px",
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          background: "#E9F6E4",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "0.625rem",
            color: "#66BB3F",
          }}
        >
          {(name || "?").charAt(0)}
        </span>
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "0.8125rem",
            color: "#3d4246",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0", whiteSpace: "nowrap" }}>{cat}</p>
      </div>
    </div>
  );
}

export default function PartnerMarquee({ data }: { data: PartnerMarqueeCms }) {
  const partners = (data.partners || []).filter((p) => String(p.name || "").trim());
  if (partners.length === 0) {
    return null;
  }
  const headline = data.headline?.trim() || "Our partners";
  const doubled = [...partners, ...partners];
  const rotate = [...partners.slice(6), ...partners.slice(0, 6), ...partners.slice(6), ...partners.slice(0, 6)];
  const track2 =
    partners.length >= 6
      ? rotate
      : [...partners, ...partners, ...partners, ...partners];

  return (
    <section
      style={{
        background: "#F7F7F5",
        borderTop: "1px solid #E0E0DC",
        borderBottom: "1px solid #E0E0DC",
        overflow: "hidden",
        padding: "3.5rem 0",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#A0A0A0",
          marginBottom: "1.75rem",
        }}
      >
        {headline}
      </p>

      <div style={{ display: "flex", marginBottom: "12px" }}>
        <div style={{ display: "flex", animation: "marquee 35s linear infinite" }}>
          {doubled.map((p, i) => (
            <PartnerPill key={`a${i}-${p.name}`} name={p.name} cat={p.cat} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", animation: "marquee-reverse 35s linear infinite" }}>
          {track2.map((p, i) => (
            <PartnerPill key={`b${i}-${p.name}`} name={p.name} cat={p.cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
