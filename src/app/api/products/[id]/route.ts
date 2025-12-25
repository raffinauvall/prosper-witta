import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface Params {
    params: { id: number};
}


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

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {

  try{
    const { id } = await context.params;

    const body = await req.json();
    const {name, description, full_desc, ingredients, categories} = body;

    const { data: updatedProduct, error: updateError} = await supabase
    .from("products")
    .update({ name, description, full_desc})
    .eq("id", id)
    .select()
    .single();

    if (updateError) {
      return NextResponse.json({message: "Failed to update product"}, {status: 500});
    }

    await supabase.from("product_categories").delete().eq("product_id", id);

    const mapping = categories.map((catId: number) => ({
      product_id: id,
      category_id: catId,
    }));

    await supabase.from("product_categories").insert(mapping);

    return NextResponse.json(updatedProduct, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: "Server error"}, {status: 500});
  }
}
