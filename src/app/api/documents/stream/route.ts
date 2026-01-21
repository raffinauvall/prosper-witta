import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { failure } from "@/lib/api-response";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const accessId = searchParams.get("accessId");
  const deviceToken = req.headers.get("x-device-token");

  if (!accessId || !deviceToken) {
    return failure("Missing params", 400);
  }

  const { data: accessData, error } = await supabaseAdmin
    .from("document_access_requests")
    .select("*")
    .eq("id", accessId)
    .eq("device_token", deviceToken)
    .single();

  if (error || !accessData || accessData.status !== "approved") {
    return failure("Forbidden", 403);
  }

  const filePath = `${accessData.type}/product-${accessData.product_id}.pdf`;

  const { data: pdfFile } = await supabaseAdmin
    .storage
    .from("documents")
    .download(filePath);

  if (!pdfFile) {
    return failure("File not found", 404);
  }

  return new Response(pdfFile.stream(), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
    },
  });
}
