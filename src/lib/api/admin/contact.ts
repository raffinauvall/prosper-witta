import { Contact } from "@/lib/types";

/**
 * Ambil semua contact inquiries
 */
export async function getContact(): Promise<Contact[]> {
  const res = await fetch("/api/admin/contact", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch Contact Inquiries");
  }

  const json = await res.json();
  return json.data;
}

/**
 * Update contact (misal toggle subscribe)
 */
export async function updateContact(id: string, body: Partial<Contact>) {
  const res = await fetch(`/api/admin/contact/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update contact");
  }

  const json = await res.json();
  return json.data;
}

/**
 * Hapus contact
 */
export async function deleteContact(id: string) {
  const res = await fetch(`/api/admin/contact/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete contact");
  }

  const json = await res.json();
  return json.data;
}
