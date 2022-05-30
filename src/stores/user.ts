import { createStore } from 'vuex'
import * as Request from '../requests'

const user = createStore({
  state: {
    name: '',
    username: '',
    password: '',

    status: ''
  },

  getters: {
    isLoggedIn: function (state) {
      return state.username !== ''
    }
  },

  mutations: {
    logUser: function (state, user: Request.User) {
      state.name = user.name
      state.username = user.username
      state.password = user.password
      state.status = ''
    }
  },

  actions: {
    signin: async function ({ commit, state }, user: Request.User) {
      let found = await Request.exists(user.username)
      if (found) {
        state.status = 'Username already in use'
      } else {
        await Request.signin(user.name, user.username, user.password)
        commit('logUser', user)
      }
    },

    login: async function ({ commit, state }, user: Request.User) {
      let request = await Request.login(user.username, user.password)
      request ? commit('logUser', request) : (state.status = 'Login failed')
      return request
    },

    logout: async function ({ state }) {
      state.name = ''
      state.username = ''
      state.password = ''
    }
  }
})

export default user
