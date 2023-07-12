<template>
  <div class="parent-container">
    <div class="drop-down-container">
      <div class="drop-dwon-items">
        <div
          class="drop-down-item"
          v-for="device in initialDevices"
          :key="device.id"
        >
          <Icon icon="bxs:map" class="icon" />
          <div class="div">
            <span>{{ device.name }}</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from '@iconify/vue'
import { userData } from '~/store/userData'
export default {
  components: {
    Icon,
  },
  props: ['positions', 'devices'],
  data() {
    return {
      initialDevices: userData().getDevices,
    }
  },
}
</script>
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
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  width: 350px;
  height: 100%;
}

.drop-down-items {
  display: flex;
  flex-direction: column;
}

.drop-down-item {
  display: grid;
  grid-template-columns: 20% 60%;
  align-items: center;
  padding: 0.5rem 1rem;
}

.icon {
  font-size: 2rem;
  color: #333;
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
