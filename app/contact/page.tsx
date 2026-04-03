"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { LinkedInIcon, XIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import ContactForm from "@/components/sections/ContactForm";

const contactDetails = [
  { icon: Mail, label: "Email", value: "hello@founderstreet.in", href: "mailto:hello@founderstreet.in" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Office", value: "DLF Cyber City, Gurugram, Haryana 122002", href: null },
  { icon: Clock, label: "Hours", value: "Monday–Saturday, 10 AM – 7 PM IST", href: null },
];

export default function ContactPage() {
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
          <div style={{ position: "absolute", width: "45vw", height: "45vw", top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(27,67,50,0.5) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(64,145,108,0.35), transparent)" }} />
        </div>
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "680px" }}>
            <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#74C69D", marginBottom: "1.25rem" }}>
              Get in Touch
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1.25rem" }}>
              Let&apos;s Talk About Your Startup.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: "540px" }}>
              Book a free 30-minute discovery call. We&apos;ll understand your stage, identify your biggest gaps, and tell you exactly how we can help. No pitch. No pressure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────── */}
      <section className="section-padding" style={{ background: "#FAFAF8" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="contact-grid">

            {/* ── Left: Form ──────────────────────── */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#111111", marginBottom: "0.5rem" }}>
                Pitch Your Idea
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#787878", marginBottom: "1.75rem" }}>
                Fill out the form and a member of our team will reach out within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* ── Right: Info ─────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Contact card */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "1.75rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#111111", marginBottom: "1.25rem" }}>Contact Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                        <div style={{ width: "36px", height: "36px", background: "#EDFAF2", border: "1px solid #D8F3DC", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={16} color="#1B4332" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.2rem" }}>{item.label}</p>
                          {item.href
                            ? <a href={item.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#111111", textDecoration: "none", transition: "color 0.2s ease" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#1B4332"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}
                            >{item.value}</a>
                            : <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#111111" }}>{item.value}</p>
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
                      { Icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
                      { Icon: XIcon, href: "https://twitter.com", label: "X" },
                      { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                    ].map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        style={{ width: "36px", height: "36px", background: "#F0F0ED", border: "1px solid #E0E0DC", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1B4332"; (e.currentTarget as HTMLElement).style.borderColor = "#1B4332"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#F0F0ED"; (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC"; }}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response time badge */}
              <div style={{ background: "#1B4332", borderRadius: "12px", padding: "1.375rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={16} color="#FFFFFF" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>We respond within 24 hours</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>Every inquiry is reviewed by a senior team member. No automated responses, no gatekeeping.</p>
                </div>
              </div>

              {/* FAQ links */}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.875rem" }}>Common Questions</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {[
                    "How much does incorporation cost?",
                    "How quickly can you build my pitch deck?",
                    "Do you work with international founders?",
                    "What's included in the free health check?",
                  ].map((q) => (
                    <div key={q} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.8125rem 1rem", background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s ease" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1B4332"; (e.currentTarget as HTMLElement).style.background = "#F7FFF9"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E0E0DC"; (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
                    >
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3D3D3D" }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (min-width: 1024px) { .contact-grid { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; } }`}</style>
      </section>
    </>
  );
}
