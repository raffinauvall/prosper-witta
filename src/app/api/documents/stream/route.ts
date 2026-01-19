import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessId = searchParams.get("accessId");

  const rawToken = req.headers.get("x-device-token");
  if (!accessId || !rawToken)
    return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const { data: accessData } = await supabase
    .from("document_access_requests")
    .select("*")
    .eq("id", accessId)
    .eq("device_token", rawToken)
    .single();

  if (!accessData || accessData.status !== "approved")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const filePath = `${accessData.type}/product-${accessData.product_id}.pdf`;

  const { data: pdfFile } = await supabase.storage.from("documents").download(filePath);
  if (!pdfFile) return NextResponse.json({ error: "File not found" }, { status: 404 });

  return new Response(pdfFile.stream(), { headers: { "Content-Type": "application/pdf", "Cache-Control": "no-store" } });
}
