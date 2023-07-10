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
    <div class="left-cover">
      <nuxt-logo class="app-logo" />
    </div>
    <div class="right-cover">
      <div class="right-cover-first-div">
        <h2>Login</h2>
        <p class="login-link">
          New to Traka?
          <nuxt-link to="/register" class="link-color">Register</nuxt-link>
        </p>
        <form @submit.prevent="onLogin">
          <div class="input-field">
            <input
              v-model="inputEmail"
              type="email"
              name="email"
              placeholder="Email*"
              required
              @keypress="onKeyUp"
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
              @keypress="onKeyUp"
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
          <p :class="successAlert ? 'success-msg' : 'error-msg'">{{ msg }}</p>
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
      console.log(returnValue)

      if (res.ok) {
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
  flex-direction: row;
  justify-content: center;
}

.left-cover {
  width: 25%;
  background: var(--color-bg-primary);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-cover {
  width: 75%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 300px;
}

.right-cover-first-div {
  display: flex;
  flex-direction: column;
  width: 420px;
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
</style>
