import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token)
    return NextResponse.json({ error: "Missing token" });

  const { data, error } = await supabase
    .from("access_requests")
    .update({ status: "approved" })
    .eq("token", token)
    .select()
    .single();

  if (error || !data)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  return NextResponse.json({ approved: true });
}
