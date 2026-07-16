import ProductContainer from "@/components/products/ProductContainer";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";
import { absoluteUrl, defaultOpenGraphImages } from "@/lib/seo";
import { productPath } from "@/lib/product-url";
import { getProductsByCategory } from "@/lib/publicProducts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

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
    title: `${info.title} — Chemical Supplier Indonesia`,
    description: `${info.ingredient_desc} Temukan produk dan minta sampel atau dokumen teknis dari PT Prosper Witta Sejahtera.`,
    alternates: {
      canonical: `/products/${category}`,
    },
    openGraph: {
      title: info.title,
      description: info.ingredient_desc,
      url: `/products/${category}`,
      images: defaultOpenGraphImages,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_INFO).map((category) => ({ category }));
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

  if (!category || !CATEGORY_INFO[category as CategoryKey]) {
    notFound();
  }

  const products = await getProductsByCategory(category);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: CATEGORY_INFO[category as CategoryKey].title,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: absoluteUrl(productPath(product)),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductContainer
        category={category as CategoryKey}
        products={products}
      />
    </>
  );
}
