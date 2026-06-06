import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdminApi } from "@/lib/adminApi";
import { hasPdfSignature, isPdfFile, isWithinSize } from "@/lib/uploadValidation";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <- pakai Promise supaya aman di production
) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;

    const { id } = await context.params;
    const productId = Number(id);

    if (!productId || isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = JSON.parse(formData.get("description") as string || "{}");
    const display = formData.get("display") === "true";
    const categories = JSON.parse((formData.get("categories") as string) || "[]");

    const msdsFile = formData.get("msds") as File | null;
    const tdsFile = formData.get("tds") as File | null;

    for (const file of [msdsFile, tdsFile].filter(Boolean) as File[]) {
      if (!isPdfFile(file)) {
        return NextResponse.json({ message: "Documents must be PDF files" }, { status: 400 });
      }

      if (!(await hasPdfSignature(file))) {
        return NextResponse.json({ message: "Documents must be valid PDF files" }, { status: 400 });
      }

      if (!isWithinSize(file, 10)) {
        return NextResponse.json({ message: "Documents must be 10MB or smaller" }, { status: 400 });
      }
    }

    // Update product
    const { data: updatedProduct, error: updateError } = await supabaseAdmin
      .from("products")
      .update({ name, description, display })
      .eq("id", productId)
      .select()
      .single();

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
    }

    // Update categories
    await supabaseAdmin.from("product_categories").delete().eq("product_id", productId);
    if (categories.length > 0) {
      const mapping = categories.map((catId: number) => ({
        product_id: productId,
        category_id: catId,
      }));
      const { error: mapError } = await supabaseAdmin.from("product_categories").insert(mapping);
      if (mapError) console.error("CATEGORY MAP ERROR:", mapError);
    }

    // Upload files
    if (msdsFile) {
      const msdsPath = `msds/product-${productId}.pdf`;
      const { error } = await supabaseAdmin.storage
        .from("documents")
        .upload(msdsPath, msdsFile, { upsert: true, contentType: msdsFile.type });
      if (error) console.error("MSDS UPLOAD ERROR:", error);
    }

    if (tdsFile) {
      const tdsPath = `tds/product-${productId}.pdf`;
      const { error } = await supabaseAdmin.storage
        .from("documents")
        .upload(tdsPath, tdsFile, { upsert: true, contentType: tdsFile.type });
      if (error) console.error("TDS UPLOAD ERROR:", error);
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <- pakai Promise juga
) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;

    const { id } = await context.params;
    const productId = Number(id);

    if (!productId || isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
    }

    // Delete category mapping
    const { error: mappingError } = await supabaseAdmin
      .from("product_categories")
      .delete()
      .eq("product_id", productId);
    if (mappingError) console.error("CATEGORY DELETE ERROR:", mappingError);

    // Delete product
    const { error: productError } = await supabaseAdmin.from("products").delete().eq("id", productId);
    if (productError) return NextResponse.json({ message: productError.message }, { status: 500 });

    // Remove files from storage
    const filesToRemove = [`msds/product-${productId}.pdf`, `tds/product-${productId}.pdf`];
    const { error: storageError } = await supabaseAdmin.storage.from("documents").remove(filesToRemove);
    if (storageError) console.warn("STORAGE DELETE WARNING:", storageError.message);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
