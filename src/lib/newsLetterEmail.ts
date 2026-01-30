import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendNewsletterEmail({
  to,
  name,
  title,
  excerpt,
  url,
}: {
  to: string;
  name: string;
  title: string;
  excerpt: string;
  url: string;
}) {
  await resend.emails.send({
    // 🔥 TEST pakai info@
    from: "PT Prosper Witta Sejahtera <info@prosperwittasejahtera.com>",

    to,

    // ❌ jangan ada kata newsletter/promo
    subject: title,

    // ======================
    // TEXT (penting banget)
    // ======================
    text: `
Halo ${name},

${title}

${excerpt}

Baca selengkapnya:
${url}

Terima kasih,
PT Prosper Witta Sejahtera

Anda menerima email ini karena berlangganan informasi dari website kami.
    `,

    // ======================
    // HTML (cakep tapi aman)
    // ======================
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;background:#f6f8fb;padding:32px 16px;">
  <div style="max-width:560px;margin:auto;background:#ffffff;border-radius:10px;padding:28px;border:1px solid #e5e7eb;">

    <p style="margin:0 0 12px 0;">Halo <strong>${name}</strong>,</p>

    <h2 style="margin:0 0 10px 0;color:#111;font-size:18px;">
      ${title}
    </h2>

    <p style="margin:0 0 18px 0;color:#444;line-height:1.6;">
      ${excerpt}
    </p>

    <p style="margin:18px 0;">
      <a 
        href="${url}" 
        style="
          background:#2563eb;
          color:#ffffff;
          padding:10px 16px;
          border-radius:6px;
          text-decoration:none;
          font-size:14px;
          display:inline-block;
        "
      >
        Baca selengkapnya
      </a>
    </p>

    <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />

    <p style="font-size:12px;color:#666;margin:0;">
      Email ini dikirim karena Anda berlangganan informasi dari website kami.<br/>
      PT Prosper Witta Sejahtera
    </p>

  </div>
</div>
    `,
  });
}
