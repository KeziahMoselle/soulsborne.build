<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  title: string
  text?: string
}>()
</script>

<template>
  <article class="flex flex-col items-center gap-2 bg-secondary border border-primary p-3 md:p-7">
    <header class="relative overflow-hidden">
      <img loading="lazy" class="w-full h-auto" src="/horizontal-image-background.png" alt="" />
      <img loading="lazy" class="absolute top-0 left-1/2 transform -translate-x-1/2 p-4 h-full object-contain"
        :src="src" :alt="alt" />
    </header>

    <div class="mt-2">
      <h2 class="type-h2 mb-2">{{ title }}</h2>
      <slot>
        {{ text }}
      </slot>
    </div>
  </article>
</template>
