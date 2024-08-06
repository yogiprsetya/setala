ALTER TABLE "resource" DROP CONSTRAINT "resource_area_id_area_id_fk";
--> statement-breakpoint
ALTER TABLE "resource" DROP CONSTRAINT "resource_content_type_id_content_type_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resource" ADD CONSTRAINT "resource_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resource" ADD CONSTRAINT "resource_content_type_id_content_type_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_type"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
