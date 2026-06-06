import "server-only";
import { redirect } from "next/navigation";
import { getAdminSession } from "./adminSession";

export async function verifyAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
