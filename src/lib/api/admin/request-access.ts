import { AccessRequest } from "@/lib/types";

export async function getRequestAccess(): Promise<AccessRequest[]> {
  const res = await fetch("/api/admin/request-access", {
    credentials: "include", 
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch request access");
  }

  const data = await res.json();
  return data as AccessRequest[];
}

export async function deleteRequestAccess(id: string) {
  const res = await fetch(`/api/admin/request-access/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return true;
}
