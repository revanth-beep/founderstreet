import { NextRequest, NextResponse } from "next/server";
import { signAdminSession, setAdminCookieOnResponse } from "@/lib/auth-admin";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const expected = adminPassword ?? "dev";
  if (!body.password || body.password !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminSession();
  const res = NextResponse.json({ ok: true });
  setAdminCookieOnResponse(res, token);
  return res;
}
