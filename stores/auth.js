import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
  }),

  actions: {
    // signup
    async signup(email, password) {
      const { $auth } = useNuxtApp()

      this.signupError = null

      try {
        const cred = await createUserWithEmailAndPassword($auth, email, password)
        this.user = cred.user
      } catch (error) {
        this.signupError = error.message
      }
    },

    // logout
    async logout() {
      const { $auth } = useNuxtApp()

      await signOut($auth)
      this.user = null
    },

    // login
  },
})
