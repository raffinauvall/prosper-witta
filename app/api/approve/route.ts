import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("access_requests")
    .update({ status: "approved" })
    .eq("token", token)
    .select()
    .single();

  if (error || !data) {
    console.error("Approve error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

 
  const response = NextResponse.redirect(new URL("/products", req.url));

  // SET COOKIE
  response.cookies.set("access_token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 hari
  });

  return response;
}
