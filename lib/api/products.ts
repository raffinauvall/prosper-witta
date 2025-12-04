export async function fetchProducts(category: string) {
  try {
    const res = await fetch(`/api/products/by-category?category=${encodeURIComponent(category)}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      console.error("Fetch products error:", await res.text());
      return [];
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch products failed:", err);
    return [];
  }
}
