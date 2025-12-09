import { supabase } from "@/src/lib/supabase";
import { NextResponse } from "next/server";



export async function GET() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Supabase GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}


