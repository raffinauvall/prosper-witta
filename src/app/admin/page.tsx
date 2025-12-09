"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/src/components/admin/ProductTable";
import CategoryFilter from "@/src/components/admin/CategoryFilter";
import SearchBar from "@/src/components/admin/SearchBar";
import CreateProductModal from "@/src/components/admin/modals/CreateProductModal";
import DeleteConfirmModal from "@/src/components/admin/modals/DeleteConfirmModal";
import { fetchAdminProducts, deleteProduct } from "@/src/lib/api/products";
import { Product } from "@/src/lib/types/types";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadProducts = async () => {
    try {
      const data = await fetchAdminProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductCreated = async () => {
    await loadProducts();
    setModalCreateOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;

    try {
      await deleteProduct(deleteId);
      alert("Product deleted");
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Products</h1>
        <button
          onClick={() => setModalCreateOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar products={products} setFilteredProducts={setFilteredProducts} />
        <CategoryFilter products={products} setFilteredProducts={setFilteredProducts} />
      </div>

      <ProductTable products={filteredProducts} onDelete={handleDeleteClick} />

      {modalCreateOpen && (
        <CreateProductModal
          onClose={() => setModalCreateOpen(false)}
          onCreated={handleProductCreated}
        />
      )}

      {deleteModalOpen && deleteId !== null && (
        <DeleteConfirmModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </main>
  );
}
