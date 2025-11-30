import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import crypto from "crypto";
import { generateAccessRequestEmail } from "@/lib/email/accessRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    // Ambil data dari request body
    const { email, productId, company = "", purpose = "" } = await req.json();
    console.log({ email, productId, company, purpose });

    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email or productId missing" },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = crypto.randomUUID();

    // Insert ke Supabase, mapping camelCase frontend -> snake_case DB
    const { error: insertError } = await supabase
      .from("access_requests")
      .insert({
        email,
        product_id: productId, // <-- snake_case di DB
        token,
        status: "pending",
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save request" },
        { status: 500 }
      );
    }

    // URL approve
    const approveUrl = `${process.env.BASE_URL}/approve?token=${token}`;

    // Generate HTML email (company & purpose hanya untuk tampilan email)
    const html = generateAccessRequestEmail(email, productId, approveUrl, company, purpose);

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.ADMIN_EMAIL!,
        subject: "🔔 New Ingredient Access Request",
        html,
      });
    } catch (err) {
      console.error("Resend email error:", err);
      // Tidak mengganggu response, tetap return sukses
    }

    return NextResponse.json({
      ok: true,
      message: "Request submitted successfully",
    });
  } catch (err) {
    console.error("Request access error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
