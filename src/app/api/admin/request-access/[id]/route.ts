import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  _req: Request,
  context: { params: { id?: string } }
) {
  const id = context.params?.id;

  // 🔥 guard biar gak kirim undefined ke postgres
  if (!id) {
    return NextResponse.json(
      { error: "Invalid or missing id" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("document_access_requests")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
