import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { error } from "console";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productId = Number(searchParams.get("productId"));
  const type = searchParams.get("type");

  const rawToken =
    req.headers.get("x-device-token") ??
    req.headers
      .get("cookie")
      ?.match(/device_token=([^;]+)/)?.[1];

  const normalizedToken = rawToken?.trim();

  console.log("deviceToken:", normalizedToken);

  if (!productId || !type || !normalizedToken) {
    console.log("❌ Missing params (stream)", {
      productId,
      type,
      normalizedToken,
    });

    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    );
  }

  const { data } = await supabase
  .from("document_access_requests")
  .select("*")
  .eq("device_token", normalizedToken);

  if (!data) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const filePath = `${type}/product-${productId}.pdf`;

  const { data: pdfFile } = await supabase
    .storage
    .from("documents")
    .download(filePath);

  if (!pdfFile) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }


  return new Response(pdfFile.stream(), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
    },
  });
}
