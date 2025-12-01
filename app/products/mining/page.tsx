"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Cog, LucideSprayCan, Pickaxe } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductIngredient from "@/components/products/ProductIngredient";
import RequestAccessModal from "@/components/products/RequestAccessModal";
import ApprovedNotification from "@/components/ui/ApprovedNotification";

import { Colors } from "@/lib/color";
import { fetchProducts } from "@/lib/api/products";
import { requestAccess, checkAccess } from "@/lib/api/access";

export default function MiningPage() {
  const router = useRouter();
  const theme = Colors.mining;

  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [accessMap, setAccessMap] = useState<Record<number, boolean>>({});
  const [showNotif, setShowNotif] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [purpose, setPurpose] = useState("");

  // Fetch products
  useEffect(() => {
    let isMounted = true;
    fetchProducts("Mining")
      .then((data) => {
        if (!isMounted) return;
        setProducts(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch((err) => console.error("Fetch products error:", err));
    return () => { isMounted = false };
  }, []);

  // Polling check access per product/device
  useEffect(() => {
    if (!selected?.id) return;
    let isMounted = true;
    let prevAccess = accessMap[selected.id] ?? false;

    const doCheck = async () => {
      try {
        const result = await checkAccess(selected.id);
        if (!isMounted) return;

        setAccessMap((prev) => {
          const updated = { ...prev, [selected.id]: result };
          if (!prevAccess && result) {
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 2000);
          }
          prevAccess = result;
          return updated;
        });
      } catch (err) {
        console.error("Check access error:", err);
      }
    };

    doCheck();
    const interval = setInterval(doCheck, 5000);

    return () => { isMounted = false; clearInterval(interval); };
  }, [selected?.id]);

  // Request access submit
  const handleRequestAccess = async () => {
    if (!selected?.id) return;
    try {
      const data = await requestAccess(selected.id, companyName, purpose);
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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <ProductHeader
          selected={selected?.id}
          Icon={Pickaxe}
          color={theme}
          title="Mining Division"
          desc="Mining Products"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

          <div className="lg:col-span-6">
            {selected && <ProductDetail selected={selected} />}
          </div>

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
