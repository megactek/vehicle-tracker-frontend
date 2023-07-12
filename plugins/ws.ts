import { defineStore } from 'pinia'

export const useWebSocketStore = defineStore('websokcet', {
  state: () => ({
    websocket: null,
    receivedData: [],
    positions: [],
    devices: [],
  }),

  getters: {
    getReceivedData: (state) => state.receivedData,
    getPositions: (state) => state.positions,
    getDevices: (state) => state.devices,
  },

  actions: {
    connect() {
      const ws = new WebSocket('ws://localhost:8082/api/socket')

      ws.onopen = () => {
        console.log('Websokcet connection established')
        // this.$patch({ websocket: ws })
        // @ts-expect-error
        this.websocket = ws
      }

      ws.onmessage = (event) => {
        console.log('Received Message:', event.data)
        if (event.data.positions) {
          //@ts-expect-error
          this.positions.push(event.data)
        } else if (event.data.devices) {
          //@ts-expect-error
          this.devices.push(event.data)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket connection closed')
        this.websocket = null
      }
    },
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.provide('injected', () => 'socketStore')
  // return {
  //   provide: {
  //     injected: () => socketStore,
  //   },
  // }
  nuxtApp.hook('page:finish', () => {
    /* your code goes here */
    useWebSocketStore().connect()
  })
})
