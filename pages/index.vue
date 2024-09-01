<template>
  <div class="mx-auto p-6 max-w-2xl">
    <HabitForm />
    <HabitList :habits="habitStore.habits" />
  </div>
</template>

<script setup>
import { useHabitStore } from '@/stores/habits'

// component imports
import HabitForm from '@/components/HabitForm.vue'
import HabitList from '@/components/HabitList.vue'

const habitStore = useHabitStore()

onMounted(async () => {
  habitStore.fetchHabits()
})

definePageMeta({
  middleware: ['auth'], 
})
</script>

<style>
body {
  background: #f1f1f1;
}
</style>