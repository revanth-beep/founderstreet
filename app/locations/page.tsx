import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Locations & Service Availability | Founderstreet",
  description: "Founderstreet serves founders across India. Find our offices, local partners, and co-working spaces in your city.",
};

const locations = [
  {
    city: "Gurugram",
    state: "Haryana",
    type: "Headquarters",
    address: "DLF Cyber City, Gurugram, Haryana 122002",
    phone: "+91 98765 43210",
    email: "hello@founderstreet.in",
    services: ["All services", "In-person consultations", "Company Incorporation", "Virtual CFO", "Investor Meetings"],
    coworking: "Stylework, DLF Cyber City",
    coworkingLink: "https://www.stylework.city/",
    tag: "HQ",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    type: "Regional Office",
    address: "BKC, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 98765 43210",
    email: "mumbai@founderstreet.in",
    services: ["Virtual CFO", "Investor Matchmaking", "Pitch Deck Services", "Marketing & Retail"],
    coworking: "Stylework, BKC",
    coworkingLink: "https://www.stylework.city/",
    tag: "Regional",
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    type: "Regional Office",
    address: "Koramangala, Bengaluru 560034",
    phone: "+91 98765 43210",
    email: "bangalore@founderstreet.in",
    services: ["Web & App Development", "Investor Matchmaking", "Company Incorporation", "Marketing"],
    coworking: "Stylework, Koramangala",
    coworkingLink: "https://www.stylework.city/",
    tag: "Regional",
  },
  {
    city: "Delhi NCR",
    state: "Delhi",
    type: "Partner Hub",
    address: "Connaught Place, New Delhi 110001",
    phone: "+91 98765 43210",
    email: "delhi@founderstreet.in",
    services: ["Company Incorporation", "GST & Tax Compliance", "Accounting"],
    coworking: "Stylework, Connaught Place",
    coworkingLink: "https://www.stylework.city/",
    tag: "Partner Hub",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  HQ: { bg: "#E9F6E4", text: "#56AD32" },
  Regional: { bg: "#EFF6FF", text: "#3B82F6" },
  "Partner Hub": { bg: "#F7F7F5", text: "#787878" },
};

export default function LocationsPage() {
  return (
    <>
      <section style={{ background: "linear-gradient(160deg, #3d4246 0%, #4A5056 45%, #3d5240 100%)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container-custom">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9FE670", display: "block", marginBottom: "1rem" }}>
            Our Presence
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "600px" }}>
            Serving Founders Across India
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9375rem, 1.25vw, 1.125rem)", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.75 }}>
            4 cities. All services available remotely. In-person consultations at our partner co-working spaces.
          </p>
        </div>
      </section>

      <section style={{ background: "#FAFAFA", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
            {locations.map(loc => {
              const tc = tagColors[loc.tag] ?? tagColors["Partner Hub"];
              return (
                <div key={loc.city} style={{ background: "#FFFFFF", border: "1px solid #E0E0DC", borderRadius: "12px", padding: "1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#E9F6E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <MapPin size={16} color="#66BB3F" />
                      </div>
                      <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1875rem", fontWeight: 700, color: "#3d4246" }}>{loc.city}</h2>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A0A0A0" }}>{loc.state}</p>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: tc.text, background: tc.bg, padding: "0.2rem 0.5rem", borderRadius: "4px", flexShrink: 0 }}>{loc.tag}</span>
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", lineHeight: 1.6, marginBottom: "1rem" }}>{loc.address}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginBottom: "1.25rem" }}>
                    <a href={`tel:${loc.phone}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", textDecoration: "none" }}>
                      <Phone size={13} color="#66BB3F" />{loc.phone}
                    </a>
                    <a href={`mailto:${loc.email}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#5A5A5A", textDecoration: "none" }}>
                      <Mail size={13} color="#66BB3F" />{loc.email}
                    </a>
                  </div>

                  <div style={{ borderTop: "1px solid #F0F0ED", paddingTop: "1rem", marginBottom: "1rem" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A0A0A0", marginBottom: "0.625rem" }}>Services Available</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {loc.services.map(s => <span key={s} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", color: "#5A5A5A", background: "#F7F7F5", border: "1px solid #E0E0DC", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{s}</span>)}
                    </div>
                  </div>

                  <div style={{ background: "#F7F7F5", borderRadius: "8px", padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={13} color="#66BB3F" />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#5A5A5A" }}>
                      Co-working:{" "}
                      <a href={loc.coworkingLink} target="_blank" rel="noopener noreferrer" style={{ color: "#66BB3F", textDecoration: "underline", fontWeight: 600 }}>
                        {loc.coworking}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "#3d4246", borderRadius: "12px", padding: "clamp(1.5rem, 4vw, 2.5rem)", marginTop: "3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.375rem" }}>Remote-first, India-wide</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", maxWidth: "420px", lineHeight: 1.65 }}>
                All services are available remotely across India. We work with founders in Tier-2 and Tier-3 cities including Jaipur, Hyderabad, Pune, Ahmedabad, and more.
              </p>
            </div>
            <Link href="/contact" className="btn-primary" style={{ flexShrink: 0 }}>
              Book a Consultation
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
