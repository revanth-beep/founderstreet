import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM = `You are a company formation expert specialising in Indian company law (Companies Act 2013 and LLP Act 2008).
A founder has answered 3 questions. Based on their answers, recommend exactly ONE entity type: Private Limited (Pvt Ltd), Limited Liability Partnership (LLP), or One Person Company (OPC).

Respond ONLY with a JSON object in this exact shape:
{
  "entity": "Pvt Ltd" | "LLP" | "OPC",
  "reason": "One concise sentence explaining the key reason for this recommendation.",
  "ctaLabel": "Start Pvt Ltd Registration" | "Start LLP Registration" | "Start OPC Registration"
}

Decision logic:
- Pvt Ltd: 2+ partners AND (wants VC funding OR foreign investment) → always Pvt Ltd
- Pvt Ltd: wants ESOPs or multiple shareholders → Pvt Ltd
- LLP: professional services / consulting / no equity fundraising planned → LLP
- OPC: solo founder, no partners, small business, not planning VC funding → OPC
- When in doubt between Pvt Ltd and LLP, choose Pvt Ltd (investor-compatible)`;

type EntityResult = { entity: string; reason: string; ctaLabel: string };

const FALLBACK: Record<string, EntityResult> = {
  "pvtltd-vc": { entity: "Pvt Ltd", reason: "You have co-founders and plan to raise VC funding, making Private Limited the only investor-compatible structure.", ctaLabel: "Start Pvt Ltd Registration" },
  "pvtltd-foreign": { entity: "Pvt Ltd", reason: "Foreign investment requires a Private Limited structure under FEMA regulations.", ctaLabel: "Start Pvt Ltd Registration" },
  "llp": { entity: "LLP", reason: "For a professional services business without equity fundraising plans, an LLP offers lower compliance costs.", ctaLabel: "Start LLP Registration" },
  "opc": { entity: "OPC", reason: "As a solo founder with no immediate funding plans, an OPC gives you limited liability with simpler compliance.", ctaLabel: "Start OPC Registration" },
};

function fallbackRecommend(partners: string, funding: string, foreign: string): EntityResult {
  if (foreign === "yes") return FALLBACK["pvtltd-foreign"];
  if (funding === "yes") return FALLBACK["pvtltd-vc"];
  if (partners === "solo") return FALLBACK["opc"];
  return FALLBACK["llp"];
}

export async function POST(req: NextRequest) {
  try {
    const { partners, funding, foreign } = await req.json() as { partners: string; funding: string; foreign: string };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(fallbackRecommend(partners, funding, foreign));
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Number of founders/partners: ${partners}\nPlanning to raise VC funding: ${funding}\nPlanning foreign investment: ${foreign}`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 150,
      temperature: 0.2,
    });

    const data = JSON.parse(res.choices[0]?.message?.content ?? "{}") as EntityResult;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(fallbackRecommend("2+", "yes", "no"));
  }
}
