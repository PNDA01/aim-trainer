import { createStore } from 'vuex'
import * as Request from '../requests'

const tasks: Request.Task[] = []

const user = createStore({
  state: {
    id: -1,
    name: '',
    username: '',
    password: '',

    status: '',

    tasks: tasks
  },

  getters: {
    isLoggedIn: function (state) {
      return state.username !== ''
    }
  },

  mutations: {
    logUser: function (state, user: Request.User) {
      state.id = user.id
      state.name = user.name
      state.username = user.username
      state.password = user.password
      state.status = 'Success'
      state.tasks = user.tasks
    }
  },

  actions: {
    signin: async function ({ commit, state }, user: Request.User) {
      let found = await Request.exists(user.username)
      if (found) {
        state.status = 'Username already in use'
      } else {
        await Request.signin(user.name, user.username, user.password)
        user = await Request.exists(user.username)
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
      state.status = ''
    }
  }
})

export default user
