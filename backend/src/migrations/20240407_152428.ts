import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_classes_rels" ADD COLUMN "er_sorceries_id" integer;
ALTER TABLE "er_classes_rels" ADD COLUMN "er_incantations_id" integer;
ALTER TABLE "er_classes_rels" ADD COLUMN "er_ammunitions_id" integer;
DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_ammunitions_id_er_ammunitions_id_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_ammunitions_id_er_ammunitions_id_fk";

ALTER TABLE "er_classes_rels" DROP COLUMN IF EXISTS "er_sorceries_id";
ALTER TABLE "er_classes_rels" DROP COLUMN IF EXISTS "er_incantations_id";
ALTER TABLE "er_classes_rels" DROP COLUMN IF EXISTS "er_ammunitions_id";`);

};
