<template>
  <div v-if="product">
    <h1>Edit {{product.name}}</h1>
    <product-form :product="product" @onSubmit="onSubmit" button-text="update" />
  </div>
</template>
<script>
  import ProductForm from '@/components/ProductForm'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "EditProduct",
    computed:{
      ...mapGetters(['product']),
    },

    components: {
      ProductForm
    },

    created() {
      this.$store.dispatch('getProduct', this.$route.params.id)
    },

    methods: {
      ...mapActions(['updateProduct']),
      onSubmit(data) {
        this.updateProduct(data).then(res => {
          alert('Product updated successfully!')
          this.$router.push('/products')
        }).catch(err => alert(err))
      }
    }
  }
</script>