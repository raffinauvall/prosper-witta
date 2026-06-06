import type { MetadataRoute } from "next";
import { CATEGORY_INFO } from "@/lib/category-info";
import { supabaseClient } from "@/lib/supabaseClient";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

type NewsSitemapRow = {
  slug: string;
  published_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/news"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_INFO).map((category) => ({
    url: absoluteUrl(`/products/${category}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const { data: newsRows, error } = await supabaseClient
    .from("news")
    .select("slug, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("SITEMAP NEWS ERROR:", error);
  }

  const newsRoutes: MetadataRoute.Sitemap = ((newsRows ?? []) as NewsSitemapRow[])
    .filter((news) => Boolean(news.slug))
    .map((news) => ({
      url: absoluteUrl(`/news/${news.slug}`),
      lastModified: news.published_at ? new Date(news.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...categoryRoutes, ...newsRoutes];
}
