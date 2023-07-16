<template>
  <div class="device-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Identifier</th>
          <!-- <th>Group</th> -->
          <!-- <th>Phone</th> -->
          <!-- <th>Model</th> -->
          <th>Contact</th>
          <th>Expiration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in mainDevices" :key="item.uniqueId">
          <td>{{ item.name }}</td>
          <td>{{ item.uniqueId }}</td>
          <!-- <td>{{ item.category }}</td> -->
          <!-- <td>{{ item.phone }}</td> -->
          <!-- <td>{{ item.model }}</td> -->
          <td>{{ item.contact }}</td>
          <td>{{ item.expirationTime }}</td>
          <td>
            <div class="utils">
              <button style="color: red" @click="deleteDevice(item.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
const runtimeConfig = useRuntimeConfig()

export default {
  props: ['devices', 'bodyDisplay'],
  inject: ['user'],
  data() {
    return {
      authCred: userData().credentials,
      hasBeenDeleted: null,
      mainDevices: [],
      api: runtimeConfig.public.api,
    }
  },
  methods: {
    async getDevices() {
      try {
        const res = await fetch(`${this.api}/devices`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        if (res.ok) {
          const returnData = await res.json()
          userData().logDevices(returnData)
          this.mainDevices = userData().devices
        } else {
          this.error = true
          if (res.status === 401) {
            this.$router.push('/login')
          } else {
            this.errorMsg = 'cannot get devices'
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 3000)
          }
        }
      } catch (e) {
        this.errorMsg = e
        setTimeout(() => {
          this.error = false
          this.errorMsg = ''
        }, 3000)
      }
    },
    async deleteDevice(id) {
      await fetch(`${this.api}/devices/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: this.authCred,
        },
      })
      this.hasBeenDeleted = id
    },
  },
  watch: {
    hasBeenDeleted(old, newVal) {
      this.getDevices()
    },
    bodyDisplay(old, newVal) {
      this.getDevices()
    },
  },
  mounted() {
    this.getDevices()
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
  grid-template-columns: 25% 20% 15% 25% 15%;
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
