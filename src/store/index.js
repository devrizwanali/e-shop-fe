import Vuex from 'vuex';
import auth from './modules/auth';
import product from './modules/product'
import user from './modules/user'
import card from './modules/card'


export default new Vuex.Store({
  modules: {
    auth,
    product,
    card,
    user
  }
})
