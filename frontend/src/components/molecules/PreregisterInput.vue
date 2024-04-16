<script setup lang="ts">
import { fetchJSON } from '@/api';
import { ref } from 'vue';
import { toast } from 'vue-sonner'

const registered = ref(false)
const loading = ref(false)

async function preregister(e) {
  loading.value = true
  const email = new FormData(e.target).get('email')

  if (import.meta.env.PROD) {
    // @ts-ignore
    window.umami?.track('preregister', { email })
  }

  function subscribe() {
    return fetchJSON('/api/preregistrations', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  toast.promise(subscribe, {
    loading: 'Registering...',
    success: () => {
      loading.value = false
      registered.value = true
      return `Thank you! You will receive an email when we'll release the v1`
    },
    error: () => {
      loading.value = false
      return 'Please try again with a different email'
    }
  })
}
</script>

<template>
  <div class="z-10">
    <form v-if="!registered" @submit.prevent="preregister" class="flex items-center">
      <div class="flex flex-col items-center gap-4 flex-1 relative">
        <input name="email" type="email" placeholder="Your best email address"
          class="w-full pl-8 pr-8 py-4 bg-white text-black border border-ring placeholder:italic md:text-xl leading-6 transition focus:invalid:border-destructive focus:border-primary focus:outline-none lg:pr-36"
          required />
        <button class="button  sm:absolute sm:right-2 sm:top-2" :class="{ 'button--disabled': loading }">
          <span v-if="!loading">Notify me</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </form>
    <div v-else class="w-full pl-8 pr-8 py-4 bg-white text-black border border-ring text-xl leading-6">
      <p class="type-h2 mb-2">
        Thank you for registering!
      </p>
      <p>You will only receive 1 email to let you know that we publicly released our website!</p>
      <p class="mt-4">You can also follow the progress on our Discord server 👇</p>
      <a class="button button--discord mt-4" href="https://discord.gg/kpvXugU7Uk">
        Join us on Discord
      </a>
    </div>
  </div>
</template>
