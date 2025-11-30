export function generateAccessRequestEmail(
  email: string,
  productId: number,
  approveUrl: string,
  company?: string,
  purpose?: string
) {
  return `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding:40px 0;">
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color:#4caf50; padding:20px; text-align:center; color:#ffffff;">
          <h1 style="margin:0; font-size:24px;">New Access Request</h1>
        </div>

        <!-- Body -->
        <div style="padding:30px; color:#333; line-height:1.5;">
          <p>Hello Admin,</p>
          <p>You have received a new ingredient access request. Details are as follows:</p>

          <table style="width:100%; border-collapse:collapse; margin-top:20px; margin-bottom:30px;">
            <tr>
              <td style="padding:10px; font-weight:bold; width:150px; background:#f9f9f9;">Email</td>
              <td style="padding:10px; background:#f9f9f9;">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; background:#ffffff;">Product ID</td>
              <td style="padding:10px; background:#ffffff;">${productId}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; background:#f9f9f9;">Company</td>
              <td style="padding:10px; background:#f9f9f9;">${company ?? "-"}</td>
            </tr>
            <tr>
              <td style="padding:10px; font-weight:bold; background:#ffffff;">Purpose</td>
              <td style="padding:10px; background:#ffffff;">${purpose ?? "-"}</td>
            </tr>
          </table>

          <div style="text-align:center; margin:30px 0;">
            <a href="${approveUrl}" style="
              display:inline-block;
              padding:14px 28px;
              background-color:#4caf50;
              color:#ffffff;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
              font-size:16px;
            ">
              Approve Access
            </a>
          </div>

          <p style="font-size:14px; color:#555;">
            If the button doesn’t work, copy and paste this link into your browser:<br/>
            <a href="${approveUrl}" style="color:#4caf50;">${approveUrl}</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="padding:20px; text-align:center; font-size:12px; color:#999; background:#f9f9f9;">
          AO Shuttle Admin Panel • Please do not reply to this email
        </div>
      </div>
    </div>
  `;
}
