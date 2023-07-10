import { defineStore } from 'pinia'

export const userData = defineStore('user', {
  state: () => {
    return {
      //@ts-expect-error
      user: JSON.parse(localStorage.getItem('user')),
      //@ts-expect-error
      isLoggedIn: JSON.parse(localStorage.getItem('authUser')),
    }
  },

  getters: {
    getUserData: (state) => state.user,
  },

  actions: {
    logUser(user: any, auth: boolean) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      this.isLoggedIn = auth
      localStorage.setItem('authUser', JSON.stringify(auth))
    },
    logoutUser() {
      localStorage.removeItem('authUser')
      localStorage.removeItem('user')
      this.isLoggedIn = false
      this.user = {}
    },
  },
})
