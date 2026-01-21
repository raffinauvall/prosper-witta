import { success } from "@/lib/api-response";
import { cookies } from "next/headers";

export async function POST() {
  // Ambil cookie store
  const cookieStore = await cookies();

  // Hapus cookie
  cookieStore.set({
    name: "session_token",
    value: "", // kosongkan value
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // expired
  });

  return success({ message: "Logged out" });
}
