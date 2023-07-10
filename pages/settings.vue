<template>
  <div class="settings-container">
    <side-bar-vue @changeBody="changeBody($event)" />
    <div class="body-container">
      <device-vue v-show="bodyDisplay === 'devices'" />
      <account-vue v-show="bodyDisplay === 'account'" />
    </div>
  </div>
</template>
<script>
import SideBarVue from '~/components/Settings/SideBar.vue'
import DeviceVue from '~/components/Settings/Device.vue'
import AccountVue from '~/components/Settings/Account.vue'
import { userData } from '~/store/userData'

export default {
  components: {
    SideBarVue,
    DeviceVue,
    AccountVue,
  },
  data() {
    return {
      bodyDisplay: 'devices',
      user: {},
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
