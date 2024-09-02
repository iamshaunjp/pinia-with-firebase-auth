import { defineStore } from 'pinia'
import { useHabitStore } from '@/stores/habits'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    initialAuthValueReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp()

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user || null
          console.log('user state change:', this.user)
          this.initialAuthValueReady = true
        })
      } else {
        console.error('Firebase Auth is not initialized');
      }
    },

    // signup
    async signup(email, password) {
      const { $auth } = useNuxtApp()

      this.signupError = null

      try {
        const cred = await createUserWithEmailAndPassword($auth, email, password)
      } catch (error) {
        this.signupError = error.message
      }
    },

    // logout
    async logout() {
      const { $auth } = useNuxtApp()
      const habitStore = useHabitStore()

      await signOut($auth)
      habitStore.resetHabits()
    },

    // login
    async login(email, password) {
      const { $auth } = useNuxtApp()

      this.loginError = null

      try {
        const cred = await signInWithEmailAndPassword($auth, email, password)
      } catch (error) {
        this.loginError = error.message
      }
    },
  },
})
