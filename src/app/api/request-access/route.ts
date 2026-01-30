import { supabaseClient } from "@/lib/supabaseClient";
import { sendRequestAccessEmail } from "@/lib/requestEmail";
import { success, failure } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.deviceToken) return failure("Missing deviceToken", 400);
    if (!body.productId) return failure("Missing productId", 400);

    const token = crypto.randomUUID();

    // 1️⃣ Simpan request
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

    // 2️⃣ Ambil nama product
    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .select("name")
      .eq("id", body.productId)
      .single();

    if (productError || !product) {
      return failure("Product not found", 404);
    }

    // 3️⃣ Build URL
    const approveUrl = `${process.env.BASE_URL}/api/request-access/approve?token=${token}`;
    const rejectUrl = `${process.env.BASE_URL}/api/request-access/reject?token=${token}`;

    // 4️⃣ Kirim email (PAKE PRODUCT NAME)
    await sendRequestAccessEmail({
      productId: body.productId,
      productName: product.name, // 🔥 INI YANG BARU
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
