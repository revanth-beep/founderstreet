export default function ServicePageEyebrow({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.3rem 0.875rem",
        borderRadius: "999px",
        background: "#EDFAF2",
        color: "#1B4332",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1B4332" }} />
      {children}
    </span>
  );
}
