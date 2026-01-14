"use client";

import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import FileUploadField from "../FileUploadField";

export default function CreateProductModal({ onClose, onCreated }: any) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState({
    id: "",
    en: "",
  });

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const [msdsFile, setMsdsFile] = useState<File | null>(null);
  const [tdsFile, setTdsFile] = useState<File | null>(null);
  const [display, setDisplay] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/products/category");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

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

  // 🚀 SUBMIT
  const handleCreate = async () => {
    if (!name || !description.id) {
      alert("Product name dan Description wajib diisi!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", JSON.stringify(description));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("display", String(display));

    if (msdsFile) formData.append("msds", msdsFile);
    if (tdsFile) formData.append("tds", tdsFile);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      onCreated();
      onClose();
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>

        <div className="space-y-4">

          {/* PRODUCT NAME */}
          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* DESCRIPTION ID */}
          <textarea
            className="border p-3 rounded-lg w-full"
            rows={3}
            placeholder="Description (Indonesia)"
            value={description.id}
            onChange={(e) =>
              setDescription((prev) => ({ ...prev, id: e.target.value }))
            }
          />

          {/* DESCRIPTION EN */}
          <textarea
            className="border p-3 rounded-lg w-full"
            rows={3}
            placeholder="Description (English)"
            value={description.en}
            onChange={(e) =>
              setDescription((prev) => ({ ...prev, en: e.target.value }))
            }
          />

          {/* FILE UPLOAD */}
          <div className="flex flex-wrap gap-3">
            <FileUploadField
              label="MSDS Document"
              file={msdsFile}
              onChange={setMsdsFile}
            />

            <FileUploadField
              label="TDS Document"
              file={tdsFile}
              onChange={setTdsFile}
            />
          </div>


          {/* DISPLAY */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={display}
              onChange={(e) => setDisplay(e.target.checked)}
            />
            Display Product
          </label>

          

          {/* CATEGORY */}
          <div>
            <label className="font-medium">Categories</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1 rounded text-sm border
                    ${selectedCategories.includes(cat.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                    }
                  `}
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
            onClick={handleCreate}
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
