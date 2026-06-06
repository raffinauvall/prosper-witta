import ProductContainer from "@/components/products/ProductContainer";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";
import { Metadata } from "next";
import { use } from "react";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_INFO[category as CategoryKey];

  if (!info) {
    return {
      title: "Product Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: info.title,
    description: `${info.desc}. ${info.ingredient_desc}`,
    alternates: {
      canonical: `/products/${category}`,
    },
    openGraph: {
      title: info.title,
      description: info.ingredient_desc,
      url: `/products/${category}`,
    },
  };
}

export default function Page({ params }: PageProps) {
  const { category } = use(params);

  if (!category || !CATEGORY_INFO[category as CategoryKey]) {
    return <p>Category &quot;{category ?? ""}&quot; not found</p>;
  }

  return <ProductContainer category={category as CategoryKey} />;
}
