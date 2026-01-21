import { supabaseClient } from "@/lib/supabaseClient";
import { success, failure } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return failure("All fields are required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return failure("Email tidak valid", 400);
    }

    const { error } = await supabaseClient
      .from("contact_inquiries")
      .insert([
        {
          name,
          email,
          message,
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      return failure("Gagal menyimpan pesan", 500);
    }

    return success(
      { message: "Terima kasih, pesan Anda telah terkirim" },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return failure("Internal Server Error", 500);
  }
}
