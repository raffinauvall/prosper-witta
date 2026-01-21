import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
  const { slug } = await params;

  if (!slug) {
    throw new Error("Slug is missing");
  }

  const news: NewsDetail = await getNewsDetail(slug);

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="list-none flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/news" className="hover:underline">News</Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 font-medium">{news.title}</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
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
        <div className="relative -mx-4 sm:-mx-6 mb-10 h-[450px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105">
          <Image
            src={news.thumbnail_url}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

      )}

      {/* Content */}
      <article className="prose prose-lg prose-neutral max-w-none mx-auto">
        {/* Drop cap style untuk paragraf pertama */}
        <div
          className="first-letter:text-5xl first-letter:font-bold first-letter:text-gray-800 first-letter:mr-3 first-letter:float-left"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </article>

      {/* Back Button */}
      <Link
        href="/news"
        className="mt-12 inline-block text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
      >
        ← Back to News
      </Link>
      
    </div>
    <Footer />
    </>
  );
}
