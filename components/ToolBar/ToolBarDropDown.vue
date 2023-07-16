<script setup>
import { Icon } from '@iconify/vue'
import { userData } from '~/store/userData'
import { sessionStore } from '~/store/sessions'
import { deviceStore } from '~/store/device'

const selectedId = useState()

const emit = defineEmits(['selectDevice'])

const selectDevice = (id) => {
  selectedId.value = id
  deviceStore().selectId(id)
}

const logout = () => {
  userData().logoutUser()
  navigateTo('/login')
}

onMounted(() => {
  deviceStore().selectId(null)
})
</script>

<template>
  <div class="parent-container">
    <div class="drop-down-container">
      <div class="drop-dwon-items">
        <div
          class="drop-down-item"
          v-for="device in sessionStore().filteredPositions"
          :key="device.id"
          @click="selectDevice(device.deviceId)"
          :style="
            device.deviceId === selectedId
              ? 'background:#e0e0e0;width:100%; '
              : ''
          "
        >
          <Icon icon="bxs:map" class="icon" />
          <div class="div">
            <span>{{ device.name || device[0].name }}</span>
            <span
              :style="device.status === 'online' ? 'color:green' : 'color:grey'"
              >{{ device.status === 'online' ? 'online' : 'offline' }}</span
            >
          </div>
        </div>
      </div>
      <div class="fixed-items">
        <div class="item">
          <Icon class="map-icon" icon="material-symbols:map" />
        </div>
        <div class="item">
          <Icon
            class="fixed-icon"
            icon="mdi:gear"
            @click="$emit('changePanel', 'settings')"
          />
        </div>
        <div class="item">
          <Icon
            class="logout-icon"
            icon="ant-design:logout-outlined"
            @click="logout"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.parent-container {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 90%;
  margin-top: 0.1rem;
  border: 1px solid #e0e0e0;
}
.drop-down-container {
  display: grid;
  grid-template-rows: 90% 10%;
  padding: 0.5rem 0;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  width: 350px;
  height: 100%;
}

.drop-down-items {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.fixed-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -4px 6px -4px #ccc;
  padding: 1rem 1rem 0 1rem;
}

.item {
  padding: 0.2rem 0.5rem;
  transition: all 0.4s ease-out;
}

.item:hover {
  background: #f4f4f4;
  border-radius: 20px;
}

.drop-down-item {
  display: grid;
  grid-template-columns: 10% 70%;
  align-items: center;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
}

.icon {
  font-size: 2rem;
  color: #888;
}

.fixed-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: #111;
}

.map-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-bg-primary);
}

.logout-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: red;
}

.drop-down-item .div {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding-left: 0.5rem;
}

@media (max-width: 900px) {
  .parent-container {
    width: 100%;
  }

  .drop-down-container {
    width: 100%;
    height: 100%;
  }

  .drop-down-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
