<template>
  <b-row>
    <b-col sm="12" md="6">
      <img src="@/assets/laptop.png" />
    </b-col>
    <b-col sm="12" md="6">
      <h1 class="mb-4" >Register</h1>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          label="Nickname"
          label-for="nickName"
        >
          <b-form-input
            id="nickName"
            v-model="user.nickname"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

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

        <b-form-group 
          label="Confirm Password"
          label-for="confirmPassword"
        >
          <b-form-input
            id="confirmPassword"
            type="password"
            v-model="user.confirmPassword"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'Register',
     data() {
      return {
        user: {
          email: '',
          password: '',
          nickname: '',
          confirmPassword: ''
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
      ...mapActions(['register']),
      onSubmit() {
        if(this.user.password !== this.user.confirmPassword) {
          alert('password and confirm password does not match')
          return
        }
       this.register(this.user)
        .then(res => {
          alert('Signup successfully!')
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