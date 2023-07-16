<template>
  <div class="add-group-container">
    <form @submit.prevent="addNewGroup">
      <div class="cover">
        <div class="header">
          <span :style="isBtnActive ? 'color:green' : 'color:red'">*</span>
        </div>
        <input
          type="text"
          id="name"
          placeholder="Name"
          v-model="inputName"
          @keyup="validateInput"
        />
      </div>
      <div class="error-container" v-if="error">
        <p class="error-msg">{{ errorMsg }}</p>
      </div>
      <button
        type="submit"
        :class="isBtnActive ? 'active-btn' : 'inactive-btn'"
      >
        Save
      </button>
    </form>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
const runtimeConfig = useRuntimeConfig()

export default {
  data() {
    return {
      inputName: '',
      isBtnActive: false,
      authCred: userData().credentials,
      error: false,
      errorMsg: '',
      api: runtimeConfig.public.api,
    }
  },
  methods: {
    validateInput() {
      if (this.inputName.length !== 0) {
        this.isBtnActive = true
      }
    },
    async addNewGroup() {
      if (this.inputName.length === 0) {
        this.error = true
        this.errorMsg = 'name is a required field'
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      } else {
        try {
          const res = await fetch(`${this.api}/groups`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.authCred,
            },
            body: JSON.stringify({
              name: this.inputName,
              attributes: {},
            }),
          })
          if (res.ok) {
            this.$emit('changeBody', 'groups')
          } else {
            this.error = true
            this.errorMsg = 'cannot create group'
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 3000)
          }
        } catch (e) {
          this.error = true
          this.errorMsg = e.message
          setTimeout(() => {
            this.error = false
            this.errorMsg = ''
          }, 3000)
        }
      }
    },
  },
}
</script>
<style scoped>
.add-group-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cover {
  border: 1px solid #eeed;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

button {
  transition: all 0.4s ease-out;
}
input:focus {
  outline: none;
}

.inactive-btn {
  padding: 10px 15px;
  color: #333;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: not-allowed;
}

.active-btn {
  padding: 10px 15px;
  color: #f4f4f4;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-bg-primary);
  border-radius: 5px;
  cursor: pointer;
}

input {
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 10px;
}
</style>
