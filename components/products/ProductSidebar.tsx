type Product = {
  id: number;
  name: string;
  desc: string;
  fullDesc: string;
};

type ProductSelectorProps = {
  products: Product[];
  selected: number;
  setSelected: (id: number) => void;
  themeColor: string; // misal "blue", "amber", "emerald"
};

export default function ProductSidebar({
  products,
  selected,
  setSelected,
  themeColor
}: ProductSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">
        Product List
      </h3>

      <div className="flex flex-col gap-3">
        {products.map((item) => {
          const active = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`group text-left p-4 rounded-xl border transition 
                          ${active ? `border-${themeColor}-500 bg-${themeColor}-100` : "border-gray-200 bg-white"}`}
            >
              <p
                className={`font-semibold ${active ? `text-${themeColor}-600` : "text-gray-900"} group-hover:text-${themeColor}-600`}
              >
                {item.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
