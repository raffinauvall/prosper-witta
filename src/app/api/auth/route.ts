import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { successWithCookies, failure } from "@/lib/api-response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getClientIp, isCurrentlyRateLimited, recordRateLimitAttempt } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const ip = getClientIp(req);
    const rateLimitKey = `login:${ip}:${username}`;

    if (!username || !password) return failure("Invalid credentials", 400);

    if (isCurrentlyRateLimited(rateLimitKey, 5)) {
      return failure("Too many login attempts", 429);
    }

    const { data: admin, error } = await supabaseAdmin
      .from("admin")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error("LOGIN SUPABASE ERROR:", {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      return failure("Authentication service unavailable", 500);
    }

    if (!admin) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("LOGIN DEBUG: admin row not found for submitted username");
      }
      recordRateLimitAttempt(rateLimitKey, 10 * 60 * 1000);
      return failure("Invalid credentials", 401);
    }

    if (typeof admin.password !== "string") {
      console.error("LOGIN CONFIG ERROR: admin.password is missing or invalid");
      return failure("Authentication service unavailable", 500);
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("LOGIN DEBUG: password did not match stored hash");
      }
      recordRateLimitAttempt(rateLimitKey, 10 * 60 * 1000);
      return failure("Invalid credentials", 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("LOGIN CONFIG ERROR: JWT_SECRET is missing");
      return failure("Authentication service unavailable", 500);
    }

    const token = jwt.sign(
      { sub: admin.id, username: admin.username },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return successWithCookies(
      { user: { id: admin.id, username: admin.username } },
      (res) => {
        res.cookies.set({
          name: "session_token",
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24,
        });
      }
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return failure("Server error", 500);
  }
}
