"use client";

import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import FileUploadField from "../FileUploadField";
import { createProductForm } from "@/lib/api/products/products";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateProductModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState({ id: "", en: "" });
  const [msdsFile, setMsdsFile] = useState<File | null>(null);
  const [tdsFile, setTdsFile] = useState<File | null>(null);
  const [display, setDisplay] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= Load categories =================
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/products/category");
        const data = await res.json();

        if (Array.isArray(data)) setCategories(data);
        else if (data?.data && Array.isArray(data.data)) setCategories(data.data);
        else setCategories([]);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  // ================= Category toggle =================
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // ================= Handle Create =================
  const handleCreate = async () => {
    if (!name || !description.id) {
      alert("Product name dan Description wajib diisi!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", JSON.stringify(description));
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("display", String(display));
    if (msdsFile) formData.append("msds", msdsFile);
    if (tdsFile) formData.append("tds", tdsFile);

    try {
      await createProductForm(formData);
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  // ================= Render =================
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Create Product</h2>

        <div className="space-y-4">
          {/* Product Name */}
          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description ID */}
          <textarea
            className="border p-3 rounded-lg w-full"
            rows={3}
            placeholder="Description (Indonesia)"
            value={description.id}
            onChange={(e) => setDescription((prev) => ({ ...prev, id: e.target.value }))}
          />

          {/* Description EN */}
          <textarea
            className="border p-3 rounded-lg w-full"
            rows={3}
            placeholder="Description (English)"
            value={description.en}
            onChange={(e) => setDescription((prev) => ({ ...prev, en: e.target.value }))}
          />

          {/* File Upload */}
          <div className="flex flex-wrap gap-3">
            <FileUploadField label="MSDS Document" file={msdsFile} onChange={setMsdsFile} />
            <FileUploadField label="TDS Document" file={tdsFile} onChange={setTdsFile} />
          </div>

          {/* Display */}
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={display} onChange={(e) => setDisplay(e.target.checked)} />
            Display Product
          </label>

          {/* Categories */}
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
