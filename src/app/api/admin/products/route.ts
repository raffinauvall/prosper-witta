export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: products, error } = await supabaseAdmin
      .from("products")
      .select(`
        id,
        name,
        description,
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
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = JSON.parse(
      formData.get("description") as string
    );
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );
    const display = formData.get("display") === "true";

    const msdsFile = formData.get("msds") as File | null;
    const tdsFile = formData.get("tds") as File | null;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    /* ================= INSERT PRODUCT ================= */
    const { data: product, error: productError } =
      await supabaseAdmin
        .from("products")
        .insert([
          {
            name,
            description,
            display,
          },
        ])
        .select()
        .single();

    if (productError) {
      console.error(productError);
      return NextResponse.json(
        { message: productError.message },
        { status: 500 }
      );
    }

    const productId = product.id;

    /* ================= UPLOAD MSDS ================= */
    if (msdsFile) {
      const msdsPath = `msds/product-${productId}.pdf`;

      const { error: msdsError } =
        await supabaseAdmin.storage
          .from("documents")
          .upload(msdsPath, msdsFile, {
            upsert: true,
            contentType: msdsFile.type,
          });

      if (msdsError) {
        console.error("MSDS UPLOAD ERROR:", msdsError);
      }
    }

    /* ================= UPLOAD TDS ================= */
    if (tdsFile) {
      const tdsPath = `tds/product-${productId}.pdf`;

      const { error: tdsError } =
        await supabaseAdmin.storage
          .from("documents")
          .upload(tdsPath, tdsFile, {
            upsert: true,
            contentType: tdsFile.type,
          });

      if (tdsError) {
        console.error("TDS UPLOAD ERROR:", tdsError);
      }
    }

    /* ================= CATEGORY MAPPING ================= */
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

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
