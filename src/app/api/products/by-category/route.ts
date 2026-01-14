import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const { data: categoryData, error: catErr } = await supabaseClient
      .from("categories")
      .select("id")
      .eq("name", category)
      .single();

    if (catErr || !categoryData) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const categoryId = categoryData.id; 

    const { data: products, error: prodErr } = await supabaseClient
      .from("products")
      .select(`
        id,
        name,
        description,
        display,
        product_categories!inner (
          category_id,
          categories (
            id,
            name
          )
        )
      `)
      .eq("product_categories.category_id", categoryId)
      .eq("display", true);

    if (prodErr) {
      return NextResponse.json(
        { error: prodErr.message },
        { status: 500 }
      );
    }

    const formatted = (products ?? []).map((p: any) => ({
      
      id: p.id,
      name: p.name,
      description: p.description,
      display: p.display,
      categories: p.product_categories.map(
        (pc: any) => pc.categories
      ),
      
    }));
   

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
