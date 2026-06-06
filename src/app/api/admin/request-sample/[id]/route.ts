import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdminApi } from "@/lib/adminApi";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;

  const { id } = await context.params; 
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("request_sample")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
