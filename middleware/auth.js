import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthStore()

  if (!user) {
    return navigateTo('/login')
  }
})