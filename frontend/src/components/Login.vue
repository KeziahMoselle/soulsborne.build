<script setup>
  import { ref } from 'vue'
  import { login, logout } from '../api'

  const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL

  const form = ref(null)

  async function submit() {
    try {
      const formData = new FormData(form.value);

      await login({
        email: formData.get('email'),
        password: formData.get('password')
      })
    } catch (error) {
      window.alert(error.message)
    }
  }
</script>

<template>
  <form
    ref="form"
    method="POST"
    :action="`${PAYLOAD_URL}/users/login`"
    @submit.prevent="submit">
    <input type="email" name="email" required />
    <input type="password" name="password" required />
    <button type="submit">Login</button>
  </form>

  <button @click="logout">Logout</button>
</template>