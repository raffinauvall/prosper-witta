export function generateAccessRequestEmail(
  email: string,
  productName: string,
  approveUrl: string,
  company?: string,
  purpose?: string
) {
  return `
    <div style="font-family:Arial, sans-serif; padding:24px; background:#ffffff; color:#111;">
      <h2 style="font-size:20px; margin-bottom:16px;">
        Ingredient Access Request
      </h2>

      <p style="font-size:14px; margin-bottom:8px;">
        You received a new request to access restricted ingredient data.
      </p>

      <table style="font-size:14px; margin-top:16px; margin-bottom:16px;">
        <tr>
          <td style="padding:4px 0; color:#555;">Requester Email:</td>
          <td style="padding:4px 0; font-weight:600;">${email}</td>
        </tr>
        <tr>
          <td style="padding:4px 0; color:#555;">Product Name:</td>
          <td style="padding:4px 0; font-weight:600;">${productName}</td>
        </tr>
        <tr>
          <td style="padding:4px 0; color:#555;">Company:</td>
          <td style="padding:4px 0;">${company || "-"}</td>
        </tr>
        <tr>
          <td style="padding:4px 0; color:#555;">Purpose:</td>
          <td style="padding:4px 0;">${purpose || "-"}</td>
        </tr>
      </table>

      <a href="${approveUrl}"
        style="
          display:inline-block;
          margin-top:20px;
          padding:10px 18px;
          font-size:14px;
          background:#2563eb;
          color:#fff;
          text-decoration:none;
          border-radius:6px;">
        Approve Request
      </a>

      <p style="margin-top:28px; font-size:11px; color:#999;">
        This automated message was sent by the ProsperWitta system.
        If you did not expect this email, you may safely ignore it.
      </p>
    </div>
  `;
}
