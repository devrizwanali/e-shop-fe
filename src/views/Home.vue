<template>
  <b-row>
    <div class="card mx-2 my-2" style="width: 25rem;" v-for="product of products" :key="product.id">
      <div class="card-body">
        <b-row>
          <b-col>
            <img :src="'data:image/jpg;charset=utf-8;base64,'+product.image">
          </b-col>
          <b-col>
            <div>
              <h5 class="card-title">{{product.name}}</h5>
              <star-rating read-only :rating="product.rating" star-size="15"/>
            </div>
            <p class="card-text">${{product.price}}</p>
            <b-button variant="outline-info" pill @click="addToCard(product.id)">Add to card</b-button>
        </b-col>
      </b-row>
      </div>
    </div>
  </b-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StarRating from 'vue-star-rating'
  export default {
    name: 'Home',
    components: {
      StarRating
    },
    methods: {
      addToCard(id) {
        if(this.user) {
          if(this.user.active) {
            this.$store.dispatch('addToCard', id).then(res => {
              alert('Successfully added!')
            }).catch(err => alert(err))
          } else {
            alert('You can not add this product because you are blocked!')
          }
        }
      }
    },
    mounted() {
      this.$store.dispatch('fetchProducts')
    },
    computed: {
      ...mapGetters(['products', 'user'])
    }
  }
</script>

<style scoped>
  img {
    width: 160px;
    height: 160px;
  }
</style>
