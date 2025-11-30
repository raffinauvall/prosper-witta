export async function checkAccess(email: string, productId: number) {
  if (!email || !productId) return false;

  try {
    const res = await fetch("/api/check-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productId }), // tetap camelCase
    });

    if (!res.ok) {
      console.error("Check access failed:", res.status, await res.text());
      return false;
    }

    const data = await res.json();
    return data.has_access ?? false; // <-- sesuaikan dengan response dari API
  } catch (err) {
    console.error("Check access error:", err);
    return false;
  }
}

export async function requestAccess(
  email: string,
  productId: number,
  company?: string,
  purpose?: string
) {
  if (!email || !productId) return null;

  try {
    const res = await fetch("/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        productId, // tetap camelCase
        company: company ?? "",
        purpose: purpose ?? "",
      }),
    });

    if (!res.ok) {
      console.error("Request access failed:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data ?? null;
  } catch (err) {
    console.error("Request access error:", err);
    return null;
  }
}
