// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  console.log("DELETE product id:", id);

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  // hapus mapping di product_categories dulu (relasi many-to-many)
  const { error: mappingError } = await supabase
    .from("product_categories")
    .delete()
    .eq("product_id", id);

  if (mappingError) {
    return NextResponse.json({ error: mappingError.message }, { status: 500 });
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
