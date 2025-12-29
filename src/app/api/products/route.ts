export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        full_desc,
        product_categories (
          categories (
            id,
            name
          )
        )
      `);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    const formatted = (products ?? []).map((product: any) => ({
      ...product,
      categories: Array.isArray(product.product_categories)
        ? product.product_categories
            .map((pc: any) => pc.categories?.name)
            .filter(Boolean)
        : [],
    }));

    return NextResponse.json(formatted, { status: 200 });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, full_desc, categories = [] } = body;

    const { data: product, error: productError } = await supabase
      .from("products")
      .insert([{ name, description, full_desc }])
      .select()
      .single();

    if (productError) {
      console.error(productError);
      return NextResponse.json(
        { message: productError.message },
        { status: 500 }
      );
    }

    if (Array.isArray(categories) && categories.length > 0) {
      const mapping = categories.map((catId: number) => ({
        product_id: product.id,
        category_id: catId,
      }));

      const { error: mapError } = await supabase
        .from("product_categories")
        .insert(mapping);

      if (mapError) {
        console.error(mapError);
      }
    }

    return NextResponse.json(product, { status: 201 });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
