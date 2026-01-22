import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsDetail } from "@/lib/api/news";

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
  const { slug } = await params; // ⬅️ WAJIB

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
    description: news.excerpt || news.title,
    openGraph: {
      title: news.title,
      description: news.excerpt,
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
  const { slug } = await params; // ⬅️ WAJIB

  if (!slug) notFound();

  const news = await getNewsDetail(slug);

  if (!news) notFound();

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <Link href="/news">News</Link> /{" "}
          <span className="text-gray-700">{news.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4">
          {news.title}
        </h1>

        {/* Date */}
        {news.published_at && (
          <p className="text-gray-500 text-sm mb-8">
            {new Date(news.published_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        {/* Thumbnail */}
        {news.thumbnail_url && (
          <div className="relative h-[420px] mb-10 rounded-2xl overflow-hidden">
            <Image
              src={news.thumbnail_url}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        <Link
          href="/news"
          className="inline-block mt-12 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to News
        </Link>
      </div>

      <Footer />
    </>
  );
}
