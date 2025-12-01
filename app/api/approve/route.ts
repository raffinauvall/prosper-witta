import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

  if (error) {
    console.error("Approve error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
