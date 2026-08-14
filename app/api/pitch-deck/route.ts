import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { generateDeckContent } from "@/lib/pitch-deck/gemini";
import { renderPptx } from "@/lib/pitch-deck/render-pptx";
import { renderPdf } from "@/lib/pitch-deck/render-pdf";
import { themeById, fontById } from "@/lib/pitch-deck/themes";

export const runtime = "nodejs";
export const maxDuration = 60;

const FROM_ADDRESS = "FounderStreet <hi@founderstreet.in>";
const LEADS_INBOX = process.env.LEADS_INBOX_EMAIL || "hi@founderstreet.in";

type UploadFile = { name?: string; type?: string; base64?: string } | null;

function safeName(s: string): string {
  return (s || "pitch").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "pitch";
}

async function extractFromFile(file: UploadFile): Promise<{ pdfBase64?: string; text: string }> {
  if (!file || !file.base64) return { text: "" };
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  try {
    if (type.includes("pdf") || name.endsWith(".pdf")) {
      return { pdfBase64: file.base64, text: "" };
    }
    if (type.includes("wordprocessingml") || name.endsWith(".docx")) {
      const buffer = Buffer.from(file.base64, "base64");
      const result = await mammoth.extractRawText({ buffer });
      return { text: result.value || "" };
    }
    if (type.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".md")) {
      return { text: Buffer.from(file.base64, "base64").toString("utf8") };
    }
  } catch (e) {
    console.error("File extraction failed:", e);
  }
  return { text: "" };
}

async function resendSend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping pitch-deck email");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err.slice(0, 400)}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const companyName = String(body.companyName ?? "").trim();
    const oneLiner = String(body.oneLiner ?? "").trim();
    const industry = String(body.industry ?? "").trim();
    const deckFormat = String(body.deckFormat ?? "").trim();
    const pastedText = String(body.pastedText ?? "").trim();
    const format = ["pdf", "pptx", "both"].includes(body.format) ? body.format : "pdf";
    const theme = themeById(String(body.theme ?? "emerald"));
    const font = fontById(String(body.font ?? "editorial"));
    const file = (body.file ?? null) as UploadFile;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email and phone are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!companyName && !oneLiner && !pastedText && !file) {
      return NextResponse.json({ error: "Please add some details about your startup or upload a file." }, { status: 400 });
    }

    const extracted = await extractFromFile(file);

    const deck = await generateDeckContent({
      companyName, oneLiner, industry, deckFormat,
      founderName: name,
      pastedText: [pastedText, extracted.text].filter(Boolean).join("\n\n"),
      pdfBase64: extracted.pdfBase64,
    });

    const slug = safeName(deck.companyName);
    const attachments: { filename: string; content: string }[] = [];
    if (format === "pdf" || format === "both") {
      attachments.push({ filename: `${slug}-pitch-deck.pdf`, content: await renderPdf(deck, theme, font, name) });
    }
    if (format === "pptx" || format === "both") {
      attachments.push({ filename: `${slug}-pitch-deck.pptx`, content: await renderPptx(deck, theme, font, name) });
    }

    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;">
      <h2 style="color:#1B4332;">Hi ${name.replace(/</g, "")}, your pitch deck is ready.</h2>
      <p style="color:#5A5A5A;line-height:1.7;">We turned your details into a ${deck.slides.length}-slide investor-ready deck for <strong>${(deck.companyName || "your startup").replace(/</g, "")}</strong>, styled in your chosen theme. It is attached to this email.</p>
      <p style="color:#5A5A5A;line-height:1.7;">This is an AI-generated first draft. Placeholders in [brackets] are yours to replace. Want our team to polish it into a fundraise-ready deck? Just reply to this email.</p>
      <p style="color:#A0A0A0;font-size:12px;margin-top:20px;">FounderStreet, by Northville Consulting Group.</p>
    </div>`;

    await resendSend({
      from: FROM_ADDRESS,
      to: [email],
      subject: `${name}, your ${deck.companyName || "startup"} pitch deck from FounderStreet`,
      html,
      attachments,
      reply_to: LEADS_INBOX,
    });

    // Internal lead copy WITH the generated deck attached (best-effort)
    try {
      await resendSend({
        from: FROM_ADDRESS,
        to: [LEADS_INBOX],
        subject: `New AI pitch deck lead: ${name} (${deck.companyName || "startup"})`,
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;">
          <h3 style="color:#1B4332;">New AI Pitch Deck lead</h3>
          <p style="color:#5A5A5A;">The generated deck is attached to this email.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            ${[
              ["Name", name],
              ["Email", email],
              ["Phone", phone],
              ["Company", companyName || "N/A"],
              ["Industry", industry || "N/A"],
              ["Deck purpose", deckFormat || "N/A"],
              ["Theme / font / format", `${theme.name} / ${font.name} / ${format}`],
            ].map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #E0E0DC;font-weight:600;color:#3d4246;white-space:nowrap;">${String(k).replace(/</g, "")}</td><td style="padding:8px 12px;border:1px solid #E0E0DC;color:#5A5A5A;">${String(v).replace(/</g, "")}</td></tr>`).join("")}
          </table>
        </div>`,
        attachments,
        reply_to: email,
      });
    } catch (e) {
      console.error("Pitch-deck lead notification failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Pitch deck generation error:", e);
    const msg = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
