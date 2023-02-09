<template>
  <div>
   <h1> My Cards</h1>
   <h4 v-if="cards.length == 0" class="my-3">Nothing in card <router-link to="/">Add now?</router-link> </h4>
   <div v-else>
      <b-row class="border card-row">
        <b-col cols="4">Item</b-col>
        <b-col>Price</b-col>
        <b-col>Quantity</b-col>
        <b-col cols="2">Total</b-col>
        <b-col></b-col>
      </b-row>
       <b-row class="my-4" v-for="card of cards" :key="card.id">
          <b-col cols="4">
            <img :src="'data:image/jpg;charset=utf-8;base64,'+card.product.image">
            {{card.product.name}}
          </b-col>
          <b-col class="d-flex align-items-center">${{card.product.price}}</b-col>
          <b-col class="d-flex align-items-center">{{card.quantity}}</b-col>
          <b-col class="d-flex align-items-center" cols="2">${{card.quantity * card.product.price}}</b-col>
          <b-col class="remove-wrapper mt-4" @click="removeFromCard(card.id)">
            <p class="remove">X</p>
          </b-col>
       </b-row>
        <p style="font-weight: bold; float: right;" class="border p-2">Sum:<span class="mx-5">${{total}}</span></p>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: "MyCard",
    created() {
      this.$store.dispatch('fetchCards')
    },
    computed: {
      ...mapGetters(['cards']),
      total() {
        var sum = 0;
        this.cards.map( card => {
          sum += (card.quantity * card.product.price)
        })
        return sum
      }
    },
    methods: {
      removeFromCard(id) {
        this.$store.dispatch('deleteCard', id)
      }
    }
  }
</script>
<style scoped>
  .card-row {
    background: #ef6c00;
    padding: 5px;
    color: white;
    font-weight: bold;
  }
  img {
    height: 80px;
    width: 80px;
  }
  .remove-wrapper {
    text-align: center;
  }

  .remove {
    background: #ef6c00;
    color: white; 
    width: 32px;
    height: 32px;
    font-weight: bold; 
    margin-right: 30px; 
    cursor: pointer;
  }
</style>
