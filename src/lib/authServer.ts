import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  // ❌ token ga ada → redirect
  if (!token) {
    redirect("/login");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      username: string;
    };
  } catch {
    // ❌ token invalid → redirect juga
    redirect("/login");
  }
}
