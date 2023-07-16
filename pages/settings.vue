<template>
  <alert-app
    v-show="alert"
    :msg="msg"
    :success-alert="successAlert"
    :error-alert="errorAlert"
  />
  <loading-app v-show="loading" />
  <div class="settings-container">
    <side-bar-vue @changeBody="changeBody($event)" v-show="screenSize > 900" />
    <small-device-side-bar
      @changeBody="changeBody($event)"
      v-show="screenSize <= 900"
      :isShowSideSmallBar="isShowSideSmallBar"
      @closeSmalDeviceSideBar="closeSmalDeviceSideBar($event)"
    />
    <div class="body-container">
      <small-device-top-bar
        :currentTab="bodyDisplay"
        v-show="screenSize < 551"
        @showSmallDeviceSidebar="showSmallDeviceSidebar($event)"
      />
      <device-vue
        v-show="bodyDisplay === 'devices'"
        :devices="devices"
        :bodyDisplay="bodyDisplay"
        @click="closeSmalDeviceSideBar"
      />
      <account-vue
        v-show="bodyDisplay === 'account'"
        @changeBody="changeBody($event)"
        @click="closeSmalDeviceSideBar"
      />

      <add-device-vue
        v-show="bodyDisplay === 'add-device'"
        @changeBody="changeBody($event)"
        @click="closeSmalDeviceSideBar"
      />

      <groups-vue
        v-show="bodyDisplay === 'groups'"
        @changeBody="changeBody($event)"
        :groups="groups"
        :getGroups="getGroups"
        :bodyDisplay="bodyDisplay"
        @click="closeSmalDeviceSideBar"
      />

      <add-group-vue
        v-show="bodyDisplay === 'add-group'"
        @changeBody="changeBody($event)"
        @click="closeSmalDeviceSideBar"
      />

      <users-vue
        v-show="bodyDisplay === 'users'"
        @changeBody="changeBody($event)"
        :users="users"
        @click="closeSmalDeviceSideBar"
      />

      <route-history-vue
        v-show="bodyDisplay === 'route-history'"
        @changeBody="changeBody($event)"
        :history="history"
        @click="closeSmalDeviceSideBar"
      />
    </div>
  </div>
</template>
<script>
import SideBarVue from '~/components/Settings/SideBar.vue'
import SmallDeviceSideBar from '~/components/Settings/SmallDeviceSideBar.vue'
import SmallDeviceTopBar from '~/components/Settings/SmallDeviceTopBar.vue'
import RouteHistoryVue from '~/components/Settings/RouteHistory.vue'
import DeviceVue from '~/components/Settings/Device.vue'
import AccountVue from '~/components/Settings/Account.vue'
import AddDeviceVue from '~/components/Settings/AddDevice.vue'
import GroupsVue from '~/components/Settings/Groups.vue'
import AddGroupVue from '~/components/Settings/AddGroup.vue'
import UsersVue from '~/components/Settings/Users.vue'
import AlertApp from '../components/AlertApp.vue'
import LoadingApp from '../components/LoadingApp.vue'
import { userData } from '~/store/userData'

export default {
  components: {
    SideBarVue,
    SmallDeviceSideBar,
    SmallDeviceTopBar,
    RouteHistoryVue,
    DeviceVue,
    AccountVue,
    AlertApp,
    LoadingApp,
    AddDeviceVue,
    GroupsVue,
    AddGroupVue,
    UsersVue,
  },
  data() {
    return {
      bodyDisplay: 'devices',
      user: {},
      groups: userData().groups,
      history: [],
      loading: false,
      alert: false,
      successAlert: false,
      errorAlert: false,
      authCred: userData().credentials,
      devices: [],
      users: [],
      screenSize: 0,
      isShowSideSmallBar: false,
    }
  },
  computed: {},
  methods: {
    closeSmalDeviceSideBar() {
      if (this.isShowSideSmallBar && this.screenSize < 551) {
        this.isShowSideSmallBar = false
      }
    },
    updateScreenSize() {
      this.screenSize = window.innerWidth
    },
    changeBody(component) {
      this.closeSmalDeviceSideBar()
      this.bodyDisplay = component
    },
    showSmallDeviceSidebar(value) {
      this.isShowSideSmallBar = value
    },
    async getUsers() {
      try {
        const res = await fetch(`http://localhost:8082/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        if (res.ok) {
          const returnValue = await res.json()
          this.users = returnValue
          userData().logUsers(returnValue)
        } else {
          this.error = true
          this.errorMsg = 'cannot get users'
          setTimeout(() => {
            this.error = false
            this.errorMsg = ''
          }, 3000)
        }
      } catch (e) {
        this.error = true
        this.errorMsg = e
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
    async getGroups() {
      try {
        const res = await fetch(`http://localhost:8082/api/groups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        const returnValue = await res.json()
        if (res.ok) {
          userData().logGroups(returnValue)
        } else {
          this.error = true
          this.errorMsg = 'cannot get groups'
          setTimeout(() => {
            this.error = false
            this.errorMsg = ''
          }, 3000)
        }
      } catch (e) {
        this.error = true
        this.errorMsg = e.message
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
    async getDevices() {
      try {
        const res = await fetch(`http://localhost:8082/api/devices`, {
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
  },
  mounted() {
    const data = userData().getUserData
    if (!data) {
      this.$router.push({ path: '/login' })
    } else {
      this.getDevices()
      this.getUsers()
      this.getGroups()
      this.user = data
    }
    // useNuxt.$socketStore
    this.updateScreenSize()
    window.addEventListener('resize', () => {
      this.updateScreenSize()
    })
  },
  beforeMount() {
    window.removeEventListener('resize', () => {
      this.updateScreenSize()
    })
  },
  provide() {
    return {
      user: computed(() => this.user),
    }
  },
  watch: {
    bodyDisplay(newVal, oldVal) {
      this.getDevices()
      this.getGroups()
      this.getUsers()
    },
  },
}
</script>
<style scoped>
.settings-container {
  display: flex;
  flex-direction: row;
}

.body-container {
  width: 75%;
}

@media (max-width: 900px) {
  .settings-container {
  }

  .body-container {
    width: 90%;
  }
}

@media (max-width: 550px) {
  .body-container {
    width: 100vw;
  }
}
</style>
