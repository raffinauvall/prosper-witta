export async function checkAccess(productId: number) {
  const deviceToken = localStorage.getItem("device_token");
  if (!productId || !deviceToken) return false;

  try {
    const res = await fetch("/api/check-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, deviceToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.hasAccess ?? false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function requestAccess(
  productId: number,
  company: string,
  purpose: string
) {
  const deviceToken = localStorage.getItem("device_token");
  if (!productId || !deviceToken) return null;

  try {
    const res = await fetch("/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, deviceToken, company, purpose }),
    });

    if (!res.ok) {
      console.error(await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}