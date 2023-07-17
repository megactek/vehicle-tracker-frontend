<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <div class="toolbar-container">
      <tool-bar-head
        @changePanel="changePanel($event)"
        @showDropDown="toggleDropDown"
      />
      <tool-bar-drop-down
        v-show="showDropDown"
        :showDropDown="showDropDown"
        :positions="positions"
        :devices="devices"
        @selectDevice="selectDevice($event)"
        @changePanel="changePanel($event)"
      />
    </div>
    <div class="map-container">
      <mapbox-map
        :positions="positions"
        :devices="devices"
        :selectedId="selectedDeviceId"
      />
    </div>
  </div>
</template>
<script>
import MapboxMap from '../components/MapboxMap.vue'
import ToolBarHead from '../components/ToolBar/ToolBarHead.vue'
import ToolBarDropDown from '../components/ToolBar/ToolBarDropDown.vue'
import { userData } from '~/store/userData'
import { deviceStore } from '~/store/device'
import { sessionStore } from '~/store/sessions'
import useFilter from '~/utils/useFilter'
const runtimeConfig = useRuntimeConfig()

const socketRef = useState()

export default {
  components: { MapboxMap, ToolBarHead, ToolBarDropDown },
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'dashboard',
  data() {
    return {
      showDropDown: true,
      authCred: userData().credentials,
      authenticated: !!userData().user,
      positions: sessionStore().positions,
      devices: deviceStore().items,
      selectedDeviceId: deviceStore().selectedId,
      api: runtimeConfig.public.api,
    }
  },
  methods: {
    async getDevices() {
      try {
        const res = await fetch(`${this.api}/devices`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        if (res.ok) {
          const returnData = await res.json()
          this.devices = returnData
          userData().logDevices(returnValue)
        } else {
          this.error = true
          if (res.status === 401) {
            this.$router.push('/login')
          } else {
            this.errorMsg = 'cannot get devices'
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 3000)
          }
        }
      } catch (e) {
        this.errorMsg = e
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
    async getPositions() {
      try {
        const res = await fetch(`${this.api}/positions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        if (res.ok) {
          const returnData = await res.json()
          sessionStore().updatePositions(returnData)
        } else {
          this.error = true
          if (res.status === 401) {
            this.$router.push('/login')
          } else {
            this.errorMsg = 'cannot get positions'
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 3000)
          }
        }
      } catch (e) {
        this.errorMsg = e
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
    selectDevice(id) {
      deviceStore().selectedId = id
    },
    changePanel(panel) {
      this.$router.push({ path: `${panel}` })
    },
    toggleDropDown() {
      this.showDropDown = !this.showDropDown
    },
    getSessionId() {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith('JSESSIONID' + '=')) {
          return cookie.substring('JSESSIONID'.length + 1)
        }
      }
      return null
    },
    connectSocket() {
      const host = runtimeConfig.public.wsApi
      const sessionId = this.getSessionId()
      const session = `JSESSIONID=${sessionId}`
      const socket = new WebSocket(`ws://${window.location.host}/api/socket`) //?session=${encodeURIComponent(session)}
      socketRef.current = socket

      socket.onopen = () => {
        socket.setRequestHeader('Cookie', session)
        sessionStore().updateSocket(true)
        console.log('Websocket Server Connected!!')
        socket.send(
          JSON.stringify({ type: 'session', value: this.getSessionId() }),
        )
      }

      socket.onclose = async (event) => {
        sessionStore().updateSocket(false)
        if (event.code !== 4000) {
          try {
            const deviceResponse = await fetch(`${this.api}/devices`, {
              headers: { Authorization: this.authCred },
            })
            if (deviceResponse.ok) {
              deviceStore().update(await deviceResponse.json())
            }
            const positionResponse = await fetch(`${this.api}/positions`, {
              headers: { Authorization: this.authCred },
            })
            if (positionResponse.ok) {
              let presentDevices = deviceStore().items
              if (!presentDevices) {
                presentDevices = userData().devices
              }
              const filteredPositions = useFilter(
                presentDevices,
                await positionResponse.json(),
              )
              sessionStore().updatePositions(await positionResponse.json())
              sessionStore().updateFilteredPositions(filteredPositions)
            }
            if (
              deviceResponse.status === 401 ||
              positionResponse.status === 401
            ) {
              this.$router.push('/login')
            }
          } catch (e) {}
          setTimeout(() => this.connectSocket(), 60000)
        }
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.getDevices()
        this.getPositions()
        if (data.devices && data.positions) {
          const filteredPositions = useFilter(data.devices, data.positions)
          sessionStore().updateFilteredPositions(filteredPositions)
        } else {
          if (data.devices) {
            deviceStore().update(data.devices)
            const currentPositions = sessionStore().positions
            const filteredPositions = useFilter(
              deviceStore().items,
              currentPositions,
            )
            sessionStore().updateFilteredPositions(filteredPositions)
          }
          if (data.positions) {
            sessionStore().updatePositions(data.positions)
            if (!data.devices) {
              let presentDevices = deviceStore().items
              if (!presentDevices) {
                presentDevices = userData().devices
              }
              const filteredPositions = useFilter(
                presentDevices,
                data.positions,
              )
              sessionStore().updateFilteredPositions(filteredPositions)
            }
          }

          if (data.events) {
            // add to events store in the future when feature is added
          }
        }
      }
    },
  },
  mounted() {
    this.connectSocket()
  },
  watch: {
    async authenticated() {
      if (this.authenticated) {
        const response = await fetch(`${this.api}/devices`, {
          headers: { Authorization: this.authCred },
        })
        if (response.ok) {
          deviceStore().refresh(await response.json())
        } else {
          // display error
          console.log(await response.text())
        }
        this.connectSocket()
        return () => {
          const socket = socketRef.current
          if (socket) {
            socket.close(4000)
          }
        }
      }
      return null
    },
  },
}
</script>
<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.map-container {
  width: 100%;
  height: 100%;
}

.toolbar-container {
  padding: 1rem;
  height: 96vh;
  left: 0;
  top: 0;
  position: absolute;
}

@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
    gap: 1rem;
    overflow-y: hidden;
    max-height: 100vh;
  }

  .toolbar-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}
</style>
