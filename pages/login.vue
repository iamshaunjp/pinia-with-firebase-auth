<template>
  <div class="flex justify-center mt-10">
    <div class="w-full max-w-sm bg-white shadow-md rounded p-8">
      <h2 class="text-2xl text-gray-800 font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required
          class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

        <input v-model="password" type="password" placeholder="Password" required
          class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm" />

        <button type="submit" class="w-full bg-purple-500 text-white py-2 rounded-sm">
          Login
        </button>

        <p class="text-red-500 mt-4 text-center">
          <!--error feedback-->
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  console.log(email.value, password.value)
}

</script>