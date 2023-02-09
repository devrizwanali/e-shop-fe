<template>
  <div>
    <h1>Products</h1>
    <div v-if="user.roles.includes('admin')">
      <b-button pill @click="this.$router.push('/products/create')" class="my-4">
        Create new product
      </b-button>
      <b-table
        :items="products"
        :fields="fields"
        stacked="md"
        show-empty
        small
        bordered="true"
        >
        <template #cell(price)="row">
          ${{row.value}}
        </template>

        <template #cell(image)="row">
            <img :src="'data:image/jpg;charset=utf-8;base64,'+row.value">
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="success" pill @click="editProduct(row.item)" class="mr-1">
            Edit
          </b-button>
          |
          <b-button size="sm" variant="danger" pill @click="deleteProduct(row.item)" class="mr-1">
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    name: 'Products',
    data() {
      return {
         fields: [
          { key: 'id', label: 'Id' },
          { key: 'name', label: 'Name' },
          { key: 'price', label: 'Price' },
          { key: 'category', label: 'Category' },
          { key: 'image', label: 'Image' },
          { key: 'actions', label: 'Actions' },
          
        ]
      }
    },
    created() {
      if(!this.user){
        this.$router.push('/')
      }
    },
    mounted() {
      this.$store.dispatch('fetchProducts')
    },
    computed: {
      ...mapGetters(['products', 'user'])
    },
    methods: {
      deleteProduct(item) {
        this.$store.dispatch('deleteProduct', item.id)
      },
      editProduct(item) {
        this.$router.push(`/products/${item.id}/edit`)
      }
    }
  }
</script>

<style scoped>
    img {
    width: 100px;
    height: 80px;
  }
</style>
