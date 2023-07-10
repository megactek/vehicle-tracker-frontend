<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <div class="toolbar-container">
      <tool-bar-head
        @changePanel="changePanel($event)"
        @showDropDown="toggleDropDown"
      />
      <tool-bar-drop-down v-show="showDropDown" />
    </div>
    <div class="map-container">
      <mapbox-map />
    </div>
  </div>
</template>
<script>
import MapboxMap from '../components/MapboxMap.vue'
import ToolBarHead from '../components/ToolBar/ToolBarHead.vue'
import ToolBarDropDown from '../components/ToolBar/ToolBarDropDown.vue'

export default {
  components: { MapboxMap, ToolBarHead, ToolBarDropDown },
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'dashboard',
  data() {
    return {
      // currentPanel:"default"
      showDropDown: false,
    }
  },
  methods: {
    changePanel(panel) {
      this.$router.push({ path: `${panel}` })
    },
    toggleDropDown() {
      this.showDropDown = !this.showDropDown
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
  padding: 1rem;
  height: 100vh;
  z-index: 1;
  left: 0;
  top: 0;
  position: absolute;
}

@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
    gap: 1rem;
    overflow-y: hidden;
    max-height: 100vh;
  }

  .toolbar-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
}
</style>
