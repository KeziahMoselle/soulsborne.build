<script setup>
  import { ref } from 'vue'
  import { useStore } from '@nanostores/vue'
  import { login, logout } from '../api'
  import { $user } from '../stores/auth'

  const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL

  const user = useStore($user);
  const form = ref(null)

  async function submit() {
    const formData = new FormData(form.value);

    await login({
      email: formData.get('email'),
      password: formData.get('password')
    })
  }

  console.log(user);
</script>

<template>
  <div v-if="!user" class="bg-slate-800 border border-slate-600 p-4 m-4">
    <form
      class="flex flex-col gap-y-2"
      ref="form"
      method="POST"
      :action="`${PAYLOAD_URL}/users/login`"
      @submit.prevent="submit">
      <input class="text-slate-900" type="email" name="email" placeholder="your@email.com" required />
      <input class="text-slate-900" type="password" name="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
  <div v-else>
    Welcome {{ user.email }}
    <button @click="logout">Logout</button>
  </div>
</template>