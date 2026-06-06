
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail } from "@/lib/api/news";
import NewsDetailClient from "@/components/news/NewsDetailClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};


/* ======================
   SEO METADATA
====================== */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "News | PT Prosper Witta Sejahtera",
    };
  }

  const news = await getNewsDetail(slug);

  if (!news) {
    return {
      title: "News Not Found | PT Prosper Witta Sejahtera",
    };
  }

  return {
    title: news.title,
    description: news.excerpt?.en || news.title,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: news.title,
      description: news.excerpt?.en || news.title,
      url: `/news/${slug}`,
      type: "article",
      publishedTime: news.published_at,
      images: news.thumbnail_url
        ? [{ url: news.thumbnail_url }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.excerpt?.en || news.title,
      images: news.thumbnail_url ? [news.thumbnail_url] : [],
    },
  };
}

/* ======================
   PAGE CONTENT
====================== */
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) notFound();

  const news = await getNewsDetail(slug);

  if (!news) notFound();

  return <NewsDetailClient news={news} />;
}
