import { NextRequest, NextResponse } from "next/server";

const FROM_ADDRESS = "Founderstreet <hi@founderstreet.in>";
// Inbox that receives co-working enquiries.
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

export async function POST(request: NextRequest) {
  try {
    const { name, contact, email, requirement } = await request.json();

    if (!name?.trim() || !contact?.trim() || !email?.trim() || !requirement?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — skipping co-working email");
      return NextResponse.json({ ok: true });
    }

    const esc = (s: string) => String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;">
      <h2 style="color:#1B4332;">New Co-working Space Enquiry</h2>
      <p style="color:#5A5A5A;">A Founderstreet client has shared a co-working requirement (Sylework collaboration).</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;">Name</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(name)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;">Contact No.</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(contact)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;">Email ID</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(email)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;vertical-align:top;">Requirement</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${esc(requirement)}</td></tr>
      </table>
    </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [LEADS_INBOX],
        subject: `New Co-working enquiry: ${name}`,
        html,
        reply_to: String(email).trim(),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error ${res.status}: ${err}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Co-working enquiry error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
