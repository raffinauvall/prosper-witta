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
    if (!productId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const cookieStore = await cookies();
    const deviceToken =
      cookieStore.get("device_token")?.value || crypto.randomUUID();

    // set cookie jika belum ada
    if (!cookieStore.get("device_token")) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set("device_token", deviceToken, { path: "/", maxAge: 60*60*24*365 });
    }

    const token = crypto.randomUUID();

    const { error } = await supabase.from("access_requests").insert({
      product_id: productId,
      token,
      status: "pending",
      device_token: deviceToken,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    const approveUrl = `${process.env.BASE_URL}/approve?token=${token}`;
    const html = generateAccessRequestEmail(approveUrl, company, purpose, productId);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL!,
      subject: "Ingredient Access Request",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
