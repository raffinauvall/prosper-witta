// src/lib/api/request-access.ts
export type RequestAccessPayload = {
  productId: number;
  type: "msds" | "tds";
  name: string;
  email: string;
  company?: string;
  purpose?: string;
  deviceToken: string;
};

export async function requestAccess(payload: RequestAccessPayload) {
  const res = await fetch("/api/request-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to request access");
  }

  return res.json();
}
