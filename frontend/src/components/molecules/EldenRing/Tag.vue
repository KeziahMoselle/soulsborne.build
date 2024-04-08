<script setup lang="ts">
  const props = defineProps<{
    label: string
    href?: string
  }>()

  const tag = props.href ? 'a' : 'span'
</script>

<template>
  <component
    :is="tag" :href="href ?? undefined"
    class="bg-accent-foreground text-sm leading-4 px-2 rounded">
    {{ label }}
  </component>
</template>