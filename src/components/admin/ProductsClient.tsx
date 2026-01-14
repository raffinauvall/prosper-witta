"use client";

import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import CreateProductModal from "./modals/CreateProductModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import UpdateProductModal from "./modals/UpdateProductModal";
import { fetchAdminProducts, deleteProduct } from "@/lib/api/products";
import { Product } from "@/lib/types";

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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
    <div>
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

      <ProductTable 
        products={filteredProducts} 
        onDelete={handleDeleteClick} 
        onUpdate={setEditProduct}
      />

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

      {editProduct && (
        <UpdateProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={loadProducts}
        />
      )}
    </div>
  );
}
