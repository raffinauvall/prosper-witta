import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ hasAccess: false });

    const cookieStore = await cookies();
    const deviceToken = cookieStore.get("device_token")?.value;
    if (!deviceToken) return NextResponse.json({ hasAccess: false });

    const { data, error } = await supabase
      .from("access_requests")
      .select("status")
      .eq("product_id", productId)
      .eq("device_token", deviceToken)
      .single();

    if (error || data?.status !== "approved") return NextResponse.json({ hasAccess: false });

    return NextResponse.json({ hasAccess: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ hasAccess: false });
  }
}
