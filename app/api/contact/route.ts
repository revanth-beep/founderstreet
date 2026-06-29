import { NextRequest, NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/contact-submissions";

const FROM_ADDRESS = "Founderstreet <hi@founderstreet.in>";
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

async function sendContactEmail(fields: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  stage: string;
  message: string;
  sourceService: string;
  sourcePlan: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping contact email");
    return;
  }

  const esc = (s: string) => String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows: [string, string][] = [
    ["Name", `${fields.firstName} ${fields.lastName}`.trim()],
    ["Email", fields.email],
    ["Phone", fields.phone || "N/A"],
    ["Service Selected", fields.service || "N/A"],
    ["Startup Stage", fields.stage || "N/A"],
  ];
  if (fields.sourceService || fields.sourcePlan) {
    rows.push(["Came From", `${fields.sourceService || "Service page"}${fields.sourcePlan ? ` — ${fields.sourcePlan}` : ""}`]);
  }
  rows.push(["Message", fields.message || "N/A"]);

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;">
    <h2 style="color:#1B4332;">New Contact Enquiry</h2>
    ${fields.sourcePlan ? `<p style="color:#5A5A5A;">This lead came from the <strong>${esc(fields.sourceService)}</strong> page, package <strong>${esc(fields.sourcePlan)}</strong>.</p>` : ""}
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(v)}</td></tr>`).join("")}
    </table>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [LEADS_INBOX],
      subject: `New enquiry: ${fields.firstName} ${fields.lastName}${fields.sourcePlan ? ` (${fields.sourcePlan})` : ""}`,
      html,
      reply_to: fields.email,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON");
  }

  if (!body || typeof body !== "object") {
    return bad("Invalid body");
  }

  const o = body as Record<string, unknown>;
  const firstName = typeof o.firstName === "string" ? o.firstName : "";
  const lastName = typeof o.lastName === "string" ? o.lastName : "";
  const email = typeof o.email === "string" ? o.email : "";
  const phone = typeof o.phone === "string" ? o.phone : "";
  const service = typeof o.service === "string" ? o.service : "";
  const stage = typeof o.stage === "string" ? o.stage : "";
  const message = typeof o.message === "string" ? o.message : "";
  const sourceService = typeof o.sourceService === "string" ? o.sourceService : "";
  const sourcePlan = typeof o.sourcePlan === "string" ? o.sourcePlan : "";

  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    return bad("Name and email are required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return bad("Invalid email address");
  }
  if (!service.trim() || !stage.trim() || !message.trim()) {
    return bad("Please complete all required fields");
  }

  // Append the source (page + package) to the stored message so it shows in the admin view.
  const storedMessage = sourceService || sourcePlan
    ? `${message}\n\n— Came from: ${sourceService || "Service page"}${sourcePlan ? ` (Package: ${sourcePlan})` : ""}`
    : message;

  try {
    const row = await createContactSubmission({
      firstName,
      lastName,
      email,
      phone,
      service,
      stage,
      message: storedMessage,
    });
    if (!row) {
      return NextResponse.json(
        { error: "Could not save your enquiry. The server may not be connected to a database yet." },
        { status: 503 }
      );
    }

    // Best-effort email notification (never blocks the user).
    try {
      await sendContactEmail({ firstName, lastName, email, phone, service, stage, message, sourceService, sourcePlan });
    } catch (e) {
      console.error("Contact email failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return bad(msg, 400);
  }
}
