<script setup lang="ts">
import { toast } from 'vue-sonner';

async function preregister() {
  toast.info('need to dev')
}
</script>

<template>
  <form @submit.prevent="preregister" class="flex items-center">
    <div class="flex-1 relative">
      <input
        type="email"
        placeholder="Your best email address"
        class="w-full pl-8 pr-8 py-4 bg-white text-black border border-ring placeholder:italic text-xl leading-6 invalid:border-destructive lg:pr-36" />
      <button class="button absolute right-2 top-2">
        Notify me
      </button>
    </div>
  </form>
</template>