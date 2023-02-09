<template>
  <b-row v-for="product of items" class="my-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <p>{{product.name}}</p>
          <star-rating read-only :rating="product.rating" star-size="25"/>
        </div>
        <p>${{product.price}}</p>
      </div>
      <div class="card-footer">
        <b-button @click="addToCard(product.id)">Add to card</b-button>
      </div>
    </div>
  </b-row>
</template>

<script>
  import StarRating from 'vue-star-rating'
  export default {
    name: 'ProductList',
    components: {
      StarRating
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      addToCard(id) {
        this.$store.dispatch('addToCard', id).then(res => {
          alert('Successfully added!')
        }).catch(err => alert(err))
      }
    }
  }
</script>

<style scoped>
  .card-footer{
    background: none;
  }

  .vue-star-rating-rating-text {
    display: none !important;
  }
</style>