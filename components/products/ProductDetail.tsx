import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  full_desc: string;
  image?: string;
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
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="relative w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden">
        {selected.image && (
          <Image
            src={selected.image}
            alt={selected.name}
            fill
            className="object-cover hover:scale-105 transition duration-500"
          />
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-6">
        {selected.name}
      </h2>

      <p className="text-gray-600 mt-3 leading-relaxed">
        {selected.full_desc}
      </p>
    </div>
  );
}
