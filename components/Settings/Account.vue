<template>
  <div class="account-container">
    <form @submit.prevent="updateAccount">
      <div class="el">
        <label for="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          @focus="setFocus"
          @mouseleave="reverseFocus"
          :class="isFocused ? 'search-focus' : ''"
          v-model="user.name"
        />
      </div>
      <div class="el">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" v-model="user.email" />
      </div>
      <div class="el-btn">
        <button class="el-btn-cancel">Cancel</button>
        <button class="el-btn-procceed" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  inject: ['user'],
  data() {
    return {
      isFocused: false,
    }
  },
  methods: {
    setFocus() {
      this.isFocused = true
    },
    reverseFocus() {
      this.isFocused = false
    },
    async updateAccount() {
      if (this.user.name.length !== 0 && this.user.email.length !== 0) {
        const res = await $fetch(
          `http://localhost:8082/api/users/${this.user.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.user.name,
              email: this.user.email,
            }),
          },
        )
        const returnData = await res.json()
        console.log(returnData)
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
  justify-content: center;
  height: 100vh;
  width: 100%;
}

form {
  background: transparent;
  box-shadow: 3px 3px 3px 4px #e7e7e7;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.el {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.el label {
  font-weight: 800;
}

.el input {
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 10px;
}

.el-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.el-btn button {
  padding: 0.6rem 2rem;
  border: 2px solid var(--color-bg-primary);
  border-radius: 5px;
  background: transparent;
  font-weight: 800;
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
}

.el-btn-procceed:hover {
  opacity: 0.8;
}
.search-focus {
  outline: none !important;
  border: 2px solid var(--color-bg-primary) !important;
}
</style>
