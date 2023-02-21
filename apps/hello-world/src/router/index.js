import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

// set window title using meta property
router.afterEach((to) => {
  document.title = `${to.meta.title} | Hello world` || 'Hello world'
})

export default router
