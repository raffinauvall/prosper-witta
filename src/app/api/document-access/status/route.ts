import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productId = searchParams.get("productId");
  const type = searchParams.get("type");
  const deviceToken = req.headers.get("x-device-token"); // ✅ FIX

  if (!productId || !type || !deviceToken) {
    console.log("❌ Missing params", { productId, type, deviceToken });
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("document_access_requests")
    .select("status")
    .eq("product_id", Number(productId))
    .eq("device_token", deviceToken)
    .eq("type", type)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("STATUS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    status: data?.status ?? "none",
  });
}
