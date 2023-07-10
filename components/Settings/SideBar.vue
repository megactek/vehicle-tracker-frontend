<template>
  <div class="sidebar-container">
    <div class="head-wrap">
      <span class="settings-left-icon">
        <Icon icon="mingcute:arrow-left-fill" />
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
        <span>Account</span>
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
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
  data() {
    return {
      selectedItem: 'devices',
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
  padding: 1rem 2rem;
  gap: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.settings-left-icon {
  cursor: pointer;
  color: #111;
  font-size: 1.3rem;
  font-weight: 800;
}

.head-wrap-text {
  font-size: 1.3rem;
  color: #333;
  font-weight: 700;
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
  font-size: 1rem;
}
.selected-item {
  background: #e0e0e0;
}
</style>
