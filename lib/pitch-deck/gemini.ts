// Calls Google Gemini (free tier) to turn a founder's raw pitch material into
// a structured, investor-ready deck outline.
import { getConfig } from "@/lib/app-config";

export type Slide = {
  title: string;
  subtitle?: string;
  bullets: string[];
};

export type DeckContent = {
  companyName: string;
  tagline: string;
  slides: Slide[];
};

export type GenerateInput = {
  companyName: string;
  oneLiner: string;
  industry: string;
  deckFormat: string;
  founderName: string;
  pastedText: string;
  pdfBase64?: string; // when the upload was a PDF, hand it straight to Gemini
};

const MODEL = "gemini-2.5-flash";

function buildPrompt(input: GenerateInput): string {
  return `You are a top-tier venture pitch consultant at a firm that has prepared decks for companies that raised from Sequoia, Accel and Peak XV. Create a compelling, investor-ready pitch deck OUTLINE for the startup described below.

Founder name: ${input.founderName || "the founder"}
Company / startup name: ${input.companyName || "(infer from material)"}
One-liner: ${input.oneLiner || "(infer from material)"}
Industry: ${input.industry || "(infer)"}
Deck purpose: ${input.deckFormat || "Investor pitch (seed)"}

Additional pitch material provided by the founder (may be empty; a PDF may also be attached):
"""
${(input.pastedText || "").slice(0, 12000)}
"""

Produce a 12-slide deck using this proven structure, in order:
1. Cover, 2. Problem, 3. Solution, 4. Market Opportunity (with a TAM/SAM/SOM style framing), 5. Product / How it works, 6. Business Model, 7. Traction / Milestones, 8. Go-to-Market, 9. Competition, 10. Team, 11. Financials / Projections, 12. The Ask.

Rules:
- Write specific, confident, concrete content grounded in the founder's material. Where a number is unknown, use a clearly reasonable placeholder in [square brackets] the founder can replace.
- Each content slide: a short punchy title, an optional one-line subtitle, and 3 to 5 crisp bullet points (each under 18 words).
- The cover slide: title = the company name, subtitle = a sharp 6-10 word tagline, and an empty bullets array.
- No markdown, no asterisks. Plain text only.

Return ONLY valid JSON in exactly this shape:
{"companyName":"...","tagline":"...","slides":[{"title":"...","subtitle":"...","bullets":["...","..."]}]}`;
}

export async function generateDeckContent(input: GenerateInput): Promise<DeckContent> {
  // Prefer the Vercel env var; fall back to the key saved in the admin panel (DB).
  const apiKey = process.env.GEMINI_API_KEY || (await getConfig("gemini_api_key"));
  if (!apiKey) throw new Error("No Gemini API key configured. Add it in Admin → Settings.");

  const parts: Record<string, unknown>[] = [{ text: buildPrompt(input) }];
  if (input.pdfBase64) {
    parts.push({ inlineData: { mimeType: "application/pdf", data: input.pdfBase64 } });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.6, maxOutputTokens: 4096 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const raw = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";

  let parsed: DeckContent;
  try {
    parsed = JSON.parse(raw) as DeckContent;
  } catch {
    // Best-effort: pull the first {...} block out of the response.
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("Gemini did not return valid JSON.");
    parsed = JSON.parse(m[0]) as DeckContent;
  }

  const companyName = (parsed.companyName || input.companyName || "Your Startup").trim();
  const tagline = (parsed.tagline || input.oneLiner || "").trim();
  const slides = Array.isArray(parsed.slides) ? parsed.slides.filter((s) => s && s.title) : [];
  if (slides.length === 0) throw new Error("Gemini returned an empty deck.");

  return { companyName, tagline, slides };
}
