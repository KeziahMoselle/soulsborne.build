<script setup lang="ts">
  import { ref } from 'vue';

  const form = ref()
  const emit = defineEmits(['change'])

  const images = ref([])

  function onChange(event) {
    images.value = event.target.files
    emit('change', form)
  }

  function getPreviewSrc(file) {
    return URL.createObjectURL(file)
  }
</script>

<template>
  <form
    ref="form"
    class="relative p-4 border border-dotted bg-black rounded-sm">
    <input
      @change="onChange"
      class="absolute inset-0 w-full h-full block cursor-pointer opacity-0"
      type="file"
      name="images"
      multiple
      accept="image/png, image/jpeg"
      title="Upload images" />

      <div v-if="images.length > 0" class="grid grid-cols-4 place-items-center">
        <img
          v-for="image in images"
          class="aspect-square"
          :src="getPreviewSrc(image)"
          alt="" />
      </div>
      <div v-else class="flex items-center justify-center">
        <span class="button">Select multiple images</span>
      </div>
  </form>
</template>