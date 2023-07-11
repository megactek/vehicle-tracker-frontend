<template>
  <div class="users-container">
    <edit-group-modal
      v-show="shouldOpenEditModal"
      :authCred="authCred"
      :closeEditModal="closeEditModal"
      :editGroupId="editGroupId"
      v-bind:editGroupName="editGroupName"
      v-on:update:editGroupName="editGroupName = $event"
      :editId="editId"
    />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>GroupId</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in groups" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.groupId }}</td>
          <td>
            <div class="utils">
              <button @click="openEditModal(item.id, item.name, item.groupId)">
                Edit
              </button>
              <button style="color: red" @click="deleteGroup(item.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="error-container" v-if="error">
      <p class="error-msg">{{ errorMsg }}</p>
    </div>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
import EditGroupModal from '../Modal/EditGroupModal.vue'

export default {
  data() {
    return {
      groups: userData().groups,
      authCred: userData().credentials,
      error: false,
      errorMsg: '',
      shouldOpenEditModal: false,
      editGroupId: 0,
      editGroupName: '',
      editId: 0,
    }
  },
  components: {
    EditGroupModal,
  },
  methods: {
    openEditModal(id, name, groupId) {
      this.shouldOpenEditModal = true
      this.editGroupId = groupId
      this.editGroupName = name
      this.editId = id
    },
    closeEditModal() {
      this.shouldOpenEditModal = false
    },
    async deleteGroup(id) {
      if (!id) {
        this.error = true
        this.errorMsg = 'failed to delete group'
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      } else {
        try {
          const res = await fetch(`http://localhost:8082/api/groups/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: this.authCred,
            },
          })
          const returnValue = await res.json()
          console.log(returnValue)
          this.getGroups()
        } catch (e) {
          // this.error = true
          // this.errorMsg = e.message
          // setTimeout(() => {
          //   this.error = false
          //   this.errorMsg = ''
          // }, 3000)
        }
      }
    },
    async getGroups() {
      try {
        const res = await fetch(`http://localhost:8082/api/groups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        const returnValue = await res.json()
        console.log(returnValue)
        if (res.ok) {
          userData().logGroups(returnValue)
        } else {
          this.error = true
          this.errorMsg = 'cannot get groups'
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
    },
  },
  mounted() {
    this.getGroups()
  },
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
}

thead,
td {
  border-bottom: 1px solid #ddd;
}
tr {
  display: grid;
  grid-template-columns: 25% 25% 50%;
}

td,
tr {
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}

.utils {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
}

.utils button {
  padding: 0 5px;
  border: none;
  background: transparent;
  text-transform: lowercase;
  cursor: pointer;
}
</style>
