import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) => {
  const { id } = await context.params; 
  const productId = Number(id);

  if (!productId || isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  // hapus relasi dulu
  const { error: mappingError } = await supabase
    .from("product_categories")
    .delete()
    .eq("product_id", productId);

  if (mappingError) {
    return NextResponse.json({ error: mappingError.message }, { status: 500 });
  }

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
};
