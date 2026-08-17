import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { del } from "@vercel/blob";
import { PDFDocument } from "pdf-lib";
import { analyzeDeck } from "@/lib/pitch-deck/analyze";

const MAX_DECK_PAGES = 30;

// A pitch deck is short. If someone uploads a very long PDF, keep only the
// leading slides so the analysis stays fast and on-point.
async function capPdfPages(base64: string): Promise<string> {
  try {
    const src = await PDFDocument.load(Buffer.from(base64, "base64"), { ignoreEncryption: true });
    if (src.getPageCount() <= MAX_DECK_PAGES) return base64;
    const out = await PDFDocument.create();
    const pages = await out.copyPages(src, Array.from({ length: MAX_DECK_PAGES }, (_, i) => i));
    pages.forEach((p) => out.addPage(p));
    return Buffer.from(await out.save()).toString("base64");
  } catch {
    return base64; // if it can't be parsed, hand the original to the analyzer
  }
}

export const runtime = "nodejs";
export const maxDuration = 300;

const FROM_ADDRESS = "FounderStreet <hi@founderstreet.in>";
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

type UploadFile = { name?: string; type?: string; base64?: string } | null;

async function extractFromFile(file: UploadFile): Promise<{ pdfBase64?: string; text: string }> {
  if (!file || !file.base64) return { text: "" };
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  try {
    if (type.includes("pdf") || name.endsWith(".pdf")) return { pdfBase64: await capPdfPages(file.base64), text: "" };
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
  let blobUrl = "";
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    blobUrl = String(body.blobUrl ?? "").trim();
    const fileName = String(body.fileName ?? "pitch-deck").trim();
    const fileType = String(body.fileType ?? "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!blobUrl) {
      return NextResponse.json({ error: "Please upload your pitch deck (PDF)." }, { status: 400 });
    }

    // Pull the uploaded deck back from temporary Blob storage.
    const dl = await fetch(blobUrl);
    if (!dl.ok) {
      return NextResponse.json({ error: "We couldn't read your upload. Please try again." }, { status: 400 });
    }
    const base64 = Buffer.from(await dl.arrayBuffer()).toString("base64");
    const file: UploadFile = { name: fileName, type: fileType, base64 };

    // 1. Send the lead details (and the uploaded deck) to the team inbox.
    try {
      // Resend caps total email size ~40 MB; only attach decks that comfortably fit.
      const canAttach = file.base64 && file.base64.length < 25_000_000;
      const fileMb = file.base64 ? (file.base64.length * 3) / 4 / (1024 * 1024) : 0;
      const attachments = canAttach
        ? [{ filename: (file.name || "pitch-deck").replace(/[^a-z0-9._-]+/gi, "_"), content: file.base64 as string }]
        : [];
      const attachNote = canAttach
        ? "Their uploaded deck is attached."
        : `Their deck (~${fileMb.toFixed(0)} MB) was too large to attach. Reach out to request it directly.`;
      const esc = (s: string) => String(s).replace(/</g, "&lt;");
      await resendSend({
        from: FROM_ADDRESS,
        to: [LEADS_INBOX],
        subject: `New Pitch Deck Analyzer lead: ${name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:520px;">
          <h3 style="color:#1B4332;">New Pitch Deck Analyzer lead</h3>
          <p style="color:#5A5A5A;">${attachNote}</p>
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
  } finally {
    // The uploaded deck is temporary only — remove it from storage once processed.
    if (blobUrl) {
      try { await del(blobUrl); } catch (e) { console.error("Blob cleanup failed:", e); }
    }
  }
}
