<template>
  <header class="bg-purple-500 text-white p-4 flex justify-between items-center">
    <nuxt-link to="/">
      <h1 class="text-xl font-semibold">Habit Tracker</h1>
    </nuxt-link>
    <div>

      <div class="space-x-4">
        <nuxt-link to="/login" class="hover:underline">Login</nuxt-link>
        <nuxt-link to="/signup" class="hover:underline">Sign Up</nuxt-link>
      </div>

    </div>
  </header>
</template>

<script setup>

</script>
