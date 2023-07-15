<template>
  <div class="top-bar-container">
    <div class="header">
      <Icon
        icon="material-symbols:menu"
        class="icon"
        @click="showSmallDeviceSidebar"
      />
      <div class="span roboto">
        <strong> Settings / </strong>
        <span> {{ currentTab }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from '@iconify/vue'
export default {
  props: ['currentTab'],
  components: {
    Icon,
  },
  methods: {
    showSmallDeviceSidebar() {
      this.$emit('showSmallDeviceSidebar', true)
    },
  },
}
</script>
<style scoped>
.top-bar-container {
  width: 100vw;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.4rem;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
}

.header .span {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  gap: 0.5rem;
}

.icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.header span {
  color: #000;
}
</style>
