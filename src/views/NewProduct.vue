<template>
  <div>
    <h1>Create new Product</h1>
    <product-form :product="product" @onSubmit="onSubmit" button-text="create" />
  </div>
</template>
<script>
  import ProductForm from '@/components/ProductForm'
  import { mapActions } from 'vuex'
  export default {
    name: "NewProduct",
    data() {
      return {
        product: {
          name: '',
          price: 0,
          category: ''
        }
      }
    },
    components: {
      ProductForm
    },
    methods: {
      ...mapActions(['createProduct']),
      onSubmit(data) {
        this.createProduct(data).then(res => {
          alert('Product created successfully!')
          this.$router.push('/products')
        }).catch(error => alert(error.response.data.message))
      }
    }
  }
</script>