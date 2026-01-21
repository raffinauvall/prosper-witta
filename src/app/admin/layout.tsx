import "server-only";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";
import { verifyAdmin } from "@/lib/authServer";

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  try {
    const payload = await verifyAdmin(); // SSR, baca cookie dari Next.js
    return <AdminLayout adminName={payload.username}>{children}</AdminLayout>;
  } catch {
    redirect("/login"); // token invalid? redirect SSR
  }
}
