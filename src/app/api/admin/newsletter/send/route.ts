import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { sendNewsletterEmail } from "@/lib/newsLetterEmail";

type Target = {
  email: string;
  name: string;
};

export async function POST(req: Request) {
  try {
    await verifyAdmin();

    const { newsId, sendToAll, contactId } = await req.json();

    if (!newsId) {
      return NextResponse.json(
        { message: "newsId wajib" },
        { status: 400 }
      );
    }

    const { data: news, error: newsError } = await supabaseAdmin
      .from("news")
      .select("id,title,excerpt,content,slug")
      .eq("id", newsId)
      .single();

    if (newsError || !news) {
      return NextResponse.json(
        { message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // =========================
    // ambil target (NAME + EMAIL)
    // =========================
    let targets: Target[] = [];

    if (sendToAll) {
      const { data } = await supabaseAdmin
        .from("contact_inquiries")
        .select("email,name")
        .eq("subscribe", true);

      targets = data || [];
    } else if (contactId) {
      const { data } = await supabaseAdmin
        .from("contact_inquiries")
        .select("email,name")
        .eq("id", contactId)
        .single();

      if (!data) {
        return NextResponse.json(
          { message: "Target email tidak ditemukan" },
          { status: 400 }
        );
      }

      targets = [data];
    }

    if (targets.length === 0) {
      return NextResponse.json(
        { message: "Tidak ada penerima" },
        { status: 400 }
      );
    }

    // =========================
    // kirim (PERSONALIZED + DELAY)
    // =========================
    for (const target of targets) {
      await sendNewsletterEmail({
        to: target.email,
        name: target.name || "Bapak/Ibu",
        title: news.title,
        excerpt: news.excerpt,
        url: `${process.env.BASE_URL}/news/${news.slug}`,
      });

      // 🔥 anti spam blast (WAJIB)
      await new Promise((r) => setTimeout(r, 600));
    }

    return NextResponse.json({
      message: `Berhasil kirim ke ${targets.length} email`,
      sent: targets.length,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
