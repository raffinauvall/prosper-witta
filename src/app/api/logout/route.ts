import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("session_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",      // ❌ path harus sama dengan cookie login
    maxAge: 0,      // ❌ maxAge 0 supaya cookie hilang
  });

  return res;
}
