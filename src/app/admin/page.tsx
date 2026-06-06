import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/authServer";
import DashboardMain from "@/components/admin/dashboard/DashboardMain";

export default async function DashboardPage() {
  try {
    await verifyAdmin(); 
  } catch {
    redirect("/login"); 
  }

  return (
    <DashboardMain />
  );
}
