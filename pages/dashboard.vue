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
        :positions="positions"
        :devices="devices"
        :filteredPositions="filteredPositions"
        @selectDevice="selectDevice($event)"
      />
    </div>
    <div class="map-container">
      <mapbox-map
        :positions="positions"
        :devices="devices"
        :selectedId="selectedDeviceId"
        :filteredPositions="filteredPositions"
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

const socketRef = useState()

export default {
  components: { MapboxMap, ToolBarHead, ToolBarDropDown },
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'dashboard',
  data() {
    return {
      showDropDown: false,
      authCred: userData().credentials,
      authenticated: !!userData().user,
      positions: sessionStore().positions,
      devices: deviceStore().items,
      selectedDeviceId: deviceStore().selectedId,
      filteredPositions: [],
    }
  },
  methods: {
    selectDevice(id) {
      deviceStore().selectedId = id
    },
    changePanel(panel) {
      this.$router.push({ path: `${panel}` })
    },
    toggleDropDown() {
      this.showDropDown = !this.showDropDown
    },
    connectSocket() {
      const host = 'ws://localhost:8082/api/socket'
      const socket = new WebSocket(host)
      socketRef.current = socket

      socket.onopen = () => {
        sessionStore().updateSocket(true)
        console.log('Websocket Server Connected!!')
      }

      socket.onclose = async (event) => {
        sessionStore().updateSocket(false)
        if (event.code !== 4000) {
          try {
            const deviceResponse = await fetch(
              'http://localhost:8082/api/devices',
              {
                headers: { Authorization: this.authCred },
              },
            )
            if (deviceResponse.ok) {
              deviceStore().update(await deviceResponse.json())
            }
            const positionResponse = await fetch(
              'http://localhost:8082/api/positions',
              {
                headers: { Authorization: this.authCred },
              },
            )
            if (positionResponse.ok) {
              sessionStore().updatePositions(await positionResponse.json())
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
        if (data.devices) {
          deviceStore().update(data.devices)
        }
        if (data.positions) {
          sessionStore().updatePositions(data.positions)
        }

        if (data.events) {
          // add to events store in the future when feature is added
        }
      }
    },
  },
  mounted() {
    const devices = deviceStore().items
    const sessions = sessionStore().positions
    const socket = sessionStore().socket

    this.connectSocket()
    this.filteredPositions = useFilter()
    console.log(this.authenticated, devices, sessions, socket)
  },
  watch: {
    async authenticated() {
      if (this.authenticated) {
        const response = await fetch('http://localhost:8082/api/devices', {
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
  height: 100vh;
  z-index: 1;
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
