import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import VideoIntro from './views/VideoIntro.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/video',
    name: 'video',
    component: VideoIntro
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
