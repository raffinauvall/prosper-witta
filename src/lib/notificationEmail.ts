import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
export async function sendApprovedUserEmail({
  to,
  name,
  productName,
  type,
  productUrl,
}: {
  to: string;
  name: string;
  productName: string;
  type: string;
  productUrl: string;
}) {
  await resend.emails.send({
    from: "PT Prosper Witta Sejahtera <info@prosperwittasejahtera.com>",
    to,
    subject: "Akses Dokumen Disetujui",
    html: `
  <div style="font-family:Arial, sans-serif; background:#f9fafb; padding:40px;">
    <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:12px; padding:32px;">

      <h2 style="color:#16a34a; margin-bottom:16px;">
        ✅ Akses Disetujui
      </h2>

      <p>Halo <strong>${name}</strong>,</p>

      <p>
        Permintaan akses dokumen <strong>${type.toUpperCase()}</strong>
        untuk produk <strong>${productName}</strong> telah <strong>disetujui</strong>.
      </p>

      <p>Silakan kembali ke website kami untuk mengakses dokumen tersebut.</p>

      <!-- 🔘 TOMBOL DI SINI -->
      <div style="margin-top:24px; text-align:center;">
        <a
          href="${productUrl}"
          style="
            display:inline-block;
            background-color:#16a34a;
            color:#ffffff;
            padding:12px 24px;
            border-radius:8px;
            font-weight:600;
            text-decoration:none;
            font-size:14px;
          "
          target="_blank"
        >
          Lihat Produk
        </a>
      </div>

      <p style="margin-top:32px; font-size:12px; color:#6b7280;">
        Email ini dikirim otomatis oleh sistem<br/>
        PT Prosper Witta Sejahtera
      </p>

    </div>
  </div>
`,

  });
}
