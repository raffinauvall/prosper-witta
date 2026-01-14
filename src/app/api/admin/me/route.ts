import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/authServer";

export async function GET() {
  try {
    const admin = await verifyAdmin();

    return NextResponse.json({
      name: admin.username
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
