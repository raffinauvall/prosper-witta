// src/app/api/documents/view/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessId = searchParams.get("accessId");

  const deviceToken = req.headers.get("x-device-token");
  if (!accessId || !deviceToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Validasi access record
  const { data: access } = await supabase
    .from("document_access_requests")
    .select("file_path, status")
    .eq("id", accessId)
    .eq("device_token", deviceToken)
    .single();

  if (!access || access.status !== "approved") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Download file BERDASARKAN ACCESS
  const { data: pdfFile, error } = await supabase
    .storage
    .from("documents")
    .download(access.file_path);

  if (error || !pdfFile) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new Response(await pdfFile.arrayBuffer(), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
    },
  });
}

