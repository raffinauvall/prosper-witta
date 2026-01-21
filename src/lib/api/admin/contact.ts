import { Contact } from "@/lib/types/contact";

export async function getContact(): Promise<Contact[]> {
  const res = await fetch("/api/admin/contact", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch Contact Inquiries");
  }

  return res.json();
}
