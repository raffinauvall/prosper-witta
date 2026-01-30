import { supabaseClient } from "@/lib/supabaseClient";
import { success, failure } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const subscribe = Boolean(body.subscribe); // ✅ NEW

    /* ================= VALIDATION ================= */

    if (!name || !email || !message) {
      return failure("All fields are required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return failure("Email tidak valid", 400);
    }

    /* ================= SAVE CONTACT ================= */

    const { error: contactError } = await supabaseClient
      .from("contact_inquiries")
      .insert([
        {
          name,
          email,
          message,
          subscribe, // ✅ simpan flag
        },
      ]);

    if (contactError) {
      console.error("Supabase contact error:", contactError);
      return failure("Gagal menyimpan pesan", 500);
    }

    /* ================= SAVE SUBSCRIBER ================= */
    // hanya kalau centang

    if (subscribe) {
      const { error: subError } = await supabaseClient
        .from("newsletter_subscribers")
        .upsert(
          [
            {
              email,
              name,
            },
          ],
          { onConflict: "email" } // biar gak duplicate
        );

      if (subError) {
        console.error("Subscriber error:", subError);
        // gak usah fail request, cukup log aja
      }
    }

   

    return success(
      {
        message: subscribe
          ? "Terima kasih! Anda juga berlangganan newsletter."
          : "Terima kasih, pesan Anda telah terkirim",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return failure("Internal Server Error", 500);
  }
}
