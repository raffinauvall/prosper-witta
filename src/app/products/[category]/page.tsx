import ProductContainer from "@/components/products/ProductContainer";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";
import { use } from "react";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function Page({ params }: PageProps) {
  const { category } = use(params);

  if (!category || !CATEGORY_INFO[category as CategoryKey]) {
    return <p>Category "{category ?? ""}" not found</p>;
  }

  return <ProductContainer category={category as CategoryKey} />;
}
