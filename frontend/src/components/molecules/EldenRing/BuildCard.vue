<script setup lang="ts">
  import type { ErBuild } from '~/payload-types'
  import Tag from '@/components/molecules/EldenRing/Tag.vue'
  import { ThumbsUpIcon } from 'lucide-vue-next'

  defineProps<{
    build?: ErBuild
  }>()
</script>

<template>
  <article class="z-0 relative pr-7 pt-3 pb-5 border border-accent bg-background">
    <img
      class="-z-10 absolute inset-0 object-cover object-center h-full"
      src="/build-background.png"
      alt=""
      loading="lazy" />
    <!-- Build title and like -->
    <header class="flex justify-between">
      <div class="relative h-10">
        <div
          class="
            absolute top-1/2 transform -translate-y-1/2 left-8
            flex items-center gap-x-4
          ">
          <img class="h-6 w-auto" src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fbleed.png" alt="bleed" />
          <h3>Bleed build</h3>
        </div>
        <img class="w-full h-auto" src="/build-title.png" alt="" />
      </div>

      <button class="flex items-center self-start gap-x-1 bg-accent-foreground text-sm leading-4 px-2 py-1 rounded">
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
    <div class="grid ml-8 mt-8 md:grid-cols-3">
      <img
        class="h-full w-full border"
        src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fmainhand.png"
        alt="" />
      <img
        class="h-full w-full border"
        src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Fmainhand.png"
        alt="" />

      <div class="grid grid-cols-2 grid-rows-2">
        <img
          class="h-full w-full border"
          src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Ftalisman1.png"
          alt="" />
        <img
          class="h-full w-full border"
          src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Ftalisman2.png"
          alt="" />
        <img
          class="h-full w-full border"
          src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Ftalisman3.png"
          alt="" />
        <img
          class="h-full w-full border"
          src="https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/test%2Ftalisman4.png"
          alt="" />
      </div>
    </div>
  </article>
</template>