<script setup lang="ts">
import { useCycleList } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';

  interface Image {
    src: string
    alt: string
  }

  const props = defineProps<{
    class: string
    images: Image[]
  }>()

  let interval
  const { next, index: activeIndex } = useCycleList(props.images)

  onMounted(() => {
    interval = setInterval(next, 3000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>

<template>
  <span class="block relative" :class="class">
    <img
      v-for="(image, index) in images"
      :key="image.src"
      :src="image.src"
      :alt="image.alt"
      class="absolute w-full top-0 transition duration-500 transform will-change-transform"
      :class="{
        'opacity-100': activeIndex === index,
        'opacity-0 translate-y-9': activeIndex !== index
      }" />
  </span>
</template>