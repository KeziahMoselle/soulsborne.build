import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "users" ADD COLUMN "name" varchar NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "users_name_idx" ON "users" ("name");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "users_name_idx";
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";`);

};
