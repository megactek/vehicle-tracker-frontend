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
        <tr v-for="item in devices" :key="item.uniqueId">
          <td>{{ item.name }}</td>
          <td>{{ item.uniqueId }}</td>
          <!-- <td>{{ item.category }}</td> -->
          <!-- <td>{{ item.phone }}</td> -->
          <!-- <td>{{ item.model }}</td> -->
          <td>{{ item.contact }}</td>
          <td>{{ item.expirationTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { userData } from '~/store/userData'

export default {
  inject: ['user'],
  data() {
    return {
      devices: userData().devices,
      authCred: userData().credentials,
    }
  },
  methods: {
    async getDevices() {
      const res = await fetch(`http://localhost:8082/api/devices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authCred,
        },
      })
      const returnValue = await res.json()
      console.log(returnValue)
      userData().logDevices(returnValue)
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

th,
td {
  border-bottom: 1px solid #ddd;
}
tr {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

td,
tr {
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
