import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "fashion_images" DROP CONSTRAINT "fashion_images__parent_id_fashion_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_parent_id_fashion_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_fashion_media_id_fashion_media_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_armors_id_er_armors_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_users_id_users_id_fk";

ALTER TABLE "_fashion_v_version_images" DROP CONSTRAINT "_fashion_v_version_images__parent_id__fashion_v_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_parent_id__fashion_v_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_fashion_id_fashion_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_fashion_media_id_fashion_media_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_armors_id_er_armors_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_users_id_users_id_fk";

ALTER TABLE "sliders_images" DROP CONSTRAINT "sliders_images__parent_id_sliders_id_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_parent_id_sliders_id_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_fashion_media_id_fashion_media_id_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_users_id_users_id_fk";

ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_parent_id_users_id_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_parent_id_users_id_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_media_id_media_id_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_parent_id_er_affinities_id_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_parent_id__er_affinities_v_id_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_affinities_id_er_affinities_id_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_parent_id_er_ammunitions_id_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_parent_id__er_ammunitions_v_id_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_ammunitions_id_er_ammunitions_id_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "er_armors_rels" DROP CONSTRAINT "er_armors_rels_parent_id_er_armors_id_fk";

ALTER TABLE "er_armors_rels" DROP CONSTRAINT "er_armors_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_parent_id__er_armors_v_id_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_er_armors_id_er_armors_id_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_parent_id_er_ashes_of_war_id_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_weapon_types_id_er_weapon_types_id_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_affinities_id_er_affinities_id_fk";

ALTER TABLE "er_builds_images" DROP CONSTRAINT "er_builds_images__parent_id_er_builds_id_fk";

ALTER TABLE "er_builds_mainhand_weapons" DROP CONSTRAINT "er_builds_mainhand_weapons__parent_id_er_builds_id_fk";

ALTER TABLE "er_builds_offhand_weapons" DROP CONSTRAINT "er_builds_offhand_weapons__parent_id_er_builds_id_fk";

ALTER TABLE "er_builds_statistics" DROP CONSTRAINT "er_builds_statistics__parent_id_er_builds_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_parent_id_er_builds_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_restrictions_id_restrictions_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_archetypes_id_archetypes_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_users_id_users_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_ashes_of_war_id_er_ashes_of_war_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_affinities_id_er_affinities_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_ammunitions_id_er_ammunitions_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_armors_id_er_armors_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_talismans_id_er_talismans_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_classes_id_er_classes_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_builds_v_version_images" DROP CONSTRAINT "_er_builds_v_version_images__parent_id__er_builds_v_id_fk";

ALTER TABLE "_er_builds_v_version_mainhand_weapons" DROP CONSTRAINT "_er_builds_v_version_mainhand_weapons__parent_id__er_builds_v_id_fk";

ALTER TABLE "_er_builds_v_version_offhand_weapons" DROP CONSTRAINT "_er_builds_v_version_offhand_weapons__parent_id__er_builds_v_id_fk";

ALTER TABLE "_er_builds_v_version_statistics" DROP CONSTRAINT "_er_builds_v_version_statistics__parent_id__er_builds_v_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_parent_id__er_builds_v_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_builds_id_er_builds_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_restrictions_id_restrictions_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_archetypes_id_archetypes_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_users_id_users_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_ashes_of_war_id_er_ashes_of_war_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_affinities_id_er_affinities_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_ammunitions_id_er_ammunitions_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_armors_id_er_armors_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_talismans_id_er_talismans_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_classes_id_er_classes_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_classes_statistics" DROP CONSTRAINT "er_classes_statistics__parent_id_er_classes_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_parent_id_er_classes_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_ammunitions_id_er_ammunitions_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_incantations_requirements" DROP CONSTRAINT "er_incantations_requirements__parent_id_er_incantations_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_parent_id_er_incantations_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_incantation_types_id_er_incantation_types_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_incantations_v_version_requirements" DROP CONSTRAINT "_er_incantations_v_version_requirements__parent_id__er_incantations_v_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_parent_id__er_incantations_v_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_incantations_id_er_incantations_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_incantation_types_id_er_incantation_types_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_incantation_types_rels" DROP CONSTRAINT "er_incantation_types_rels_parent_id_er_incantation_types_id_fk";

ALTER TABLE "er_incantation_types_rels" DROP CONSTRAINT "er_incantation_types_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_shields_scaling" DROP CONSTRAINT "er_shields_scaling__parent_id_er_shields_id_fk";

ALTER TABLE "er_shields_requirements" DROP CONSTRAINT "er_shields_requirements__parent_id_er_shields_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_parent_id_er_shields_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "_er_shields_v_version_scaling" DROP CONSTRAINT "_er_shields_v_version_scaling__parent_id__er_shields_v_id_fk";

ALTER TABLE "_er_shields_v_version_requirements" DROP CONSTRAINT "_er_shields_v_version_requirements__parent_id__er_shields_v_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_parent_id__er_shields_v_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_shields_id_er_shields_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "er_sorceries_requirements" DROP CONSTRAINT "er_sorceries_requirements__parent_id_er_sorceries_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_parent_id_er_sorceries_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_sorcery_types_id_er_sorcery_types_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_sorceries_v_version_requirements" DROP CONSTRAINT "_er_sorceries_v_version_requirements__parent_id__er_sorceries_v_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_parent_id__er_sorceries_v_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_sorceries_id_er_sorceries_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_sorcery_types_id_er_sorcery_types_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_sorcery_types_rels" DROP CONSTRAINT "er_sorcery_types_rels_parent_id_er_sorcery_types_id_fk";

ALTER TABLE "er_sorcery_types_rels" DROP CONSTRAINT "er_sorcery_types_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_statistics_softcaps" DROP CONSTRAINT "er_statistics_softcaps__parent_id_er_statistics_id_fk";

ALTER TABLE "er_status_effects_rels" DROP CONSTRAINT "er_status_effects_rels_parent_id_er_status_effects_id_fk";

ALTER TABLE "er_status_effects_rels" DROP CONSTRAINT "er_status_effects_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_talismans_rels" DROP CONSTRAINT "er_talismans_rels_parent_id_er_talismans_id_fk";

ALTER TABLE "er_talismans_rels" DROP CONSTRAINT "er_talismans_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_parent_id__er_talismans_v_id_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_er_talismans_id_er_talismans_id_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_weapons_scaling" DROP CONSTRAINT "er_weapons_scaling__parent_id_er_weapons_id_fk";

ALTER TABLE "er_weapons_requirements" DROP CONSTRAINT "er_weapons_requirements__parent_id_er_weapons_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_parent_id_er_weapons_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_media_id_er_media_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_weapon_types_id_er_weapon_types_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "_er_weapons_v_version_scaling" DROP CONSTRAINT "_er_weapons_v_version_scaling__parent_id__er_weapons_v_id_fk";

ALTER TABLE "_er_weapons_v_version_requirements" DROP CONSTRAINT "_er_weapons_v_version_requirements__parent_id__er_weapons_v_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_parent_id__er_weapons_v_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapons_id_er_weapons_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_media_id_er_media_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapon_types_id_er_weapon_types_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_skills_id_er_skills_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_statistics_id_er_statistics_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_status_effects_id_er_status_effects_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_id_users_id_fk";

DO $$ BEGIN
 ALTER TABLE "fashion_images" ADD CONSTRAINT "fashion_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_fashion_media_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_armors_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_version_images" ADD CONSTRAINT "_fashion_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_fashion_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_fashion_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_fashion_fk" FOREIGN KEY ("fashion_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_fashion_media_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_armors_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_images" ADD CONSTRAINT "sliders_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "sliders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "sliders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_fashion_media_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_affinities_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_affinities_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_ammunitions_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_ammunitions_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_armors_rels" ADD CONSTRAINT "er_armors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_armors_rels" ADD CONSTRAINT "er_armors_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_armors_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_er_armors_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_skills_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_weapon_types_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_ashes_of_war_rels" ADD CONSTRAINT "er_ashes_of_war_rels_er_affinities_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_images" ADD CONSTRAINT "er_builds_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_mainhand_weapons" ADD CONSTRAINT "er_builds_mainhand_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_offhand_weapons" ADD CONSTRAINT "er_builds_offhand_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_statistics" ADD CONSTRAINT "er_builds_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_restrictions_fk" FOREIGN KEY ("restrictions_id") REFERENCES "restrictions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_archetypes_fk" FOREIGN KEY ("archetypes_id") REFERENCES "archetypes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_ashes_of_war_fk" FOREIGN KEY ("er_ashes_of_war_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_affinities_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_ammunitions_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_armors_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_talismans_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_classes_fk" FOREIGN KEY ("er_classes_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_images" ADD CONSTRAINT "_er_builds_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_mainhand_weapons" ADD CONSTRAINT "_er_builds_v_version_mainhand_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_offhand_weapons" ADD CONSTRAINT "_er_builds_v_version_offhand_weapons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_statistics" ADD CONSTRAINT "_er_builds_v_version_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_builds_fk" FOREIGN KEY ("er_builds_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_restrictions_fk" FOREIGN KEY ("restrictions_id") REFERENCES "restrictions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_archetypes_fk" FOREIGN KEY ("archetypes_id") REFERENCES "archetypes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_ashes_of_war_fk" FOREIGN KEY ("er_ashes_of_war_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_affinities_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_ammunitions_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_armors_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_talismans_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_classes_fk" FOREIGN KEY ("er_classes_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_statistics" ADD CONSTRAINT "er_classes_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_ammunitions_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_requirements" ADD CONSTRAINT "er_incantations_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_incantation_types_fk" FOREIGN KEY ("er_incantation_types_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_version_requirements" ADD CONSTRAINT "_er_incantations_v_version_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_incantations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_incantations_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_incantations_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_incantation_types_fk" FOREIGN KEY ("er_incantation_types_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantation_types_rels" ADD CONSTRAINT "er_incantation_types_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_incantation_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_incantation_types_rels" ADD CONSTRAINT "er_incantation_types_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_scaling" ADD CONSTRAINT "er_shields_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_requirements" ADD CONSTRAINT "er_shields_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_skills_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_version_scaling" ADD CONSTRAINT "_er_shields_v_version_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_version_requirements" ADD CONSTRAINT "_er_shields_v_version_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_shields_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_shields_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_skills_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_requirements" ADD CONSTRAINT "er_sorceries_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_sorcery_types_fk" FOREIGN KEY ("er_sorcery_types_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_version_requirements" ADD CONSTRAINT "_er_sorceries_v_version_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_sorceries_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_sorceries_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_sorceries_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_sorcery_types_fk" FOREIGN KEY ("er_sorcery_types_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorcery_types_rels" ADD CONSTRAINT "er_sorcery_types_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_sorcery_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_sorcery_types_rels" ADD CONSTRAINT "er_sorcery_types_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_statistics_softcaps" ADD CONSTRAINT "er_statistics_softcaps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_status_effects_rels" ADD CONSTRAINT "er_status_effects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_status_effects_rels" ADD CONSTRAINT "er_status_effects_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_talismans_rels" ADD CONSTRAINT "er_talismans_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_talismans_rels" ADD CONSTRAINT "er_talismans_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_talismans_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_er_talismans_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_scaling" ADD CONSTRAINT "er_weapons_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_requirements" ADD CONSTRAINT "er_weapons_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_weapon_types_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_skills_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_version_scaling" ADD CONSTRAINT "_er_weapons_v_version_scaling_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_version_requirements" ADD CONSTRAINT "_er_weapons_v_version_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_weapons_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapons_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_media_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_weapon_types_fk" FOREIGN KEY ("er_weapon_types_id") REFERENCES "er_weapon_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_skills_fk" FOREIGN KEY ("er_skills_id") REFERENCES "er_skills"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_statistics_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_status_effects_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "fashion_images" DROP CONSTRAINT "fashion_images_parent_id_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_parent_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_fashion_media_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_weapons_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_shields_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_sorceries_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_incantations_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_er_armors_fk";

ALTER TABLE "fashion_rels" DROP CONSTRAINT "fashion_rels_users_fk";

ALTER TABLE "_fashion_v_version_images" DROP CONSTRAINT "_fashion_v_version_images_parent_id_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_parent_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_fashion_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_fashion_media_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_weapons_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_shields_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_sorceries_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_incantations_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_er_armors_fk";

ALTER TABLE "_fashion_v_rels" DROP CONSTRAINT "_fashion_v_rels_users_fk";

ALTER TABLE "sliders_images" DROP CONSTRAINT "sliders_images_parent_id_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_parent_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_fashion_media_fk";

ALTER TABLE "sliders_rels" DROP CONSTRAINT "sliders_rels_users_fk";

ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_parent_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_parent_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_media_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_parent_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_er_media_fk";

ALTER TABLE "er_affinities_rels" DROP CONSTRAINT "er_affinities_rels_er_statistics_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_parent_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_affinities_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_media_fk";

ALTER TABLE "_er_affinities_v_rels" DROP CONSTRAINT "_er_affinities_v_rels_er_statistics_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_parent_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_er_media_fk";

ALTER TABLE "er_ammunitions_rels" DROP CONSTRAINT "er_ammunitions_rels_er_status_effects_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_parent_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_ammunitions_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_media_fk";

ALTER TABLE "_er_ammunitions_v_rels" DROP CONSTRAINT "_er_ammunitions_v_rels_er_status_effects_fk";

ALTER TABLE "er_armors_rels" DROP CONSTRAINT "er_armors_rels_parent_fk";

ALTER TABLE "er_armors_rels" DROP CONSTRAINT "er_armors_rels_er_media_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_parent_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_er_armors_fk";

ALTER TABLE "_er_armors_v_rels" DROP CONSTRAINT "_er_armors_v_rels_er_media_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_parent_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_skills_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_weapon_types_fk";

ALTER TABLE "er_ashes_of_war_rels" DROP CONSTRAINT "er_ashes_of_war_rels_er_affinities_fk";

ALTER TABLE "er_builds_images" DROP CONSTRAINT "er_builds_images_parent_id_fk";

ALTER TABLE "er_builds_mainhand_weapons" DROP CONSTRAINT "er_builds_mainhand_weapons_parent_id_fk";

ALTER TABLE "er_builds_offhand_weapons" DROP CONSTRAINT "er_builds_offhand_weapons_parent_id_fk";

ALTER TABLE "er_builds_statistics" DROP CONSTRAINT "er_builds_statistics_parent_id_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_parent_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_media_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_restrictions_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_archetypes_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_users_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_weapons_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_ashes_of_war_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_affinities_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_shields_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_ammunitions_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_armors_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_talismans_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_sorceries_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_incantations_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_classes_fk";

ALTER TABLE "er_builds_rels" DROP CONSTRAINT "er_builds_rels_er_statistics_fk";

ALTER TABLE "_er_builds_v_version_images" DROP CONSTRAINT "_er_builds_v_version_images_parent_id_fk";

ALTER TABLE "_er_builds_v_version_mainhand_weapons" DROP CONSTRAINT "_er_builds_v_version_mainhand_weapons_parent_id_fk";

ALTER TABLE "_er_builds_v_version_offhand_weapons" DROP CONSTRAINT "_er_builds_v_version_offhand_weapons_parent_id_fk";

ALTER TABLE "_er_builds_v_version_statistics" DROP CONSTRAINT "_er_builds_v_version_statistics_parent_id_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_parent_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_builds_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_media_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_restrictions_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_archetypes_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_users_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_weapons_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_ashes_of_war_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_affinities_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_shields_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_ammunitions_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_armors_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_talismans_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_sorceries_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_incantations_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_classes_fk";

ALTER TABLE "_er_builds_v_rels" DROP CONSTRAINT "_er_builds_v_rels_er_statistics_fk";

ALTER TABLE "er_classes_statistics" DROP CONSTRAINT "er_classes_statistics_parent_id_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_parent_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_media_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_weapons_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_shields_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_sorceries_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_incantations_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_ammunitions_fk";

ALTER TABLE "er_classes_rels" DROP CONSTRAINT "er_classes_rels_er_statistics_fk";

ALTER TABLE "er_incantations_requirements" DROP CONSTRAINT "er_incantations_requirements_parent_id_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_parent_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_media_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_incantation_types_fk";

ALTER TABLE "er_incantations_rels" DROP CONSTRAINT "er_incantations_rels_er_statistics_fk";

ALTER TABLE "_er_incantations_v_version_requirements" DROP CONSTRAINT "_er_incantations_v_version_requirements_parent_id_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_parent_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_incantations_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_media_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_incantation_types_fk";

ALTER TABLE "_er_incantations_v_rels" DROP CONSTRAINT "_er_incantations_v_rels_er_statistics_fk";

ALTER TABLE "er_incantation_types_rels" DROP CONSTRAINT "er_incantation_types_rels_parent_fk";

ALTER TABLE "er_incantation_types_rels" DROP CONSTRAINT "er_incantation_types_rels_er_media_fk";

ALTER TABLE "er_shields_scaling" DROP CONSTRAINT "er_shields_scaling_parent_id_fk";

ALTER TABLE "er_shields_requirements" DROP CONSTRAINT "er_shields_requirements_parent_id_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_parent_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_media_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_skills_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_statistics_fk";

ALTER TABLE "er_shields_rels" DROP CONSTRAINT "er_shields_rels_er_status_effects_fk";

ALTER TABLE "_er_shields_v_version_scaling" DROP CONSTRAINT "_er_shields_v_version_scaling_parent_id_fk";

ALTER TABLE "_er_shields_v_version_requirements" DROP CONSTRAINT "_er_shields_v_version_requirements_parent_id_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_parent_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_shields_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_media_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_skills_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_statistics_fk";

ALTER TABLE "_er_shields_v_rels" DROP CONSTRAINT "_er_shields_v_rels_er_status_effects_fk";

ALTER TABLE "er_sorceries_requirements" DROP CONSTRAINT "er_sorceries_requirements_parent_id_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_parent_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_media_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_sorcery_types_fk";

ALTER TABLE "er_sorceries_rels" DROP CONSTRAINT "er_sorceries_rels_er_statistics_fk";

ALTER TABLE "_er_sorceries_v_version_requirements" DROP CONSTRAINT "_er_sorceries_v_version_requirements_parent_id_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_parent_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_sorceries_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_media_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_sorcery_types_fk";

ALTER TABLE "_er_sorceries_v_rels" DROP CONSTRAINT "_er_sorceries_v_rels_er_statistics_fk";

ALTER TABLE "er_sorcery_types_rels" DROP CONSTRAINT "er_sorcery_types_rels_parent_fk";

ALTER TABLE "er_sorcery_types_rels" DROP CONSTRAINT "er_sorcery_types_rels_er_media_fk";

ALTER TABLE "er_statistics_softcaps" DROP CONSTRAINT "er_statistics_softcaps_parent_id_fk";

ALTER TABLE "er_status_effects_rels" DROP CONSTRAINT "er_status_effects_rels_parent_fk";

ALTER TABLE "er_status_effects_rels" DROP CONSTRAINT "er_status_effects_rels_er_media_fk";

ALTER TABLE "er_talismans_rels" DROP CONSTRAINT "er_talismans_rels_parent_fk";

ALTER TABLE "er_talismans_rels" DROP CONSTRAINT "er_talismans_rels_er_media_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_parent_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_er_talismans_fk";

ALTER TABLE "_er_talismans_v_rels" DROP CONSTRAINT "_er_talismans_v_rels_er_media_fk";

ALTER TABLE "er_weapons_scaling" DROP CONSTRAINT "er_weapons_scaling_parent_id_fk";

ALTER TABLE "er_weapons_requirements" DROP CONSTRAINT "er_weapons_requirements_parent_id_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_parent_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_media_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_weapon_types_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_skills_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_statistics_fk";

ALTER TABLE "er_weapons_rels" DROP CONSTRAINT "er_weapons_rels_er_status_effects_fk";

ALTER TABLE "_er_weapons_v_version_scaling" DROP CONSTRAINT "_er_weapons_v_version_scaling_parent_id_fk";

ALTER TABLE "_er_weapons_v_version_requirements" DROP CONSTRAINT "_er_weapons_v_version_requirements_parent_id_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_parent_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapons_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_media_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_weapon_types_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_skills_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_statistics_fk";

ALTER TABLE "_er_weapons_v_rels" DROP CONSTRAINT "_er_weapons_v_rels_er_status_effects_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_fk";

DO $$ BEGIN
 ALTER TABLE "fashion_images" ADD CONSTRAINT "fashion_images__parent_id_fashion_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_parent_id_fashion_id_fk" FOREIGN KEY ("parent_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_fashion_media_id_fashion_media_id_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_er_armors_id_er_armors_id_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "fashion_rels" ADD CONSTRAINT "fashion_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_version_images" ADD CONSTRAINT "_fashion_v_version_images__parent_id__fashion_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_fashion_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_parent_id__fashion_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_fashion_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_fashion_id_fashion_id_fk" FOREIGN KEY ("fashion_id") REFERENCES "fashion"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_fashion_media_id_fashion_media_id_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_er_armors_id_er_armors_id_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_fashion_v_rels" ADD CONSTRAINT "_fashion_v_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_images" ADD CONSTRAINT "sliders_images__parent_id_sliders_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "sliders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_parent_id_sliders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "sliders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_fashion_media_id_fashion_media_id_fk" FOREIGN KEY ("fashion_media_id") REFERENCES "fashion_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sliders_rels" ADD CONSTRAINT "sliders_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_parent_id_er_affinities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_affinities_rels" ADD CONSTRAINT "er_affinities_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_affinities_v_rels" ADD CONSTRAINT "_er_affinities_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_ammunitions_rels" ADD CONSTRAINT "er_ammunitions_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_ammunitions_v_rels" ADD CONSTRAINT "_er_ammunitions_v_rels_er_status_effects_id_er_status_effects_id_fk" FOREIGN KEY ("er_status_effects_id") REFERENCES "er_status_effects"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_armors_v_rels" ADD CONSTRAINT "_er_armors_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_images" ADD CONSTRAINT "er_builds_images__parent_id_er_builds_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_affinities_id_er_affinities_id_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "er_builds_rels" ADD CONSTRAINT "er_builds_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_builds_v_version_images" ADD CONSTRAINT "_er_builds_v_version_images__parent_id__er_builds_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_mainhand_weapons" ADD CONSTRAINT "_er_builds_v_version_mainhand_weapons__parent_id__er_builds_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_offhand_weapons" ADD CONSTRAINT "_er_builds_v_version_offhand_weapons__parent_id__er_builds_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_version_statistics" ADD CONSTRAINT "_er_builds_v_version_statistics__parent_id__er_builds_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_parent_id__er_builds_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_er_builds_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_builds_id_er_builds_id_fk" FOREIGN KEY ("er_builds_id") REFERENCES "er_builds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_restrictions_id_restrictions_id_fk" FOREIGN KEY ("restrictions_id") REFERENCES "restrictions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_archetypes_id_archetypes_id_fk" FOREIGN KEY ("archetypes_id") REFERENCES "archetypes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_weapons_id_er_weapons_id_fk" FOREIGN KEY ("er_weapons_id") REFERENCES "er_weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_ashes_of_war_id_er_ashes_of_war_id_fk" FOREIGN KEY ("er_ashes_of_war_id") REFERENCES "er_ashes_of_war"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_affinities_id_er_affinities_id_fk" FOREIGN KEY ("er_affinities_id") REFERENCES "er_affinities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_shields_id_er_shields_id_fk" FOREIGN KEY ("er_shields_id") REFERENCES "er_shields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_ammunitions_id_er_ammunitions_id_fk" FOREIGN KEY ("er_ammunitions_id") REFERENCES "er_ammunitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_armors_id_er_armors_id_fk" FOREIGN KEY ("er_armors_id") REFERENCES "er_armors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_talismans_id_er_talismans_id_fk" FOREIGN KEY ("er_talismans_id") REFERENCES "er_talismans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_sorceries_id_er_sorceries_id_fk" FOREIGN KEY ("er_sorceries_id") REFERENCES "er_sorceries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_incantations_id_er_incantations_id_fk" FOREIGN KEY ("er_incantations_id") REFERENCES "er_incantations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_classes_id_er_classes_id_fk" FOREIGN KEY ("er_classes_id") REFERENCES "er_classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_er_builds_v_rels" ADD CONSTRAINT "_er_builds_v_rels_er_statistics_id_er_statistics_id_fk" FOREIGN KEY ("er_statistics_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_classes_rels" ADD CONSTRAINT "er_classes_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_incantations_rels" ADD CONSTRAINT "er_incantations_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_incantations_v_rels" ADD CONSTRAINT "_er_incantations_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_shields_rels" ADD CONSTRAINT "er_shields_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_shields_v_rels" ADD CONSTRAINT "_er_shields_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_sorceries_rels" ADD CONSTRAINT "er_sorceries_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_sorceries_v_rels" ADD CONSTRAINT "_er_sorceries_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_statistics_softcaps" ADD CONSTRAINT "er_statistics_softcaps__parent_id_er_statistics_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "er_statistics"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_talismans_v_rels" ADD CONSTRAINT "_er_talismans_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "er_weapons_rels" ADD CONSTRAINT "er_weapons_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "_er_weapons_v_rels" ADD CONSTRAINT "_er_weapons_v_rels_er_media_id_er_media_id_fk" FOREIGN KEY ("er_media_id") REFERENCES "er_media"("id") ON DELETE cascade ON UPDATE no action;
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
