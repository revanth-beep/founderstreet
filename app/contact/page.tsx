import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import ContactForm from "@/components/sections/ContactForm";
import FaqAccordion from "./FaqAccordion";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    title: site.contactPage.meta.title,
    description: site.contactPage.meta.description,
  };
}

const detailIcons: Record<string, React.ElementType> = {
  Email: Mail,
  Phone: Phone,
  Office: MapPin,
  Hours: Clock,
};

export default async function ContactPage() {
  const site = await getSiteContent();
  const cms = site.contactPage;

  return (
    <>
      {/* Hero */}
      <section style={{
        position: "relative",
        backgroundImage: "linear-gradient(90deg, rgba(16,28,21,0.96) 0%, rgba(16,28,21,0.9) 40%, rgba(16,28,21,0.5) 68%, rgba(16,28,21,0.15) 100%), url('/visuals/contact-hero.jpg')",
        backgroundSize: "100% 100%, auto 150%", backgroundRepeat: "no-repeat, no-repeat", backgroundPosition: "center, right center", backgroundColor: "#101c15",
        paddingTop: "9rem", paddingBottom: "7rem",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />
          <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(102,187,63,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(123,201,90,0.35), transparent)" }} />
        </div>
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "680px" }}>
            <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", marginBottom: "1.25rem" }}>
              {cms.hero.eyebrow}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1.25rem", textShadow: "0 2px 20px rgba(0,0,0,0.35)" }}>
              {cms.hero.title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.78)", maxWidth: "540px" }}>
              {cms.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding" style={{ background: "#FAFAFA" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="contact-grid">

            {/* Left: Form */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
                Pitch Your Idea
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#787878", marginBottom: "1.75rem" }}>
                Fill out the form and a member of our team will reach out within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Right: Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Contact card */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "1.75rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#3d4246", marginBottom: "1.25rem" }}>Contact Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {cms.details.map((item) => {
                    const Icon = detailIcons[item.label] ?? Mail;
                    return (
                      <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                        <div style={{ width: "36px", height: "36px", background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={16} color="#66BB3F" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.2rem" }}>{item.label}</p>
                          {item.href
                            ? <a href={item.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", textDecoration: "none" }}>{item.value}</a>
                            : <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246" }}>{item.value}</p>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social row */}
                <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #F0F0ED" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.75rem" }}>Follow Us</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[
                      { Icon: LinkedInIcon, href: cms.socialLinks.linkedin, label: "LinkedIn" },
                      { Icon: InstagramIcon, href: cms.socialLinks.instagram, label: "Instagram" },
                    ].map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        style={{ width: "36px", height: "36px", background: "#F0F0ED", border: "1px solid #E0E0DC", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response badge */}
              <div style={{ background: "#66BB3F", borderRadius: "12px", padding: "1.375rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={16} color="#FFFFFF" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>{cms.responseBadge.title}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>{cms.responseBadge.subtitle}</p>
                </div>
              </div>

              {/* FAQ accordion */}
              {cms.faqQuestions.length > 0 && (
                <FaqAccordion items={cms.faqQuestions} />
              )}
            </div>
          </div>
        </div>
              </section>
    </>
  );
}
