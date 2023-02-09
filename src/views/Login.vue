<template>
  <b-row>
    <b-col sm="12" md="6">
      <img src="@/assets/laptop.png" />
    </b-col>
    <b-col sm="12" md="6">
      <h1 class="mb-4" >Login</h1>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          label="Email"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="user.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group 
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            v-model="user.password"
            type='password'
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'Login',
     data() {
      return {
        user: {
          email: '',
          password: '',
        },
      }
    },

    mounted() {
      if(this.loggedInUser) {
        this.$router.push('/')
      }
    },

    computed: {
      ...mapGetters({ loggedInUser: 'user' })
    },

    methods: {
      ...mapActions(['login']),
      onSubmit() {
       this.login(this.user)
        .then(res => {
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.response.data.message)
        })
      }
    }
  }
</script>
<style type="text/css" scoped>
  img {
    width: 100%;
    height: 100%;
  }
</style>