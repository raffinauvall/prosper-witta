// lib/api/access.ts

export async function checkAccess(productId: number, deviceToken: string) {
  if (!productId || !deviceToken) return false;

  try {
    const res = await fetch("/api/check-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, deviceToken }),
    });

    if (!res.ok) {
      console.error("Check access failed:", res.status, await res.text());
      return false;
    }

    const data = await res.json();
    return data.hasAccess ?? false;
  } catch (err) {
    console.error("Check access error:", err);
    return false;
  }
}

export async function requestAccess(
  productId: number,
  company: string,
  purpose: string,
  deviceToken: string
) {
  if (!productId || !deviceToken) return null;

  try {
    const res = await fetch("/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, company, purpose, deviceToken }),
    });

    if (!res.ok) {
      console.error("Request access failed:", res.status, await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Request access error:", err);
    return null;
  }
}
