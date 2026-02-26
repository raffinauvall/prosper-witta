import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { success, failure } from "@/lib/api-response";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await context.params; 

    const { data: msds } = await supabaseAdmin.storage
      .from("documents")
      .list("msds", { search: `product-${productId}` });

    const { data: tds } = await supabaseAdmin.storage
      .from("documents")
      .list("tds", { search: `product-${productId}` });

    return success({
      msds: (msds ?? []).length > 0,
      tds: (tds ?? []).length > 0,
    });
  } catch (err) {
    console.error(err);
    return failure("Failed to check documents", 500);
  }
}
