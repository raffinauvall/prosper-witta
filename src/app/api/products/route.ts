import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { updateProduct } from "@/src/lib/api/products";


interface Params {
    params: { id: number};
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        product_categories (
          categories (
            id,
            name
          )
        )
      `);

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
    }


    const formatted = products.map((product: any) => ({
      ...product,
      categories: product.product_categories.map((pc: any) => pc.categories.name)
    }));

    return NextResponse.json(formatted, { status: 200 });

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, full_desc, ingredients, categories } = body;

    // insert product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert([{ name, description, full_desc, }])
      .select()
      .single();

    if (productError) {
      return NextResponse.json({ message: "Failed create product" }, { status: 500 });
    }


    const mapping = categories.map((catId: number) => ({
      product_id: product.id,
      category_id: catId,
    }));

    await supabase.from("product_categories").insert(mapping);

    return NextResponse.json(product, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




