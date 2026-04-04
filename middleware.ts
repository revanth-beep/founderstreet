import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSessionToken, adminCookieName } from "@/lib/auth-admin";
import { PATHNAME_HEADER } from "@/lib/request-path";

function forwardWithPathname(request: NextRequest, pathname: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, pathname);
  return requestHeaders;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = forwardWithPathname(request, pathname);

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request: { headers } });
  }

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next({ request: { headers } });
  }

  const token = request.cookies.get(adminCookieName())?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const ok = await verifyAdminSessionToken(token);
  if (!ok) {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete(adminCookieName());
    return res;
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
