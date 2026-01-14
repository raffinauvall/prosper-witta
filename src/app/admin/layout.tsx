// src/app/admin/layout.tsx
import "server-only";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";
import { verifyAdmin } from "@/lib/authServer";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let adminName = "Admin";

  try {
    const payload = await verifyAdmin(); // ✅ async
    adminName = payload.username; // bisa diganti jadi email atau username
  } catch {
    redirect("/login"); // kalau ga ada token / invalid token, langsung redirect
  }

  return <AdminLayout adminName={adminName}>{children}</AdminLayout>;
}
