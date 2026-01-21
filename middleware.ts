import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // --- Proteksi route admin ---
  if (isAdminRoute) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      // token invalid → redirect login tanpa hapus cookie (biar SSR/next bisa set ulang)
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // --- Proteksi halaman login ---
  if (isLoginPage && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // invalid token → biarkan bisa login
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// matcher untuk route yang dilindungi
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
