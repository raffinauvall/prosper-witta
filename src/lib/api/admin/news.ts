import { News, NewsFormData } from "@/lib/types/news";

const API_URL = "/api/admin/news";

export async function getNews(): Promise<News[]> {
  const res = await fetch(API_URL, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}


export async function createNews(
  form: NewsFormData
): Promise<News> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error("Failed to create news");
  }

  const data = await res.json();
  return data[0];
}

export async function updateNews(
  id: string,
  form: NewsFormData
): Promise<News> {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...form }),
  });

  if (!res.ok) {
    throw new Error("Failed to update news");
  }

  return res.json();
}


export async function deleteNews(id: string): Promise<void> {
  const res = await fetch(`${API_URL}?id=${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete news");
  }
}


export async function uploadNewsImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload/news", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.url as string;
}
