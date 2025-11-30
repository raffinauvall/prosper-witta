import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json({ hasAccess: false }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("access_requests")
      .select("status")
      .eq("email", email)
      .eq("product_id", productId)
      .single();

    if (error || !data) return NextResponse.json({ hasAccess: false });

    return NextResponse.json({ hasAccess: data.status === "approved" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hasAccess: false });
  }
}
