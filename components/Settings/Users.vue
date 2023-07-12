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
  props: ['users'],
  data() {
    return {
      authCred: userData().credentials,
    }
  },
  methods: {},
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
