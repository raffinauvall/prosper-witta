import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Remove html for preview text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

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
  excerpt: string | { id: string; en: string };
  url: string;
}) {
  const rawExcerpt =
    typeof excerpt === "object" ? excerpt?.en || "" : excerpt || "";

  const cleanExcerpt = stripHtml(rawExcerpt);

  const safeExcerpt =
    cleanExcerpt.length > 200
      ? cleanExcerpt.slice(0, 200) + "..."
      : cleanExcerpt;

  const previewText = `${title} - ${safeExcerpt}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>

<body style="margin:0;padding:0;background:#f6f8fb;font-family:Arial,Helvetica,sans-serif;">

<!-- ✅ Hidden Preview Text -->
<span style="display:none;max-height:0;overflow:hidden;">
${previewText}
</span>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px;">
<tr>
<td align="center">

<!-- ✅ WHITE BOX -->
<table width="100%"
cellpadding="0"
cellspacing="0"
border="0"
align="center"
style="
background:#ffffff;
border-radius:10px;
border:1px solid #e5e7eb;
max-width:560px;
table-layout:fixed;
">

<tr>
<td style="
padding:28px;
font-family:Arial,Helvetica,sans-serif;
word-break:break-word;
overflow-wrap:break-word;
">

<!-- CONTENT -->

<p style="margin:0 0 12px 0;">
Hello <strong>${name}</strong>,
</p>

<h2 style="
margin:0 0 10px 0;
font-size:18px;
color:#111;
word-break:break-word;
">
${title}
</h2>

<p style="
margin:0 0 20px 0;
color:#444;
line-height:1.6;
word-break:break-word;
overflow-wrap:break-word;
">
${safeExcerpt}
</p>

<!-- ✅ BUTTON -->
<table role="presentation" cellspacing="0" cellpadding="0">
<tr>
<td bgcolor="#2563eb" style="border-radius:6px;">
<a href="${url}"
target="_blank"
rel="noopener noreferrer"
style="
display:inline-block;
padding:10px 18px;
color:#ffffff;
text-decoration:none;
font-size:14px;
font-weight:600;
font-family:Arial,Helvetica,sans-serif;
word-break:break-word;
">
Read More
</a>
</td>
</tr>
</table>

<hr style="
margin:26px 0;
border:none;
border-top:1px solid #eee;
" />

<!-- ✅ FOOTER -->
<p style="
font-size:11px;
color:#666;
margin:0;
line-height:1.6;
word-break:break-word;
">
You received this email because you subscribed to our newsletter.<br/>
PT Prosper Witta Sejahtera<br/>
Jakarta, Indonesia<br/>

</p>

</td>
</tr>
</table>

</td>
</tr>
</table>

</body>
</html>
`;

  await resend.emails.send({
    from: "PT Prosper Witta Sejahtera <info@prosperwittasejahtera.com>",
    to,
    subject: title,
    html,
  });
}
