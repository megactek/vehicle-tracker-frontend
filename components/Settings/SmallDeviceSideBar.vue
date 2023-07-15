<template>
  <div
    :class="
      isShowSideSmallBar
        ? 'small-sidebar-container'
        : 'small-sidebar-container hide-sidebar-container'
    "
  >
    <div class="head-wrap">
      <span class="settings-left-icon">
        <Icon icon="mingcute:arrow-left-fill" @click="backToDashboard" />
      </span>
    </div>
    <div class="small-sidebar-items roboto">
      <div
        class="sidebar-item"
        @click="selected('account')"
        :class="selectedItem === 'account' ? 'selected-item' : ''"
      >
        <span class="sidebar-icon">
          <Icon icon="mdi:user" />
        </span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'devices' ? 'selected-item' : ''"
        @click="selected('devices')"
      >
        <span class="sidebar-icon">
          <Icon icon="bi:phone-fill" />
        </span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'add-device' ? 'selected-item' : ''"
        @click="selected('add-device')"
      >
        <span class="sidebar-icon">
          <Icon icon="gridicons:add" />
        </span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'groups' ? 'selected-item' : ''"
        @click="selected('groups')"
      >
        <span class="sidebar-icon">
          <Icon icon="ic:round-folder" />
        </span>
      </div>

      <div
        class="sidebar-item"
        :class="selectedItem === 'add-group' ? 'selected-item' : ''"
        @click="selected('add-group')"
      >
        <span class="sidebar-icon">
          <Icon icon="material-symbols:open-jam" />
        </span>
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
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { userData } from '~/store/userData'
export default {
  props: ['isShowSideSmallBar'],
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
.small-sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 10%;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
}

.head-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.settings-left-icon {
  cursor: pointer;
  color: #222;
  font-size: 1.3rem;
  font-weight: 300;
}

.small-sidebar-items {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.5s ease-in;
}

.sidebar-icon {
  font-size: 1.5rem;
  color: #888;
}
.selected-item {
  background: #eeeded !important;
}

.hide-sidebar-container {
  display: none;
}
@media (min-width: 900px) {
  .small-sidebar-container {
    display: none;
  }
}

@media (max-width: 550px) {
  .small-sidebar-container {
    width: 50vw;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #222;
  }
}
</style>
