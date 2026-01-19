import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";

export async function GET(req: Request) {
  try {
    await verifyAdmin();

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 20);
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabaseAdmin
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

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Gagal mengambil data contact" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      page,
      limit,
      total: count,
    });
  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
