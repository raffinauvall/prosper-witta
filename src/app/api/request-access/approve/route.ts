import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendApprovedUserEmail } from "@/lib/notificationEmail";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${process.env.BASE_URL}/request-error`);
    }

    // 1️⃣ ambil request
    const { data: request } = await supabaseAdmin
      .from("document_access_requests")
      .select("*")
      .eq("token", token)
      .single();

    if (!request || request.status !== "pending") {
      return NextResponse.redirect(
        `${process.env.BASE_URL}/request-already-processed`
      );
    }

    // 2️⃣ ambil product
    const { data: product } = await supabaseAdmin
      .from("products")
      .select("name")
      .eq("id", request.product_id)
      .single();

    if (!product) {
      throw new Error("Product not found");
    }

    // 3️⃣ ambil category_id
    const { data: productCategory } = await supabaseAdmin
      .from("product_categories")
      .select("category_id")
      .eq("product_id", request.product_id)
      .limit(1);

    const categoryId = productCategory?.[0]?.category_id;
    if (!categoryId) {
      throw new Error("Category ID not found");
    }

    // 4️⃣ ambil category NAME (INI SUDAH SLUG)
    const { data: category } = await supabaseAdmin
      .from("categories")
      .select("name")
      .eq("id", categoryId)
      .single();

    if (!category?.name) {
      throw new Error("Category name not found");
    }

    const categoryKey = category.name; // 🔥 LANGSUNG PAKAI

    // 5️⃣ update status
    await supabaseAdmin
      .from("document_access_requests")
      .update({ status: "approved" })
      .eq("id", request.id);

    // 6️⃣ build URL
    const productUrl = `${process.env.BASE_URL}/products/${categoryKey}`;

    // 7️⃣ kirim email ke user
    await sendApprovedUserEmail({
      to: request.email,
      name: request.name,
      productName: product.name,
      type: request.type,
      productUrl,
    });

    // 8️⃣ redirect admin
    return NextResponse.redirect(
      `${process.env.BASE_URL}/request-approved`
    );
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    return NextResponse.redirect(
      `${process.env.BASE_URL}/request-error`
    );
  }
}
