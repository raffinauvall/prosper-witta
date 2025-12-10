import Image from "next/image";

type Product = {
  id: number;
  name: string;
  desc: string;
  full_desc: string;
};

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
    <div className="bg-white rounded-2xl shadow-sm">
     
        <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mt-6">
        {selected.name}
      </h2>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {selected.full_desc}
      </p>
    </div>
    </div>
  );
}
