<script setup lang="ts">
  defineProps<{
    src?: string
    alt?: string
    small?: boolean
  }>()
</script>

<template>
  <div class="relative">
    <img
      class="h-full w-full border"
      src="/build-equipment-background.png"
      :alt="!src ? 'Empty' : ''" />
    <img
      v-if="src"
      class="absolute inset-0 h-full w-full"
      :class="{
        'p-2': !small
      }"
      :src="src"
      :alt="alt" />
  </div>
</template>