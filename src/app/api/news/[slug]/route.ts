import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params;

  const { data, error } = await supabaseClient
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json(
      { message: "News not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
