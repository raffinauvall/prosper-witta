import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AdminSession = {
  sub: string;
  username: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, secret) as AdminSession;
  } catch {
    return null;
  }
}
