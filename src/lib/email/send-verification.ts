import { resend } from "@/lib/email/client";

export async function sendVerificationEmail(email: string, url: string) {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL must be configured to send auth email.");
  }

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Verify your email address",
    text: `Verify your email address by opening this link: ${url}`,
  });

  if (error) throw error;
}
