"use client";

import { useEffect, useState } from "react";
import { getContact, updateContact, deleteContact } from "@/lib/api/admin/contact";
import { Contact } from "@/lib/types/contact";
import Modal from "@/components/admin/news/Modals";
import SendNewsletterForm from "@/components/admin/news/SendNewsLetterForm";

export default function AdminContactPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ modal control (STRING ONLY, no null)
  const [openModal, setOpenModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(
    undefined
  );
  const [sendToAll, setSendToAll] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const contacts = await getContact();
      setData(contacts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, subscribe: boolean) => {
    try {
      await updateContact(id, { subscribe: !subscribe });
      fetchContacts();
    } catch (err: any) {
      alert("Gagal update: " + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus kontak ini?")) return;

    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err: any) {
      alert("Gagal hapus: " + err.message);
    }
  };

  // =========================
  // buka modal per kontak
  // =========================
  const openForContact = (id: string) => {
    setSelectedContactId(id); // ✅ string langsung
    setSendToAll(false);
    setOpenModal(true);
  };

  // =========================
  // buka modal semua
  // =========================
  const openForAll = () => {
    setSelectedContactId(undefined); // ✅ jangan null
    setSendToAll(true);
    setOpenModal(true);
  };

  // =========================
  // close modal
  // =========================
  const closeModal = () => {
    setOpenModal(false);
    setSelectedContactId(undefined);
    setSendToAll(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Contact Inquiries</h1>

      <div className="bg-white rounded-2xl mb-5 shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Nama</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Pesan</th>
                <th className="px-6 py-4 text-left font-semibold">Berlangganan</th>
                <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                <th className="px-6 py-4 text-left font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{c.name}</td>

                  <td className="px-6 py-4">
                    <a
                      href={`mailto:${c.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {c.email}
                    </a>
                  </td>

                  <td className="px-6 py-4 max-w-md">
                    <p className="line-clamp-2">{c.message}</p>
                  </td>

                  <td className="px-6 py-4">
                    {c.subscribe ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                        Tidak
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(c.created_at).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="px-3 py-1 text-xs text-white bg-blue-600 rounded"
                      onClick={() => handleUpdate(c.id, c.subscribe)}
                    >
                      Toggle Subscribe
                    </button>

                    <button
                      className="px-3 py-1 text-xs text-white bg-red-600 rounded"
                      onClick={() => handleDelete(c.id)}
                    >
                      Hapus
                    </button>

                    {c.subscribe && (
                      <button
                        className="px-3 py-1 text-xs text-white bg-green-600 rounded"
                        onClick={() => openForContact(c.id)}
                      >
                        Kirim Berita
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* kirim semua */}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={openForAll}
      >
        Kirim ke Semua Subscriber
      </button>

      {/* modal */}
      {openModal && (
        <Modal
          title={sendToAll ? "Kirim ke Semua Subscriber" : "Kirim ke Kontak"}
          onClose={closeModal}
        >
          <SendNewsletterForm
            onClose={closeModal}
            sendToAll={sendToAll}
            contactId={selectedContactId} // ✅ WAJIB kirim
          />
        </Modal>
      )}
    </div>
  );
}
