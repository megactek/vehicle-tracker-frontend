<template>
  <div class="route-container">
    <div class="btn-container">
      <div class="btn-el">
        <select name="device" id="route-device">
          <option value="device" disabled selected>Device</option>
          <option value="infinix">Infinix</option>
        </select>
      </div>
      <div class="btn-el">
        <button @click="getHistory">Show</button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>FixTime</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in history" :key="item.id">
            <td>{{ item.device }}</td>
            <td class="wrap-content">{{ item.fixTime }}</td>
            <td>{{ item.latitude }}</td>
            <td>{{ item.longitude }}</td>
            <td>{{ item.speed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { userData } from '~/store/userData'
const runtimeConfig = useRuntimeConfig()

export default {
  data() {
    return {
      history: [],
      authCred: userData().credentials,
      error: false,
      errorMsg: '',
      api: runtimeConfig.public.api,
    }
  },
  methods: {
    async getHistory() {
      try {
        const res = await fetch(`${this.api}/reports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authCred,
          },
        })
        if (res.ok) {
          const returnValue = await res.json()
          this.history = returnValue
        } else {
          this.error = true
          this.errorMsg = 'cannot get route history'
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
    },
  },
}
</script>
<style scoped>
.route-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  overflow-y: scroll;
}

.btn-container {
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 1rem;
  gap: 1rem;
}

.btn-el select {
  width: 250px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background: transparent;
  color: #222;
  padding: 0.5rem;
  cursor: pointer;
}

.btn-el button {
  width: 250px;
  border: 1px solid var(--color-bg-primary);
  border-radius: 5px;
  background: transparent;
  color: var(--color-bg-primary);
  cursor: pointer;
  padding: 0.5rem;
}

.wrap-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.table-container {
}

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
  grid-template-columns: 20% 25% 20% 20% 15%;
}

td,
tr {
  text-align: left;
}
</style>
