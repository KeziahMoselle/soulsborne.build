import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_er_weapons_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_weapons_v_version_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "er_statistics_softcaps" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"level" numeric
);

CREATE TABLE IF NOT EXISTS "er_statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapon_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapons_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"letter" "enum_er_weapons_scaling_letter" NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapons_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"weight" numeric,
	"attack_physical" numeric,
	"attack_magic" numeric,
	"attack_fire" numeric,
	"attack_lightning" numeric,
	"attack_holy" numeric,
	"attack_critical" numeric,
	"defense_physical" numeric,
	"defense_magic" numeric,
	"defense_fire" numeric,
	"defense_lightning" numeric,
	"defense_holy" numeric,
	"defense_boost" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapons_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_weapon_type_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_weapons_v_version_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"letter" "enum__er_weapons_v_version_scaling_letter" NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_weapons_v_version_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_weapons_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_name" varchar,
	"version_description" jsonb,
	"version_weight" numeric,
	"version_attack_physical" numeric,
	"version_attack_magic" numeric,
	"version_attack_fire" numeric,
	"version_attack_lightning" numeric,
	"version_attack_holy" numeric,
	"version_attack_critical" numeric,
	"version_defense_physical" numeric,
	"version_defense_magic" numeric,
	"version_defense_fire" numeric,
	"version_defense_lightning" numeric,
	"version_defense_holy" numeric,
	"version_defense_boost" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_weapons_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_weapons_id" integer,
	"er_weapon_type_id" integer,
	"er_statistics_id" integer
);

CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_order_idx" ON "er_statistics_softcaps" ("_order");
CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_parent_id_idx" ON "er_statistics_softcaps" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_statistics_created_at_idx" ON "er_statistics" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapon_type_created_at_idx" ON "er_weapon_type" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapons_scaling_order_idx" ON "er_weapons_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "er_weapons_scaling_parent_id_idx" ON "er_weapons_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_weapons_requirements_order_idx" ON "er_weapons_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "er_weapons_requirements_parent_id_idx" ON "er_weapons_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_weapons_created_at_idx" ON "er_weapons" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_order_idx" ON "er_weapons_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_parent_idx" ON "er_weapons_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_path_idx" ON "er_weapons_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_scaling_order_idx" ON "_er_weapons_v_version_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_scaling_parent_id_idx" ON "_er_weapons_v_version_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_requirements_order_idx" ON "_er_weapons_v_version_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_requirements_parent_id_idx" ON "_er_weapons_v_version_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_version_created_at_idx" ON "_er_weapons_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_created_at_idx" ON "_er_weapons_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_updated_at_idx" ON "_er_weapons_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_rels_order_idx" ON "_er_weapons_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_rels_parent_idx" ON "_er_weapons_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_rels_path_idx" ON "_er_weapons_v_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "er_statistics_softcaps" ADD CONSTRAINT "er_statistics_softcaps__parent_id_er_statistics_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_scaling" ADD CONSTRAINT "er_weapons_scaling__parent_id_er_weapons_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_requirements" ADD CONSTRAINT "er_weapons_requirements__parent_id_er_weapons_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_parent_id_er_weapons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_weapon_type_id_er_weapon_type_id_fk" FOREIGN KEY ("er_weapon_type_id") REFERENCES "er_weapon_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_version_scaling" ADD CONSTRAINT "_er_weapons_v_version_scaling__parent_id__er_weapons_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_version_requirements" ADD CONSTRAINT "_er_weapons_v_version_requirements__parent_id__er_weapons_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_parent_id__er_weapons_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapon_type_id_er_weapon_type_id_fk" FOREIGN KEY ("er_weapon_type_id") REFERENCES "er_weapon_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "er_statistics_softcaps";
DROP TABLE "er_statistics";
DROP TABLE "er_weapon_type";
DROP TABLE "er_weapons_scaling";
DROP TABLE "er_weapons_requirements";
DROP TABLE "er_weapons";
DROP TABLE "er_weapons_rels";
DROP TABLE "_er_weapons_v_version_scaling";
DROP TABLE "_er_weapons_v_version_requirements";
DROP TABLE "_er_weapons_v";
DROP TABLE "_er_weapons_v_rels";`);

};
