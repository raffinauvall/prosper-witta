import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    const { data: categoryData, error: catErr } = await supabase
      .from("categories")
      .select("id, name")
      .ilike("name", category)
      .single();

    if (catErr || !categoryData) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const categoryId = categoryData.id;

    const { data: products, error: prodErr } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        full_desc,
        ingredients,
        product_categories!inner (
          categories:categories!inner (
            id,
            name
          )
        )
      `)
      .in("product_categories.category_id", [categoryId]);

    if (prodErr) {
      return NextResponse.json({ error: prodErr.message }, { status: 500 });
    }

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
