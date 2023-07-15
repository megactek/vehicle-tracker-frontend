<!-- eslint-disable no-console -->
<template>
  <div class="singup-container">
    <alert-app
      v-show="alert"
      :msg="msg"
      :success-alert="successAlert"
      :error-alert="errorAlert"
    />
    <loading-app v-show="loading" />
    <!-- <div class="left-cover">
      <nuxt-logo class="app-logo" />
    </div> -->
    <div class="right-cover">
      <div class="right-cover-first-div">
        <div class="header">
          <h2>Login</h2>
          <p class="login-link">
            New to Traka?
            <nuxt-link to="/register" class="link-color">Register</nuxt-link>
          </p>
        </div>
        <form @submit.prevent="onLogin">
          <div class="input-field">
            <input
              v-model="inputEmail"
              type="email"
              name="email"
              placeholder="Email*"
              required
              @keyup="onKeyUp"
              @mousemove="onKeyUp"
            />
          </div>
          <div class="input-field">
            <input
              v-model="inputPassword"
              placeholder="Password*"
              type="password"
              name="password"
              required
              @keyup="onKeyUp"
              @mousemove="onKeyUp"
            />
          </div>
          <button
            id="btn-submit"
            type="submit"
            :class="isAllowed ? 'btn-allowed' : 'btn-not-allowed'"
          >
            Submit
          </button>
          <!-- <p :class="successAlert ? 'success-msg' : 'error-msg'">{{ msg }}</p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertApp from '../components/AlertApp.vue'
import LoadingApp from '../components/LoadingApp.vue'
import NuxtLogo from '../components/NuxtLogo.vue'
import { userData } from '~/store/userData'
import moment from 'moment'

export default {
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'login',
  components: { LoadingApp, AlertApp, NuxtLogo },
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      msg: '',
      loading: false,
      alert: false,
      successAlert: false,
      errorAlert: false,
      isAllowed: false,
    }
  },

  methods: {
    async generateLoginToken() {
      let token = ''
      try {
        const expiration = moment().add(1, 'month').toISOString()
        const response = await fetch(
          'http://localhost:8082/api/session/token',
          {
            method: 'POST',
            body: new URLSearchParams(`expiration=${expiration}`),
          },
        )
        if (response.ok) {
          token = await response.text()
          console.log(token)
        }
      } catch (e) {}
    },
    async getDevices() {
      const credentials = btoa(this.inputEmail + ':' + this.inputPassword)
      const authorizationHeader = `Basic ${credentials}`
      const res = await fetch(`http://localhost:8082/api/devices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationHeader,
        },
      })
      const returnValue = await res.json()
      console.log(returnValue)
      userData().logDevices(returnValue)
      userData().logCredential(authorizationHeader)
    },
    async onLogin() {
      const formData = new URLSearchParams()
      formData.append('email', this.inputEmail)
      formData.append('password', this.inputPassword)
      const res = await fetch('http://localhost:8082/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      })
      const returnValue = await res.json()
      // this.generateLoginToken()
      if (res.ok) {
        this.getDevices()
        this.msg = 'Login Successful'
        this.successAlert = true
        this.loading = true
        this.alert = true
        setTimeout(() => {
          this.alert = false
          this.loading = false
          this.successAlert = false
          userData().logUser(returnValue, true)
          this.$router.push({ path: '/dashboard' })
        }, 3000)
      } else {
        this.msg = 'Login Failed'
        this.loading = true
        this.alert = true
        this.errorAlert = true
        setTimeout(() => {
          this.alert = false
          this.errorAlert = false
          this.loading = false
        }, 3000)
      }
    },
    onKeyUp() {
      if (this.inputPassword.length > 1 && this.inputEmail) {
        this.isAllowed = true
      }
    },
  },
}
</script>
<style scoped>
.singup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.right-cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-cover-first-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;
}

.right-cover-first-div h2 {
  font-size: 1.3rem;
  color: black;
}

.input-field {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  width: 300px;
}

.input-field input {
  height: 40px;
  padding: 0.5rem;
  border: 1px solid #999;
  border-radius: 5px;
  background: #f4f4f4;
  color: #333;
}

input:focus {
  outline: none;
}

button {
  width: 300px;
  border-radius: 5px;
  padding: 12px 0;
  color: #fff;
}

.btn-not-allowed {
  border: 1px solid #777;
  background: #777;
  cursor: not-allowed;
}

.error-msg {
  color: red;
  padding-top: 10px;
}

.success-msg {
  color: green;
  padding-top: 10px;
}

.btn-allowed {
  border: 1px solid var(--color-bg-primary);
  background: var(--color-bg-primary);
  cursor: pointer;
}

@media (max-width: 1200px) {
  singup-container {
    height: 100vh;
    width: 100vw;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .left-cover {
    width: 0;
    display: none;
  }

  .right-cover {
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    max-width: 1200px;
  }
  .right-cover-first-div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
