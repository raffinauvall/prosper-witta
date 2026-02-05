"use client";

import { useEffect, useState } from "react";
import { Category } from "@/lib/types";
import FileUploadField from "../FileUploadField";
import { getProductDocumentStatus } from "@/lib/api/documents/documents";

type Props = {
  product: any;
  onClose: () => void;
  onUpdated: () => void;
};

export default function UpdateProductModal({ product, onClose, onUpdated }: Props) {
  const initialCategoryIds = Array.isArray(product?.product_categories)
    ? product.product_categories
        .map((pc: any) => pc.categories?.id)
        .filter(Boolean)
    : [];

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [msdsFile, setMsdsFile] = useState<File | null>(null);
  const [tdsFile, setTdsFile] = useState<File | null>(null);

  const [removeMsds, setRemoveMsds] = useState(false);
  const [removeTds, setRemoveTds] = useState(false);

  const [docStatus, setDocStatus] = useState({
    msds: false,
    tds: false,
  });

  const [form, setForm] = useState({
    name: "",
    description: { id: "", en: "" },
    categories: [] as number[],
    display: true,
  });

  /* ==================== SYNC PRODUCT -> FORM ==================== */
  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      description: { id: product.description?.id || "", en: product.description?.en || "" },
      categories: initialCategoryIds,
      display: product.display ?? true,
    });

    setRemoveMsds(false);
    setRemoveTds(false);
    setMsdsFile(null);
    setTdsFile(null);
  }, [product]);

  /* ==================== LOAD CATEGORIES ==================== */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/products/category");
        const json = await res.json();
        const cats: Category[] = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  /* ==================== LOAD DOCUMENT STATUS ==================== */
  useEffect(() => {
    if (!product?.id) return;

    getProductDocumentStatus(product.id)
      .then((res) => {
        setDocStatus({
          msds: Boolean(res?.msds),
          tds: Boolean(res?.tds),
        });
      })
      .catch(() => setDocStatus({ msds: false, tds: false }));
  }, [product?.id]);

  /* ==================== HANDLERS ==================== */
  const toggleCategory = (id: number) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  const handleUpdate = async () => {
    if (!form.name || !form.description.id) {
      alert("Product name dan Description (ID) wajib diisi!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", JSON.stringify(form.description));
    formData.append("categories", JSON.stringify(form.categories));
    formData.append("display", String(form.display));

    if (msdsFile) formData.append("msds", msdsFile);
    if (tdsFile) formData.append("tds", tdsFile);
    if (removeMsds) formData.append("removeMsds", "true");
    if (removeTds) formData.append("removeTds", "true");

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        onUpdated();
        onClose();
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert("Failed to update product: " + (errJson?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product due to network error");
    } finally {
      setLoading(false);
    }
  };

  /* ==================== UI ==================== */
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>

        <div className="space-y-4">
          {/* PRODUCT NAME */}
          <input
            className="border p-3 rounded-lg w-full"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />

          {/* DESCRIPTION ID */}
          <div>
            <label className="text-sm font-medium">Description (Bahasa Indonesia)</label>
            <textarea
              className="border p-3 rounded-lg w-full mt-1"
              rows={3}
              value={form.description.id}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: { ...prev.description, id: e.target.value },
                }))
              }
            />
          </div>

          {/* DESCRIPTION EN */}
          <div>
            <label className="text-sm font-medium">Description (English)</label>
            <textarea
              className="border p-3 rounded-lg w-full mt-1"
              rows={3}
              value={form.description.en}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: { ...prev.description, en: e.target.value },
                }))
              }
            />
          </div>

          {/* DISPLAY TOGGLE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.display}
              onChange={(e) => setForm((prev) => ({ ...prev, display: e.target.checked }))}
            />
            <span className="text-sm font-medium">Display product on website</span>
          </div>

          {/* FILE UPLOAD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <FileUploadField
              label="MSDS"
              file={msdsFile}
              hasExisting={docStatus.msds && !removeMsds}
              onChange={(file) => {
                setMsdsFile(file);
                setRemoveMsds(false);
              }}
              onRemoveExisting={() => setRemoveMsds(true)}
            />
            <FileUploadField
              label="TDS"
              file={tdsFile}
              hasExisting={docStatus.tds && !removeTds}
              onChange={(file) => {
                setTdsFile(file);
                setRemoveTds(false);
              }}
              onRemoveExisting={() => setRemoveTds(true)}
            />
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
                    form.categories.includes(cat.id)
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
