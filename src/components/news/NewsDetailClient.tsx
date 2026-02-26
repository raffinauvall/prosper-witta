"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NewsDetailClient({ news }: any) {
  const { lang } = useLanguage();

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/">Home</Link> /{" "}
          <Link href="/news">News</Link> /{" "}
          <span className="text-gray-700">{news.title}</span>
        </nav>

        <h1 className="text-4xl font-extrabold mb-4">
          {news.title}
        </h1>

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

        <article className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: news.content?.[lang] ?? news.content?.["en"] ?? "-",
            }}
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
