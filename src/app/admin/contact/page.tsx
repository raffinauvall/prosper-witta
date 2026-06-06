"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Mail,
  RefreshCw,
  Send,
  Trash2,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { getContact, updateContact, deleteContact } from "@/lib/api/admin/contact";
import { Contact } from "@/lib/types/contact";
import Modal from "@/components/admin/news/Modals";
import SendNewsletterForm from "@/components/admin/news/SendNewsLetterForm";

export default function AdminContactPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(undefined);
  const [sendToAll, setSendToAll] = useState(false);
  const [detailContact, setDetailContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setRefreshing(true);
    setError(null);

    try {
      const contacts = await getContact();
      setData(contacts);
      setLastUpdated(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleUpdate = async (id: string, subscribe: boolean) => {
    try {
      await updateContact(id, { subscribe: !subscribe });
      setData((prev) =>
        prev.map((contact) =>
          contact.id === id ? { ...contact, subscribe: !subscribe } : contact
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal update";
      alert(`Gagal update: ${message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus kontak ini?")) return;

    try {
      await deleteContact(id);
      setData((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal hapus";
      alert(`Gagal hapus: ${message}`);
    }
  };

  const openForContact = (id: string) => {
    setSelectedContactId(id);
    setSendToAll(false);
    setNewsletterOpen(true);
  };

  const openForAll = () => {
    setSelectedContactId(undefined);
    setSendToAll(true);
    setNewsletterOpen(true);
  };

  const closeNewsletter = () => {
    setNewsletterOpen(false);
    setSelectedContactId(undefined);
    setSendToAll(false);
  };

  const subscribedCount = data.filter((contact) => contact.subscribe).length;
  const unsubscribedCount = data.length - subscribedCount;

  if (loading) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="h-6 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="space-y-3 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border border-rose-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-rose-700">Contact inquiries gagal dimuat</p>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
        <button
          onClick={fetchContacts}
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Contact Inquiries</h2>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pesan masuk dan subscriber newsletter.
          </p>
          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-400">
              Last updated{" "}
              {lastUpdated.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={fetchContacts}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openForAll}
            disabled={subscribedCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Send className="h-4 w-4" />
            Kirim ke Semua
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total Inquiries" value={data.length} icon={Mail} tone="slate" />
        <SummaryCard label="Subscriber" value={subscribedCount} icon={UserCheck} tone="green" />
        <SummaryCard label="Not Subscribed" value={unsubscribedCount} icon={UserX} tone="amber" />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Recent Messages</h3>
            <p className="mt-1 text-xs text-gray-500">
              {data.length} contact inquiry{data.length === 1 ? "" : "ies"}
            </p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            No contact inquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Pesan</TableHead>
                  <TableHead>Subscriber</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead align="right">Aksi</TableHead>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </td>
                    <td className="max-w-[280px] px-6 py-4 text-gray-700">
                      <p className="truncate">{contact.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <SubscribeBadge subscribed={contact.subscribe} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                      {new Date(contact.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <IconButton
                          label={`Lihat detail ${contact.name}`}
                          onClick={() => setDetailContact(contact)}
                        >
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          label={
                            contact.subscribe
                              ? `Nonaktifkan subscribe ${contact.name}`
                              : `Aktifkan subscribe ${contact.name}`
                          }
                          onClick={() => handleUpdate(contact.id, contact.subscribe)}
                        >
                          {contact.subscribe ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </IconButton>
                        {contact.subscribe && (
                          <IconButton
                            label={`Kirim berita ke ${contact.name}`}
                            onClick={() => openForContact(contact.id)}
                          >
                            <Send className="h-4 w-4" />
                          </IconButton>
                        )}
                        <IconButton
                          label={`Hapus ${contact.name}`}
                          onClick={() => handleDelete(contact.id)}
                          tone="danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailContact && (
        <ContactDetailModal contact={detailContact} onClose={() => setDetailContact(null)} />
      )}

      {newsletterOpen && (
        <Modal
          title={sendToAll ? "Kirim ke Semua Subscriber" : "Kirim ke Kontak"}
          onClose={closeNewsletter}
        >
          <SendNewsletterForm
            onClose={closeNewsletter}
            sendToAll={sendToAll}
            contactId={selectedContactId}
          />
        </Modal>
      )}
    </section>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function SubscribeBadge({ subscribed }: { subscribed: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ${
        subscribed
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-gray-50 text-gray-600 ring-gray-200"
      }`}
    >
      {subscribed ? "Aktif" : "Tidak"}
    </span>
  );
}

function IconButton({
  children,
  label,
  onClick,
  tone = "default",
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
        tone === "danger"
          ? "text-rose-600 hover:bg-rose-50"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: "slate" | "green" | "amber";
}) {
  const toneClass = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-lg p-2 ring-1 ${toneClass[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function ContactDetailModal({
  contact,
  onClose,
}: {
  contact: Contact;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div className="min-w-0">
            <h4 className="truncate text-base font-semibold text-gray-900">{contact.name}</h4>
            <p className="mt-1 truncate text-sm text-gray-500">{contact.email}</p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Close detail"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailField label="Tanggal">
              {new Date(contact.created_at).toLocaleString("id-ID")}
            </DetailField>
            <DetailField label="Subscriber">
              {contact.subscribe ? "Aktif" : "Tidak"}
            </DetailField>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Message</p>
            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-800">
              {contact.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{children}</p>
    </div>
  );
}
