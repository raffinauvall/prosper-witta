type IngredientListProps = {
  ingredients: string[];
  themeColor: string; // sekarang cukup satu warna
};

export default function ProductIngredients({ ingredients, themeColor }: IngredientListProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-gray-900">
        Ingredients / Komposisi
      </h3>

      <ul className="space-y-3 text-sm">
        {ingredients.map((ing, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span
              className={`w-2 h-2 rounded-full bg-${themeColor}-500`}
            />
            {ing}
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 rounded-xl bg-gray-100">
        <p className="text-xs leading-relaxed text-gray-800">
          Produk ini telah digunakan untuk kebutuhan industri.
        </p>
      </div>
    </div>
  );
}