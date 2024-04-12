import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "users_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

CREATE TABLE IF NOT EXISTS "er_armors_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

CREATE TABLE IF NOT EXISTS "er_builds_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_media" (
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

CREATE TABLE IF NOT EXISTS "er_incantation_types_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

CREATE TABLE IF NOT EXISTS "er_sorcery_types_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

CREATE TABLE IF NOT EXISTS "er_status_effects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

CREATE TABLE IF NOT EXISTS "er_talismans_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_media_id" integer
);

ALTER TABLE "users" ADD COLUMN "bio" jsonb;
ALTER TABLE "er_affinities_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_affinities_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_ammunitions_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_ammunitions_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_armors_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_builds_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_incantations_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_incantations_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_shields_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_shields_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_sorceries_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_sorceries_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_talismans_v_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "er_weapons_rels" ADD COLUMN "er_media_id" integer;
ALTER TABLE "_er_weapons_v_rels" ADD COLUMN "er_media_id" integer;
CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" ("order");
CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_armors_rels_order_idx" ON "er_armors_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_armors_rels_parent_idx" ON "er_armors_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_armors_rels_path_idx" ON "er_armors_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_builds_images_order_idx" ON "er_builds_images" ("_order");
CREATE INDEX IF NOT EXISTS "er_builds_images_parent_id_idx" ON "er_builds_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_media_created_at_idx" ON "er_media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "er_media_filename_idx" ON "er_media" ("filename");
CREATE INDEX IF NOT EXISTS "er_incantation_types_rels_order_idx" ON "er_incantation_types_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_incantation_types_rels_parent_idx" ON "er_incantation_types_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_incantation_types_rels_path_idx" ON "er_incantation_types_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_sorcery_types_rels_order_idx" ON "er_sorcery_types_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_sorcery_types_rels_parent_idx" ON "er_sorcery_types_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_sorcery_types_rels_path_idx" ON "er_sorcery_types_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_status_effects_rels_order_idx" ON "er_status_effects_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_status_effects_rels_parent_idx" ON "er_status_effects_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_status_effects_rels_path_idx" ON "er_status_effects_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_talismans_rels_order_idx" ON "er_talismans_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_talismans_rels_parent_idx" ON "er_talismans_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_talismans_rels_path_idx" ON "er_talismans_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_armors_rels" ADD CONSTRAINT "er_armors_rels_parent_id_er_armors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_armors_rels" ADD CONSTRAINT "er_armors_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_images" ADD CONSTRAINT "er_builds_images__parent_id_er_builds_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantation_types_rels" ADD CONSTRAINT "er_incantation_types_rels_parent_id_er_incantation_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantation_types_rels" ADD CONSTRAINT "er_incantation_types_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorcery_types_rels" ADD CONSTRAINT "er_sorcery_types_rels_parent_id_er_sorcery_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorcery_types_rels" ADD CONSTRAINT "er_sorcery_types_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_status_effects_rels" ADD CONSTRAINT "er_status_effects_rels_parent_id_er_status_effects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_status_effects_rels" ADD CONSTRAINT "er_status_effects_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_talismans_rels" ADD CONSTRAINT "er_talismans_rels_parent_id_er_talismans_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_talismans_rels" ADD CONSTRAINT "er_talismans_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users_rels";
DROP TABLE "er_armors_rels";
DROP TABLE "er_builds_images";
DROP TABLE "er_media";
DROP TABLE "er_incantation_types_rels";
DROP TABLE "er_sorcery_types_rels";
DROP TABLE "er_status_effects_rels";
DROP TABLE "er_talismans_rels";
ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "users" DROP COLUMN IF EXISTS "bio";
ALTER TABLE "er_affinities_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_affinities_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_ammunitions_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_ammunitions_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_armors_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_builds_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_incantations_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_incantations_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_shields_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_shields_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_sorceries_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_sorceries_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_talismans_v_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "er_weapons_rels" DROP COLUMN IF EXISTS "er_media_id";
ALTER TABLE "_er_weapons_v_rels" DROP COLUMN IF EXISTS "er_media_id";`);

};
