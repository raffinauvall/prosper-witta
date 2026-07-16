import ProductContainer from "@/components/products/ProductContainer";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";
import { productPath, productSlug as slugifyProduct } from "@/lib/product-url";
import { getProductsByCategory, getPublicProduct } from "@/lib/publicProducts";
import { absoluteUrl, defaultOpenGraphImages } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ productId: string; productSlug: string }>;
};

function primaryCategory(product: Awaited<ReturnType<typeof getPublicProduct>>) {
  return product?.categories
    .map(({ slug }) => slug)
    .find((slug): slug is CategoryKey => slug in CATEGORY_INFO);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getPublicProduct(Number(productId));
  const category = primaryCategory(product);

  if (!product || !category) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    product.description.id || product.description.en ||
    `${product.name} dari PT Prosper Witta Sejahtera.`;
  const url = productPath(product);

  return {
    title: `${product.name} — ${CATEGORY_INFO[category].desc}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${product.name} | PT Prosper Witta Sejahtera`,
      description,
      url,
      images: defaultOpenGraphImages.map((image) => ({
        ...image,
        alt: product.name,
      })),
    },
    twitter: {
      card: "summary",
      title: `${product.name} | PT Prosper Witta Sejahtera`,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { productId, productSlug } = await params;
  const id = Number(productId);

  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const product = await getPublicProduct(id);
  const category = primaryCategory(product);

  if (!product || !category) notFound();
  if (productSlug !== slugifyProduct(product.name)) {
    permanentRedirect(productPath(product));
  }

  const products = await getProductsByCategory(category);
  const description = product.description.id || product.description.en;
  const url = absoluteUrl(productPath(product));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description,
        url,
        category: CATEGORY_INFO[category].title,
        brand: {
          "@type": "Brand",
          name: "PT Prosper Witta Sejahtera",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Products",
            item: absoluteUrl("/products"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: CATEGORY_INFO[category].title,
            item: absoluteUrl(`/products/${category}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductContainer
        category={category}
        products={products}
        selectedId={product.id}
      />
    </>
  );
}
