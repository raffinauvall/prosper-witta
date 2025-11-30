import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Invalid or missing token" }, { status: 400 });
    }

    // Update status → approved
    const { data: updated, error: updateError } = await supabase
      .from("access_requests")
      .update({ status: "approved" })
      .eq("token", token)
      .select(); // select() supaya supabase return data

    if (updateError) {
      console.error("Failed to approve request:", updateError);
      return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
    }

    if (!updated || updated.length === 0) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Access approved" });
  } catch (err) {
    console.error("Approve error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
