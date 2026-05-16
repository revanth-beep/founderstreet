export default function ServicePageEyebrow({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.125rem 0 0.125rem 0.625rem",
        borderLeft: "2px solid #66BB3F",
        background: "transparent",
        color: "#3a5c42",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}
