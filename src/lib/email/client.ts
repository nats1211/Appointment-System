import { config } from "dotenv";
import { Resend } from "resend";

config({ path: ".env.local" });

export const resend = new Resend(process.env.RESEND_API_KEY!);
