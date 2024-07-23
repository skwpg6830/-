import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Register from '../Register.vue'
import Login from '../Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
