import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/authServer";
import RequestAccessTable from "@/components/admin/request-access/RequestAccessTable";

export default async function RequestAccessPage() {
  try {
    await verifyAdmin(); // server-only → pakai cookies()
  } catch {
    redirect("/login");
  }

  return <RequestAccessTable />; // client component hanya untuk fetch table
}
