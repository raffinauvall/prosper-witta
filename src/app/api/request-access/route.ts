import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
      const body = await req.json();

    if (!body.deviceToken) {
      return NextResponse.json(
        { error: "Missing deviceToken" },
        { status: 400 }
      );
    }

    const token = crypto.randomUUID();

    const { error } = await supabase
      .from("document_access_requests")
      .insert({
        product_id: body.productId,   // ✅ FIX DI SINI
        type: body.type,              // 'msds' | 'tds'
        device_token: body.deviceToken,
        name: body.name,
        email: body.email,
        company: body.company,
        purpose: body.purpose,
        status: "pending",
        token,
      });

    if (error) {
      console.error("DB ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const approveUrl = `${process.env.BASE_URL}/api/request-access/approve?token=${token}`;
    const rejectUrl = `${process.env.BASE_URL}/api/request-access/reject?token=${token}`;

    await resend.emails.send({
      from: "Chemtech <onboarding@resend.dev>",
      to: ["raffinauvaltaqy@gmail.com"],
      subject: `Access Request – Product ${body.productId}`,
      html: `
        <h3>New Document Access Request</h3>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Purpose:</b> ${body.purpose || "-"}</p>

        <a href="${approveUrl}" style="padding:10px 16px;background:#16a34a;color:white;border-radius:6px;text-decoration:none;">
          Approve
        </a>

        <a href="${rejectUrl}" style="padding:10px 16px;background:#dc2626;color:white;border-radius:6px;text-decoration:none;margin-left:8px;">
          Reject
        </a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REQUEST ACCESS ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
