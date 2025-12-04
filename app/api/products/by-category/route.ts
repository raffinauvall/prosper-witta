import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json({ error: "Category required" }, { status: 400 });
  }

  // Ambil products berdasarkan relasi
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      full_desc,
      ingredients,
      image,
      product_categories!inner (
        category_id,
        categories!inner (
          name
        )
      )
    `)
    .eq("product_categories.categories.name", category);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
