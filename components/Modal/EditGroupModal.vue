<template>
  <div class="modal-container">
    <div class="add-group-container">
      <form @submit.prevent="editGroup">
        <div class="cover">
          <div class="header">
            <span :style="isBtnActive ? 'color:green' : 'color:red'">*</span>
          </div>
          <input
            type="text"
            id="edit-name"
            placeholder="Name"
            v-bind:value="editGroupName"
            v-on:input="$emit('update:editGroupName', $event.target.value)"
            @keyup="validateInput"
          />
        </div>
        <div class="error-container" v-if="error">
          <p class="error-msg">{{ errorMsg }}</p>
        </div>
        <div class="btn">
          <button type="button" class="inactive-btn" @click="closeEditModal">
            Cancel
          </button>
          <button type="submit" class="active-btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
const runtimeConfig = useRuntimeConfig()

export default {
  props: [
    'authCred',
    'closeEditModal',
    'editGroupId',
    'editGroupName',
    'editId',
  ],
  data() {
    return {
      isBtnActive: false,
      error: false,
      errorMsg: '',
      api: runtimeConfig.public.api,
    }
  },
  methods: {
    async editGroup() {
      if (this.editGroupName.length === 0) {
        this.error = true
        this.errorMsg = 'name is a required field'
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      } else {
        try {
          const obj = {
            id: this.editId,
            name: document.getElementById('edit-name').value,
            groupId: this.editGroupId,
          }
          const res = await fetch(`${this.api}/groups/${this.editId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.authCred,
            },
            body: JSON.stringify(obj),
          })
          if (res.ok) {
            // this.$emit('closeEditModal', true)
            this.closeEditModal()
          } else {
            this.error = true
            this.errorMsg = 'cannot edit group'
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 3000)
          }
        } catch (e) {
          this.error = true
          this.errorMsg = e
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
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 20%;
  right: 0;
  background: transparent;
  backdrop-filter: blur(2px);
}
.add-group-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
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
  cursor: pointer;
  padding: 10px;
  width: 100px;
  border-radius: 5px;
}

button:hover {
  opacity: 0.9;
}

input:focus {
  outline: none;
}

.inactive-btn {
  color: #333;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
}

.active-btn {
  color: #f4f4f4;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-bg-primary);
}

input {
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding-left: 10px;
}

.btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

@media (max-width: 900px) {
  .modal-container {
    left: 0;
  }
}
</style>
