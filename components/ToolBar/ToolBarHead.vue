<template>
  <!-- bx:map -->
  <div class="container">
    <div class="tools">
      <div class="tool tool-pri">
        <Icon
          icon="mdi:hamburger-menu"
          v-show="currentMenu === 'menu'"
          @click="setCurrentMenuToMap"
        />
        <Icon
          icon="material-symbols:map"
          v-show="currentMenu === 'map'"
          @click="setCurrentMenuToMenu"
        />
      </div>

      <div class="tool">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Sevices"
          @focus="setFocus"
          @mouseleave="reverseFocus"
          :class="isFocused ? 'search-focus' : ''"
          v-model="searchDeviceParam"
        />
      </div>

      <div class="tool tool-pri">
        <Icon icon="clarity:plus-line" @click="displayPanel" />
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from '@iconify/vue'
export default {
  data() {
    return {
      currentMenu: 'map',
      searchDeviceParam: '',
      isFocused: false,
    }
  },
  components: {
    Icon,
  },
  methods: {
    setFocus() {
      this.isFocused = true
    },
    reverseFocus() {
      this.isFocused = false
    },
    setCurrentMenuToMap() {
      this.currentMenu = 'map'
    },
    setCurrentMenuToMenu() {
      this.currentMenu = 'menu'
    },
    displayPanel() {
      this.$emit('changePanel', 'settings')
    },
  },
}
</script>
<style scoped>
.container {
  padding: 1rem 2rem;
  display: flex;
  box-shadow: 1px 2px 4px #888;
  width: 400px;
  height: 50px;
  background-color: transparent;
}
.tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tool-pri {
  cursor: pointer;
  font-size: 1.3rem;
}

#search {
  border: 1px solid #666;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  color: #444;
}

#search:hover {
  border: 1px solid #111;
}

#search:focus {
  outline: none;
}

.search-focus {
  outline: none !important;
  border: 2px solid var(--color-bg-primary) !important;
}
</style>
