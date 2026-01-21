import { Contact } from "@/lib/types";

export async function getContact(): Promise<{ data: Contact[]; message?: string }> {
  const res = await fetch("/api/admin/contact", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch Contact Inquiries");
  }

  const data = await res.json();
  return { data }; // bungkus di object
}
