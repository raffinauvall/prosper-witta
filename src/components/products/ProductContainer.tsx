"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useProductStore } from "@/src/store/productStore";
import { useProducts } from "@/src/hooks/useProduct";
import ProductHeader from "@/src/components/products/ProductHeader";
import ProductSidebar from "@/src/components/products/ProductSidebar";
import ProductDetail from "@/src/components/products/ProductDetail";
import ProductIngredient from "@/src/components/products/ProductIngredient";
import RequestAccessModal from "@/src/components/products/RequestAccessModal";
import ApprovedNotification from "@/src/components/ui/ApprovedNotification";
import DetailSkeleton from "@/src/components/products/DetailSkeleton";
import { useSubmitAccess } from "@/src/hooks/useSubmitAccess";

import { useAccessModal } from "@/src/hooks/useAccessModal";
import { usePollingAccess } from "@/src/hooks/usePollingAccess";
import { CATEGORY_INFO, CategoryKey } from "@/src/lib/category-info";

interface ProductContainerProps {
  category: CategoryKey;
}

export default function ProductContainer({ category }: ProductContainerProps) {
  const router = useRouter();
  const info = CATEGORY_INFO[category];

  // Guard: category tidak valid
  if (!info) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <p className="text-red-600 font-medium text-lg">
          ⚠ Category "{category}" not found
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 underline text-blue-600 hover:text-blue-800"
        >
          Back
        </button>
      </main>
    );
  }

  // TypeScript yakin info pasti ada setelah guard
  const { products, selected, setSelected, loading, accessMap, showNotif, error } = useProductStore();
  const { openModal, setOpenModal, companyName, setCompanyName, purpose, setPurpose, reset } = useAccessModal();

  usePollingAccess(selected?.id);
  useProducts(category); // filter by category otomatis

  const { submit } = useSubmitAccess();
  const handleSubmit = () => {
    submit(companyName, purpose, () => {
      reset();
      setOpenModal(false);
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <ProductHeader
          selected={selected?.id}
          Icon={info.icon}
          color={info.theme}
          title={info.title}
          desc={info.desc}
        />

        {error && <p className="text-red-600 font-medium my-4">⚠ {error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ProductSidebar
              products={products}
              selected={selected?.id}
              setSelected={setSelected}
              themeColor={info.theme}
              loading={loading}
            />
          </div>

          <div className="lg:col-span-6">
            {loading ? <DetailSkeleton /> : selected && <ProductDetail selected={selected} />}
          </div>

          <div className="lg:col-span-3 space-y-4">
            {selected && !loading && (
              <ProductIngredient
                ingredients={selected.ingredients}
                themeColor={info.theme}
                hasAccess={accessMap[selected.id] ?? false}
                ingredients_desc={info.ingredient_desc}
                setShowModal={setOpenModal}
              />
            )}

            <ApprovedNotification show={showNotif} onClose={() => {}} />
          </div>
        </div>
      </div>

      <RequestAccessModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        company={companyName}
        setCompany={setCompanyName}
        purpose={purpose}
        setPurpose={setPurpose}
      />
    </main>
  );
}
