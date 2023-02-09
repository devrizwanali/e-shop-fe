import axios from '../../axios'

const state = {
  users: [],
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users
  }
};

const actions = {
  fetchUsers({ commit }) {
    axios.get('users')
      .then(res => {
        commit('SET_USERS', res.data)
      })
      .catch(err => console.log(err))
  },

  blockUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.put(`users/${user.id}`, {
        active: !user.active
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

const getters = {
  users: state => state.users
};

export default {
  state,
  getters,
  actions,
  mutations
};
