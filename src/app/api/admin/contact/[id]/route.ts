import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdmin();

    const params = await context.params; // ✅ unwrap promise
    const id = params.id;

    if (!id) return failure("ID kontak dibutuhkan");

    const body = await req.json();

    const { data, error } = await supabaseAdmin
      .from("contact_inquiries")
      .update(body)
      .eq("id", id)
      .select();

    if (error) return failure("Gagal update kontak");

    return success(data[0]);
  } catch (err) {
    console.error(err);
    return failure("Unauthorized", 401);
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdmin();

    const params = await context.params; 
    const id = params.id;

    if (!id) return failure("ID kontak dibutuhkan");

    const { error } = await supabaseAdmin
      .from("contact_inquiries")
      .delete()
      .eq("id", id);

    if (error) return failure("Gagal hapus kontak");

    return success({ message: "Kontak berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return failure("Unauthorized", 401);
  }
}
