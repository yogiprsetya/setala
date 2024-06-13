DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "area_type" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"color" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "area" (
	"created_at" timestamp,
	"updated_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"color" text
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
