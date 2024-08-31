import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  // setup the auth listener
  authStore.setupAuthListener()

})