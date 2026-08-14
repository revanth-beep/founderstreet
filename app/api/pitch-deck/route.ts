import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { analyzeDeck } from "@/lib/pitch-deck/analyze";

export const runtime = "nodejs";
export const maxDuration = 60;

const FROM_ADDRESS = "FounderStreet <hi@founderstreet.in>";
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

type UploadFile = { name?: string; type?: string; base64?: string } | null;

async function extractFromFile(file: UploadFile): Promise<{ pdfBase64?: string; text: string }> {
  if (!file || !file.base64) return { text: "" };
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  try {
    if (type.includes("pdf") || name.endsWith(".pdf")) return { pdfBase64: file.base64, text: "" };
    if (type.includes("wordprocessingml") || name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(file.base64, "base64") });
      return { text: result.value || "" };
    }
    if (type.startsWith("text/") || name.endsWith(".txt")) {
      return { text: Buffer.from(file.base64, "base64").toString("utf8") };
    }
  } catch (e) {
    console.error("File extraction failed:", e);
  }
  return { text: "" };
}

async function resendSend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.warn("RESEND_API_KEY not set — skipping email"); return; }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const file = (body.file ?? null) as UploadFile;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!file || !file.base64) {
      return NextResponse.json({ error: "Please upload your pitch deck (PDF)." }, { status: 400 });
    }

    // 1. Send the lead details (and the uploaded deck) to the team inbox.
    try {
      const attachments = file.base64
        ? [{ filename: (file.name || "pitch-deck").replace(/[^a-z0-9._-]+/gi, "_"), content: file.base64 }]
        : [];
      const esc = (s: string) => String(s).replace(/</g, "&lt;");
      await resendSend({
        from: FROM_ADDRESS,
        to: [LEADS_INBOX],
        subject: `New Pitch Deck Analyzer lead: ${name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:520px;">
          <h3 style="color:#1B4332;">New Pitch Deck Analyzer lead</h3>
          <p style="color:#5A5A5A;">Their uploaded deck is attached.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;">Name</td><td style="padding:8px 12px;border:1px solid #E0E0DC;">${esc(name)}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #E0E0DC;">${esc(email)}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;">Phone</td><td style="padding:8px 12px;border:1px solid #E0E0DC;">${esc(phone)}</td></tr>
          </table>
        </div>`,
        attachments,
        reply_to: email,
      });
    } catch (e) {
      console.error("Analyzer lead email failed:", e);
    }

    // 2. Analyse the deck and return the score to the user.
    const extracted = await extractFromFile(file);
    const analysis = await analyzeDeck(extracted.pdfBase64, extracted.text);

    return NextResponse.json({ ok: true, analysis });
  } catch (e) {
    console.error("Pitch deck analysis error:", e);
    const msg = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
