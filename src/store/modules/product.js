import axios from '@/axios'

const state = {
  products: [],
  product: null
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  ADD_PRODUCT(state, product) {
    state.products.unshift(product)
  },

  SET_PRODUCT(state, product) {
    state.product = product
  }
};

const actions = {
  async fetchProducts({ commit }) {
    await axios.get(`products`)
     .then(res => {
       commit('SET_PRODUCTS', res.data)
     })
     .catch(error => {
       console.log(error)
     })
  },

  createProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      setHeader(true)
      axios.post(`products`, data)
      .then(res => {
        commit('ADD_PRODUCT', res.data)
        setHeader(false)
        resolve(res)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  async getProduct({ commit }, id) {
    await axios.get(`products/${id}`)
    .then(res => {
      commit('SET_PRODUCT', res.data)
    })
    .catch(error => console.log(error))
  },

  updateProduct({ commit }, data) {
    setHeader(true)
    return axios.put(`products/${data.id}`, data)
    setHeader(false)
  },

  deleteProduct({ state ,commit }, id) {
    axios.delete(`products/${id}`)
      .then(res => {
        const products = state.products.filter(x => x.id != id)
        commit('SET_PRODUCTS', products)
      })
      .catch(error => {
        console.log(error)
      })
  }
};

function setHeader(multipart) {
  if(multipart)
    axios.defaults.headers['Content-type'] = 'multipart/form-data'
  else
    axios.defaults.headers['Content-type'] = 'application/json'
}

const getters = {
  products: state => state.products,
  product: state => state.product
};

export default {
  state,
  getters,
  actions,
  mutations
};
