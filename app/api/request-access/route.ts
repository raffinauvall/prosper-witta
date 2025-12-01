import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import crypto from "crypto";
import { cookies } from "next/headers";
import { generateAccessRequestEmail } from "@/lib/email/accessRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { productId, company = "", purpose = "" } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Ambil atau buat device token
    const cookieStore = await cookies();
    const deviceToken =
      cookieStore.get("device_token")?.value || crypto.randomUUID();

    // Simpan device token ke cookie kalau baru
    if (!cookieStore.get("device_token")) {
      cookieStore.set("device_token", deviceToken, { path: "/" });
    }

    // Generate unique token untuk approve link
    const token = crypto.randomUUID();

    // Insert ke DB
    const { error } = await supabase.from("access_requests").insert({
      product_id: productId,
      token,
      status: "pending",
      device_token: deviceToken,
      company,
      purpose,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    // Buat approve URL
    const approveUrl = `${process.env.BASE_URL}/approve?token=${token}`;

    // Kirim email ke admin (hardcoded dari env)
    const html = generateAccessRequestEmail(
      process.env.ADMIN_EMAIL!, // email admin
      productId,
      approveUrl,
      company,
      purpose
    );

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL!,
      subject: "Ingredient Access Request",
      html,
    });

    return NextResponse.json({ ok: true, message: "Request sent!" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
