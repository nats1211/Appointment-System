import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { dash } from "@better-auth/infra";
import { env } from "@/lib/env";
import { sendVerificationEmail as sendVerificationMessage } from "@/lib/email/send-verification";
import * as schema from "@/db/schema";
import { after } from "next/server";

export const auth = betterAuth({
  baseURL: env.appUrl,
  trustedOrigins: [env.appUrl],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "Staff",
        input: false,
      },
      emailVerificationTokenHash: {
        type: "string",
        required: false,
        input: false,
        returned: false,
      },
      emailVerificationTokenExpiresAt: {
        type: "date",
        required: false,
        input: false,
        returned: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    revokeSessionsOnPasswordChange: true,
  },

  emailVerification: {
    expiresIn: 60 * 5,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      after(() => sendVerificationMessage(user.email, url));
    },
  },
  plugins: [nextCookies(), dash()],
});
