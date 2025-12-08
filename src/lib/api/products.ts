import { Product } from "../types/types";

export async function fetchProducts(category: string): Promise<Product[]> {
  try {
    const res = await fetch(`/api/products/by-category?category=${category}`);

    if (!res.ok) {
      const text = await res.text(); // fallback baca body sebagai text
      console.error("Fetch products HTTP error:", res.status, text);
      return [];
    }

    // safe parse
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  } catch (err: any) {
    console.error("Fetch products network error:", err.message);
    return [];
  }
}
