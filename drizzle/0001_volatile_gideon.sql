ALTER TABLE "user" ADD COLUMN "email_verification_token_hash" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verification_token_expires_at" timestamp;