import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "sliders_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"prefix" varchar,
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

ALTER TABLE "fashion_media" ADD COLUMN "prefix" varchar;
ALTER TABLE "media" ADD COLUMN "prefix" varchar;
ALTER TABLE "er_media" ADD COLUMN "prefix" varchar;
CREATE INDEX IF NOT EXISTS "sliders_media_created_at_idx" ON "sliders_media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "sliders_media_filename_idx" ON "sliders_media" ("filename");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "sliders_media";
ALTER TABLE "fashion_media" DROP COLUMN IF EXISTS "prefix";
ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "prefix";`);

};
