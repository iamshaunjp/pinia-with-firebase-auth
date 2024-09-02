import { defineStore } from 'pinia'
import { format, differenceInDays } from 'date-fns'
import { 
  addDoc,
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore'

export const useHabitStore = defineStore('habitStore', {
  state: () => ({
    habits: [],
    error: null
  }),
  actions: {
    // fetching all habits
    async fetchHabits() {
      this.error = null
      const { $db } = useNuxtApp()

      try {
        const snapshot = await getDocs(collection($db, 'habits'))
        this.habits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
    },

    // adding new habits
    async addHabit(name) {
      this.error = null
      const { $db, $auth } = useNuxtApp()

      const habit = {
        name,
        completions: [],
        streak: 0,
        userId: $auth.currentUser.uid
      }

      try {
        const docRef = await addDoc(collection($db, 'habits'), habit)
        this.habits.push({ id: docRef.id, ...habit })

      } catch (error) {
        this.error = error.message
      }
      
    },

    // updating habits
    async updateHabit(id, updates) {
      this.error = null
      const { $db } = useNuxtApp()

      try {
        const docRef = doc($db, 'habits', id)
        await updateDoc(docRef, updates)

        const index = this.habits.findIndex((habit) => habit.id === id)
        if (index !== -1) {
          this.habits[index] = { ...this.habits[index], ...updates }
        }
      } catch (error) {
        this.error = error.message
      }
      
    },

    // deleting habits
    async deleteHabit(id) {
      const { $db } = useNuxtApp()

      try {
        const docRef = doc($db, 'habits', id)
        await deleteDoc(docRef)

        this.habits = this.habits.filter((habit) => habit.id !== id)
      } catch (error) {
        this.error = error.message
      }
    },

    // completing a daily habit
    toggleCompletion(habit) {
      const today = format(new Date(), 'yyyy-MM-dd')

      if (habit.completions.includes(today)) {
        habit.completions = habit.completions.filter((date) => date !== today)
      } else {
        habit.completions.push(today)
      }

      habit.streak = this.calculateStreak(habit.completions)

      this.updateHabit(habit.id, {
        completions: habit.completions,
        streak: habit.streak
      })
    },

    // calculate habit streak
    calculateStreak(completions) {
      const sortedDates = completions.sort((a, b) => new Date(b) - new Date(a))
      let streak = 0
      let currentDate = new Date()

      for (const date of sortedDates) {
        const diff = differenceInDays(currentDate, new Date(date))

        if (diff > 1) {
          break
        }

        streak += 1
        currentDate = new Date(date)
      }

      return streak
    },

  }
})