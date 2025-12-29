import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Product } from "@/src/lib/types/types";

type ProductSelectorProps = {
  products: Product[];
  selected?: number | null;
  setSelected: (id: number) => void;
  themeColor: string; 
  loading?: boolean;
};

export default function ProductSidebar({
  products,
  selected,
  setSelected,
  themeColor,
  loading,
}: ProductSelectorProps) {

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter(p =>
      (p.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {/* Search loading */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Product list loading */}
        <div className="bg-white rounded-2xl p-5 shadow-sm max-h-[400px] overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Product List</h3>
          <div className="flex flex-col gap-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search box with icon */}
      <div className="bg-white rounded-2xl p-2 shadow-sm">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl p-5 shadow-sm max-h-[400px] overflow-y-auto">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Product List</h3>
        <div className="flex flex-col gap-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => {
              const active = selected === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`group text-left p-4 rounded-xl border border-${themeColor}-900 transition 
                    ${active ? `border-${themeColor}-500 bg-${themeColor}-100` : "border-gray-200 bg-white"}`}
                >
                  <p
                    className={`font-semibold ${active ? `text-${themeColor}-600` : "text-gray-900"} group-hover:text-${themeColor}-600`}
                  >
                    {item.name}
                  </p>
                </button>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
