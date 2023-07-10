<template>
  <alert-app
    v-show="alert"
    :msg="msg"
    :success-alert="successAlert"
    :error-alert="errorAlert"
  />
  <loading-app v-show="loading" />
  <div class="settings-container">
    <side-bar-vue @changeBody="changeBody($event)" />
    <div class="body-container">
      <device-vue v-show="bodyDisplay === 'devices'" />
      <account-vue
        v-show="bodyDisplay === 'account'"
        @changeBody="changeBody($event)"
      />

      <add-device-vue
        v-show="bodyDisplay === 'add-device'"
        @changeBody="changeBody($event)"
      />

      <groups-vue
        v-show="bodyDisplay === 'groups'"
        @changeBody="changeBody($event)"
      />

      <add-group-vue
        v-show="bodyDisplay === 'add-group'"
        @changeBody="changeBody($event)"
      />

      <users-vue
        v-show="bodyDisplay === 'users'"
        @changeBody="changeBody($event)"
      />
    </div>
  </div>
</template>
<script>
import SideBarVue from '~/components/Settings/SideBar.vue'
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
      loading: false,
      alert: false,
      successAlert: false,
      errorAlert: false,
    }
  },
  methods: {
    changeBody(component) {
      this.bodyDisplay = component
    },
  },
  mounted() {
    const data = userData().getUserData
    if (!data) {
      this.$router.push({ path: '/login' })
    } else {
      this.user = data
    }
  },
  provide() {
    return {
      user: computed(() => this.user),
    }
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
</style>
