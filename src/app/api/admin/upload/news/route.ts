import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `news/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from("news-assets")
    .upload(fileName, file, { upsert: true });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage
    .from("news-assets")
    .getPublicUrl(fileName);

  return NextResponse.json({ url: data.publicUrl });
}
