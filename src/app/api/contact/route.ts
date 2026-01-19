import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Email tidak valid" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { message: "Gagal menyimpan pesan" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Terima kasih, pesan Anda telah terkirim" },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
