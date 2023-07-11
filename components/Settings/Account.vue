<template>
  <div class="account-container">
    <form @submit.prevent="updateAccount">
      <div class="first-flex">
        <div class="el">
          <label for="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="user.name"
          />
        </div>
        <div class="el">
          <label for="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="user.email"
            readonly
          />
        </div>
        <div class="el">
          <label for="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="inputPassword"
          />
        </div>
        <div class="error-container" v-if="error">
          <p class="error-msg">{{ errorMsg }}</p>
        </div>
      </div>
      <div class="second-flex">
        <div class="el-btn">
          <button class="el-btn-cancel" type="button" @click="cancel">
            Cancel
          </button>
          <button class="el-btn-procceed" type="submit">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { userData } from '~/store/userData'

export default {
  inject: ['user'],
  data() {
    return {
      inputPassword: '',
      error: false,
      errorMsg: '',
    }
  },
  methods: {
    cancel() {
      this.$emit('changeBody', 'users')
    },
    async updateAccount() {
      const credentials = btoa(this.user.email + ':' + this.inputPassword)
      const authorizationHeader = `Basic ${credentials}`
      if (
        this.user.name.length !== 0 &&
        this.user.email.length !== 0 &&
        this.inputPassword.length !== 0
      ) {
        try {
          const res = await fetch(
            `http://localhost:8082/api/users/${this.user.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: authorizationHeader,
              },
              body: JSON.stringify(this.user),
            },
          )
          if (res.ok) {
            const returnData = await res.json()
            userData().logUser(returnData, true)
            this.$emit('changeBody', 'devices')
          } else {
            this.error = true
            if (res.status === 401) {
              this.errorMsg = 'Password incorrect'
              setTimeout(() => {
                this.error = false
                this.errorMsg = ''
              }, 3000)
            } else {
              this.errorMsg = 'Cannot update profile'
              setTimeout(() => {
                this.error = false
                this.errorMsg = ''
              }, 3000)
            }
          }
        } catch (e) {
          this.error = true
          this.errorMsg = e.message
        }
      } else {
        this.error = true
        this.errorMsg = 'Name cannot be empty'
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
  },
}
</script>
<style scoped>
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
}

form {
  margin-top: 3rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.first-flex {
  padding: 2rem 1rem;
  border: 1px solid #eeeded;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.el {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.el label {
  font-weight: 500;
  color: #555;
}

.el input {
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 10px;
  color: #666;
}

.el input:focus {
  outline: none;
}

.el-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.el-btn button {
  padding: 0.5rem;
  width: 120px;
  border: 1px solid #eeeded;
  border-radius: 5px;
  background: #eeeded;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.el-btn button:focus {
  outline: none;
}

.el-btn-cancel {
  color: var(--color-bg-primary);
}

.el-btn-cancel:hover {
  opacity: 0.8;
}

.el-btn-procceed {
  color: #fff;
  background: var(--color-bg-primary) !important;
  border: 1px var(--color-bg-primary) !important;
}

.el-btn-procceed:hover {
  opacity: 0.8;
}
.search-focus {
  outline: none !important;
  border: 2px solid var(--color-bg-primary) !important;
}
</style>
