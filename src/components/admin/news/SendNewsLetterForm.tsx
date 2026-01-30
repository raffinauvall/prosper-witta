"use client";

import { useState, useEffect } from "react";
import { News } from "@/lib/types/news";
import Modal from "./Modals";
import { sendNewsletter, fetchNewsList } from "@/lib/api/admin/newsletter";

interface Props {
  onClose: () => void;
  sendToAll?: boolean;
  contactId?: string; // ⬅️ sesuai tipe lu sekarang
}

export default function SendNewsletterModal({
  onClose,
  sendToAll,
  contactId,
}: Props) {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ======================
  // load news
  // ======================
  useEffect(() => {
    const load = async () => {
      try {
        const list = await fetchNewsList();
        setNewsList(list);
      } catch (e) {
        alert("Gagal ambil berita");
      } finally {
        setFetching(false);
      }
    };

    load();
  }, []);

  // ======================
  // send
  // ======================
  const handleSend = async () => {
    if (!selectedNews) return alert("Pilih berita dulu");

    setLoading(true);

    try {
      await sendNewsletter({
        newsId: selectedNews.id,
        sendToAll,
        contactId,
      });

      alert("Newsletter berhasil dikirim 🚀");
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Kirim Newsletter" onClose={onClose}>
      <div className="space-y-4">

        {/* SELECT */}
        {fetching ? (
          <div className="text-sm text-gray-500">Memuat berita...</div>
        ) : (
          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={selectedNews?.id || ""}
            onChange={(e) => {
              const n = newsList.find((n) => n.id === e.target.value);
              setSelectedNews(n || null);
            }}
          >
            <option value="">Pilih berita</option>
            {newsList.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>
        )}

        {/* PREVIEW */}
        {selectedNews && (
          <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Preview Newsletter</p>
            <h3 className="font-semibold text-lg">{selectedNews.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {selectedNews.excerpt}
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleSend}
            disabled={!selectedNews || loading}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Mengirim..."
              : sendToAll
              ? "Kirim ke Semua"
              : "Kirim"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
