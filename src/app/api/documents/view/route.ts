// src/app/api/documents/view/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productIdParam = searchParams.get("productId");
    const type = searchParams.get("type"); // msds | tds
    const deviceToken = searchParams.get("deviceToken");

    if (!productIdParam || !type || !deviceToken) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const productId = Number(productIdParam);
    if (isNaN(productId)) return NextResponse.json({ error: "Invalid productId" }, { status: 400 });

    const { data: accessData } = await supabase
      .from("document_access_requests")
      .select("*")
      .eq("product_id", productId)
      .eq("type", type)
      .eq("device_token", deviceToken)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle();

    if (!accessData) return NextResponse.json({ error: "Access not approved" }, { status: 403 });

    const filePath = `${type}/product-${productId}.pdf`;
    const { data: pdfFile, error: downloadError } = await supabase
      .storage
      .from("documents")
      .download(filePath);

    if (downloadError || !pdfFile) return NextResponse.json({ error: "File not found in storage" }, { status: 404 });

    const arrayBuffer = await pdfFile.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
