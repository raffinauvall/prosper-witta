"use client";

import { News } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsClient({ news }: { news: News[] }) {

  const { lang } = useLanguage();
  if (news.length === 0) {
    return (
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-500">
          Belum ada berita.
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <a
              key={item.id}
              href={`/news/${item.slug}`}
              className="group rounded-2xl overflow-hidden shadow bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* THUMBNAIL */}
              {item.thumbnail_url ? (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}

              {/* BODY */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.excerpt?.[lang] ?? "-"}
                </p>

                <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
                  <span>
                    {item.published_at
                      ? new Date(item.published_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Tanggal belum tersedia"}
                  </span>

                  <span className="text-blue-600 font-medium group-hover:underline">
                    Read →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
