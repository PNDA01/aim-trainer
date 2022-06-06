import { createWebHistory, createRouter } from 'vue-router'
import ToDo from '../components/ToDo.vue'
import Login from '../components/Login.vue'
import SignIn from '../components/Signin.vue'

const routes = [
  {
    path: '/todo',
    component: ToDo
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signin',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
