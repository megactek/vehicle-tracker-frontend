<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <div class="toolbar-container">
      <tool-bar-head @changePanel="changePanel($event)" />
    </div>
    <div class="map-container">
      <mapbox-map />
    </div>
  </div>
</template>
<script>
import MapboxMap from '../components/MapboxMap.vue'
import ToolBarHead from '../components/ToolBar/ToolBarHead.vue'

export default {
  components: { MapboxMap, ToolBarHead },
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'dashboard',
  data() {
    return {
      // currentPanel:"default"
    }
  },
  methods: {
    changePanel(panel) {
      this.$router.push({ path: `${panel}` })
    },
  },
  mounted() {},
}
</script>
<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.map-container {
  width: 100%;
  height: 100%;
}

.toolbar-container {
  padding: 1rem 2rem;
  height: 50px;
  z-index: 1;
}
</style>
