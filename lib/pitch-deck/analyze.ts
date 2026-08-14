// Uses Google Gemini to analyse an uploaded pitch deck and return a score out of 100.
import { getConfig } from "@/lib/app-config";

const MODELS = ["gemini-3-flash-preview", "gemini-flash-lite-latest", "gemini-flash-latest"];

export type Category = { name: string; score: number; max: number; note: string };
export type SlideCheck = { name: string; present: boolean; note: string };
export type DeckAnalysis = {
  overallScore: number;
  verdict: string;
  summary: string;
  categories: Category[];
  slides: SlideCheck[];
  topFixes: string[];
};

export const EXPECTED_SLIDES = [
  "Cover", "Problem", "Market Size", "Solution", "Product Overview", "Product Detail",
  "Business Model", "Traction", "Competition", "Go-to-Market", "Financials", "Projections",
  "Roadmap", "Team", "Funding Ask", "Closing",
];

function buildPrompt(extractedText: string): string {
  return `You are a Managing Director at a world-class, billion-dollar pitch deck advisory firm that has reviewed thousands of decks for Sequoia, Accel, Peak XV and Tiger Global. Review the founder's pitch deck (attached as a PDF, and/or the extracted text below) and produce a rigorous, professional scorecard.

Score the deck out of 100, as five categories worth 20 points each:
1. Spelling
2. Grammar
3. Design & Visual Craft (layout, hierarchy, consistency, use of visuals over paragraphs)
4. Readability & Clarity (is the story easy to follow, is text concise)
5. Slide Structure & Completeness (does it cover the standard investor flow)

For "Slide Structure", check the deck against these 16 canonical slides. A slide counts as present if the deck covers that idea under any similar name:
${EXPECTED_SLIDES.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Guidance:
- Be honest, specific and constructive, in the polished, confident voice of a top-tier advisor. No slang, no filler.
- Each category note: one crisp sentence naming the single most important observation.
- topFixes: the 3 highest-impact improvements, each under 16 words.
- verdict: a punchy one-line verdict (e.g. "Strong foundation, needs a sharper ask").
- summary: 2 sentences on the overall standard of the deck.

Extracted deck text (may be empty if a PDF is attached):
"""
${(extractedText || "").slice(0, 14000)}
"""

Return ONLY valid JSON in exactly this shape:
{"overallScore":0,"verdict":"...","summary":"...","categories":[{"name":"Spelling","score":0,"max":20,"note":"..."},{"name":"Grammar","score":0,"max":20,"note":"..."},{"name":"Design & Visual Craft","score":0,"max":20,"note":"..."},{"name":"Readability & Clarity","score":0,"max":20,"note":"..."},{"name":"Slide Structure & Completeness","score":0,"max":20,"note":"..."}],"slides":[{"name":"Cover","present":true,"note":"..."}],"topFixes":["...","...","..."]}`;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export async function analyzeDeck(pdfBase64: string | undefined, extractedText: string): Promise<DeckAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY || (await getConfig("gemini_api_key"));
  if (!apiKey) throw new Error("No Gemini API key configured. Add it in Admin → Settings.");

  const parts: Record<string, unknown>[] = [{ text: buildPrompt(extractedText) }];
  if (pdfBase64) parts.push({ inlineData: { mimeType: "application/pdf", data: pdfBase64 } });

  const requestBody = JSON.stringify({
    contents: [{ role: "user", parts }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.3, maxOutputTokens: 4096 },
  });

  type GeminiResponse = { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  let data: GeminiResponse | null = null;
  let lastErr = "";
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: requestBody });
    if (res.ok) { data = (await res.json()) as GeminiResponse; break; }
    lastErr = `${res.status}: ${(await res.text()).slice(0, 300)}`;
  }
  if (!data) throw new Error(`Gemini error ${lastErr}`);

  const raw = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  let parsed: Partial<DeckAnalysis>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("The analyzer could not read this deck. Please upload a valid PDF.");
    parsed = JSON.parse(m[0]);
  }

  const categories: Category[] = (Array.isArray(parsed.categories) ? parsed.categories : []).map((c) => ({
    name: String(c?.name ?? "Category"),
    score: clamp(Number(c?.score), 0, Number(c?.max) || 20),
    max: Number(c?.max) || 20,
    note: String(c?.note ?? ""),
  }));

  const slides: SlideCheck[] = EXPECTED_SLIDES.map((name) => {
    const found = (Array.isArray(parsed.slides) ? parsed.slides : []).find(
      (s) => String(s?.name ?? "").toLowerCase().includes(name.toLowerCase().split(" ")[0])
    );
    return { name, present: !!found?.present, note: String(found?.note ?? "") };
  });

  const overallFromCats = categories.reduce((a, c) => a + c.score, 0);
  const overallScore = categories.length ? clamp(overallFromCats, 0, 100) : clamp(Number(parsed.overallScore), 0, 100);

  return {
    overallScore,
    verdict: String(parsed.verdict ?? "").trim(),
    summary: String(parsed.summary ?? "").trim(),
    categories,
    slides,
    topFixes: (Array.isArray(parsed.topFixes) ? parsed.topFixes : []).map(String).filter(Boolean).slice(0, 5),
  };
}
