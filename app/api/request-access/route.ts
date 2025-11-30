import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { email, productId } = await req.json();

  // Generate token
  const token = crypto.randomUUID();

  // Insert ke Supabase
  const { error } = await supabase.from("access_requests").insert({
    email,
    product_id: productId,
    token,
    status: "pending",
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Send email ke admin
  await resend.emails.send({
    from: "PT Prosper Witta <no-reply@prosperwitta.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: "New Ingredient Access Request",
    text: `A new access request received.

Email: ${email}
Product ID: ${productId}

Approve here:
${process.env.NEXT_PUBLIC_URL}/approve?token=${token}
    `,
  });

  return NextResponse.json({ ok: true });
}
