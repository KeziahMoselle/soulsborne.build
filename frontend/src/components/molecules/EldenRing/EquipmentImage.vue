<script setup lang="ts">
  import type { PayloadOptionLike } from '@/types';
  import { computed } from 'vue';

  const SELECT_IMAGES = {
    'mainhand': '/elden-ring/builder/mainhand.png',
    'offhand': '/elden-ring/builder/offhand.png',
    'bolt': '/elden-ring/builder/arrows.png',
    'greatbolt': '/elden-ring/builder/bolts.png',
    'helm': '/elden-ring/builder/helmet.png',
    'chest': '/elden-ring/builder/chest.png',
    'gauntlet': '/elden-ring/builder/gauntlet.png',
    'leg': '/elden-ring/builder/leg.png',
    'talisman': '/elden-ring/builder/talismans.png',
    'ash': '/elden-ring/builder/ash.png',
    'magic': '/elden-ring/builder/sorceries.png'
  }

  const props = defineProps<{
    equipment?: PayloadOptionLike
    type?: string
    size: 'xs' | 'm' | 'l'
    loading?: boolean
    isSelect?: boolean
  }>()

  const previewImage = computed(() => {
    if (props.equipment?.image?.thumbnailURL) {
      return props.equipment?.image?.thumbnailURL
    }

    return 'https://cdn.soulsborne.build/test%2Fmainhand.png'
  })

</script>

<template>
  <div class="relative">
      <img
        v-if="isSelect"
        class="aspect-square transition-opacity ease-in z-[1]"
        :class="{
          'size-32': size === 'l',
          'size-16': size === 'm',
          'size-8': size === 'xs',
        }"
        height="128"
        width="128"
        src="/elden-ring/builder/select-background.png"
        alt="" />

        <img
          v-if="!isSelect"
          class="h-full w-full border"
          src="/build-equipment-background.png" />

      <slot name="background">
        <img
          v-if="type && SELECT_IMAGES[type]"
          class="absolute top-0 transform scale-75 p-1 object-contain transition-opacity ease-in z-[2]"
          :class="{
            'size-32': size === 'l',
            'size-16': size === 'm',
            'size-8': size === 'xs',
            'opacity-50': loading || equipment
          }"
          height="128"
          width="128"
          :src="SELECT_IMAGES[type]"
          alt="" />
      </slot>
      <!-- Item's image here -->
      <div class="absolute inset-0 z-[2]">
        <slot name="equipment">
          <img
            v-if="equipment || !isSelect"
            :class="{
              'absolute inset-0 h-full w-full': !isSelect,
              'p-4': size === 'l' && isSelect,
              'p-2': (size === 'm' && isSelect) || (size === 'l' && !isSelect),
            }"
            :src="previewImage" />
        </slot>
      </div>
      <!-- Loader -->
      <slot name="loader">
        <div
          class="loader absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-opacity ease-in z-[2]"
          :class="{
            'opacity-0': !loading
          }">
        </div>
      </slot>
  </div>
</template>