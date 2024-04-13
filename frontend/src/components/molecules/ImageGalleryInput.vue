<script setup lang="ts">
  import { ref } from 'vue';

  const form = ref()
  const emit = defineEmits(['change'])

  const images = ref([])

  function onChange(event) {
    images.value = event.target.files
    console.log(form.value, event)
    emit('change', form.value)
  }

  function getPreviewSrc(file) {
    return URL.createObjectURL(file)
  }
</script>

<template>
  <form
    ref="form"
    class="group relative p-4 border-2 border-dotted border-input rounded-sm">
    <input
      @change="onChange"
      class="absolute inset-0 w-full h-full block cursor-pointer opacity-0"
      type="file"
      name="file"
      multiple
      accept="image/png, image/jpeg"
      title="Upload images" />

      <div v-if="images.length > 0" class="grid grid-cols-4 gap-4 place-items-center">
        <img
          v-for="image in images"
          class="bg-white bg-opacity-5 p-2 object-contain"
          :src="getPreviewSrc(image)"
          alt="" />
      </div>
      <div v-else class="flex items-center justify-center pointer-events-auto z-10 h-full">
        <span class="button group-hover:bg-accent group-hover:border-accent-foreground">Select multiple images</span>
      </div>
  </form>
</template>