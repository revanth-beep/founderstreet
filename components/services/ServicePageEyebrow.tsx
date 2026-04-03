export default function ServicePageEyebrow({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.3rem 0.875rem",
        borderRadius: "999px",
        background: "#E9F6E4",
        color: "#66BB3F",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#66BB3F" }} />
      {children}
    </span>
  );
}
