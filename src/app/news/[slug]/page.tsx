import { getNewsDetail } from "@/lib/api/news";
import { NewsDetail } from "@/lib/api/news";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params; // ✅ WAJIB await

  if (!slug) {
    throw new Error("Slug is missing");
  }

  const news: NewsDetail = await getNewsDetail(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        href="/news"
        className="text-sm text-gray-500 hover:underline mb-6 inline-block"
      >
        ← Back to News
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        {news.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-6">
        {new Date(news.published_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Thumbnail */}
      {news.thumbnail_url && (
        <div className="relative w-full h-[360px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={news.thumbnail_url}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
}
