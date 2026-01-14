import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface Params {
    params: { id: number};
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = JSON.parse(
      formData.get("description") as string
    );
    const display = formData.get("display") === "true";
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );

    const msdsFile = formData.get("msds") as File | null;
    const tdsFile = formData.get("tds") as File | null;

    /* ===== update product ===== */
    const { data: updatedProduct, error: updateError } =
      await supabaseAdmin
        .from("products")
        .update({
          name,
          description,
          display,
        })
        .eq("id", productId)
        .select()
        .single();

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { message: "Failed to update product" },
        { status: 500 }
      );
    }

    /* ===== replace category mapping ===== */
    await supabaseAdmin
      .from("product_categories")
      .delete()
      .eq("product_id", productId);

    if (Array.isArray(categories) && categories.length > 0) {
      const mapping = categories.map((catId: number) => ({
        product_id: productId,
        category_id: catId,
      }));

      const { error: mapError } = await supabaseAdmin
        .from("product_categories")
        .insert(mapping);

      if (mapError) {
        console.error("CATEGORY MAP ERROR:", mapError);
      }
    }

    /* ===== upload MSDS if exists ===== */
    if (msdsFile) {
      const msdsPath = `msds/product-${productId}.pdf`;

      const { error } =
        await supabaseAdmin.storage
          .from("documents")
          .upload(msdsPath, msdsFile, {
            upsert: true,
            contentType: msdsFile.type,
          });

      if (error) {
        console.error("MSDS UPLOAD ERROR:", error);
      }
    }

    /* ===== upload TDS if exists ===== */
    if (tdsFile) {
      const tdsPath = `tds/product-${productId}.pdf`;

      const { error } =
        await supabaseAdmin.storage
          .from("documents")
          .upload(tdsPath, tdsFile, {
            upsert: true,
            contentType: tdsFile.type,
          });

      if (error) {
        console.error("TDS UPLOAD ERROR:", error);
      }
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}



export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 }
      );
    }

    /* ===== delete category mapping ===== */
    const { error: mappingError } = await supabaseAdmin
      .from("product_categories")
      .delete()
      .eq("product_id", productId);

    if (mappingError) {
      return NextResponse.json(
        { error: mappingError.message },
        { status: 500 }
      );
    }

    /* ===== delete product ===== */
    const { error: productError } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", productId);

    if (productError) {
      return NextResponse.json(
        { error: productError.message },
        { status: 500 }
      );
    }

    /* ===== delete files from storage ===== */
    const filesToRemove = [
      `msds/product-${productId}.pdf`,
      `tds/product-${productId}.pdf`,
    ];

    const { error: storageError } =
      await supabaseAdmin.storage
        .from("documents")
        .remove(filesToRemove);

    if (storageError) {
      console.warn("STORAGE DELETE WARNING:", storageError.message);
      // tidak fatal → product tetap terhapus
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
};
