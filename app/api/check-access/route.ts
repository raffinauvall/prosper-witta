import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, productId } = await req.json();

  const { data } = await supabase
    .from("access_requests")
    .select("status")
    .eq("email", email)
    .eq("product_id", productId)
    .eq("status", "approved")
    .maybeSingle();

  return NextResponse.json({
    hasAccess: !!data,
  });
}
