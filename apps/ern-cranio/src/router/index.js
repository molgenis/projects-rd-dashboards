import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home-page.vue'
import AboutPage from '@/views/about-page.vue'
import DashboardPage from '@/views/dashboard-page.vue'
const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
      meta: {
        title: 'Dashboard'
      }
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
  document.title = `${to.meta.title} | ERN CRANIO` || 'ERN CRANIO'
})

export default router
