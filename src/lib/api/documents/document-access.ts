import { getDeviceToken } from "../../deviceToken";

export async function fetchAccessStatus(
  productId: number,
  type: "msds" | "tds"
): Promise<"none" | "pending" | "approved" | "rejected"> {
  const deviceToken = getDeviceToken();

  const res = await fetch(
    `/api/document-access/status?productId=${productId}&type=${type}`,
    {
      headers: {
        "x-device-token": deviceToken || "fallback",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return "none";

  const json = await res.json();
  return json.status;
}
