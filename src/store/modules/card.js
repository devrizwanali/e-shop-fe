import axios from '@/axios'

const state = {
  card: [],
};

const mutations = {
  SET_CARDS(state, cards) {
    state.cards = cards
  }
};

const actions = {
  fetchCards({ commit }) {
    axios.get('cards')
      .then(res => {
        commit('SET_CARDS', res.data)
      })
      .catch(err => console.log(err))
  },

  addToCard({ commit }, productId) {
    return new Promise((resolve, reject) => {
      axios.post('cards', {
        productId: productId,
        quantity: 1
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteCard({ state ,commit }, id) {
    axios.delete(`cards/${id}`)
      .then(res => {
        const cards = state.cards.filter(c => c.id != id)
        commit('SET_CARDS', cards)
      })
      .catch(error => console.log(error))
  }
};

const getters = {
  cards: state => state.cards
};

export default {
  state,
  getters,
  actions,
  mutations
};
