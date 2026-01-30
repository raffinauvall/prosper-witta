
export async function sendNewsletter(payload: {
  newsId: string;
  sendToAll?: boolean;
  contactId?: string | number;
}) {
  const res = await fetch("/api/admin/newsletter/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Gagal kirim newsletter");
  }

  return data;
}

export async function fetchNewsList() {
  const res = await fetch("/api/admin/news");

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Gagal ambil berita");
  }

  return data.data;
}
