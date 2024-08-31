<template>
  <div class="flex justify-center mt-10">
    <div class="w-full max-w-sm bg-white shadow-md rounded p-8">
      <h2 class="text-2xl text-gray-800 font-bold text-center mb-6">Sign Up</h2>

      <form @submit.prevent="handleSignup">
        <input v-model="email" type="email" placeholder="Email" required
          class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

        <input v-model="password" type="password" placeholder="Password" required
          class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

        <button type="submit" class="w-full bg-purple-500 text-white py-2 rounded-sm">
          Signup
        </button>

        <p v-if="authStore.signupError" class="text-red-500 mt-4 text-center">
          {{ authStore.signupError }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleSignup = async () => {
  await authStore.signup(email.value, password.value)
}

</script>