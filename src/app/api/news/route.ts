import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseClient
    .from("news")
    .select(`
      id,
      title,
      slug,
      excerpt,
      thumbnail_url,
      published_at
    `)
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch news" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
