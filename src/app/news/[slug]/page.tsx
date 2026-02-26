
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsDetail } from "@/lib/api/news";
import { useLanguage } from "@/context/LanguageContext";
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
    title: `${news.title} | PT Prosper Witta Sejahtera`,
    description: news.excerpt?.en || news.title,
    openGraph: {
      title: news.title,
      description: news.excerpt?.en || news.title,
      images: news.thumbnail_url
        ? [{ url: news.thumbnail_url }]
        : [],
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
