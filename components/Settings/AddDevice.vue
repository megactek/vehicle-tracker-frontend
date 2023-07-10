<template>
  <div class="add-device-container">
    <form @submit.prevent="addNewDevice">
      <div class="sec first-flex">
        <div class="header">
          <span :style="isBtnAllowed ? 'color:green' : 'color:red'"> * </span>
        </div>
        <div class="el">
          <input
            type="text"
            placeholder="Name"
            v-model="defaultDevice.name"
            id="name"
            @mouseenter="doesFormHaveValues"
          />
        </div>
        <div class="el">
          <input
            type="text"
            placeholder="Identifier"
            id="uniqueId"
            v-model="defaultDevice.uniqueId"
            @mouseenter="doesFormHaveValues"
          />
        </div>
        <div class="txt-hint">
          <p>
            Input Unique ID generated on the client application. It has to match
            the identifier device reports to the server.
          </p>
        </div>
      </div>

      <div class="sec sec-flex">
        <div class="header">
          <span @click="toggleDropDown">Optional</span>
          <Icon icon="mingcute:arrow-left-fill" @click="toggleDropDown" />
        </div>
        <div v-show="dropDownOn">
          <div class="el">
            <select name="groups" id="groups">
              <option
                v-for="group in groups"
                :key="group.id"
                value="{{group.name}}"
                id="{{group.id}}"
              >
                {{ group.name }}
              </option>
            </select>
          </div>
          <div class="el">
            <input type="text" placeholder="Model" />
          </div>
        </div>
      </div>
      <div class="el-btn">
        <button
          :class="isBtnAllowed ? 'btn-allowed' : 'btn-not-allowed'"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
import { Icon } from '@iconify/vue'
export default {
  data() {
    return {
      defaultDevice: userData().devices[userData().devices.length - 1],
      isBtnAllowed: false,
      name: '',
      uniqueId: '',
      groups: userData().groups,
      dropDownOn: false,
    }
  },
  components: {
    Icon,
  },
  methods: {
    toggleDropDown() {
      this.dropDownOn = !this.dropDownOn
    },
    doesFormHaveValues() {
      if (this.name.length !== 0 && this.uniqueId.length !== 0) {
        this.isBtnAllowed = true
      }
    },
  },
  mounted() {
    this.name = document.getElementById('name').value
    this.uniqueId = document.getElementById('uniqueId').value
  },
}
</script>
<style scoped>
.add-device-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  background: #fff;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
  gap: 1rem;
}

.sec {
  padding: 1rem;
}

.flex-start .header {
  padding: 0.5rem 0;
}

.flex-start .header span {
  font-size: 1rem;
  font-weight: 500;
  color: #444;
}

.sec-flex .header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.2rem;
  cursor: pointer;
}

.first-flex {
  border: 1px solid #eeed;
}

.sec-flex {
  border: 1px solid #eeed;
  padding: 0.1rem 1rem;
}

.el {
  padding-bottom: 1rem;
}

.el input,
.el select {
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  padding-left: 10px;
  border-radius: 5px;
  background: transparent;
  color: #333;
}
.el select {
  cursor: pointer;
}

.el input:focus {
  outline: none;
}

.txt-hint p {
  font-size: 0.7rem;
  color: #999;
}

.el-btn {
  display: flex;
  flex-direction: column;
  align-content: center center;
  width: 100%;
}

.btn-not-allowed {
  width: 100%;
  font-weight: 700;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  color: #333;
  padding: 0.8rem;
  cursor: not-allowed;
}

.btn-allowed {
  cursor: pointer !important;
  background: var(--color-bg-primary) !important;
  padding: 0.8rem;
  color: #fff;
  border: 1px solid var(--color-g-primary);
  border-radius: 5px;
  width: 100%;
  font-weight: 700;
}
</style>
