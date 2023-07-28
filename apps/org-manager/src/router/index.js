import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
const initialState = window.__INITIAL_STATE__ || {}

const PROJECT = "FDHUB"

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        project: PROJECT
      }
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// set window title using meta property
router.afterEach((to) => {
  document.title = to.meta.title && to.meta.project
    ? `${to.meta.title} | ${to.meta.project}`
    : to.meta.title || to.meta.project
})

export default router
