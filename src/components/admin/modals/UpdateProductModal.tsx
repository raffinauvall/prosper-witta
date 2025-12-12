"use client";

import { useState, useEffect } from "react";
import { Category, Product } from "@/src/lib/types/types";

export default function UpdateProductModal({ product, onClose, onUpdated }: any) {
  // extract category ids dari product
  const initialCategoryIds = product.product_categories
    ? product.product_categories.map((pc: any) => pc.categories.id)
    : [];

  const [name, setName] = useState(product.name);
  const [image, setImage] = useState(product.image || "");
  const [description, setDescription] = useState(product.description || "");
  const [fullDesc, setFullDesc] = useState(product.full_desc || "");
  const [ingredients, setIngredients] = useState<string[]>(product.ingredients || []);
  const [ingredientInput, setIngredientInput] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialCategoryIds);
  const [loading, setLoading] = useState(false);

  // Load semua category
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/products/category");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // toggle category badge
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients((prev) => [...prev, ingredientInput.trim()]);
    setIngredientInput("");
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdate = async () => {
    setLoading(true);

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        image,
        description,
        full_desc: fullDesc,
        ingredients,
        categories: selectedCategories,
      }),
    });

    setLoading(false);

    if (res.ok) {
      onUpdated(); // panggil loadProducts di parent
      onClose();
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>

        <div className="space-y-4">
          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <textarea
            className="border p-3 rounded-lg w-full"
            placeholder="Short Description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="border p-3 rounded-lg w-full"
            placeholder="Full Description"
            rows={4}
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
          />

          {/* INGREDIENTS */}
          <div>
            <label className="font-medium">Ingredients</label>

            <div className="flex gap-2 mt-2">
              <input
                className="border p-2 rounded-lg w-full"
                placeholder="Add ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-3 py-2 bg-black text-white rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {ingredients.map((i, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1"
                >
                  {i}
                  <button
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* CATEGORY PICKER */}
          <div>
            <label className="font-medium">Categories</label>

            <div className="flex gap-2 flex-wrap mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1 rounded text-sm border ${
                    selectedCategories.includes(cat.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
