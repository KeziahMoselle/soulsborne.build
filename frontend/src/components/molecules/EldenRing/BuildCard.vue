<script setup lang="ts">
  import type { ErBuild } from '~/payload-types'
  import Tag from '@/components/molecules/EldenRing/Tag.vue'
  import { ThumbsUpIcon } from 'lucide-vue-next'
import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue';

  defineProps<{
    build?: ErBuild
  }>()
</script>

<template>
  <article class="z-0 relative pr-5 pt-3 pb-5 border border-accent bg-background max-w-[451px]">
    <img
      class="-z-10 absolute inset-0 object-cover object-center h-full w-full"
      src="/build-background.png"
      alt=""
      loading="lazy" />
    <!-- Build title and like -->
    <header class="flex justify-between">
      <div class="relative h-[44px]">
        <div
          class="
            absolute top-1/2 transform -translate-y-1/2 left-8
            flex items-center gap-x-4
          ">
          <img class="h-6 w-auto" src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fbleed.png" alt="bleed" />
          <h3>Bleed build</h3>
        </div>
        <img class="w-full h-[44px]" src="/build-title.png" alt="" />
      </div>

      <button class="flex items-center self-center gap-x-2 bg-accent-foreground text-sm leading-4 px-3 py-1 rounded transition hover:bg-accent">
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
    <div class="grid ml-8 mt-8 gap-2 md:grid-cols-3">
      <EquipmentImage
        src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fmainhand.png"
        alt="Mainhand 1" />
      <EquipmentImage
        src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fmainhand.png"
        alt="Mainhand 2" />

      <div class="grid grid-cols-2 gap-2 grid-rows-2">
        <EquipmentImage
          v-for="(_, i) in Array.from({ length: 4 })"
          :src="`https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Ftalisman${i + 1}.png`"
          :alt="`Mainhand ${i + 1}`" />
      </div>
    </div>
  </article>
</template>