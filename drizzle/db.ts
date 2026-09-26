import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const pg = neon(process.env.DATABASE_URL_UNPOOLED!);
export const db = drizzle({ client: pg });
