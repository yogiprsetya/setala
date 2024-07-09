DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "area_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "area" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type_id" integer NOT NULL,
	"is_archive" boolean,
	"icon" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_type" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"color" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"description" text,
	"area_id" integer,
	"is_archive" boolean,
	"start_sprint" date,
	"deadline_sprint" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" text,
	"url" text,
	"publish_date" date,
	"area_id" integer,
	"project_ids" integer[] NOT NULL,
	"content_type_id" integer,
	"is_archive" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"is_archive" text,
	"project_id" integer,
	"status" "status"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topic" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"color" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "area" ADD CONSTRAINT "area_type_id_area_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."area_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resource" ADD CONSTRAINT "resource_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resource" ADD CONSTRAINT "resource_content_type_id_content_type_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
