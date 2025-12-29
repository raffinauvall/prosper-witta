import { Product } from "@/src/lib/types/types";
import Image from "next/image";



type ProductDetailProps = {
  selected?: Product;
};

export default function ProductDetail({ selected }: ProductDetailProps) {
  if (!selected) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500">Pilih produk untuk melihat detailnya.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl mb-3 shadow-sm">
     
        <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 ">
        {selected.name}
      </h2>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {selected.full_desc}
      </p>
    </div>
    </div>
  );
}
