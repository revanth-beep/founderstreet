import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-admin";
import { getConfig, setConfig } from "@/lib/app-config";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  const gemini = await getConfig("gemini_api_key");
  return NextResponse.json({
    geminiSet: !!gemini,
    geminiMasked: gemini ? `${gemini.slice(0, 6)}…${gemini.slice(-4)}` : "",
  });
}

export async function POST(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  let body: { geminiApiKey?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const key = String(body.geminiApiKey ?? "").trim();
  if (!key) return NextResponse.json({ error: "API key is required" }, { status: 400 });
  const ok = await setConfig("gemini_api_key", key);
  if (!ok) {
    return NextResponse.json({ error: "No database is connected, so the key cannot be saved." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
