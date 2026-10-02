import { env } from "@/lib/env";
import { emailTransport } from "@/lib/email/client";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function sendVerificationEmail(to: string, url: string) {
  const safeUrl = escapeHtml(url);

  try {
    const info = await emailTransport.sendMail({
      from: env.emailFrom,
      to,
      subject: "Verify your email address",
      text: `Welcome to Appointment System. Verify your email address using this link:\n\n${url}\n\nThis link expires in 5 minutes. If you did not create an account, you can ignore this email.`,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f3f5f7;color:#202a33;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f7;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e7eb;border-radius:8px;">
            <tr>
              <td style="padding:28px 32px 12px;border-bottom:1px solid #edf0f2;">
                <p style="margin:0;color:#147d72;font-size:12px;font-weight:700;letter-spacing:1px;">APPOINTMENT SYSTEM</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px;">
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;font-weight:700;">Verify your email</h1>
                <p style="margin:0 0 24px;color:#52616d;font-size:15px;line-height:1.6;">Thanks for creating an account. Confirm your email address to finish setting up your Appointment System account.</p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius:5px;background:#147d72;">
                      <a href="${safeUrl}" style="display:inline-block;padding:13px 20px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">Verify email address</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 8px;color:#52616d;font-size:13px;line-height:1.6;">This verification link expires in 5 minutes.</p>
                <p style="margin:0;color:#52616d;font-size:13px;line-height:1.6;">If the button does not work, copy and paste this link into your browser:</p>
                <p style="margin:8px 0 0;overflow-wrap:anywhere;font-size:13px;line-height:1.6;"><a href="${safeUrl}" style="color:#147d72;">${safeUrl}</a></p>
                <p style="margin:24px 0 0;color:#7a8791;font-size:12px;line-height:1.6;">If you did not create an account, you can safely ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });

    if (process.env.NODE_ENV === "development") {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.info("Ethereal email preview:", previewUrl);
      }
    }
  } catch (err) {
    console.error("Failed to send verification email:", err);
    throw new Error(
      `Failed to send verification email: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
