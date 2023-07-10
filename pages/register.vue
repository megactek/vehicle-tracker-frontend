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
        <h2>Register</h2>
        <p class="login-link">
          Already have an account?
          <nuxt-link to="/login" class="link-color">Log In</nuxt-link>
        </p>
        <form @submit.prevent="onRegister">
          <div class="input-field">
            <input
              v-model="inputName"
              type="text"
              name="username"
              placeholder="Username*"
              required
              @keypress="onKeyUp"
              @mousemove="onKeyUp"
            />
          </div>
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
          <p class="error-msg">{{ msg }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertApp from '../components/AlertApp.vue'
import LoadingApp from '../components/LoadingApp.vue'
import NuxtLogo from '../components/NuxtLogo.vue'

definePageMeta({
  title: "Trakka | Register"
})
export default {
  // eslint-disable-next-line vue/component-definition-name-casing, vue/multi-word-component-names
  name: 'register',
  components: { LoadingApp, AlertApp, NuxtLogo },
  data() {
    return {
      inputName: '',
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
  // const formData = new URLSearchParams()
  //       formData.append('email', this.inputEmail)
  //       formData.append('password', this.inputPassword)
  methods: {
    async onRegister() {
      const res = await fetch('http://localhost:8082/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.inputName,
          email: this.inputEmail,
          password: this.inputPassword,
        }),
      })
      if (res.ok) {
        this.msg = 'Registration Successful'
        this.successAlert = true
        this.loading = true
        this.alert = true
        setTimeout(() => {
          this.alert = false
          this.loading = false
          this.successAlert = false
          this.$router.push({ path: '/login' })
        }, 3000)
      } else {
        this.msg = 'Registration Failed'
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
      if (
        this.inputPassword.length > 1 &&
        this.inputEmail &&
        this.inputName.length > 1
      ) {
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

.btn-allowed {
  border: 1px solid var(--color-bg-primary);
  background: var(--color-bg-primary);
  cursor: pointer;
}
</style>
