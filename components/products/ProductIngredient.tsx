type IngredientListProps = {
  ingredients: string[];
  themeColor: string;
  hasAccess: boolean;
  onRequestAccess: () => void;
};

export default function ProductIngredients({
  ingredients,
  themeColor,
  hasAccess,
  onRequestAccess,
}: IngredientListProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm  flex flex-col justify-between w-full min-w-[260px]">
      <div>
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Ingredients / Komposisi
        </h3>

        {/* LOCKED */}
        {!hasAccess && (
          <div className="flex flex-col items-center justify-center text-center border rounded-xl bg-gray-50 py-10 px-4">
            <p className="text-gray-600 text-sm">
              Akses ingredients terkunci untuk publik.
            </p>

            <button
              onClick={onRequestAccess}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Request Access
            </button>
          </div>
        )}

        {/* UNLOCKED */}
        {hasAccess && (
          <ul className="space-y-3 text-sm">
            {ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: themeColor }}
                />
                {ing}
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasAccess && (
        <div className="mt-6 p-4 rounded-xl bg-gray-100">
          <p className="text-xs leading-relaxed text-gray-800">
            Produk ini digunakan untuk kebutuhan industri & water treatment skala besar.
          </p>
        </div>
      )}
    </div>
  );
}
