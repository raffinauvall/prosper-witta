import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function GET(req: Request) {
  try {
    await verifyAdmin();

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 20);
    const offset = (page - 1) * limit;

    const { data, error: sbError, count } = await supabaseAdmin
      .from("contact_inquiries")
      .select(
        `
          id,
          name,
          email,
          message,
          created_at
        `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (sbError) {
      console.error("SUPABASE ERROR:", sbError);
      return failure("Gagal mengambil data contact");
    }

    return success(data, {
      meta: {
        page,
        limit,
        total: count,
      },
    });
  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    return failure("Unauthorized", 401);
  }
}
