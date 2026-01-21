import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface RequestAccessEmailProps {
  productId: number;
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
  name,
  email,
  company,
  purpose,
  approveUrl,
  rejectUrl,
  to = ["raffinauvaltaqy@gmail.com"],
}: RequestAccessEmailProps) {
  return resend.emails.send({
    from: "Chemtech <onboarding@resend.dev>",
    to,
    subject: `Access Request – Product ${productId}`,
    html: `
      <h3>New Document Access Request</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Company:</b> ${company || "-"}</p>
      <p><b>Purpose:</b> ${purpose || "-"}</p>

      <div style="margin-top:16px;">
        <a href="${approveUrl}" style="padding:10px 16px;background:#16a34a;color:white;border-radius:6px;text-decoration:none;">
          Approve
        </a>
        <a href="${rejectUrl}" style="padding:10px 16px;background:#dc2626;color:white;border-radius:6px;text-decoration:none;margin-left:8px;">
          Reject
        </a>
      </div>
    `,
  });
}
