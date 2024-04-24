import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_url" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_width" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_height" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_mime_type" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_filesize" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_16_9_filename" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_url" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_width" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_height" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_mime_type" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_filesize" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_128_filename" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_url" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_width" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_height" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_mime_type" varchar;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_filesize" numeric;
ALTER TABLE "er_media" ADD COLUMN "sizes_64_filename" varchar;
CREATE INDEX IF NOT EXISTS "er_media_sizes_16_9_sizes_16_9_filename_idx" ON "er_media" ("sizes_16_9_filename");
CREATE INDEX IF NOT EXISTS "er_media_sizes_128_sizes_128_filename_idx" ON "er_media" ("sizes_128_filename");
CREATE INDEX IF NOT EXISTS "er_media_sizes_64_sizes_64_filename_idx" ON "er_media" ("sizes_64_filename");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "er_media_sizes_16_9_sizes_16_9_filename_idx";
DROP INDEX IF EXISTS "er_media_sizes_128_sizes_128_filename_idx";
DROP INDEX IF EXISTS "er_media_sizes_64_sizes_64_filename_idx";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_url";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_width";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_height";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_mime_type";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_filesize";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_16_9_filename";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_url";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_width";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_height";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_mime_type";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_filesize";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_128_filename";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_url";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_width";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_height";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_mime_type";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_filesize";
ALTER TABLE "er_media" DROP COLUMN IF EXISTS "sizes_64_filename";`);

};
