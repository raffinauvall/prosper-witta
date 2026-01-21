type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContact(payload: ContactPayload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Gagal mengirim pesan");
  }

  return data;
}
