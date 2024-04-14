import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_er_media_id_er_media_id_fk";

ALTER TABLE "users_rels" ADD COLUMN "media_id" integer;
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users_rels" DROP COLUMN IF EXISTS "er_media_id";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "media";
ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_media_id_media_id_fk";

ALTER TABLE "users_rels" ADD COLUMN "er_media_id" integer;
DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users_rels" DROP COLUMN IF EXISTS "media_id";`);

};
