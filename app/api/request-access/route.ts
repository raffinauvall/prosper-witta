import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import crypto from "crypto";
import { generateAccessRequestEmail } from "@/lib/email/accessRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, productId, company, purpose } = await req.json();

    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email or productId missing" },
        { status: 400 }
      );
    }

    const token = crypto.randomUUID();

    const { error: insertError } = await supabase
      .from("access_requests")
      .insert({
        email,
        product_id: productId,
        token,
        status: "pending",
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
    }

    const approveUrl = `${process.env.BASE_URL}/approve?token=${token}`;

    const html = generateAccessRequestEmail(
      email,
      productId,
      approveUrl,
      company,
      purpose
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL!,
      subject: "🔔 New Ingredient Access Request",
      html,
    });

    return NextResponse.json({
      ok: true,
      message: "Request submitted successfully",
    });
  } catch (err) {
    console.error("Request access error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
