import { getDeviceToken } from "@/lib/deviceToken";

export interface AccessStatusItem {
  status: "none" | "pending" | "approved" | "rejected";
  accessId: string | null;
}

export async function fetchAccessStatus(
  productId: number,
  type: "msds" | "tds"
): Promise<AccessStatusItem> {
  const deviceToken = getDeviceToken();

  const res = await fetch(
    `/api/document-access/status?productId=${productId}&type=${type}`,
    {
      headers: { "x-device-token": deviceToken || "fallback" },
      cache: "no-store",
    }
  );

  if (!res.ok) return { status: "none", accessId: null };

  const json = await res.json();
  return { status: json.status, accessId: json.accessId ?? null };
}
