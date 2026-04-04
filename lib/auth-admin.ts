import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE = "fs_admin";

function getSecretBytes(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (s) return new TextEncoder().encode(s);
  if (process.env.NODE_ENV === "development") {
    return new TextEncoder().encode("dev-only-change-in-production-min-32-chars!!");
  }
  // Production without secrets: sessions never validate until env is set.
  return new TextEncoder().encode("__set_ADMIN_JWT_SECRET_on_vercel__");
}

export async function signAdminSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretBytes());
}

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecretBytes());
    return true;
  } catch {
    return false;
  }
}

export function adminCookieName(): string {
  return COOKIE;
}

export function setAdminCookieOnResponse(res: NextResponse, token: string): void {
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie(res: NextResponse): void {
  res.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ok = await verifyAdminSessionToken(token);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
