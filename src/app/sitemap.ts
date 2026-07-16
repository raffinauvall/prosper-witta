import type { MetadataRoute } from "next";
import { CATEGORY_INFO } from "@/lib/category-info";
import { supabaseClient } from "@/lib/supabaseClient";
import { absoluteUrl } from "@/lib/seo";
import { productPath } from "@/lib/product-url.mjs";
import { getPublicProducts } from "@/lib/publicProducts";

export const revalidate = 3600;

type NewsSitemapRow = {
  slug: string;
  published_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ─── Static pages ─── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/products"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/news"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* ─── Product category pages ─── */
  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_INFO).map(
    (category) => ({
      url: absoluteUrl(`/products/${category}`),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  /* ─── Crawlable product detail pages ─── */
  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    productRoutes = (await getPublicProducts()).map((product) => ({
      url: absoluteUrl(productPath(product)),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("SITEMAP: Failed to fetch products", err);
  }

  /* ─── Dynamic news article pages ─── */
  let newsRoutes: MetadataRoute.Sitemap = [];

  try {
    const { data: newsRows, error } = await supabaseClient
      .from("news")
      .select("slug, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("SITEMAP NEWS ERROR:", error);
    }

    newsRoutes = ((newsRows ?? []) as NewsSitemapRow[])
      .filter((news) => Boolean(news.slug))
      .map((news) => ({
        url: absoluteUrl(`/news/${news.slug}`),
        ...(news.published_at
          ? { lastModified: new Date(news.published_at) }
          : {}),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch (err) {
    console.error("SITEMAP: Failed to fetch news", err);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...newsRoutes];
}
