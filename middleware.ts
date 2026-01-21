import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");

  // Proteksi route admin
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete({ name: "session_token", path: "/" });
      return res;
    }
  }

  // Semua route lain (termasuk /login) biarkan Next.js handle normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // hanya proteksi admin
};
