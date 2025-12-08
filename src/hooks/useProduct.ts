// src/hooks/useProducts.ts
import { useEffect } from "react";
import { useProductStore } from "@/src/store/productStore";

export const useProducts = (category: string) => {
  const { products, selected, setSelected, loadProducts, pollAccess, loading, error, accessMap } =
    useProductStore();

  useEffect(() => {
    loadProducts(category);
  }, [category]);

  useEffect(() => {
    if (!selected?.id) return;
    const interval = setInterval(() => pollAccess(selected.id), 5000);
    return () => clearInterval(interval);
  }, [selected?.id]);

  return {
    products,
    selected,
    setSelected,
    loading,
    error,
    accessMap,
  };
};
