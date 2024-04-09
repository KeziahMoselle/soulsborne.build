import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_builds" ADD COLUMN "slug" varchar;
ALTER TABLE "er_builds" ADD COLUMN "edit_slug" boolean;
ALTER TABLE "er_builds" ADD COLUMN "votes_count" numeric;
CREATE UNIQUE INDEX IF NOT EXISTS "er_builds_slug_idx" ON "er_builds" ("slug");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "er_builds_slug_idx";
ALTER TABLE "er_builds" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "er_builds" DROP COLUMN IF EXISTS "edit_slug";
ALTER TABLE "er_builds" DROP COLUMN IF EXISTS "votes_count";`);

};
