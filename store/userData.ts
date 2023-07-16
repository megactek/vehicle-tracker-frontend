import { defineStore } from 'pinia'

export const userData = defineStore('user', {
  state: () => {
    return {
      //@ts-expect-error
      user: JSON.parse(localStorage.getItem('user')),
      //@ts-expect-error
      isLoggedIn: JSON.parse(localStorage.getItem('authUser')),
      //@ts-expect-error
      devices: JSON.parse(localStorage.getItem('devices')),
      //@ts-expect-error
      users: JSON.parse(localStorage.getItem('users')),
      //@ts-expect-error
      groups: JSON.parse(localStorage.getItem('groups')),
      // @ts-expect-error
      credentials: JSON.parse(localStorage.getItem('x-auth-cred')),
    }
  },

  getters: {
    getUserData: (state) => state.user,
    getDevices: (state) => state.devices,
    getUsers: (state) => state.users,
    getGroups: (state) => state.groups,
    getCredentials: (state) => state.credentials,
  },

  actions: {
    logUser(user: any, auth: boolean) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      this.isLoggedIn = auth
      localStorage.setItem('authUser', JSON.stringify(auth))
    },
    logDevices(devices: any) {
      this.devices = devices
      localStorage.setItem('devices', JSON.stringify(devices))
    },
    logUsers(users: any) {
      this.users = users
      localStorage.setItem('users', JSON.stringify(users))
    },
    logGroups(groups: any) {
      this.groups = groups
      localStorage.setItem('groups', JSON.stringify(groups))
    },
    logCredential(cred: string) {
      this.credentials = cred
      localStorage.setItem('x-auth-cred', JSON.stringify(cred))
    },
    logoutUser() {
      localStorage.removeItem('authUser')
      localStorage.removeItem('user')
      localStorage.removeItem('users')
      localStorage.removeItem('devices')
      localStorage.removeItem('groups')
      localStorage.removeItem('x-auth-cred'), (this.isLoggedIn = false)
      this.credentials = false
      this.user = {}
      this.devices = false
      this.users = false
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
})
