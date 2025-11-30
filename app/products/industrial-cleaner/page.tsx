"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Cog, LucideSprayCan, Pickaxe, SprayCan } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductIngredient from "@/components/products/ProductIngredient";
import RequestAccessModal from "@/components/products/RequestAccessModal";
import ApprovedNotification from "@/components/ui/ApprovedNotification";

import { Colors } from "@/lib/color";
import { requestAccess } from "@/lib/api/access";
import { fetchProducts } from "@/lib/api/products";

export default function IndustrialCleanerPage() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [userEmail] = useState("jawwwa@example.com"); // ambil dari auth nanti
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [accessMap, setAccessMap] = useState<Record<number, boolean>>({});

  const theme = Colors.cleaner;

  // 1️⃣ Fetch products
  useEffect(() => {
    fetchProducts("Industrial Cleaner").then((data) => {
      setProducts(data);
      if (data.length > 0) setSelected(data[0]);
    });
  }, []);

  // 2️⃣ Polling/check-access per produk + user
  useEffect(() => {
  if (!selected?.id) return;

  let prevAccess = accessMap[selected.id] ?? false;

  const checkAccess = async () => {
    try {
      const res = await fetch("/api/check-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, productId: selected.id }),
      });
      const data = await res.json();

      setAccessMap(prev => {
        const updated = { ...prev, [selected.id]: data.hasAccess };

        // notif cuma kalau akses baru
        if (!prevAccess && data.hasAccess) {
          setShowNotif(true);

          // hilang otomatis 2 detik
          setTimeout(() => setShowNotif(false), 2000);
        }

        prevAccess = data.hasAccess;
        return updated;
      });
    } catch (err) {
      console.error("Check access error:", err);
    }
  };

  checkAccess(); // cek langsung
  const interval = setInterval(checkAccess, 5000);
  return () => clearInterval(interval);
}, [selected?.id, userEmail]);



  // 3️⃣ Handle Request Access
  const handleRequestAccess = async () => {
    if (!selected?.id) return;

    try {
      const data = await requestAccess(userEmail, selected.id, companyName, purpose);
      alert(data?.message || "Request sent!");
    } catch (err) {
      console.error("Request access error:", err);
      alert("Failed to request access");
    }

    setShowModal(false);
    setCompanyName("");
    setPurpose("");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <ProductHeader
          selected={selected?.id}
          Icon={LucideSprayCan}
          color={theme}
          title="Industrial Cleaner Division"
          desc="Industrial Cleaner Products"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <ProductSidebar
              products={products}
              selected={selected?.id}
              setSelected={(id) => {
                const prod = products.find((p) => p.id === id);
                if (prod) setSelected(prod);
              }}
              themeColor={theme}
            />
          </div>

          {/* Product Detail */}
          <div className="lg:col-span-6">
            {selected && <ProductDetail selected={selected} />}
          </div>

          {/* Ingredients + Notification */}
          <div className="lg:col-span-3 space-y-4">
            {selected && (
              <ProductIngredient
                ingredients={selected.ingredients}
                themeColor={theme}
                hasAccess={accessMap[selected.id] ?? false} 
                setShowModal={setShowModal}
              />
            )}

            <ApprovedNotification
              show={showNotif}
              onClose={() => setShowNotif(false)}
            />
          </div>
        </div>
      </div>

      {/* Request Access Modal */}
      <RequestAccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRequestAccess}
        company={companyName}
        setCompany={setCompanyName}
        purpose={purpose}
        setPurpose={setPurpose}
      />
    </main>
  );
}
