const partners = [
  { name: "Times OOH", cat: "Billboard" },
  { name: "StartupIndia", cat: "Ecosystem" },
  { name: "AWS Activate", cat: "Cloud" },
  { name: "PhoenixMalls", cat: "Retail" },
  { name: "Razorpay", cat: "Payments" },
  { name: "Meta Business", cat: "Social Ads" },
  { name: "Google Ads", cat: "Performance" },
  { name: "NASSCOM", cat: "Tech Body" },
  { name: "IndiaMart", cat: "B2B Platform" },
  { name: "Metro Ads", cat: "Transit OOH" },
  { name: "BigTrade", cat: "Distribution" },
  { name: "Laqshya Media", cat: "OOH" },
];

function PartnerPill({ name, cat }: { name: string; cat: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      padding: "10px 20px",
      background: "#FFFFFF",
      border: "1px solid #E0E0DC",
      borderRadius: "99px",
      marginInline: "8px",
      flexShrink: 0,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        width: "28px", height: "28px",
        background: "#E9F6E4", borderRadius: "6px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800, fontSize: "0.625rem",
          color: "#66BB3F"
        }}>
          {name.charAt(0)}
        </span>
      </div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "#3d4246", whiteSpace: "nowrap" }}>{name}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#A0A0A0", whiteSpace: "nowrap" }}>{cat}</p>
      </div>
    </div>
  );
}

export default function PartnerMarquee() {
  const doubled = [...partners, ...partners];
  return (
    <section style={{ background: "#F7F7F5", borderTop: "1px solid #E0E0DC", borderBottom: "1px solid #E0E0DC", overflow: "hidden", padding: "3.5rem 0" }}>
      <p style={{
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6875rem", fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "#A0A0A0",
        marginBottom: "1.75rem"
      }}>
        Our Partner Network — Billboards · Distribution · Digital · Retail
      </p>

      {/* Track 1 */}
      <div style={{ display: "flex", marginBottom: "12px" }}>
        <div style={{ display: "flex", animation: "marquee 35s linear infinite" }}>
          {doubled.map((p, i) => <PartnerPill key={`a${i}`} name={p.name} cat={p.cat} />)}
        </div>
      </div>

      {/* Track 2 (reversed) */}
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", animation: "marquee-reverse 35s linear infinite" }}>
          {[...partners.slice(6), ...partners.slice(0,6), ...partners.slice(6), ...partners.slice(0,6)].map((p, i) => (
            <PartnerPill key={`b${i}`} name={p.name} cat={p.cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
