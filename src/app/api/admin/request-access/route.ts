import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";

export async function GET() {
  try {
    await verifyAdmin();

    const { data, error } = await supabaseAdmin
      .from("document_access_requests")
      .select("*, products(name)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
