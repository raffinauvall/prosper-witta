import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// PATH yang mau dilindungi
const protectedPaths = ["/products"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cek apakah path yang diakses termasuk protected
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Ambil token dari cookies
  const token = req.cookies.get("access_token");

  if (!token) {
    const redirectUrl = new URL("/request-access", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*"],
};
