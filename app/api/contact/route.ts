import { NextRequest, NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/contact-submissions";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON");
  }

  if (!body || typeof body !== "object") {
    return bad("Invalid body");
  }

  const o = body as Record<string, unknown>;
  const firstName = typeof o.firstName === "string" ? o.firstName : "";
  const lastName = typeof o.lastName === "string" ? o.lastName : "";
  const email = typeof o.email === "string" ? o.email : "";
  const phone = typeof o.phone === "string" ? o.phone : "";
  const service = typeof o.service === "string" ? o.service : "";
  const stage = typeof o.stage === "string" ? o.stage : "";
  const message = typeof o.message === "string" ? o.message : "";

  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    return bad("Name and email are required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return bad("Invalid email address");
  }
  if (!service.trim() || !stage.trim() || !message.trim()) {
    return bad("Please complete all required fields");
  }

  try {
    const row = await createContactSubmission({
      firstName,
      lastName,
      email,
      phone,
      service,
      stage,
      message,
    });
    if (!row) {
      return NextResponse.json(
        { error: "Could not save your enquiry. The server may not be connected to a database yet." },
        { status: 503 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed";
    return bad(msg, 400);
  }
}
