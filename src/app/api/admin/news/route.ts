import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  try {
    await verifyAdmin();

    const { data, error: sbError } = await supabaseAdmin
      .from("news")
      .select("*")
      .order("published_at", { ascending: false });

    if (sbError) return failure(sbError.message);

    return success(data);
  } catch {
    return failure("Unauthorized", 401);
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdmin();
    const payload = await req.json();

    const { data, error: sbError } = await supabaseAdmin
      .from("news")
      .insert(payload)
      .select()
      .single();

    if (sbError) return failure(sbError.message);

    return success(data, { status: 201 });

  } catch {
    return failure("Bad Request", 400);
  }
}

export async function PUT(req: Request) {
  try {
    await verifyAdmin();
    const { id, ...payload } = await req.json();

    if (!id) return failure("ID is required", 400);

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== undefined)
    );

    const { data, error: sbError } = await supabaseAdmin
      .from("news")
      .update(cleanPayload)
      .eq("id", id)
      .select()
      .single();

    if (sbError) return failure(sbError.message);

    return success(data);
  } catch {
    return failure("Bad Request", 400);
  }
}

export async function DELETE(req: Request) {
  try {
    await verifyAdmin();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return failure("ID is required", 400);

    const { error: sbError } = await supabaseAdmin
      .from("news")
      .delete()
      .eq("id", id);

    if (sbError) return failure(sbError.message);

    return success(true);
  } catch {
    return failure("Unauthorized", 401);
  }
}
