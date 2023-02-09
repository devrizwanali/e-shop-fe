import axios from '@/axios'

let user = null;
if(localStorage.getItem('user')) 
  user = JSON.parse(localStorage.getItem('user'))

const state = {
  user: user
};

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  LOG_OUT(state) {
    state.user = null;
  }
};

const actions = {
 login({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('login', user)
      .then(res => {
        commit('SET_USER', res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        axios.defaults.headers["x-access-token"] = res.data.accessToken
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    commit('LOG_OUT')
    localStorage.removeItem('user')
  },

  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('register', {
        nickname: user.nickname,
        email: user.email,
        password: user.password
      }).then(res => {
        commit('SET_USER', res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        axios.defaults.headers["x-access-token"] = res.data.accessToken
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })

    })
  }
};

const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user
};

export default {
  state,
  getters,
  actions,
  mutations
};
