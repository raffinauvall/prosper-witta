import { AccessRequest } from "@/lib/types";

type AccessRequestApiRow = AccessRequest;

export async function getRequestAccess(): Promise<AccessRequest[]> {
  const res = await fetch("/api/admin/request-access", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || `Failed to fetch request access (${res.status})`);
  }

  const json = await res.json();
  const rows = Array.isArray(json?.data) ? json.data : [];

  return rows.map((item: AccessRequestApiRow) => ({
    id: item.id,
    name: item.name,         
    company: item.company,   
    email: item.email,
    purpose: item.purpose,
    status: item.status,
    type: item.type,
    products: item.products,
    created_at: item.created_at,
  }));
}

export async function deleteRequestAccess(id?: string) {
  if (!id || id === "undefined") {
    throw new Error("Invalid id");
  }

  const res = await fetch(`/api/admin/request-access/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || `Failed to delete request access (${res.status})`);
  }

  return res.json();
}
