import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'developer', 'editor', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_er_affinities_type" AS ENUM('Physical', 'Magic', 'Flame', 'Golden', 'Occult');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_affinities_v_version_type" AS ENUM('Physical', 'Magic', 'Flame', 'Golden', 'Occult');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_er_ammunitions_ammunition_type" AS ENUM('Bolt', 'Greatbolt');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_ammunitions_v_version_ammunition_type" AS ENUM('Bolt', 'Greatbolt');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_er_armors_armor_type" AS ENUM('Helm', 'Chest', 'Gauntlet', 'Leg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_armors_v_version_armor_type" AS ENUM('Helm', 'Chest', 'Gauntlet', 'Leg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_er_shields_shield_type" AS ENUM('Small Shield', 'Medium Shield', 'Greatshield');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_er_shields_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E', 'TODO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_shields_v_version_shield_type" AS ENUM('Small Shield', 'Medium Shield', 'Greatshield');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__er_shields_v_version_scaling_letter" AS ENUM('S', 'A', 'B', 'C', 'D', 'E', 'TODO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
	"name" varchar NOT NULL,
	"role" "enum_users_role" NOT NULL,
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

CREATE TABLE IF NOT EXISTS "er_affinities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"type" "enum_er_affinities_type",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_affinities_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_affinities_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_name" varchar,
	"version_description" jsonb,
	"version_type" "enum__er_affinities_v_version_type",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_affinities_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_affinities_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_ammunitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"ammunition_type" "enum_er_ammunitions_ammunition_type",
	"name" varchar,
	"description" jsonb,
	"attack_physical" numeric,
	"attack_magic" numeric,
	"attack_fire" numeric,
	"attack_lightning" numeric,
	"attack_holy" numeric,
	"attack_critical" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_ammunitions_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_status_effects_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_ammunitions_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_ammunition_type" "enum__er_ammunitions_v_version_ammunition_type",
	"version_name" varchar,
	"version_description" jsonb,
	"version_attack_physical" numeric,
	"version_attack_magic" numeric,
	"version_attack_fire" numeric,
	"version_attack_lightning" numeric,
	"version_attack_holy" numeric,
	"version_attack_critical" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_ammunitions_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_ammunitions_id" integer,
	"er_status_effects_id" integer
);

CREATE TABLE IF NOT EXISTS "er_armors" (
	"id" serial PRIMARY KEY NOT NULL,
	"armor_type" "enum_er_armors_armor_type",
	"name" varchar,
	"description" jsonb,
	"weight" numeric,
	"damage_negation_physical" numeric,
	"damage_negation_vs_strike" numeric,
	"damage_negation_vs_slash" numeric,
	"damage_negation_vs_pierce" numeric,
	"damage_negation_magic" numeric,
	"damage_negation_fire" numeric,
	"damage_negation_lightning" numeric,
	"damage_negation_holy" numeric,
	"resistance_immunity" numeric,
	"resistance_robustness" numeric,
	"resistance_focus" numeric,
	"resistance_vitality" numeric,
	"resistance_poise" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_armors_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_armor_type" "enum__er_armors_v_version_armor_type",
	"version_name" varchar,
	"version_description" jsonb,
	"version_weight" numeric,
	"version_damage_negation_physical" numeric,
	"version_damage_negation_vs_strike" numeric,
	"version_damage_negation_vs_slash" numeric,
	"version_damage_negation_vs_pierce" numeric,
	"version_damage_negation_magic" numeric,
	"version_damage_negation_fire" numeric,
	"version_damage_negation_lightning" numeric,
	"version_damage_negation_holy" numeric,
	"version_resistance_immunity" numeric,
	"version_resistance_robustness" numeric,
	"version_resistance_focus" numeric,
	"version_resistance_vitality" numeric,
	"version_resistance_poise" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_armors_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_armors_id" integer
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
	"er_weapon_types_id" integer,
	"er_affinities_id" integer
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
	"er_shields_id" integer,
	"er_ammunitions_id" integer,
	"er_armors_id" integer,
	"er_talismans_id" integer,
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
	"rune_level" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_classes_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_weapons_id" integer,
	"er_shields_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_incantations_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_incantations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"effect" jsonb,
	"slots" numeric,
	"cost" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_incantations_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_incantation_types_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_incantations_v_version_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_incantations_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_name" varchar,
	"version_description" jsonb,
	"version_effect" jsonb,
	"version_slots" numeric,
	"version_cost" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_incantations_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_incantations_id" integer,
	"er_incantation_types_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_incantation_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_shields_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"letter" "enum_er_shields_scaling_letter" NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_shields_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_shields" (
	"id" serial PRIMARY KEY NOT NULL,
	"shield_type" "enum_er_shields_shield_type",
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

CREATE TABLE IF NOT EXISTS "er_shields_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_skills_id" integer,
	"er_statistics_id" integer,
	"er_status_effects_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_shields_v_version_scaling" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"letter" "enum__er_shields_v_version_scaling_letter" NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_shields_v_version_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_shields_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_shield_type" "enum__er_shields_v_version_shield_type",
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

CREATE TABLE IF NOT EXISTS "_er_shields_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_shields_id" integer,
	"er_skills_id" integer,
	"er_statistics_id" integer,
	"er_status_effects_id" integer
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

CREATE TABLE IF NOT EXISTS "er_sorceries_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_sorceries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"effect" jsonb,
	"slots" numeric,
	"cost" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_sorceries_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_sorcery_types_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "_er_sorceries_v_version_requirements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"value" numeric NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_er_sorceries_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_name" varchar,
	"version_description" jsonb,
	"version_effect" jsonb,
	"version_slots" numeric,
	"version_cost" numeric,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_sorceries_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_sorceries_id" integer,
	"er_sorcery_types_id" integer,
	"er_statistics_id" integer
);

CREATE TABLE IF NOT EXISTS "er_sorcery_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
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

CREATE TABLE IF NOT EXISTS "er_status_effects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" jsonb,
	"effect" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "er_talismans" (
	"id" serial PRIMARY KEY NOT NULL,
	"weight" numeric,
	"name" varchar,
	"description" jsonb,
	"effect" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_talismans_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_weight" numeric,
	"version_name" varchar,
	"version_description" jsonb,
	"version_effect" jsonb,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_er_talismans_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"er_talismans_id" integer
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
	"er_statistics_id" integer,
	"er_status_effects_id" integer
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
	"er_statistics_id" integer,
	"er_status_effects_id" integer
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

CREATE UNIQUE INDEX IF NOT EXISTS "users_name_idx" ON "users" ("name");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "archetypes_created_at_idx" ON "archetypes" ("created_at");
CREATE INDEX IF NOT EXISTS "restrictions_created_at_idx" ON "restrictions" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "er_affinities_name_idx" ON "er_affinities" ("name");
CREATE INDEX IF NOT EXISTS "er_affinities_created_at_idx" ON "er_affinities" ("created_at");
CREATE INDEX IF NOT EXISTS "er_affinities_rels_order_idx" ON "er_affinities_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_affinities_rels_parent_idx" ON "er_affinities_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_affinities_rels_path_idx" ON "er_affinities_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_version_version_name_idx" ON "_er_affinities_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_version_version_created_at_idx" ON "_er_affinities_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_created_at_idx" ON "_er_affinities_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_updated_at_idx" ON "_er_affinities_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_rels_order_idx" ON "_er_affinities_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_rels_parent_idx" ON "_er_affinities_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_affinities_v_rels_path_idx" ON "_er_affinities_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_ammunitions_name_idx" ON "er_ammunitions" ("name");
CREATE INDEX IF NOT EXISTS "er_ammunitions_created_at_idx" ON "er_ammunitions" ("created_at");
CREATE INDEX IF NOT EXISTS "er_ammunitions_rels_order_idx" ON "er_ammunitions_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_ammunitions_rels_parent_idx" ON "er_ammunitions_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_ammunitions_rels_path_idx" ON "er_ammunitions_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_version_version_name_idx" ON "_er_ammunitions_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_version_version_created_at_idx" ON "_er_ammunitions_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_created_at_idx" ON "_er_ammunitions_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_updated_at_idx" ON "_er_ammunitions_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_rels_order_idx" ON "_er_ammunitions_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_rels_parent_idx" ON "_er_ammunitions_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_ammunitions_v_rels_path_idx" ON "_er_ammunitions_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_armors_name_idx" ON "er_armors" ("name");
CREATE INDEX IF NOT EXISTS "er_armors_created_at_idx" ON "er_armors" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_armors_v_version_version_name_idx" ON "_er_armors_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_armors_v_version_version_created_at_idx" ON "_er_armors_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_armors_v_created_at_idx" ON "_er_armors_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_armors_v_updated_at_idx" ON "_er_armors_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_armors_v_rels_order_idx" ON "_er_armors_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_armors_v_rels_parent_idx" ON "_er_armors_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_armors_v_rels_path_idx" ON "_er_armors_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_ashes_of_war_name_idx" ON "er_ashes_of_war" ("name");
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
CREATE UNIQUE INDEX IF NOT EXISTS "er_classes_name_idx" ON "er_classes" ("name");
CREATE INDEX IF NOT EXISTS "er_classes_created_at_idx" ON "er_classes" ("created_at");
CREATE INDEX IF NOT EXISTS "er_classes_rels_order_idx" ON "er_classes_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_classes_rels_parent_idx" ON "er_classes_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_classes_rels_path_idx" ON "er_classes_rels" ("path");
CREATE INDEX IF NOT EXISTS "er_incantations_requirements_order_idx" ON "er_incantations_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "er_incantations_requirements_parent_id_idx" ON "er_incantations_requirements" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "er_incantations_name_idx" ON "er_incantations" ("name");
CREATE INDEX IF NOT EXISTS "er_incantations_created_at_idx" ON "er_incantations" ("created_at");
CREATE INDEX IF NOT EXISTS "er_incantations_rels_order_idx" ON "er_incantations_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_incantations_rels_parent_idx" ON "er_incantations_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_incantations_rels_path_idx" ON "er_incantations_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_version_requirements_order_idx" ON "_er_incantations_v_version_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_version_requirements_parent_id_idx" ON "_er_incantations_v_version_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_version_version_name_idx" ON "_er_incantations_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_version_version_created_at_idx" ON "_er_incantations_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_created_at_idx" ON "_er_incantations_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_updated_at_idx" ON "_er_incantations_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_rels_order_idx" ON "_er_incantations_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_rels_parent_idx" ON "_er_incantations_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_incantations_v_rels_path_idx" ON "_er_incantations_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_incantation_types_name_idx" ON "er_incantation_types" ("name");
CREATE INDEX IF NOT EXISTS "er_incantation_types_created_at_idx" ON "er_incantation_types" ("created_at");
CREATE INDEX IF NOT EXISTS "er_shields_scaling_order_idx" ON "er_shields_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "er_shields_scaling_parent_id_idx" ON "er_shields_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_shields_requirements_order_idx" ON "er_shields_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "er_shields_requirements_parent_id_idx" ON "er_shields_requirements" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "er_shields_name_idx" ON "er_shields" ("name");
CREATE INDEX IF NOT EXISTS "er_shields_created_at_idx" ON "er_shields" ("created_at");
CREATE INDEX IF NOT EXISTS "er_shields_rels_order_idx" ON "er_shields_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_shields_rels_parent_idx" ON "er_shields_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_shields_rels_path_idx" ON "er_shields_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_scaling_order_idx" ON "_er_shields_v_version_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_scaling_parent_id_idx" ON "_er_shields_v_version_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_requirements_order_idx" ON "_er_shields_v_version_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_requirements_parent_id_idx" ON "_er_shields_v_version_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_version_name_idx" ON "_er_shields_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_shields_v_version_version_created_at_idx" ON "_er_shields_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_shields_v_created_at_idx" ON "_er_shields_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_shields_v_updated_at_idx" ON "_er_shields_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_shields_v_rels_order_idx" ON "_er_shields_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_shields_v_rels_parent_idx" ON "_er_shields_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_shields_v_rels_path_idx" ON "_er_shields_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_skills_name_idx" ON "er_skills" ("name");
CREATE INDEX IF NOT EXISTS "er_skills_created_at_idx" ON "er_skills" ("created_at");
CREATE INDEX IF NOT EXISTS "er_sorceries_requirements_order_idx" ON "er_sorceries_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "er_sorceries_requirements_parent_id_idx" ON "er_sorceries_requirements" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "er_sorceries_name_idx" ON "er_sorceries" ("name");
CREATE INDEX IF NOT EXISTS "er_sorceries_created_at_idx" ON "er_sorceries" ("created_at");
CREATE INDEX IF NOT EXISTS "er_sorceries_rels_order_idx" ON "er_sorceries_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_sorceries_rels_parent_idx" ON "er_sorceries_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_sorceries_rels_path_idx" ON "er_sorceries_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_version_requirements_order_idx" ON "_er_sorceries_v_version_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_version_requirements_parent_id_idx" ON "_er_sorceries_v_version_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_version_version_name_idx" ON "_er_sorceries_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_version_version_created_at_idx" ON "_er_sorceries_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_created_at_idx" ON "_er_sorceries_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_updated_at_idx" ON "_er_sorceries_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_rels_order_idx" ON "_er_sorceries_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_rels_parent_idx" ON "_er_sorceries_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_sorceries_v_rels_path_idx" ON "_er_sorceries_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_sorcery_types_name_idx" ON "er_sorcery_types" ("name");
CREATE INDEX IF NOT EXISTS "er_sorcery_types_created_at_idx" ON "er_sorcery_types" ("created_at");
CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_order_idx" ON "er_statistics_softcaps" ("_order");
CREATE INDEX IF NOT EXISTS "er_statistics_softcaps_parent_id_idx" ON "er_statistics_softcaps" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "er_statistics_name_idx" ON "er_statistics" ("name");
CREATE INDEX IF NOT EXISTS "er_statistics_created_at_idx" ON "er_statistics" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "er_status_effects_name_idx" ON "er_status_effects" ("name");
CREATE INDEX IF NOT EXISTS "er_status_effects_created_at_idx" ON "er_status_effects" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "er_talismans_name_idx" ON "er_talismans" ("name");
CREATE INDEX IF NOT EXISTS "er_talismans_created_at_idx" ON "er_talismans" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_version_version_name_idx" ON "_er_talismans_v" ("version_name");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_version_version_created_at_idx" ON "_er_talismans_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_created_at_idx" ON "_er_talismans_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_updated_at_idx" ON "_er_talismans_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_rels_order_idx" ON "_er_talismans_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_rels_parent_idx" ON "_er_talismans_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_er_talismans_v_rels_path_idx" ON "_er_talismans_v_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "er_weapon_types_name_idx" ON "er_weapon_types" ("name");
CREATE INDEX IF NOT EXISTS "er_weapon_types_created_at_idx" ON "er_weapon_types" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapons_scaling_order_idx" ON "er_weapons_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "er_weapons_scaling_parent_id_idx" ON "er_weapons_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "er_weapons_requirements_order_idx" ON "er_weapons_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "er_weapons_requirements_parent_id_idx" ON "er_weapons_requirements" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "er_weapons_name_idx" ON "er_weapons" ("name");
CREATE INDEX IF NOT EXISTS "er_weapons_created_at_idx" ON "er_weapons" ("created_at");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_order_idx" ON "er_weapons_rels" ("order");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_parent_idx" ON "er_weapons_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "er_weapons_rels_path_idx" ON "er_weapons_rels" ("path");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_scaling_order_idx" ON "_er_weapons_v_version_scaling" ("_order");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_scaling_parent_id_idx" ON "_er_weapons_v_version_scaling" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_requirements_order_idx" ON "_er_weapons_v_version_requirements" ("_order");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_requirements_parent_id_idx" ON "_er_weapons_v_version_requirements" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_er_weapons_v_version_version_name_idx" ON "_er_weapons_v" ("version_name");
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
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_parent_id_er_affinities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_parent_id__er_affinities_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_affinities_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_affinities_id_er_affinities_id_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_parent_id_er_ammunitions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_parent_id__er_ammunitions_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_ammunitions_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_ammunitions_id_er_ammunitions_id_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_parent_id__er_armors_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_armors_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_er_armors_id_er_armors_id_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_affinities_id_er_affinities_id_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_ammunitions_id_er_ammunitions_id_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_armors_id_er_armors_id_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_talismans_id_er_talismans_id_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_requirements" ADD CONSTRAINT "er_incantations_requirements__parent_id_er_incantations_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_parent_id_er_incantations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_incantation_types_id_er_incantation_types_id_fk" FOREIGN KEY ("er_incantation_types_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_version_requirements" ADD CONSTRAINT "_er_incantations_v_version_requirements__parent_id__er_incantations_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_incantations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_parent_id__er_incantations_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_incantations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_incantation_types_id_er_incantation_types_id_fk" FOREIGN KEY ("er_incantation_types_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_scaling" ADD CONSTRAINT "er_shields_scaling__parent_id_er_shields_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_requirements" ADD CONSTRAINT "er_shields_requirements__parent_id_er_shields_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_parent_id_er_shields_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_version_scaling" ADD CONSTRAINT "_er_shields_v_version_scaling__parent_id__er_shields_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_version_requirements" ADD CONSTRAINT "_er_shields_v_version_requirements__parent_id__er_shields_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_parent_id__er_shields_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_skills_id_er_skills_id_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_requirements" ADD CONSTRAINT "er_sorceries_requirements__parent_id_er_sorceries_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_parent_id_er_sorceries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_sorcery_types_id_er_sorcery_types_id_fk" FOREIGN KEY ("er_sorcery_types_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_version_requirements" ADD CONSTRAINT "_er_sorceries_v_version_requirements__parent_id__er_sorceries_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_sorceries_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_parent_id__er_sorceries_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_sorceries_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_sorcery_types_id_er_sorcery_types_id_fk" FOREIGN KEY ("er_sorcery_types_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_statistics_softcaps" ADD CONSTRAINT "er_statistics_softcaps__parent_id_er_statistics_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_parent_id__er_talismans_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_talismans_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_er_talismans_id_er_talismans_id_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
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
DROP TABLE "er_affinities";
DROP TABLE "er_affinities_rels";
DROP TABLE "_er_affinities_v";
DROP TABLE "_er_affinities_v_rels";
DROP TABLE "er_ammunitions";
DROP TABLE "er_ammunitions_rels";
DROP TABLE "_er_ammunitions_v";
DROP TABLE "_er_ammunitions_v_rels";
DROP TABLE "er_armors";
DROP TABLE "_er_armors_v";
DROP TABLE "_er_armors_v_rels";
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
DROP TABLE "er_incantations_requirements";
DROP TABLE "er_incantations";
DROP TABLE "er_incantations_rels";
DROP TABLE "_er_incantations_v_version_requirements";
DROP TABLE "_er_incantations_v";
DROP TABLE "_er_incantations_v_rels";
DROP TABLE "er_incantation_types";
DROP TABLE "er_shields_scaling";
DROP TABLE "er_shields_requirements";
DROP TABLE "er_shields";
DROP TABLE "er_shields_rels";
DROP TABLE "_er_shields_v_version_scaling";
DROP TABLE "_er_shields_v_version_requirements";
DROP TABLE "_er_shields_v";
DROP TABLE "_er_shields_v_rels";
DROP TABLE "er_skills";
DROP TABLE "er_sorceries_requirements";
DROP TABLE "er_sorceries";
DROP TABLE "er_sorceries_rels";
DROP TABLE "_er_sorceries_v_version_requirements";
DROP TABLE "_er_sorceries_v";
DROP TABLE "_er_sorceries_v_rels";
DROP TABLE "er_sorcery_types";
DROP TABLE "er_statistics_softcaps";
DROP TABLE "er_statistics";
DROP TABLE "er_status_effects";
DROP TABLE "er_talismans";
DROP TABLE "_er_talismans_v";
DROP TABLE "_er_talismans_v_rels";
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
