import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "archetypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "restrictions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_ashes_of_war" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"location" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_ashes_of_war_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_skills_id" integer,
	"er_weapon_types_id" integer
);

CREATE TABLE IF NOT EXISTS "er_builds_mainhand_weapons" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_builds_offhand_weapons" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_builds_statistics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric
);

CREATE TABLE IF NOT EXISTS "er_builds" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"youtube_url" varchar,
	"is_two_handed" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_builds_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"restrictions_id" integer,
	"archetypes_id" integer,
	"er_weapons_id" integer,
	"er_ashes_of_war_id" integer,
	"er_classes_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_classes_statistics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric
);

CREATE TABLE IF NOT EXISTS "er_classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_classes_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_weapons_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"fp_cost" numeric,
	"description" jsonb,
	"location" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_weapon_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DROP TABLE "er_weapon_type";
ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_weapon_type_id_er_weapon_type_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapon_type_id_er_weapon_type_id_fk";

ALTER TABLE "er_weapons_rels" ADD COLUMN "er_weapon_types_id" integer;
ALTER TABLE "er_weapons_rels" ADD COLUMN "er_skills_id" integer;
ALTER TABLE "_er_weapons_v_rels" ADD COLUMN "er_weapon_types_id" integer;
ALTER TABLE "_er_weapons_v_rels" ADD COLUMN "er_skills_id" integer;
CREATE INDEX IF NOT EXISTS "archetypes_created_at_idx" ON "archetypes" ("created_at");
CREATE INDEX IF NOT EXISTS "restrictions_created_at_idx" ON "restrictions" ("created_at");
CREATE INDEX IF NOT EXISTS "er_ashes_of_war_created_at_idx" ON "er_ashes_of_war" ("created_at");
CREATE INDEX IF NOT EXISTS "er_ashes_of_war_rels_order_idx" ON "er_ashes_of_war_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_ashes_of_war_rels_parent_idx" ON "er_ashes_of_war_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_ashes_of_war_rels_path_idx" ON "er_ashes_of_war_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_builds_mainhand_weapons_order_idx" ON "er_builds_mainhand_weapons" ("_order");
CREATE INDEX IF NOT EXISTS "er_builds_mainhand_weapons_parent_id_idx" ON "er_builds_mainhand_weapons" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_builds_offhand_weapons_order_idx" ON "er_builds_offhand_weapons" ("_order");
CREATE INDEX IF NOT EXISTS "er_builds_offhand_weapons_parent_id_idx" ON "er_builds_offhand_weapons" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_builds_statistics_order_idx" ON "er_builds_statistics" ("_order");
CREATE INDEX IF NOT EXISTS "er_builds_statistics_parent_id_idx" ON "er_builds_statistics" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_builds_created_at_idx" ON "er_builds" ("created_at");
CREATE INDEX IF NOT EXISTS "er_builds_rels_order_idx" ON "er_builds_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_builds_rels_parent_idx" ON "er_builds_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_builds_rels_path_idx" ON "er_builds_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_classes_statistics_order_idx" ON "er_classes_statistics" ("_order");
CREATE INDEX IF NOT EXISTS "er_classes_statistics_parent_id_idx" ON "er_classes_statistics" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_classes_created_at_idx" ON "er_classes" ("created_at");
CREATE INDEX IF NOT EXISTS "er_classes_rels_order_idx" ON "er_classes_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_classes_rels_parent_idx" ON "er_classes_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_classes_rels_path_idx" ON "er_classes_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_skills_created_at_idx" ON "er_skills" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapon_types_created_at_idx" ON "er_weapon_types" ("created_at");
DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_weapon_types_id_er_weapon_types_id_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapon_types_id_er_weapon_types_id_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "er_weapons_rels" DROP COLUMN IF EXISTS "er_weapon_type_id";
ALTER TABLE "_er_weapons_v_rels" DROP COLUMN IF EXISTS "er_weapon_type_id";
DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_parent_id_er_ashes_of_war_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_weapon_types_id_er_weapon_types_id_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_mainhand_weapons" ADD CONSTRAINT "er_builds_mainhand_weapons__parent_id_er_builds_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_offhand_weapons" ADD CONSTRAINT "er_builds_offhand_weapons__parent_id_er_builds_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_statistics" ADD CONSTRAINT "er_builds_statistics__parent_id_er_builds_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_parent_id_er_builds_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_restrictions_id_restrictions_id_fk" FOREIGN KEY ("restrictions_id") REFERENCES "restrictions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_archetypes_id_archetypes_id_fk" FOREIGN KEY ("archetypes_id") REFERENCES "archetypes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_ashes_of_war_id_er_ashes_of_war_id_fk" FOREIGN KEY ("er_ashes_of_war_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_classes_id_er_classes_id_fk" FOREIGN KEY ("er_classes_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_statistics" ADD CONSTRAINT "er_classes_statistics__parent_id_er_classes_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_parent_id_er_classes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "er_weapon_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DROP TABLE "archetypes";
DROP TABLE "restrictions";
DROP TABLE "er_ashes_of_war";
DROP TABLE "er_ashes_of_war_rels";
DROP TABLE "er_builds_mainhand_weapons";
DROP TABLE "er_builds_offhand_weapons";
DROP TABLE "er_builds_statistics";
DROP TABLE "er_builds";
DROP TABLE "er_builds_rels";
DROP TABLE "er_classes_statistics";
DROP TABLE "er_classes";
DROP TABLE "er_classes_rels";
DROP TABLE "er_skills";
DROP TABLE "er_weapon_types";
ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_weapon_types_id_er_weapon_types_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapon_types_id_er_weapon_types_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "er_weapons_rels" ADD COLUMN "er_weapon_type_id" integer;
ALTER TABLE "_er_weapons_v_rels" ADD COLUMN "er_weapon_type_id" integer;
CREATE INDEX IF NOT EXISTS "er_weapon_type_created_at_idx" ON "er_weapon_type" ("created_at");
DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_weapon_type_id_er_weapon_type_id_fk" FOREIGN KEY ("er_weapon_type_id") REFERENCES "er_weapon_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapon_type_id_er_weapon_type_id_fk" FOREIGN KEY ("er_weapon_type_id") REFERENCES "er_weapon_type"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "er_weapons_rels" DROP COLUMN IF EXISTS "er_weapon_types_id";
ALTER TABLE "er_weapons_rels" DROP COLUMN IF EXISTS "er_skills_id";
ALTER TABLE "_er_weapons_v_rels" DROP COLUMN IF EXISTS "er_weapon_types_id";
ALTER TABLE "_er_weapons_v_rels" DROP COLUMN IF EXISTS "er_skills_id";`);

};
