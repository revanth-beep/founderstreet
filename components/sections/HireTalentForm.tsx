"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const DEPARTMENTS = [
  "Marketing & Growth", "Finance", "Operations", "Technology / Engineering",
  "Product", "Sales & Business Development", "Human Resources", "Design", "Legal", "Other",
];
const ROLE_TYPES = ["Internship", "Internship with PPO potential", "Full-time (entry-level)"];
const QUALIFICATIONS = ["Undergraduate", "Postgraduate", "Either"];
const WORK_EXPERIENCE = ["None (fresher/student only)", "0-1 yrs", "1-3 yrs", "3+ yrs", "Open to either"];
const COLLEGE_TIERS = ["Tier 1 B Schools", "Other B schools", "IITs / NITs / BITS", "Tier 1 undergrad colleges", "Open to all colleges"];
const WORK_MODES = ["On-site", "Hybrid", "Remote"];
const DURATIONS = ["Less than 2 months", "2-3 months", "3-6 months", "6+ months", "Full-time / permanent"];
const PPO_OPTIONS = ["Yes", "No", "Depends on performance"];

const inputSt: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1.5px solid #E0E0DC",
  borderRadius: "6px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem",
  color: "#3d4246",
  background: "#FFFFFF",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelSt: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#787878",
  marginBottom: "0.5rem",
};

const helpSt: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.75rem",
  color: "#A0A0A0",
  marginTop: "0.35rem",
};

const groupHeadSt: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#66BB3F",
  paddingBottom: "0.625rem",
  borderBottom: "1px solid #E0E0DC",
  marginBottom: "1.25rem",
};

function Req() {
  return <span style={{ color: "#E5484D" }}> *</span>;
}

function focusIn(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  (e.target as HTMLElement).style.borderColor = "#66BB3F";
  (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(102,187,63,0.08)";
}
function focusOut(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  (e.target as HTMLElement).style.borderColor = "#E0E0DC";
  (e.target as HTMLElement).style.boxShadow = "none";
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelSt}>{label}{required && <Req />}</label>
      {children}
      {hint && <p style={helpSt}>{hint}</p>}
    </div>
  );
}

function Select({ name, required, value, onChange, options, placeholder }: {
  name: string; required?: boolean; value?: string; onChange?: (v: string) => void; options: string[]; placeholder: string;
}) {
  return (
    <select
      name={name}
      required={required}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      style={{ ...inputSt, appearance: "none", cursor: "pointer" }}
      onFocus={focusIn}
      onBlur={focusOut}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" };

export default function HireTalentForm() {
  const [department, setDepartment] = useState("");
  const [roleType, setRoleType] = useState("");
  const [preferredColleges, setPreferredColleges] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  function toggleCollege(tier: string) {
    setPreferredColleges((prev) => prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.preferredColleges = preferredColleges.join(", ");

    try {
      const res = await fetch("/api/hire-talent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorDetail(typeof data.error === "string" ? data.error : "Something went wrong. Please try again or email hello@founderstreet.in.");
        return;
      }
      setStatus("success");
      form.reset();
      setDepartment("");
      setRoleType("");
      setPreferredColleges([]);
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Please check your connection or email hello@founderstreet.in.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#E9F6E4", border: "1px solid #DEF3D4", borderRadius: "10px", padding: "2.5rem", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", background: "#DEF3D4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <CheckCircle2 size={28} color="#66BB3F" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#3d4246", marginBottom: "0.5rem" }}>
          We&apos;ve received your requirement!
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "#5A5A5A" }}>
          Our team will confirm your shortlist timeline once we receive your requirement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Company & Contact */}
      <div>
        <p style={groupHeadSt}>Company &amp; Contact</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={grid2} className="ht-grid-2">
            <Field label="Company name" required>
              <input type="text" name="companyName" required placeholder="e.g., Acme Technologies" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Industry / sector" required>
              <input type="text" name="industry" required placeholder="e.g., FinTech, D2C, SaaS" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Contact person name" required>
              <input type="text" name="contactName" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Work email" required>
              <input type="email" name="workEmail" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Phone number" required>
              <input type="tel" name="phone" required defaultValue="+91 " style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Company website" hint="Optional">
              <input type="text" name="companyWebsite" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
        </div>
      </div>

      {/* Role Details */}
      <div>
        <p style={groupHeadSt}>Role Details</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={grid2} className="ht-grid-2">
            <Field label="Role title" required>
              <input type="text" name="roleTitle" required placeholder="e.g., Growth Marketing Intern" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Department / function" required>
              <Select name="department" required value={department} onChange={setDepartment} options={DEPARTMENTS} placeholder="Select a department…" />
            </Field>
          </div>
          {department === "Other" && (
            <Field label="Please specify department" required>
              <input type="text" name="departmentOther" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          )}
          <div style={grid2} className="ht-grid-2">
            <Field label="Number of openings" required>
              <input type="number" name="numOpenings" min={1} required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Role type" required>
              <Select name="roleType" required value={roleType} onChange={setRoleType} options={ROLE_TYPES} placeholder="Select role type…" />
            </Field>
          </div>
        </div>
      </div>

      {/* Candidate Requirements */}
      <div>
        <p style={groupHeadSt}>Candidate Requirements</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={grid2} className="ht-grid-2">
            <Field label="Qualification required" required>
              <Select name="qualification" required options={QUALIFICATIONS} placeholder="Select qualification…" />
            </Field>
            <Field label="Preferred stream / specialization" required>
              <input type="text" name="preferredStream" required placeholder="e.g., BBA/B.Com, MBA-Marketing, B.Tech CSE" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Work experience required" required>
              <Select name="workExperience" required options={WORK_EXPERIENCE} placeholder="Select experience level…" />
            </Field>
            <Field label="Preferred prior experience domain" required hint="If applicable, e.g., Digital marketing, Investment banking">
              <input type="text" name="priorExperienceDomain" required placeholder="e.g., Digital marketing, Investment banking" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>

          <Field label="Preferred colleges" required hint="Select all that apply">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {COLLEGE_TIERS.map((tier) => {
                const active = preferredColleges.includes(tier);
                return (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => toggleCollege(tier)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600,
                      padding: "0.5rem 0.875rem", borderRadius: "999px", cursor: "pointer",
                      border: active ? "1.5px solid #66BB3F" : "1.5px solid #E0E0DC",
                      background: active ? "#E9F6E4" : "#FFFFFF",
                      color: active ? "#3a5c42" : "#5A5A5A",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {active && <CheckCircle2 size={14} color="#66BB3F" />}
                    {tier}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Specific colleges / institutes" hint="Optional. Name them if you have a preference, e.g., IIM Ahmedabad, XLRI, SRCC">
            <input type="text" name="specificColleges" placeholder="e.g., IIM Ahmedabad, XLRI, SRCC" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
          </Field>

          <div style={grid2} className="ht-grid-2">
            <Field label="Must-have skills / tools" required>
              <input type="text" name="mustHaveSkills" required placeholder="e.g., Excel, SQL, Figma, financial modeling" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Nice-to-have skills" hint="Optional">
              <input type="text" name="niceToHaveSkills" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
        </div>
      </div>

      {/* Location & Duration */}
      <div>
        <p style={groupHeadSt}>Location &amp; Duration</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Field label="Work mode" required>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {WORK_MODES.map((mode) => (
                <label key={mode} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#3d4246", cursor: "pointer" }}>
                  <input type="radio" name="workMode" value={mode} required style={{ accentColor: "#66BB3F", width: "16px", height: "16px" }} />
                  {mode}
                </label>
              ))}
            </div>
          </Field>
          <div style={grid2} className="ht-grid-2">
            <Field label="Location (city)" required>
              <input type="text" name="location" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Internship / role duration" required>
              <Select name="duration" required options={DURATIONS} placeholder="Select duration…" />
            </Field>
          </div>
          <div style={grid2} className="ht-grid-2">
            <Field label="Preferred start date" required>
              <input type="date" name="startDate" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="Deadline to fill this role" required>
              <input type="date" name="deadline" required style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          </div>
        </div>
      </div>

      {/* Compensation */}
      <div>
        <p style={groupHeadSt}>Compensation</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={grid2} className="ht-grid-2">
            <Field label="Stipend range (monthly, Rs.)" required>
              <input type="text" name="stipendRange" required placeholder="e.g., Rs.15,000-Rs.25,000" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
            <Field label="PPO (pre-placement offer) potential" required>
              <Select name="ppoPotential" required options={PPO_OPTIONS} placeholder="Select…" />
            </Field>
          </div>
          {roleType === "Full-time (entry-level)" && (
            <Field label="CTC range" required hint="Since this is a full-time role">
              <input type="text" name="ctcRange" required placeholder="e.g., Rs.6-8 LPA" style={inputSt} onFocus={focusIn} onBlur={focusOut} />
            </Field>
          )}
        </div>
      </div>

      {/* Screening & Notes */}
      <div>
        <p style={groupHeadSt}>Screening &amp; Notes</p>
        <Field label="Additional requirements or notes" hint="Optional">
          <textarea name="notes" rows={4} style={{ ...inputSt, resize: "vertical" as const }} onFocus={focusIn as unknown as React.FocusEventHandler<HTMLTextAreaElement>} onBlur={focusOut as unknown as React.FocusEventHandler<HTMLTextAreaElement>} />
        </Field>
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#E5484D", lineHeight: 1.5 }}>
          {errorDetail}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "0.9375rem", fontSize: "0.9375rem" }}
        >
          {status === "loading"
            ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
            : <>Submit Requirement <ArrowRight size={16} /></>
          }
        </button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#A0A0A0", textAlign: "center", marginTop: "0.875rem" }}>
          Our team will confirm your shortlist timeline once we receive your requirement.
        </p>
      </div>
    </form>
  );
}
