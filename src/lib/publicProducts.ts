import { cache } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import type { Category, PublicProduct } from "@/lib/types";

type CategoryRelation = Pick<Category, "id" | "name">;

type ProductRow = {
  id: number;
  name: string;
  description: PublicProduct["description"] | null;
  display: boolean;
  product_categories: {
    categories: CategoryRelation | CategoryRelation[] | null;
  }[];
};

export const getPublicProducts = cache(async (): Promise<PublicProduct[]> => {
  const { data, error } = await supabaseClient
    .from("products")
    .select(`
      id,
      name,
      description,
      display,
      product_categories (
        categories ( id, name )
      )
    `)
    .eq("display", true)
    .order("name", { ascending: true });

  if (error) throw new Error(`Failed to load public products: ${error.message}`);

  return ((data ?? []) as ProductRow[]).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? { id: "", en: "" },
    display: product.display,
    categories: product.product_categories
      .flatMap(({ categories }) =>
        Array.isArray(categories) ? categories : categories ? [categories] : []
      )
      .map((category) => ({ ...category, slug: category.name })),
  }));
});

export async function getProductsByCategory(category: string) {
  const products = await getPublicProducts();
  return products.filter((product) =>
    product.categories.some(({ slug }) => slug === category)
  );
}

export async function getPublicProduct(id: number) {
  // ponytail: in-memory lookup is enough for this catalog; query by ID if it grows large.
  return (await getPublicProducts()).find((product) => product.id === id) ?? null;
}
