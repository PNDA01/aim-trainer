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
      return state.name !== ''
    }
  },

  mutations: {
    logUser: function (state, user: Request.User) {
      state.id = user.id
      state.name = user.name
      state.username = user.username
      state.password = user.password
      state.tasks = user.tasks
      state.status = 'Success'
    },

    logout: function (state) {
      state.name = ''
      state.username = ''
      state.password = ''
      state.status = ''
    }
  },

  actions: {
    signin: async function ({ commit, state }, user: Request.User) {
      console.log(`Trying sign in with ${user}...`)

      let found = await Request.readByUsername(user.username)
      if (found) {
        state.status = 'Username already in use'
      } else {
        await Request.signin(user.name, user.username, user.password)
        user = await Request.readByUsername(user.username)
        const tasks = await Request.get_tasks(user.id)
        user.tasks = tasks
        commit('logUser', user)
      }
    },

    login: async function ({ commit, state }, user: Request.User) {
      console.log('Trying login with', user)
      let request = await Request.login(user.username, user.password)
      if (request) {
        user = request
        const tasks = await Request.get_tasks(user.id)
        user.tasks = tasks
        commit('logUser', user)
      } else {
        state.status = 'Login failed'
      }
      return request
    },

    add_task: async function ({ state }, text: string) {
      console.log(`Adding task: ${text}`)
      const task = await Request.add_task(state.id, text, false)
      state.tasks.push(task)
    },

    update_task: async function ({ state }, task: Request.Task) {
      console.log(`Updating task to ${task}`)
      const new_task = await Request.update_task(
        state.id,
        task.id,
        task.text,
        task.status
      )
      state.tasks.indexOf(task)
    },

    rm_task: async function ({ state }, task_id: number) {
      console.log(`Removing task: ${task_id}`)
      await Request.rm_task(task_id)

      let index = state.tasks.findIndex((o) => {
        return o.id === task_id
      })
      state.tasks.splice(index, 1)
    }
  }
})

export default user
