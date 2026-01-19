import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = Number(searchParams.get("productId"));
  const type = searchParams.get("type");
  const deviceToken = req.headers.get("x-device-token");

  if (!productId || !type || !deviceToken) {
    return NextResponse.json({ status: "none", accessId: null });
  }

  const { data, error } = await supabaseAdmin
    .from("document_access_requests")
    .select("id,status")
    .eq("product_id", productId)
    .eq("type", type)
    .eq("device_token", deviceToken)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) {
    return NextResponse.json({ status: "none", accessId: null });
  }

  return NextResponse.json({
    status: data.status,
    accessId: data.status === "approved" ? data.id : null, // <-- ambil id disini
  });
}
