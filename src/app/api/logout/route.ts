import { success } from "@/lib/api-response";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); 

  cookieStore.set("session_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return success({ message: "Logged out" });
}
