import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  try {
    await verifyAdmin();

    const { data, error: sbError } = await supabaseAdmin
      .from("document_access_requests")
      .select("*, products(name)")
      .order("created_at", { ascending: false });

    if (sbError) {
      console.error("SUPABASE ERROR:", sbError);
      return failure(sbError.message);
    }

    return success(data);
  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    return failure("Unauthorized", 401);
  }
}
