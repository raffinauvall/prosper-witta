import { Category } from "@/lib/types";

export async function getProductCategories(): Promise<Category[]> {
  const res = await fetch("/api/products/category", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  // defensive: pastiin array
  return Array.isArray(data) ? data : [];
}
