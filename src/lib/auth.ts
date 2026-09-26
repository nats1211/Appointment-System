import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {db} from "@/drizzle/db";
import { config } from "dotenv";
import { dash } from "@better-auth/infra";
import { schema } from "better-auth/client/plugins";

config({ path: ".env.local" });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user:{
    additionalFields:{
      role:{
        type: "string",
        required: true,
        defaultValue: "Staff",
        input: false
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), dash()],
});