<script setup lang="ts">
  import type { User } from '~/payload-types'
  import Button from '@/components/ui/button/Button.vue';
  import Login from './Login.vue';
  import Register from './Register.vue'
  import { logout } from '../../api'

  defineProps<{
    user: User | null
  }>()

  function onRegister() {
    console.log('TODO')
  }

  function onLogin() {
    console.log('Logged in')
  }
</script>

<template>
  <div>
    <Login v-if="!user" @login="onLogin" />
    <Register v-if="!user" @registered="onRegister" />
    <Button v-if="user" @click="logout">Logout</Button>
  </div>
</template>