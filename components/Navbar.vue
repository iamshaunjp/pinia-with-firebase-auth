<template>
  <header class="bg-purple-500 text-white p-4 flex justify-between items-center">
    <nuxt-link to="/">
      <h1 class="text-xl font-semibold">Habit Tracker</h1>
    </nuxt-link>
    <div>

      <div class="flex items-center space-x-4">
        <button @click="handleLogout" class="bg-gray-100 text-black px-3 py-1">
          Logout
        </button>
      </div>

      <div class="space-x-4">
        <nuxt-link to="/login" class="hover:underline">Login</nuxt-link>
        <nuxt-link to="/signup" class="hover:underline">Sign Up</nuxt-link>
      </div>

    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = async () => {
  console.log('before logout:', authStore.user)
  await authStore.logout()
  console.log('after logout:', authStore.user)
}
</script>
