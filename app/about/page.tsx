import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Founderstreet is the unseen engine behind India's next great startups. Learn about our mission, team, and values.",
};

const values = [
  {
    icon: Target,
    title: "Outcome-Obsessed",
    desc: "Every deliverable has a measurable objective. We don't track hours — we track milestones. Our incentives are permanently aligned with yours.",
  },
  {
    icon: Zap,
    title: "Speed as a Competitive Advantage",
    desc: "Startups die of slow execution. We've engineered every process to move at startup velocity without sacrificing quality or compliance.",
  },
  {
    icon: Heart,
    title: "Founder-First, Always",
    desc: "We've all been founders. We know what it feels like to build something from nothing. Every decision we make is filtered through that lens.",
  },
];

const team = [
  {
    name: "Asmeet Bhatia",
    role: "Managing Director",
    background: "CA, MBA (ISB), B.Com (H)",
    image: "/team/asmeet-bhatia.jpg",
  },
  {
    name: "Achal Bhatt",
    role: "Director - Marketing",
    background: "CPA, MSc. in Accounting (UIUC), NYFA",
    image: "/team/achal-bhatt.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(160deg, #081810 0%, #0d2b1c 45%, #0e2318 100%)",
        paddingTop: "8rem", paddingBottom: "5rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: "50vw", height: "50vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(27,67,50,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(64,145,108,0.35), transparent)" }} />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "780px" }}>
            <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#74C69D", marginBottom: "1.25rem" }}>
              About Founderstreet
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4.5vw, 4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1.25rem" }}>
              We&apos;re the team that builds the scaffolding{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #74C69D, #B7E4C7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                while you build the skyscraper.
              </em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "580px" }}>
              Founderstreet was born from frustration. Three ex-founders who had each wasted critical early months on company registration, CAC spreadsheets, and pitch deck revisions — instead of building product and acquiring customers.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="about-story-grid">
            <div>
              <span className="label-tag" style={{ marginBottom: "1rem", display: "inline-flex" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1B4332", display: "inline-block" }} />
                Our Story
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111111", marginBottom: "1.25rem", marginTop: "0.75rem", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
                Built by Founders,{" "}
                <span className="gradient-text">for Founders</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "In 2021, our founding team was building three separate startups across different sectors. Each of us hit the same wall: the operational overhead of building a company in India was eating into our time to build the actual product.",
                  "Incorporation took 6 weeks instead of 10 days. The CA we hired didn't understand startup equity or ESOP accounting. Our pitch deck looked like a school project. And we had no idea who the right investors were for our stage.",
                  "So we built Founderstreet — the infrastructure layer we wished existed. Today, we've helped 150+ startups across India launch, scale, and raise over ₹40Cr in funding.",
                ].map((p, i) => (
                  <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.75, color: "#5A5A5A" }}>{p}</p>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { value: "2021", label: "Founded" },
                { value: "150+", label: "Startups Served" },
                { value: "₹40Cr+", label: "Funding Facilitated" },
                { value: "4", label: "Cities Present" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#FAFAF8", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "1.75rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.5rem", fontWeight: 800, color: "#1B4332", lineHeight: 1, marginBottom: "0.375rem" }}>{stat.value}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#787878", fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (min-width: 1024px) { .about-story-grid { grid-template-columns: 1fr 1fr !important; gap: 5rem !important; } }`}</style>
      </section>

      {/* ── Values ───────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#F7F7F5" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3rem" }}>
            <span className="label-tag" style={{ marginBottom: "0.875rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1B4332", display: "inline-block" }} />
              Our Values
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111111", marginTop: "0.75rem", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
              What Drives Us
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="values-grid">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "10px", padding: "2rem" }}>
                  <div style={{ width: "44px", height: "44px", background: "#EDFAF2", border: "1px solid #D8F3DC", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.125rem" }}>
                    <Icon size={20} color="#1B4332" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#111111", marginBottom: "0.625rem" }}>{val.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`@media (min-width: 768px) { .values-grid { grid-template-columns: repeat(3,1fr) !important; } }`}</style>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 3rem" }}>
            <span className="label-tag" style={{ marginBottom: "0.875rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1B4332", display: "inline-block" }} />
              The Team
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111111", marginTop: "0.75rem", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
              The People Behind the Platform
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", maxWidth: "720px", margin: "0 auto" }} className="team-grid">
            {team.map((member) => (
              <div key={member.name} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: "10px", background: "#F0F0ED" }} className="team-img-wrap">
                  <img src={member.image} alt={member.name} className="team-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#111111", marginBottom: "0.25rem" }}>{member.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B4332", marginBottom: "0.5rem" }}>{member.role}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "#787878" }}>{member.background}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (min-width: 640px) { .team-grid { grid-template-columns: 1fr 1fr !important; max-width: none !important; } }
          .team-img-wrap:hover .team-img { transform: scale(1.05); }
        `}</style>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "linear-gradient(135deg, #1B4332 0%, #0d2b1c 100%)", position: "relative", overflow: "hidden" }}>
        <div className="dot-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div className="container-custom" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem", lineHeight: 1.2 }}>
            Ready to work with us?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "480px", margin: "0 auto 2rem" }}>
            Book a free 30-minute discovery call and let&apos;s figure out exactly how we can help you move faster.
          </p>
          <Link href="/contact" className="btn-white">
            Book a Free Call
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
