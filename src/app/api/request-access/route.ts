import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { sendRequestAccessEmail } from "@/lib/email";
import { success, failure } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.deviceToken) return failure("Missing deviceToken", 400);

    const token = crypto.randomUUID();

    const { error: dbError } = await supabaseClient
      .from("document_access_requests")
      .insert({
        product_id: body.productId,
        type: body.type,
        device_token: body.deviceToken,
        name: body.name,
        email: body.email,
        company: body.company,
        purpose: body.purpose,
        status: "pending",
        token,
      });

    if (dbError) return failure(dbError.message, 500);

    const approveUrl = `${process.env.BASE_URL}/api/request-access/approve?token=${token}`;
    const rejectUrl = `${process.env.BASE_URL}/api/request-access/reject?token=${token}`;

    await sendRequestAccessEmail({
      productId: body.productId,
      name: body.name,
      email: body.email,
      company: body.company,
      purpose: body.purpose,
      approveUrl,
      rejectUrl,
    });

    return success({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("REQUEST ACCESS ERROR:", err);
    return failure("Internal Server Error", 500);
  }
}
