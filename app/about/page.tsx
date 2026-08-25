import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Heart, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import { getSiteContent } from "@/lib/site-content";
import type { AboutPageCms, AboutValueIcon } from "@/lib/site-content-defaults";

export const revalidate = 60;

const VALUE_ICONS: Record<AboutValueIcon, LucideIcon> = {
  target: Target,
  zap: Zap,
  heart: Heart,
};

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const m = site.aboutPage.metadata;
  return {
    title: m.title || "About Us",
    description:
      m.description ||
      "FounderStreet is the unseen engine behind India's next great startups. Learn about our mission, team, and values.",
  };
}

export default async function AboutPage() {
  const site = await getSiteContent();
  const about = site.aboutPage;
  return <AboutPageView about={about} />;
}

function AboutPageView({ about }: { about: AboutPageCms }) {
  const storyParas = (about.story.paragraphs || []).filter((p) => String(p).trim());
  const stats = about.story.stats || [];
  const valueItems = about.values.items || [];
  const teamMembers = about.team.members || [];

  return (
    <>
      <section
        style={{
          position: "relative",
          backgroundImage: "linear-gradient(90deg, rgba(16,28,21,0.96) 0%, rgba(16,28,21,0.9) 35%, rgba(16,28,21,0.55) 65%, rgba(16,28,21,0.2) 100%), url('/visuals/about-hero.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundColor: "#101c15",
          paddingTop: "9rem",
          paddingBottom: "7rem",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "50vw",
              height: "50vw",
              top: "-10%",
              left: "-5%",
              background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)",
            }}
          />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "780px" }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#9FE670",
                marginBottom: "1.25rem",
              }}
            >
              {about.hero.eyebrow}
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.35)",
              }}
            >
              {about.hero.titleLine1}{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #9FE670, #CEEAB8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {about.hero.titleAccent}
              </em>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.78)",
                maxWidth: "580px",
              }}
            >
              {about.hero.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container-custom">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}
            className="about-story-grid"
          >
            <div>
              <span className="label-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
                  {about.story.label}
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  fontWeight: 700,
                  color: "#3d4246",
                  marginBottom: "1.25rem",
                  marginTop: "0.75rem",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
              >
                {about.story.titleLine1}{" "}
                <span className="gradient-text">{about.story.titleGradient}</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {storyParas.map((p, i) => (
                  <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.75, color: "#5A5A5A" }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#FAFAFA",
                    border: "1px solid #E0E0DC",
                    borderRadius: "10px",
                    padding: "1.75rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      color: "#66BB3F",
                      lineHeight: 1,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878", fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
              </section>

      <section className="section-padding" style={{ background: "#F7F7F5" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3rem" }}>
            <span className="label-tag" style={{ marginBottom: "0.875rem" }}>
              {about.values.label}
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "0.75rem",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
              }}
            >
              {about.values.title}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="values-grid">
            {valueItems.map((val) => {
              const Icon = VALUE_ICONS[val.icon] ?? Target;
              return (
                <div
                  key={val.title}
                  style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "2rem" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "#E9F6E4",
                      border: "1px solid #DEF3D4",
                      borderRadius: "9px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.125rem",
                    }}
                  >
                    <Icon size={20} color="#66BB3F" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#3d4246",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {val.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
              </section>

      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3rem" }}>
            <span className="label-tag" style={{ marginBottom: "0.875rem" }}>
              {about.team.label}
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#3d4246",
                marginTop: "0.75rem",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
              }}
            >
              {about.team.title}
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", maxWidth: "720px", margin: "0 auto" }}
            className="team-grid"
          >
            {teamMembers.map((member) => (
              <div key={member.name} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ position: "relative", width: "100%", paddingTop: "100%", overflow: "hidden", borderRadius: "10px", background: "#F0F0ED" }} className="team-img-wrap">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="team-img"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#3d4246",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#66BB3F",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "#787878" }}>
                    {member.background}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
              </section>

      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #66BB3F 0%, #4A5056 100%)", position: "relative", overflow: "hidden" }}
      >
        <div className="dot-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div className="container-custom" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            {about.cta.title}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "480px",
              margin: "0 auto 2rem",
            }}
          >
            {about.cta.subtitle}
          </p>
          <Link href={about.cta.buttonHref || "/contact"} className="btn-white">
            {about.cta.buttonLabel}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
