import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    // 1️⃣ ambil request
    const { data: request, error: reqError } = await supabase
      .from("document_access_requests")
      .select("*")
      .eq("token", token)
      .single();

    if (reqError || !request) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    if (request.status !== "pending") {
      return NextResponse.json(
        { error: "Request already processed" },
        { status: 400 }
      );
    }

    // 2️⃣ update request → approved
    const { error: updateError } = await supabase
      .from("document_access_requests")
      .update({ status: "approved" })
      .eq("id", request.id);

    if (updateError) throw updateError;

    // 3️⃣ buat access token
    const accessToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 jam

    const { error: insertError } = await supabase
      .from("document_access_tokens")
      .insert({
        id: accessToken,
        document_id: request.document_id, // INTEGER
        device_token: request.device_token,
        type: request.type, // 'msds' | 'tds'
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      message: "Request approved",
    });
  } catch (err: any) {
    console.error("APPROVE ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
