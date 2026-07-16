"use client";

import { PublicProduct } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

type ProductDetailProps = {
  selected?: PublicProduct;
  headingTag?: "h1" | "h2";
};

export default function ProductDetail({
  selected,
  headingTag: Heading = "h2",
}: ProductDetailProps) {
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
        <Heading className="text-2xl font-bold text-gray-900">
          {selected.name}
        </Heading>

        <p className="text-gray-600 mt-3 leading-relaxed">
          {selected.description?.[lang] ||
            selected.description?.en ||
            selected.description?.id ||
            "-"}
        </p>
      </div>
    </div>
  );
}
