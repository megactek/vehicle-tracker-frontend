import { defineStore } from 'pinia'
import { userData } from './userData'
import { deviceStore } from './device'
import useFilter from '../utils/useFilter'

export const sessionStore = defineStore('sessions', {
  state: () => ({
    server: null,
    socket: null,
    positions: {},
    history: {},
    filteredPositions: null,
  }),
  getters: {
    getServer: (state) => state.server,
    getSocket: (state) => state.socket,
    getPositions: (state) => state.positions,
    getHistory: (state) => state.history,
  },
  actions: {
    updateFilteredPositions(payload: any) {
      this.$state.filteredPositions = payload
    },
    updateServer(payload: any) {
      this.$patch({ server: payload })
    },
    updateSocket(payload: any) {
      this.$patch({ socket: payload })
    },
    updatePositions(payload: Array<any>) {
      const liveRoutes =
        userData().user.attributes.mapLiveRoutes ||
        //@ts-expect-error
        this.$state.server?.attributes.mapLiveRoutes ||
        'none'
      const liveRoutesLimit =
        userData().user.attributes['web.liveRouteLength'] ||
        //@ts-expect-error
        this.$state.server?.attributes['web.liveRouteLength'] ||
        10
      payload.forEach((position: any) => {
        //@ts-expect-error
        this.$state.positions[position.deviceId] = position
        if (liveRoutes === 'none') {
          //@ts-expect-error
          const route = this.$state.history[position.deviceId] || []
          const last = route.at(-1)
          if (
            !last ||
            (last[0] !== position.longitude && last[1] !== position.latitude)
          ) {
            //@ts-expect-error
            this.$state.history[position.deviceId] = [
              ...route.slice(1 - liveRoutesLimit),
              [position.longitude, position.latitude],
            ]
          }
          let presentDevices = deviceStore().items
          if (!presentDevices) {
            presentDevices = userData().devices
            //@ts-expect-error
            presentDevices.status = 'offline'
          }
          const filteredPositions = useFilter(
            presentDevices,
            this.$state.positions,
          )
          //@ts-expect-error
          this.$state.filteredPositions = filteredPositions
        } else {
          this.$state.history = {}
        }
      })
      console.log(this.positions)
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },
})
