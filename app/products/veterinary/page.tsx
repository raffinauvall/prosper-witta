"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, PawPrint } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductIngredient from "@/components/products/ProductIngredient";

import { veterinaryProducts } from "@/data/veterinary";
import { Colors } from "@/lib/color";

export default function VeterinaryPage() {
  const router = useRouter();

  // email user (sementara hardcode — nanti disambung auth)
  const [userEmail] = useState("user@example.com");

  // initial selected product
  const [selected, setSelected] = useState(veterinaryProducts[0]);

  // access state
  const [hasAccess, setHasAccess] = useState(false);

  // 🔥 Cek akses berdasarkan email + product id
  async function checkAccess(productId: number) {
    const res = await fetch("/api/check-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        productId,
      }),
    });

    const data = await res.json();
    setHasAccess(data.hasAccess);
  }

  // 🔥 Setiap kali product berubah → cek aksesnya
  useEffect(() => {
    if (selected?.id) checkAccess(selected.id);
  }, [selected]);

  // Theme khusus vet
  const theme = Colors.veterinary;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <ProductHeader
          selected={selected.id}
          Icon={PawPrint}
          color={theme}
          title="Veterinary Division"
          desc="Veterinary Products"
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar (Category List) */}
          <div className="lg:col-span-3">
            <ProductSidebar
              products={veterinaryProducts}
              selected={selected.id}
              setSelected={(id) => {
                const prod = veterinaryProducts.find((p) => p.id === id);
                if (prod) setSelected(prod);
              }}
              themeColor={theme}
            />
          </div>

          {/* Product Detail */}
          <div className="lg:col-span-6">
            <ProductDetail selected={selected} />
          </div>

          {/* Ingredient (Access Restricted) */}
          <div className="lg:col-span-3">
            <ProductIngredient
              ingredients={selected.ingredients}
              themeColor={theme}
              hasAccess={hasAccess}
              onRequestAccess={() => alert("Request Access here")}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
