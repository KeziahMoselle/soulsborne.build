<script setup lang="ts">
  import type { Archetype, ErBuild, ErTalisman, ErWeapon, Restriction } from '~/payload-types'
  import Tag from '@/components/molecules/EldenRing/Tag.vue'
  import { ThumbsUpIcon } from 'lucide-vue-next'
  import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue';
  import { Vue3Marquee } from 'vue3-marquee'
  import { computed } from 'vue';

  const props = defineProps<{
    build?: ErBuild
  }>()

  const mainWeapons = computed(() => {
    // Return the first mainhand and offhand if each have at least 1 weapon
    if (props.build.mainhand_weapons.length > 0 && props.build.offhand_weapons.length > 0) {
      return [
        props.build.mainhand_weapons[0],
        props.build.offhand_weapons[0],
      ]
    }

    // No offhand but at least 1 mainhand
    if (props.build.mainhand_weapons.length > 0 && props.build.offhand_weapons.length === 0) {
      return props.build.mainhand_weapons.slice(0, 1).filter(Boolean)
    }

    if (props.build.offhand_weapons.length > 0 && props.build.mainhand_weapons.length === 0) {
      return props.build.offhand_weapons.slice(0, 1).filter(Boolean)
    }
  })
</script>

<template>
  <article class="z-0 relative pr-5 pt-3 pb-5 border border-accent bg-background max-w-[451px] overflow-hidden">
    <img
      class="-z-10 absolute inset-0 object-cover object-center h-full w-full"
      src="/build-background.png"
      alt=""
      loading="lazy" />
    <!-- Build title and Actions -->
    <header class="flex justify-between">
      <div class="relative h-[44px]">
        <div
          class="
            absolute top-1/2 transform -translate-y-1/2 left-8
            flex items-center gap-x-4
          ">
          <img class="h-6 w-6" src="https://cdn.soulsborne.build/test%2Fbleed.png" alt="bleed" />
          <p class="-ml-4 w-28 lg:w-48 2xl:w-64">
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

      <button class="flex items-center self-center gap-x-2 bg-accent-foreground leading-4 px-2 py-1 rounded transition lg:text-sm lg:px-3 hover:bg-accent">
        <span class="type-h5">{{ build.votes.length }}</span>
        <ThumbsUpIcon class="w-3" />
      </button>
    </header>

    <!-- Tags -->
    <div class="ml-8 mt-1 max-w-72">
      <Vue3Marquee
        gradient
        :gradient-color="[29, 29, 24]"
        gradient-length="5%"
        animate-on-overflow-only
      >
        <Tag v-for="archetype in (build.archetype as Archetype[])" :label="archetype.name" />
        <Tag v-for="restriction in (build.restrictions as Restriction[])" :label="restriction.name" />
      </Vue3Marquee>
    </div>

    <!-- Build preview -->
    <div class="grid ml-8 mt-8 gap-2 grid-cols-2 lg:grid-cols-3">
      <EquipmentImage
        v-for="{ weapon } in mainWeapons"
        src="https://cdn.soulsborne.build/test%2Fmainhand.png"
        :alt="(weapon as ErWeapon).name" />
      <EquipmentImage v-if="mainWeapons.length === 1" />

      <div class="grid gap-1 col-span-4 grid-cols-4 lg:col-span-1 lg:grid-cols-2 lg:grid-rows-2">
        <EquipmentImage
          v-for="(talisman, i) in (build.talismans as ErTalisman[])"
          :src="`https://cdn.soulsborne.build/test%2Ftalisman${i + 1}.png`"
          :alt="talisman.name" />
      </div>
    </div>
  </article>
</template>