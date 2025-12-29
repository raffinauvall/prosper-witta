"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useProducts } from "@/src/hooks/useProduct";
import ProductHeader from "@/src/components/products/ProductHeader";
import ProductSidebar from "@/src/components/products/ProductSidebar";
import ProductDetail from "@/src/components/products/ProductDetail";
import ProductMsds from "./ProductMsds";
import ProductTds from "./ProductTds";
import RequestSampleForm from "./RequestSample";
import DetailSkeleton from "@/src/components/products/DetailSkeleton";
import { CATEGORY_INFO, CategoryKey } from "@/src/lib/category-info";
import { useState } from "react";
import RequestAccessModal from "./modals/RequestAccessModal";

interface ProductContainerProps {
  category: CategoryKey;
}

export default function ProductContainer({ category }: ProductContainerProps) {
  const router = useRouter();
  const info = CATEGORY_INFO[category];

  const [modalOpen, setModalOpen] = useState(false);
  const [docType, setDocType] = useState<"msds" | "tds">("msds");

  const handleRequest = (type: "msds" | "tds") => {
    setDocType(type);
    setModalOpen(true);
  };
  if (!info) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <p className="text-red-600 font-medium text-lg">
          ⚠ Category "{category}" not found
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 underline text-blue-600"
        >
          Back
        </button>
      </main>
    );
  }

  const {
    products,
    selected,
    setSelected,
    loading,
    error,
  } = useProducts(category);

  // 🔑 wrapper penting
  const handleSelectProduct = (id: number) => {
    const product = products.find(p => p.id === id) || null;
    setSelected(product);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center">
          <ProductHeader
            selected={selected?.id}
            Icon={info.icon}
            color={info.theme}
            title={info.title}
            desc={info.desc}
          />

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-white p-4 px-6 rounded-full bg-blue-900 hover:font-bold mb-6"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {error && (
          <p className="text-red-600 font-medium my-4">⚠ {error}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <div className="lg:col-span-3">
            <ProductSidebar
              products={products}
              selected={selected?.id}
              setSelected={handleSelectProduct}
              themeColor={info.theme}
              loading={loading}
            />
          </div>

          {/* DETAIL */}
          <div className="lg:col-span-6">
            {loading && <DetailSkeleton />}

            {!loading && selected && (
              <>
                <ProductDetail selected={selected} />

                <div className="md:flex gap-4 mt-6">
                  <ProductMsds
                    productId={selected.id}
                    onRequest={handleRequest}
                  />
                  <ProductTds
                    productId={selected.id}
                    onRequest={handleRequest}
                  />
                </div>
              </>
            )}
          </div>
          {selected && (
            <RequestAccessModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              productId={selected.id}
              type={docType}
            />
          )}
          {/* ACTION */}
          <div className="lg:col-span-3 space-y-4">
            {selected && (
              <RequestSampleForm productId={selected.id} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
