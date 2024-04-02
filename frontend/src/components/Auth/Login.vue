<script setup>
  import { ref } from 'vue'
  import { login } from '../../api'
  import Button from '@/components/ui/button/Button.vue';

  const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL

  const emit = defineEmits(['login'])

  const form = ref(null)

  async function submit() {
    const formData = new FormData(form.value);

    const succeeded = await login({
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (succeeded) {
      emit('login')
    }
  }
</script>

<template>
  <form
    class="bg-slate-800 border border-slate-600 p-4 m-4 flex flex-col gap-y-2"
    ref="form"
    method="POST"
    :action="`${PAYLOAD_URL}/api/users/login`"
    @submit.prevent="submit">
    <input class="text-slate-900" type="email" name="email" placeholder="your@email.com" required />
    <input class="text-slate-900" type="password" name="password" placeholder="password" required />
    <div class="text-center">
      <Button type="submit">Login</Button>
    </div>
  </form>
</template>