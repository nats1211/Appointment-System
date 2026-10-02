import { config } from "dotenv";

config({ path: ".env.local" });

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} must be set in the environment.`);
  }
  return value;
}

const appUrlValue = requiredEnv("APP_URL").replace(/\/+$/, "");
let parsedAppUrl: URL;

try {
  parsedAppUrl = new URL(appUrlValue);
} catch {
  throw new Error("APP_URL must be a valid absolute URL.");
}

if (
  !["http:", "https:"].includes(parsedAppUrl.protocol) ||
  parsedAppUrl.pathname !== "/" ||
  parsedAppUrl.search ||
  parsedAppUrl.hash
) {
  throw new Error("APP_URL must be an http(s) origin without a path or query.");
}

const isDevelopment = process.env.NODE_ENV === "development";
const smtpHost =
  process.env.SMTP_HOST?.trim() || (isDevelopment ? "localhost" : "");

if (!smtpHost) {
  throw new Error("SMTP_HOST must be set outside development.");
}

const smtpPort = Number(
  process.env.SMTP_PORT?.trim() || (isDevelopment ? "1025" : "587"),
);

if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
  throw new Error("SMTP_PORT must be an integer between 1 and 65535.");
}

const smtpSecureValue = process.env.SMTP_SECURE?.trim().toLowerCase();

if (smtpSecureValue && !["true", "false"].includes(smtpSecureValue)) {
  throw new Error("SMTP_SECURE must be either true or false.");
}

const smtpUser = process.env.SMTP_USER?.trim() || "";
const smtpPass = process.env.SMTP_PASS?.trim() || "";

if (Boolean(smtpUser) !== Boolean(smtpPass)) {
  throw new Error("SMTP_USER and SMTP_PASS must be set together.");
}

const emailFrom =
  process.env.EMAIL_FROM?.trim() ||
  (isDevelopment ? "Appointment System <no-reply@example.test>" : "");

if (!emailFrom) {
  throw new Error("EMAIL_FROM must be set outside development.");
}

export const env = {
  appUrl: parsedAppUrl.origin,
  emailFrom,
  smtpHost,
  smtpPort,
  smtpSecure: smtpSecureValue ? smtpSecureValue === "true" : smtpPort === 465,
  smtpUser,
  smtpPass,
};
