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
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(90deg, rgba(16,28,21,0.96) 0%, rgba(16,28,21,0.9) 35%, rgba(16,28,21,0.55) 65%, rgba(16,28,21,0.2) 100%), url('/visuals/team-hero.jpg')",
        backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "right center", backgroundColor: "#101c15",
        paddingTop: "9rem", paddingBottom: "7rem",
      }}>
        <div className="container-custom">
          <div style={{ maxWidth: "620px" }}>
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
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}>
            {hero.title}
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.0625rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.78)",
            maxWidth: "600px",
          }}>
            {hero.subtitle}
          </p>
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
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(90deg, rgba(16,28,21,0.88) 0%, rgba(16,28,21,0.55) 40%, rgba(16,28,21,0.25) 70%, rgba(16,28,21,0.08) 100%), url('/visuals/team-workspace.jpg')",
        backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom", backgroundColor: "#101c15",
        padding: "6rem 0",
      }}>
        <div className="container-custom">
          <div style={{ maxWidth: "560px" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700, color: "#FAFAF8",
            marginBottom: "1rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}>
            Work with our team
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.78)",
            maxWidth: "480px", marginBottom: "2rem",
          }}>
            Book a free 30-minute discovery call and let's figure out exactly how we can help you move faster.
          </p>
          <Link href="/contact" className="btn-white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Book a Free Call <ArrowRight size={15} />
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}

