<script setup lang="ts">
  defineProps<{
    src: string
    alt: string
    title: string
    text?: string
  }>()
</script>

<template>
  <article class="flex flex-col gap-2 bg-secondary border border-primary p-3 md:p-7">
    <header class="relative">
      <img
        class=""
        src="/horizontal-image-background.png"
        alt="" />
      <img
        class="absolute inset-0 p-4"
        :src="src"
        :alt="alt" />
    </header>

    <div>
      <h2 class="type-h2 mb-2">{{ title }}</h2>
      <slot>
        {{ text }}
      </slot>
    </div>
  </article>
</template>