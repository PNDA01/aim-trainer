import { createWebHistory, createRouter } from 'vue-router'
import ToDo from '../components/ToDo.vue'
import Login from '../components/Login.vue'
import SignIn from '../components/Signin.vue'

/* An array of objects. Each object has a path and a component. The path is the url that will be used
to access the component. The component is the component that will be displayed when the path is
accessed. */
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
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
