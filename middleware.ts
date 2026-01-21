import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // baca cookie dengan aman
  const token = req.cookies.get("session_token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // Fungsi helper untuk redirect
  const redirectTo = (url: string) => NextResponse.redirect(new URL(url, req.url));

  // === CASE 1: akses halaman admin ===
  if (isAdminRoute) {
    if (!token) {
      // kalau sudah di /login jangan redirect lagi
      if (pathname !== "/login") return redirectTo("/login");
      return NextResponse.next();
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      // token invalid, redirect ke /login tapi jangan loop
      if (pathname !== "/login") return redirectTo("/login");
      return NextResponse.next();
    }
  }

  // === CASE 2: akses halaman login tapi sudah login ===
  if (isLoginPage && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      // token valid, redirect ke /admin
      return redirectTo("/admin");
    } catch {
      // token invalid, biarkan tetap di login page
      return NextResponse.next();
    }
  }

  // === CASE 3: semua route lain ===
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
