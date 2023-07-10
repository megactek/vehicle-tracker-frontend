<template>
  <div class="users-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Disabled</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.administrator }}</td>
          <td>{{ item.disabled }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { userData } from '~/store/userData'

export default {
  data() {
    return {
      users: userData().users,
      authCred: userData().credentials,
    }
  },
  methods: {
    async getUsers() {
      const res = await fetch(`http://localhost:8082/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authCred,
        },
      })
      const returnValue = await res.json()
      console.log(returnValue)
      userData().logUsers(returnValue)
    },
  },
  mounted() {
    this.getUsers()
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
