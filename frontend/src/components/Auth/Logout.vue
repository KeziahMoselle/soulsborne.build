<script setup lang="ts">
import { logout } from '@/api';
</script>

<template>
  <button @click="logout" class="button" type="button">
    Logout
  </button>
</template>