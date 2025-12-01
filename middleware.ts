import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ROUTE YANG DI-PROTEKSI (HANYA INI!)
  const protectedRoutes = ["/access-request", "/approve"];

  const isProtected = protectedRoutes.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // ambil email dari cookie
  const email = req.cookies.get("approved_email")?.value;

  // kalau belum ada cookie → redirect ke request access
  if (!email && pathname !== "/request-access") {
    return NextResponse.redirect(new URL("/request-access", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/access-request/:path*", "/approve/:path*"],
};
