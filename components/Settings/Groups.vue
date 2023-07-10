<template>
  <div class="users-container">
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
      groups: userData().groups,
      authCred: userData().credentials,
    }
  },
  methods: {
    async getGroups() {
      const res = await fetch(`http://localhost:8082/api/groups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authCred,
        },
      })
      const returnValue = await res.json()
      console.log(returnValue)
      userData().logGroups(returnValue)
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

th,
td {
  border-bottom: 1px solid #ddd;
}
tr {
  display: grid;
  grid-template-columns: 50% 50%;
}

td,
tr {
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
