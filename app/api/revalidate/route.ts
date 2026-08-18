import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Purges the cached (ISR) HTML for the main pages so a fresh copy is rendered
// on the next request. Limited to a fixed allowlist, so it is safe to call.
const ALLOWED = ["/", "/about", "/team", "/resources", "/contact", "/services/ai-pitch-deck"];

export async function GET() {
  for (const p of ALLOWED) revalidatePath(p);
  return NextResponse.json({ revalidated: ALLOWED, now: Date.now() });
}
