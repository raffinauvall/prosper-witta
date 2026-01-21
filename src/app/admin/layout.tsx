import "server-only";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";
import { verifyAdmin } from "@/lib/authServer";

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  let adminName = "Admin";

  try {
    const payload = await verifyAdmin(); 
    adminName = payload.username;
  } catch {
    redirect("/login"); 
  }

  return <AdminLayout adminName={adminName}>{children}</AdminLayout>;
}
