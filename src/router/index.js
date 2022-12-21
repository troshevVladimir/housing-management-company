import { createWebHistory, createRouter } from 'vue-router'

import Main from '@/views/Main.vue'

const routes = [


  { path: '/', component: Main }]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

export default router
