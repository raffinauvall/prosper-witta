import { News } from "../types";
export type NewsDetail = News & {
  content: string;
};

  const baseUrl = process.env.BASE_URL;

export async function getNewsList(): Promise<News[]> {
  const res = await fetch(`${baseUrl}/api/news`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news list");
  }

  return res.json();
}
export async function getNewsDetail(slug: string): Promise<NewsDetail> {
  if (!slug) {
    throw new Error("Slug is required");
  }
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/news/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news detail");
  }

  return res.json();
}
