<script setup>
  import { ref } from 'vue'
  import { register, login } from '../api'

  const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL

  const emit = defineEmits(['registered'])

  const form = ref(null)

  async function submit() {
    const formData = new FormData(form.value);

    const succeeded = await register({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (succeeded) {
      emit('registered')
    }
  }
</script>

<template>
  <form
    class="flex flex-col gap-y-2"
    ref="form"
    method="POST"
    :action="`${PAYLOAD_URL}/register`"
    @submit.prevent="submit">
    <input class="text-slate-900" type="text" name="name" placeholder="Name" required />
    <input class="text-slate-900" type="email" name="email" placeholder="your@email.com" required />
    <input class="text-slate-900" type="password" name="password" placeholder="password" required />
    <button type="submit">Register</button>
  </form>
</template>