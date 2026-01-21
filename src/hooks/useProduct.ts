import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { fetchProducts } from "../lib/api/products/products";

export const useProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProducts(category);
        setProducts(data);

        if (data.length > 0) {
          setSelected(data[0]);
        } else {
          setSelected(null);
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category]);

  return {
    products,
    selected,
    setSelected,
    loading,
    error,
  };
};
