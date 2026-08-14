// Design themes and font pairings for the AI pitch deck generator.
// Colours are stored as 6-char hex (no leading #) so they work for both
// pptxgenjs (hex string) and pdf-lib (converted to 0-1 rgb).

export type DeckTheme = {
  id: string;
  name: string;
  accent: string; // brand/accent colour
  dark: string;   // deep background for cover / section slides
  light: string;  // light background for content slides
  ink: string;    // primary text on light
  muted: string;  // secondary text on light
};

export const THEMES: DeckTheme[] = [
  { id: "emerald", name: "Emerald", accent: "66BB3F", dark: "15251B", light: "F7F9F6", ink: "20342A", muted: "5A6B60" },
  { id: "midnight", name: "Midnight & Gold", accent: "D4AF37", dark: "0E1A2B", light: "F6F7FA", ink: "16233A", muted: "5C6B82" },
  { id: "slate", name: "Minimal Slate", accent: "2563EB", dark: "111827", light: "F8FAFC", ink: "0F172A", muted: "64748B" },
  { id: "coral", name: "Bold Coral", accent: "F0553B", dark: "1E1214", light: "FBF7F7", ink: "2A1A1C", muted: "6B5458" },
];

export type DeckFont = {
  id: string;
  name: string;
  pptHead: string;
  pptBody: string;
  // pdf-lib StandardFonts keys
  pdfHead: "TimesRomanBold" | "HelveticaBold";
  pdfBody: "Helvetica" | "TimesRoman";
};

export const FONTS: DeckFont[] = [
  { id: "editorial", name: "Editorial (serif headings)", pptHead: "Georgia", pptBody: "Calibri", pdfHead: "TimesRomanBold", pdfBody: "Helvetica" },
  { id: "modern", name: "Modern (clean sans)", pptHead: "Trebuchet MS", pptBody: "Calibri", pdfHead: "HelveticaBold", pdfBody: "Helvetica" },
  { id: "classic", name: "Classic (all serif)", pptHead: "Georgia", pptBody: "Georgia", pdfHead: "TimesRomanBold", pdfBody: "TimesRoman" },
];

export const INDUSTRIES = [
  "B2B SaaS", "D2C / Consumer Brand", "FinTech", "HealthTech", "EdTech",
  "Marketplace / Platform", "Deep Tech / AI", "Services / Consulting", "Other",
];

export const DECK_FORMATS = [
  "Investor pitch (pre-seed / seed)",
  "Investor pitch (Series A)",
  "Sales / partnership deck",
  "Demo day / accelerator",
];

export function themeById(id: string): DeckTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
export function fontById(id: string): DeckFont {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}

// hex (RRGGBB) -> {r,g,b} in 0..1 for pdf-lib
export function hexToRgb01(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace(/^#/, "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}
