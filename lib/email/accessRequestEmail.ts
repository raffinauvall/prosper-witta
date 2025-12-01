export function generateAccessRequestEmail(
  email: string,
  approveUrl: string,
  company: string,
  purpose: string,
  productId: number
) {
  return `
    <div style="font-family:Arial,sans-serif;padding:40px;background:#f4f4f7;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:20px;">
        <h2>New Access Request</h2>
        <p>Product ID: ${productId}</p>
        <p>Company: ${company || "-"}</p>
        <p>Purpose: ${purpose || "-"}</p>
        <a href="${approveUrl}" style="padding:10px 20px;background:#4caf50;color:#fff;text-decoration:none;border-radius:6px;">Approve Access</a>
        <p>${approveUrl}</p>
      </div>
    </div>
  `;
}
