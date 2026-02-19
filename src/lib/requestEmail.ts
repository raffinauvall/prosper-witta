import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface RequestAccessEmailProps {
  productId: number;
  productName: string;
  name: string;
  email: string;
  company?: string;
  purpose?: string;
  approveUrl: string;
  rejectUrl: string;
  to?: string[]; // default bisa admin
}

export async function sendRequestAccessEmail({
  productId,
  productName,
  name,
  email,
  company,
  purpose,
  approveUrl,
  rejectUrl,
  to = ["prosperweb123@gmail.com"],
}: RequestAccessEmailProps) {
  return resend.emails.send({
    from: "PT Prosper Witta Sejahtera <info@prosperwittasejahtera.com>",
    to,
    subject: `Access Request – Product ${productId}`,
    html: `
  <div style="
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color:#f8fafc;
    padding:32px;
  ">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:12px;
      box-shadow:0 10px 30px rgba(0,0,0,0.06);
      overflow:hidden;
    ">

      <!-- Header -->
      <div style="
        padding:24px 28px;
        border-bottom:1px solid #e5e7eb;
      ">
        <p style="
          margin:0;
          font-size:13px;
          color:#64748b;
          letter-spacing:0.04em;
          text-transform:uppercase;
        ">
          Access Request
        </p>
        <h2 style="
          margin:6px 0 0;
          font-size:20px;
          font-weight:600;
          color:#0f172a;
        ">
          Produk yang diminta: <span style="font-weight:700;">${productName}</span>
        </h2>
      </div>

      <!-- Content -->
      <div style="padding:28px;">
        <table style="width:100%; font-size:14px; color:#334155;">
          <tr>
            <td style="padding:6px 0; font-weight:600;">Nama</td>
            <td style="padding:6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; font-weight:600;">Email</td>
            <td style="padding:6px 0;">${email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; font-weight:600;">Perusahaan</td>
            <td style="padding:6px 0;">${company || "-"}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; font-weight:600;">Tujuan</td>
            <td style="padding:6px 0;">${purpose || "-"}</td>
          </tr>
        </table>

        <!-- Actions -->
        <div style="margin-top:28px; display:flex; gap:12px;">
          <a href="${approveUrl}" style="
            flex:1;
            text-align:center;
            padding:12px 10px;
            background:#4f46e5;
            color:#ffffff;
            border-radius:8px;
            text-decoration:none;
            font-weight:600;
            font-size:14px;
            margin-right:20px;
          ">
            Approve Access
          </a>
          <a href="${rejectUrl}" style="
            flex:1;
            text-align:center;
            padding:12px 10px;
            background:#f1f5f9;
            color:#0f172a;
            border-radius:8px;
            text-decoration:none;
            font-weight:600;
            font-size:14px;
            border:1px solid #e5e7eb;
          ">
            Reject
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        padding:16px 28px;
        background:#f8fafc;
        font-size:12px;
        color:#64748b;
        text-align:center;
      ">
        Email ini dikirim otomatis oleh sistem PT Prosper Witta Sejahtera
      </div>
    </div>
  </div>
`

  });
}
