// lib/api.ts
import { Product } from "../types/types";

// GET BY CATEGORY
export async function fetchProducts(category: string): Promise<Product[]> {
  try {
    const res = await fetch(`/api/products/by-category?category=${category}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.error("Fetch products error:", err.message);
    return [];
  }
}

export async function fetchAdminProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch admin products error:", err);
    return [];
  }
}

// CREATE PRODUCT
export async function createProduct(product: Product) {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Create product error:", err);
  }
}

export async function updateProduct(id: string, product: Product) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Update product error:", err);
  }
}

export async function deleteProduct(id: number) {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}





