import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-admin";
import { getSiteContent, patchSiteContent, saveMergedSiteContent } from "@/lib/site-content";

export async function GET(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  try {
    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load site content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  try {
    const body = await request.json();
    const partial = body.content ?? body.data;
    const merged = await saveMergedSiteContent(partial);
    return NextResponse.json({ ok: true, content: merged });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

/** Partial update (recommended for section forms — does not wipe other sections). */
export async function PATCH(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;
  try {
    const body = await request.json();
    const patch = body.patch ?? body.partial;
    if (!patch || typeof patch !== "object") {
      return NextResponse.json({ error: "Expected { patch: { ... } }" }, { status: 400 });
    }
    const merged = await patchSiteContent(patch as Record<string, unknown>);
    return NextResponse.json({ ok: true, content: merged });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
