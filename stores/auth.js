import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword
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


    // login
  },
})
