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
          placeholder="Search Devices"
          @focus="setFocus"
          @mouseleave="reverseFocus"
          :class="isFocused ? 'search-focus' : ''"
          v-model="searchDeviceParam"
        />
      </div>

      <div class="tool tool-pri tool-pri-last">
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
      this.$emit('showDropDown')
    },
    setCurrentMenuToMenu() {
      this.currentMenu = 'menu'
      this.$emit('showDropDown')
    },
    displayPanel() {
      this.$emit('changePanel', 'settings')
    },
  },
}
</script>
<style scoped>
.container {
  padding: 1rem;
  display: flex;
  box-shadow: 1px 2px 4px #888;
  width: 350px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 60px;
  background-color: #fff;
}
.tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
}

.tool-pri {
  cursor: pointer;
  font-size: 1.3rem;
  color: #757474;
}

#search {
  border: 1px solid #ddd;
  height: 40px;
  background: #f4f4f4;
  border-radius: 5px;
  padding-left: 15px;
  color: #444;
  width: 95%;
}

#search:hover {
  border: 1px solid #777;
}

#search:focus {
  outline: none;
}

.search-focus {
  outline: none !important;
  border: 1px solid var(--color-bg-primary) !important;
}

.tool-pri-last {
  font-weight: 900;
  font-size: 1.5rem;
}

@media (max-width: 900px) {
  .container {
    width: 100%;
    height: 70px;
    padding: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  #search {
    width: 85vw;
  }

  .tool-pri {
    width: 5vw;
  }
  .tools {
    gap: 0.5rem;
  }

  @media (max-width: 550px) {
    #search {
      width: 80vw;
    }

    .tool-pri {
      width: 5vw;
    }
    .tools-pri-last {
      padding-right: 0.5rem;
    }
  }

  @media (max-width: 400px) {
    #search {
      width: 70vw;
    }

    .tool-pri {
      width: 8vw;
    }
    .tools {
      gap: 0.5rem;
    }
    .tools-pri-last {
      padding-right: 0;
    }
  }
}
</style>
