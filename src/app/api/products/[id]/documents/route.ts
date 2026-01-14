import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = id;

    const msdsPath = `msds/product-${productId}.pdf`;
    const tdsPath = `tds/product-${productId}.pdf`;

    const { data: msds } = await supabaseAdmin.storage
      .from("documents")
      .list("msds", { search: `product-${productId}` });

    const { data: tds } = await supabaseAdmin.storage
      .from("documents")
      .list("tds", { search: `product-${productId}` });

    return NextResponse.json({
      msds: (msds ?? []).length > 0,
      tds: (tds ?? []).length > 0,
    });
  } catch (error) {
    console.error("DOCUMENT CHECK ERROR:", error);
    return NextResponse.json(
      { msds: false, tds: false },
      { status: 500 }
    );
  }
}
