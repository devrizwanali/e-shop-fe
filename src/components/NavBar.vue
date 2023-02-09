<template>
  <b-navbar toggleable="lg" type="dark" variant="light" class="mb-5">
    <b-navbar-brand to="/">e-shop</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="user?.roles?.includes('admin')">
        <b-nav-item to="/products">
          Manage Product
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="user?.roles?.includes('user')">
        <b-nav-item to="/cards" v-if="user.roles.includes('user')">
          MyCard
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="user?.roles?.includes('admin')">
        <b-nav-item to="/users">
          Users
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
          <b-nav-item to="/register" right v-if="!isAuthenticated">Registry</b-nav-item>
          <b-nav-item to="/login" right v-if="!isAuthenticated">Login</b-nav-item>
          <b-nav-item right v-if="isAuthenticated && user">{{user.nickname}}</b-nav-item>
          <b-nav-item right v-if="isAuthenticated" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  computed : {
      ...mapGetters(['isAuthenticated', 'user'])
    },
    methods: {
      async logout (){
        await this.$store.dispatch('logout')
        this.$router.push('/')
      }
    },
}
</script>
<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
