<script setup>
import { ref } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import { login } from '../../api'

const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL

const emit = defineEmits(['login'])

const form = ref(null)

async function submit() {
  const formData = new FormData(form.value)

  const succeeded = await login({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (succeeded) {
    emit('login')
  }
}
</script>

<template>
  <form
    class="container--small bg-secondary border p-4 m-4 flex flex-col gap-y-2"
    ref="form"
    method="POST"
    :action="`${PAYLOAD_URL}/api/users/login`"
    @submit.prevent="submit"
  >
    <Input type="email" name="email" placeholder="your@email.com" required />
    <Input type="password" name="password" placeholder="password" required />
    <div class="text-center">
      <button class="button" type="submit">Login</button>
    </div>
  </form>
</template>
