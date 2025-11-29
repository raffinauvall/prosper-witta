"use client";

import { useState } from "react";
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

  // Theme color khusus veterinary
  const theme = Colors.veterinary; // misal: "amber"

  // selected sekarang object Product
  const [selected, setSelected] = useState(veterinaryProducts[0]);

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
  selected={selected.id}   // atau selected object sesuai tipe
  Icon={PawPrint}
  color={Colors.veterinary}
  title="Veterinary Division"
  desc="Veterinary Products"
/>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <ProductSidebar
              products={veterinaryProducts}
              selected={selected.id}      // pass id sesuai props tipe
              setSelected={(id) => {
                const prod = veterinaryProducts.find(p => p.id === id);
                if (prod) setSelected(prod);
              }}
              themeColor={theme}
            />
          </div>

          {/* Detail */}
          <div className="lg:col-span-6">
            <ProductDetail selected={selected} />
          </div>

          {/* Ingredients */}
          <div className="lg:col-span-3">
            <ProductIngredient
              ingredients={selected.ingredients}
              themeColor={theme}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
