import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { failure } from "@/lib/api-response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (!username || !password) return failure("Invalid credentials", 400);

    const { data: admin, error } = await supabaseAdmin
      .from("admin")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !admin) return failure("Invalid credentials", 401);

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return failure("Invalid credentials", 401);

    const token = jwt.sign(
      { sub: admin.id, username: admin.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const res = NextResponse.redirect("/admin"); // redirect setelah login
    res.cookies.set({
      name: "session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return failure("Server error", 500);
  }
}
