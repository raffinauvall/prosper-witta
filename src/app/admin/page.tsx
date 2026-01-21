import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/authServer";
import ProductsClient from "@/components/admin/ProductsClient";
import DashboardMain from "@/components/admin/dashboard/DashboardMain";

export default async function ProductsPage() {
  try {
    await verifyAdmin(); 
  } catch {
    redirect("/login"); 
  }

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <DashboardMain />
    </main>
  );
}
