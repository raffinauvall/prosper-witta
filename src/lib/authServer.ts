import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) throw new Error("UNAUTHORIZED");

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { sub: string; username: string };
  } catch {
    throw new Error("INVALID_TOKEN");
  }
}
