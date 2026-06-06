import "server-only";
import { NextResponse } from "next/server";
import { getAdminSession } from "./adminSession";

export async function requireAdminApi() {
  const session = await getAdminSession();

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session, response: null };
}
