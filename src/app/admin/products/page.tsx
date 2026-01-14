import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/authServer";
import ProductsClient from "@/components/admin/ProductsClient";

export default async function ProductsPage() {
  try {
    await verifyAdmin(); 
  } catch {
    redirect("/login"); 
  }

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <ProductsClient />
    </main>
  );
}
