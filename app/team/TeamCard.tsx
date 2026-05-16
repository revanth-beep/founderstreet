"use client";

import Image from "next/image";

type Props = {
  member: { name: string; role: string; background: string; image: string };
  large: boolean;
};

export function TeamCard({ member, large }: Props) {
  const isPlaceholder = member.image === "/team/placeholder.svg";
  const imgSize = large ? 140 : 110;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8E8E4",
        borderRadius: "10px",
        padding: large ? "1.75rem" : "1.25rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(27,67,50,0.1)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      <div style={{
        width: `${imgSize}px`, height: `${imgSize}px`,
        borderRadius: "50%",
        overflow: "hidden",
        marginBottom: large ? "1.25rem" : "1rem",
        border: "3px solid #E9F6E4",
        flexShrink: 0,
        position: "relative",
      }}>
        <Image
          src={member.image}
          alt={member.name}
          width={imgSize}
          height={imgSize}
          style={{
            width: "100%", height: "100%",
            objectFit: isPlaceholder ? "contain" : "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: large ? "1.0625rem" : "0.9375rem",
        fontWeight: 700, color: "#1A1A1A",
        marginBottom: "0.25rem",
        lineHeight: 1.3,
      }}>
        {member.name}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: large ? "0.8125rem" : "0.75rem",
        color: "#66BB3F", fontWeight: 600,
        marginBottom: "0.5rem",
        lineHeight: 1.4,
      }}>
        {member.role}
      </p>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6875rem",
        color: "#8A8A8A",
        lineHeight: 1.5,
      }}>
        {member.background}
      </p>
    </div>
  );
}
