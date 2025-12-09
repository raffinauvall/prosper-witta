"use client";

interface Props {
  categories: { id: number; name?: string; slug?: string }[];
  onClose: () => void;
}

export default function CategoryModal({ categories, onClose }: Props) {
  const getCategoryName = (c: { name?: string; slug?: string }) => {
    return c.name ? c.name.replace(/-/g, " ") : c.slug?.replace(/-/g, " ") || "Unknown";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[300px] max-h-[400px] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Categories</h2>

        {categories.length === 0 ? (
          <p className="text-sm">No categories available</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {categories.map((c) => (
              <li key={c.id} className="px-2 py-1 bg-gray-100 rounded">
                {getCategoryName(c)}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
