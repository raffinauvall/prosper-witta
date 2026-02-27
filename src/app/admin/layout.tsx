import "server-only";
import AdminLayout from "./AdminLayout";
import { verifyAdmin } from "@/lib/authServer";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await verifyAdmin(); 

  return (
    <AdminLayout adminName={payload.username}>
      {children}
    </AdminLayout>
  );
}
