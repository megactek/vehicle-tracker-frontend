<template>
  <!-- bx:map -->
  <div class="tool-container">
    <div class="tools">
      <div class="tool tool-pri pri-first">
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
      <!-- <div class="tool tool-pri">
        <Icon icon="material-symbols:route-outline" />
      </div> -->
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
    }
  },
  components: {
    Icon,
  },
  methods: {
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
.tool-container {
  padding: 1rem;
  display: flex;
  box-shadow: 1px 2px 3px #999;
  width: 350px;
  height: 60px;
  background-color: #fff;
  flex-direction: column;
  z-index: 1;
  position: absolute;
}
.tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.tool-pri {
  cursor: pointer;
  font-size: 1.3rem;
  color: #111;
}

.tool {
  padding: 0.2rem 0.5rem;
  transition: all 0.4s ease-out;
}

.tool:hover {
  background: #f4f4f4;
  border-radius: 20px;
}

.pri-first {
  color: var(--color-bg-primary);
}

.tool-pri-last {
  font-weight: 900;
  font-size: 1.3rem;
}

@media (max-width: 900px) {
  .tool-container {
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
