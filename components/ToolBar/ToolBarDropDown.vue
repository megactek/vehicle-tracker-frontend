<template>
  <div class="parent-container">
    <div class="drop-down-container">
      <div class="drop-dwon-items">
        <div class="drop-down-item">
          <Icon icon="mdi:user" class="icon" />
          <div class="div">
            <span>Samsung</span>
            <span>online</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from '@iconify/vue'
export default {
  components: {
    Icon,
  },
}
</script>
<style scoped>
.parent-container {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  margin-top: 0.5rem;
}
.drop-down-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  background: #fff;
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
  background: #ddd;
  color: #333;
  border-radius: 50%;
  padding: 1.5rem;
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
