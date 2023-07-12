<template>
  <div class="sidebar-container">
    <div class="head-wrap">
      <span class="settings-left-icon">
        <Icon icon="mingcute:arrow-left-fill" @click="backToDashboard" />
      </span>
      <span class="head-wrap-text">Settings</span>
    </div>
    <div class="sidebar-items roboto">
      <div
        class="sidebar-item"
        @click="selected('account')"
        :class="selectedItem === 'account' ? 'selected-item' : ''"
      >
        <span class="sidebar-icon">
          <Icon icon="mdi:user" />
        </span>
        <span class="sidebar-span-text">Account</span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'devices' ? 'selected-item' : ''"
        @click="selected('devices')"
      >
        <span class="sidebar-icon">
          <Icon icon="bi:phone-fill" />
        </span>
        <span class="sidebar-span-text">Devices</span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'add-device' ? 'selected-item' : ''"
        @click="selected('add-device')"
      >
        <span class="sidebar-icon">
          <Icon icon="gridicons:add" />
        </span>
        <span class="sidebar-span-text">Add Device</span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'groups' ? 'selected-item' : ''"
        @click="selected('groups')"
      >
        <span class="sidebar-icon">
          <Icon icon="ic:round-folder" />
        </span>
        <span class="sidebar-span-text">Groups</span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'add-group' ? 'selected-item' : ''"
        @click="selected('add-group')"
      >
        <span class="sidebar-icon">
          <Icon icon="material-symbols:open-jam" />
        </span>
        <span class="sidebar-span-text">Add Group</span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'users' ? 'selected-item' : ''"
        @click="selected('users')"
        v-show="user.administrator"
      >
        <span class="sidebar-icon">
          <Icon icon="mdi:users" />
        </span>
        <span class="sidebar-span-text">Users</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { userData } from '~/store/userData'
export default {
  data() {
    return {
      selectedItem: 'devices',
      user: userData().user,
    }
  },
  components: {
    Icon,
  },
  methods: {
    selected(item) {
      this.selectedItem = item
      this.$emit('changeBody', item)
    },
    backToDashboard() {
      this.$router.push('/dashboard')
    },
  },
}
</script>
<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 25%;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
}

.head-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  align-items: center;
  padding: 1rem 1.5rem;
  gap: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.settings-left-icon {
  cursor: pointer;
  color: #222;
  font-size: 1.3rem;
  font-weight: 300;
}

.head-wrap-text {
  font-size: 1.2rem;
  color: #222;
  font-weight: 600;
}

.sidebar-items {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.5s ease-in;
}

.sidebar-icon {
  font-size: 1.5rem;
  color: #888;
}
.sidebar-span-text {
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif !important;
}
.selected-item {
  background: #eeeded !important;
}

@media (max-width: 1000px) {
  .sidebar-container {
    width: 300px;
  }
}
</style>
