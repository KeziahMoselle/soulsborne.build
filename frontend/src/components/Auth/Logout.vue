<script setup lang="ts">
import { logout } from '@/api';
import { LogOutIcon } from 'lucide-vue-next'
</script>

<template>
  <button @click="logout" type="button" title="Logout">
    <LogOutIcon class="text-accent-foreground" />
  </button>
</template>