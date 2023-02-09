<template>
  <div>
    <h1>Users</h1>
    <b-table
      :items="users"
      stacked="md"
      :fields="fields"
      show-empty
      small
      bordered="true"
    >
      <template #cell(active)="row">
        {{row.item.active ? "Yes" : "No"}}
      </template>
      <template #cell(actions)="row">

        <b-button v-if="row.item.active" size="sm" variant="danger" pill @click="banUser(row.item)" class="mr-1">
          Ban this user
        </b-button>

        <b-button v-if="!row.item.active" size="sm" variant="success" pill @click="banUser(row.item)" class="mr-1">
          Activate this user
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "Users",
    data() {
      return {
         fields: [
          { key: 'id', label: 'Id' },
          { key: 'nickname', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'active', label: 'Active' },
          { key: 'actions', label: 'Actions' }
        ]
      }
    },
    created() {
      if(!this.user.roles.includes('admin')){
        this.$router.push('/')
      }
      this.$store.dispatch('fetchUsers')
    },
    computed: {
      ...mapGetters(['users', 'user'])
    },
    methods: {
      ...mapActions(['blockUser']),
      banUser(item) {
        this.blockUser(item).then(res => this.$store.dispatch('fetchUsers'))
        .catch(error => alert("There is something went wrong!"))
      }
    }
  }
</script>
