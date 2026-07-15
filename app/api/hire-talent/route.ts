import { NextRequest, NextResponse } from "next/server";

const FROM_ADDRESS = "Founderstreet <hi@founderstreet.in>";
// Inboxes that receive hire-talent requirement submissions.
const LEADS_INBOX = ["hi@founderstreet.in", "ab@founderstreet.in"];

const REQUIRED_FIELDS = [
  "companyName", "industry", "contactName", "workEmail", "phone",
  "roleTitle", "department", "numOpenings", "roleType",
  "qualification", "preferredStream", "workExperience", "preferredColleges", "mustHaveSkills",
  "workMode", "location", "duration", "startDate", "deadline",
  "stipendRange", "ppoPotential",
];

const FIELD_LABELS: Record<string, string> = {
  companyName: "Company name",
  industry: "Industry / sector",
  contactName: "Contact person name",
  workEmail: "Work email",
  phone: "Phone number",
  companyWebsite: "Company website",
  roleTitle: "Role title",
  department: "Department / function",
  departmentOther: "Department (specified)",
  numOpenings: "Number of openings",
  roleType: "Role type",
  qualification: "Qualification required",
  preferredStream: "Preferred stream / specialization",
  workExperience: "Work experience required",
  priorExperienceDomain: "Preferred prior experience domain",
  preferredColleges: "Preferred colleges",
  specificColleges: "Specific colleges / institutes",
  mustHaveSkills: "Must-have skills / tools",
  niceToHaveSkills: "Nice-to-have skills",
  workMode: "Work mode",
  location: "Location (city)",
  duration: "Internship / role duration",
  startDate: "Preferred start date",
  deadline: "Deadline to fill this role",
  stipendRange: "Stipend range (monthly, Rs.)",
  ppoPotential: "PPO potential",
  ctcRange: "CTC range",
  notes: "Additional requirements or notes",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    for (const field of REQUIRED_FIELDS) {
      if (!String(body[field] ?? "").trim()) {
        return NextResponse.json({ error: `${FIELD_LABELS[field] ?? field} is required` }, { status: 400 });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.workEmail).trim())) {
      return NextResponse.json({ error: "Please enter a valid work email address" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — skipping hire-talent email");
      return NextResponse.json({ ok: true });
    }

    const esc = (s: unknown) => String(s ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const rows = Object.entries(FIELD_LABELS)
      .filter(([key]) => String(body[key] ?? "").trim())
      .map(([key, label]) => `<tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;white-space:nowrap;">${esc(label)}</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(body[key])}</td></tr>`)
      .join("");

    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;">
      <h2 style="color:#1B4332;">New Hire Talent Requirement</h2>
      <p style="color:#5A5A5A;">${esc(body.companyName)} has posted a hiring requirement via founderstreet.in.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
    </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: LEADS_INBOX,
        subject: `New Hire Talent requirement: ${body.companyName} (${body.roleTitle})`,
        html,
        reply_to: String(body.workEmail).trim(),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error ${res.status}: ${err}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Hire Talent requirement error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
