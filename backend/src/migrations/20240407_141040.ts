import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_builds_rels" ADD COLUMN "er_affinities_id" integer;
DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_affinities_id_er_affinities_id_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_affinities_id_er_affinities_id_fk";

ALTER TABLE "er_builds_rels" DROP COLUMN IF EXISTS "er_affinities_id";`);

};
