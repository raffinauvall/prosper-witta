import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  await supabase
    .from("document_access_requests")
    .update({
      status: "rejected",
      decided_at: new Date().toISOString(),
    })
    .eq("token", token);

  return NextResponse.redirect(
    `${process.env.APP_URL}/approval-rejected`
  );
}
