"use client";

import { useState } from "react";
import { ArrowLeft, Droplets, PawPrint } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductIngredient from "@/components/products/ProductIngredient";

import { waterTreatmentProducts } from "@/data/waterTreatment";
import { Colors } from "@/lib/color";

export default function waterTreatmentPage() {
  const router = useRouter();

  const theme = Colors.waterTreament;

  const [selected, setSelected] = useState(waterTreatmentProducts[0]);

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
          Icon={Droplets}
          color={Colors.waterTreament}
          title="Water Treatment Division"
          desc="Water Treatment Products"
        />


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <ProductSidebar
              products={waterTreatmentProducts}
              selected={selected.id}      // pass id sesuai props tipe
              setSelected={(id) => {
                const prod = waterTreatmentProducts.find(p => p.id === id);
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
