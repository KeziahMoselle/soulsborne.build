<script setup>
  import { ref } from 'vue'
  import { register } from '../../api'

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
    class="bg-slate-800 border border-slate-600 p-4 m-4 flex flex-col gap-y-2"
    ref="form"
    method="POST"
    :action="`${PAYLOAD_URL}/api/register`"
    @submit.prevent="submit">
    <input class="text-slate-900" type="text" name="name" placeholder="Name" required />
    <input class="text-slate-900" type="email" name="email" placeholder="your@email.com" required />
    <input class="text-slate-900" type="password" name="password" placeholder="password" required />
    <div class="text-center">
      <button class="button" type="submit">Register</button>
    </div>
  </form>
</template>