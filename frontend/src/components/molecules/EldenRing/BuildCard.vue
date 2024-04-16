<script setup lang="ts">
import type {
  Archetype,
  ErBuild,
  ErMedia,
  ErTalisman,
  ErWeapon,
  Restriction,
} from '@payload-types'
import Tag from '@/components/molecules/EldenRing/Tag.vue'
import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue'
import { Vue3Marquee } from 'vue3-marquee'
import { computed, ref } from 'vue'

import LikeBuildButton from '@/components/molecules/LikeBuildButton.vue'

const props = defineProps<{
  build?: ErBuild
  hasVoted?: boolean
}>()

const mainWeapons = computed(() => {
  // Return empty array if no mainhand and no offhand
  if (
    props.build.mainhand_weapons.length === 0 &&
    props.build.offhand_weapons.length === 0
  ) {
    return []
  }

  // Return the first mainhand and offhand if each have at least 1 weapon
  if (
    props.build.mainhand_weapons.length > 0 &&
    props.build.offhand_weapons.length > 0
  ) {
    return [props.build.mainhand_weapons[0], props.build.offhand_weapons[0]]
  }

  // No offhand but at least 1 mainhand
  if (
    props.build.mainhand_weapons.length > 0 &&
    props.build.offhand_weapons.length === 0
  ) {
    return props.build.mainhand_weapons.slice(0, 2).filter(Boolean)
  }

  if (
    props.build.offhand_weapons.length > 0 &&
    props.build.mainhand_weapons.length === 0
  ) {
    return props.build.offhand_weapons.slice(0, 2).filter(Boolean)
  }
})

const backgroundImage = computed(() => {
  if (props.build.images.length > 0) {
    const image = props.build.images[0].image as ErMedia
    return image.thumbnailURL
  }

  return '/build-background.jpg'
})
</script>

<template>
  <article
    class="group/card z-0 relative pr-5 pt-3 pb-5 border border-accent bg-background max-w-[451px] overflow-hidden"
  >
    <a
      :href="`/build/${build.id}`"
      title="See build"
      class="absolute z-10 inset-0"
    >
      <span class="sr-only">{{ build.name }}</span>
    </a>
    <img
      class="-z-10 absolute inset-0 object-cover object-center h-full w-full opacity-20 transform transition-transform duration-700 ease-out group-hover/card:scale-110"
      :src="backgroundImage"
      alt=""
      loading="lazy"
    />
    <div class="absolute inset-0 block bg-primary opacity-20 -z-[9]"></div>
    <!-- Build title and Actions -->
    <header class="flex justify-between">
      <div class="relative h-[44px]">
        <div
          class="absolute top-1/2 transform -translate-y-1/2 left-8 flex items-center gap-x-4"
        >
          <img
            class="size-8"
            src="https://cdn.soulsborne.build/test%2Fbleed.png"
            alt="bleed"
          />
          <p class="-ml-4 w-52 lg:w-48 2xl:w-64">
            <Vue3Marquee
              gradient
              :gradient-color="[29, 29, 24]"
              gradient-length="10%"
              animate-on-overflow-only
            >
              <h3 class="type-h3 ml-4">
                {{ build.name }}
              </h3>
            </Vue3Marquee>
          </p>
        </div>
        <img class="w-full h-[44px]" src="/build-title.png" alt="" />
      </div>

      <LikeBuildButton :build="build" :has-voted="hasVoted" />
    </header>

    <!-- Tags -->
    <div class="ml-8 mt-1 max-w-72">
      <Vue3Marquee
        gradient
        :gradient-color="[29, 29, 24]"
        gradient-length="5%"
        animate-on-overflow-only
      >
        <Tag
          v-for="archetype in build.archetypes as Archetype[]"
          :label="archetype.name"
        />
        <Tag
          v-for="restriction in build.restrictions as Restriction[]"
          :label="restriction.name"
        />
      </Vue3Marquee>
    </div>

    <!-- Build preview -->
    <div class="grid ml-8 mt-8 gap-2 grid-cols-2 lg:grid-cols-3">
      <EquipmentImage
        v-for="{ weapon } in mainWeapons"
        :equipment="weapon"
        size="l"
      />
      <EquipmentImage v-if="mainWeapons.length === 1" size="l" />
      <template v-if="mainWeapons.length === 0">
        <EquipmentImage size="l" />
        <EquipmentImage size="l" />
      </template>

      <div
        class="grid gap-1 col-span-4 grid-cols-4 lg:col-span-1 lg:grid-cols-2 lg:grid-rows-2"
      >
        <EquipmentImage
          v-for="talisman in build.talismans as ErTalisman[]"
          :equipment="talisman"
          size="m"
        />
      </div>
    </div>
  </article>
</template>
