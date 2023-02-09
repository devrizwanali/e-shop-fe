<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        label="Name"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="product.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        label="Category"
        label-for="category"
      >
        <b-form-input
          id="category"
          v-model="product.category"
          type='text'
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group 
        label="Price"
        label-for="price"
      >
        <b-form-input
          id="price"
          v-model="product.price"
          type='number'
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        label="Image"
        label-for="image"
      >
      <input id="image" type="file"  v-on:change="uploadFile" ref="fileInput" accept="image/*"/>
    </b-form-group>

      <b-button type="submit" size="lg" pill variant="success">{{buttonText}}</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "ProductForm",
    data() {
      return {
        file1: null
      }
    },
    props: {
      product: {
        type: Object,
        required: true
      },
      buttonText: {
        type: String,
        default(rawProps) {
          return 'Submit'
        }
      }
    },
    methods: {
      onSubmit() {
        if(!this.$refs['fileInput'].files[0]) {
          delete this.product.image
        }
        console.log(this.product)
        this.$emit('onSubmit', this.product)
      },
      uploadFile() {
        this.product['image'] = this.$refs['fileInput'].files[0]
      }
    }
  }
</script>
