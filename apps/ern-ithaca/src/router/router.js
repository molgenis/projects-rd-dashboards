import { createRouter, createWebHistory } from 'vue-router'
const initialState = window.__INITIAL_STATE__ || {}

import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
      meta: {
        title: 'Home'
      }
    }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | ERN ITHACA` || 'ERN ITHACA'
})

export default router
