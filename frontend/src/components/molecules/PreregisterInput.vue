<script setup lang="ts">
import { toast } from 'vue-sonner'

async function preregister(e) {
  toast.info('need to dev')

  // @ts-ignore
  window.umami?.track('preregister', {
    email: new FormData(e.target).get('email'),
  })
}
</script>

<template>
  <form @submit.prevent="preregister" class="flex items-center">
    <div class="flex-1 relative">
      <input name="email" type="email" placeholder="Your best email address"
        class="w-full pl-8 pr-8 py-4 bg-white text-black border border-ring placeholder:italic md:text-xl leading-6 transition focus:invalid:border-destructive focus:border-primary focus:outline-none lg:pr-36"
        required />
      <button class="button absolute right-2 top-2">Notify me</button>
    </div>
  </form>
</template>
