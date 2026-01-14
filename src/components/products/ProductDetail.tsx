"use client";

import { Product } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

type ProductDetailProps = {
  selected?: Product;
};

export default function ProductDetail({ selected }: ProductDetailProps) {
  const { lang } = useLanguage();

  if (!selected) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500">
          Pilih produk untuk melihat detailnya.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl mb-3 shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selected.name}
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed">
          {selected.description?.[lang] ?? "-"}
        </p>
      </div>
    </div>
  );
}
