// import { defineStore } from 'pinia'

// export const useWebSocketStore = defineStore('websokcet', {
//   state: () => ({
//     websocket: null,
//     receivedData: [],
//     positions: {},
//     devices: {},
//   }),

//   getters: {
//     getReceivedData: (state) => state.receivedData,
//     getPositions: (state) => state.positions,
//     getDevices: (state) => state.devices,
//   },

//   actions: {
//     connect() {
//       const ws = new WebSocket('ws://localhost:8082/api/socket')

//       ws.onopen = () => {
//         console.log('Websokcet connection established')
//         // this.$patch({ websocket: ws })
//         // @ts-expect-error
//         this.websocket = ws
//       }

//       ws.onmessage = (event) => {
//         console.log('Received Message:', event.data)
//         const data = JSON.parse(event.data);
//         if (data.positions) {
//           //@ts-expect-error
//           this.positions.push(data)
//         } else if (data.devices) {
//           //@ts-expect-error
//           this.devices.push(data)
//         }
//       }

//       ws.onclose = async (event) => {
//         console.log('WebSocket connection closed')
//         this.websocket = null
//         if(event.code !== 4000){
//           try {
//             const deviceResponse = await  fetch("http://localhost:8082/api/devices")
//             if(deviceResponse.ok){
//               // action.payload.forEach((item) => state.items[item.id] = item);
//              const devices = await deviceResponse.json()
//              //@ts-expect-error
//              devices.forEach((device: any) => this.$state.devices[device.id] = device)
//             }
//             const positionResponse = await fetch("http://localhost:8082/api/positions")
//             if(positionResponse.ok){
//               const positions = await positionResponse.json()

//               positions.forEach(())
//             }
//           } catch (error) {

//           }
//         }
//       }
//     },
//   },
// })

// export default defineNuxtPlugin((nuxtApp) => {
//   // nuxtApp.provide('injected', () => 'socketStore')
//   // return {
//   //   provide: {
//   //     injected: () => socketStore,
//   //   },
//   // }
//   nuxtApp.hook('page:finish', () => {
//     /* your code goes here */
//     useWebSocketStore().connect()
//   })
// })

export default defineNuxtPlugin((nuxtApp) => {})
