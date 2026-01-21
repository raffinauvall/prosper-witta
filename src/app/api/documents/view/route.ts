import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { failure } from "@/lib/api-response";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const accessId = searchParams.get("accessId");
  const deviceToken = req.headers.get("x-device-token");

  if (!accessId || !deviceToken) {
    return failure("Unauthorized", 401);
  }

  const { data: access, error: accessError } = await supabaseAdmin
    .from("document_access_requests")
    .select("file_path, status")
    .eq("id", accessId)
    .eq("device_token", deviceToken)
    .single();

  if (accessError || !access || access.status !== "approved") {
    return failure("Forbidden", 403);
  }

  const { data: pdfFile, error: fileError } =
    await supabaseAdmin.storage
      .from("documents")
      .download(access.file_path);

  if (fileError || !pdfFile) {
    return failure("File not found", 404);
  }

  return new Response(pdfFile.stream(), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
    },
  });
}
