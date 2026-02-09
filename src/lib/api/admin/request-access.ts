import { AccessRequest } from "@/lib/types";

export async function getRequestAccess(): Promise<AccessRequest[]> {
  const res = await fetch("/api/admin/request-access", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const json = await res.json();

  return json.data.map((item: any) => ({
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

  return fetch(`/api/admin/request-access/${id}`, {
    method: "DELETE",
  });
}

