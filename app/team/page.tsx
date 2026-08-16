import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteContent } from "@/lib/site-content";
import { TeamCard } from "./TeamCard";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: site.teamPage.metadata.title,
    description: site.teamPage.metadata.description,
  };
}

export default async function TeamPage() {
  const site = await getSiteContent();
  const { hero, departments, members } = site.teamPage;

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#1B4332", paddingTop: "9rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <div className="hero-split">
            <div className="hero-split__text">
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#66BB3F", marginBottom: "1.25rem",
              }}>
                {hero.eyebrow}
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 700, color: "#FAFAF8",
                lineHeight: 1.2, marginBottom: "1.25rem",
              }}>
                {hero.title}
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.0625rem", lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "600px",
              }}>
                {hero.subtitle}
              </p>
            </div>
            <div className="hero-split__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/visuals/team-hero.jpg" alt="The FounderStreet team in a working session" />
            </div>
          </div>
        </div>
      </section>

      {/* Department sections */}
      <div style={{ background: "#FAFAF8" }}>
        {departments.map((dept) => {
          const deptMembers = members.filter((m) => m.department === dept);
          if (deptMembers.length === 0) return null;

          const isLeadership = dept === "Leadership";

          return (
            <section
              key={dept}
              style={{
                paddingTop: isLeadership ? "5rem" : "3.5rem",
                paddingBottom: "3.5rem",
                borderBottom: "1px solid #E8E8E4",
              }}
            >
              <div className="container-custom">
                <div style={{ marginBottom: "2.5rem" }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6875rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#66BB3F", marginBottom: "0.5rem",
                  }}>
                    {dept}
                  </p>
                  <div style={{ width: "32px", height: "2px", background: "#66BB3F" }} />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isLeadership
                    ? "repeat(auto-fill, minmax(240px, 1fr))"
                    : "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: isLeadership ? "2rem" : "1.5rem",
                }}>
                  {deptMembers.map((member) => (
                    <TeamCard key={member.name} member={member} large={isLeadership} />
                  ))}

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section style={{ background: "#1B4332", padding: "5rem 0" }}>
        <div className="container-custom">
          <div className="hero-split hero-split--rev">
            <div className="hero-split__text">
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700, color: "#FAFAF8",
                marginBottom: "1rem",
              }}>
                Work with our team
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem", lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "480px", marginBottom: "2rem",
              }}>
                Book a free 30-minute discovery call and let's figure out exactly how we can help you move faster.
              </p>
              <Link href="/contact" className="btn-white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Book a Free Call <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-split__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/visuals/team-workspace.jpg" alt="A calm FounderStreet workspace" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

