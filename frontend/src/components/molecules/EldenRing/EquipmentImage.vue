<script setup lang="ts">
  defineProps<{
    src: string
    alt: string
  }>()
</script>

<template>
  <div class="relative">
    <img
      class="h-full w-full border"
      src="/build-equipment-background.png"
      alt="" />
    <img
      class="absolute inset-0 h-full w-full p-2"
      :src="src"
      :alt="alt" />
  </div>
</template>