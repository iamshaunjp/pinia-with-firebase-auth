<template>
  <slot v-if="!authStore.user"></slot>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()
</script>