CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"avatar" text
);
--> statement-breakpoint
ALTER TABLE "area_type" ALTER COLUMN "user_id" SET DATA TYPE text;