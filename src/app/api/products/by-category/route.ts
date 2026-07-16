import { NextResponse } from "next/server";
import { CATEGORY_INFO } from "@/lib/category-info";
import { getProductsByCategory } from "@/lib/publicProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category || !(category in CATEGORY_INFO)) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  try {
    return NextResponse.json(await getProductsByCategory(category));
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
