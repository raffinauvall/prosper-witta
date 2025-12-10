import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { Resend } from "resend";
import crypto from "crypto";
import { cookies } from "next/headers";
import { generateAccessRequestEmail } from "@/src/lib/email/accessRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { productId, company = "", purpose = "" } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const deviceToken =
      cookieStore.get("device_token")?.value || crypto.randomUUID();

    if (!cookieStore.get("device_token")) {
      cookieStore.set("device_token", deviceToken, { path: "/" });
    }

    const token = crypto.randomUUID();

  
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("name")
      .eq("id", productId)
      .single();

    if (productError || !productData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productName = productData.name;

    const { error } = await supabase.from("access_requests").insert({
      product_id: productId,
      token,
      status: "pending",
      device_token: deviceToken,
      company,
      purpose,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    const approveUrl = `${process.env.BASE_URL}/approve?token=${token}`;

    const html = generateAccessRequestEmail(
      process.env.ADMIN_EMAIL!,
      productName,
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
