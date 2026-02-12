import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const pid = Number(productId);
    if (isNaN(pid)) {
      return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
    }

    // Cek file MSDS
    const { error: msdsError } = await supabaseAdmin.storage
      .from("documents")
      .download(`msds/product-${pid}.pdf`);

    // Cek file TDS
    const { error: tdsError } = await supabaseAdmin.storage
      .from("documents")
      .download(`tds/product-${pid}.pdf`);

    return NextResponse.json({
      msds: !msdsError, // true kalau file ada
      tds: !tdsError,   // true kalau file ada
    });
  } catch (err) {
    console.error("Failed to fetch document availability", err);
    return NextResponse.json(
      { msds: false, tds: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
