import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> } // kalau params bisa promise
) {
  const { id } = await context.params; // ✅ unwrap dulu

  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("document_access_requests")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

