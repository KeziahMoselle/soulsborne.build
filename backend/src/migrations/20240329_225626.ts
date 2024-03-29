import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_er_weapons_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E', 'TODO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_weapons_v_version_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E', 'TODO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

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

CREATE TABLE IF NOT EXISTS "er_weapon_types" (
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
	"er_weapon_types_id" integer,
	"er_skills_id" integer,
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
	"er_weapon_types_id" integer,
	"er_skills_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
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
CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_order_idx" ON "er_statistics_softcaps" ("_order");
CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_parent_id_idx" ON "er_statistics_softcaps" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_statistics_created_at_idx" ON "er_statistics" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapon_types_created_at_idx" ON "er_weapon_types" ("created_at");
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
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
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
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapon_types_id_er_weapon_types_id_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
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
DROP TABLE "er_statistics_softcaps";
DROP TABLE "er_statistics";
DROP TABLE "er_weapon_types";
DROP TABLE "er_weapons_scaling";
DROP TABLE "er_weapons_requirements";
DROP TABLE "er_weapons";
DROP TABLE "er_weapons_rels";
DROP TABLE "_er_weapons_v_version_scaling";
DROP TABLE "_er_weapons_v_version_requirements";
DROP TABLE "_er_weapons_v";
DROP TABLE "_er_weapons_v_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
