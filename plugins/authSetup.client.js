import { useAuthStore } from '@/stores/auth'

const PROTECTED_ROUTES = ['/']
const GUEST_ONLY_ROUTES = ['/login', '/signup']

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const router = useRouter()

  // setup the auth listener
  authStore.setupAuthListener()

  const redirectUser = () => {
    const { path } = router.currentRoute.value

    // redirect authenticated users to homepage
    if (authStore.user) {
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push('/')
      }
    }

    // redirect unauthentiacted users to login
    if (!authStore.user) {
      if (PROTECTED_ROUTES.includes(path)) {
        router.push('/login')
      }
    }
  }

  // watch user and redirect when it changes
  watch(() => authStore.user, () => redirectUser())

})