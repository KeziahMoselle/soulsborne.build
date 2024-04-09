<script setup lang="ts">
  import type { ErBuild } from '~/payload-types'
  import Tag from '@/components/molecules/EldenRing/Tag.vue'
  import { ThumbsUpIcon } from 'lucide-vue-next'
  import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue';

  import { Vue3Marquee } from 'vue3-marquee'

  defineProps<{
    build?: ErBuild
  }>()
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
          <p class="-ml-4 w-28 lg:w-40">
            <Vue3Marquee
                gradient
                :gradient-color="[29, 29, 24]"
                gradient-length="10%"
                animate-on-overflow-only
            >
              <h3 class="ml-4">Bleed build</h3>
            </Vue3Marquee>
          </p>
        </div>
        <img class="w-full h-[44px]" src="/build-title.png" alt="" />
      </div>

      <button class="flex items-center self-center gap-x-2 bg-accent-foreground leading-4 px-2 py-1 rounded transition lg:text-sm lg:px-3 hover:bg-accent">
        <span class="type-h5">15</span>
        <ThumbsUpIcon class="w-3" />
      </button>
    </header>

    <!-- Tags -->
    <div class="flex gap-x-2 ml-8 mt-1">
      <Tag label="PvE" />
      <Tag label="Speedrun" />
    </div>

    <!-- Build preview -->
    <div class="grid ml-8 mt-8 gap-2 grid-cols-2 lg:grid-cols-3">
      <EquipmentImage
        src="https://cdn.soulsborne.build/test%2Fmainhand.png"
        alt="Mainhand 1" />
      <EquipmentImage
        src="https://cdn.soulsborne.build/test%2Fmainhand.png"
        alt="Mainhand 2" />

      <div class="grid gap-2 col-span-4 grid-cols-4 lg:col-span-1 lg:grid-cols-2">
        <EquipmentImage
          v-for="(_, i) in Array.from({ length: 4 })"
          :src="`https://cdn.soulsborne.build/test%2Ftalisman${i + 1}.png`"
          :alt="`Mainhand ${i + 1}`" />
      </div>
    </div>
  </article>
</template>