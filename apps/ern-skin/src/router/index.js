import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomePage.vue'
import AboutUsView from '@/views/AboutUs.vue'
import DocumentsView from '@/views/DocumentsPage.vue'
import DashboardView from '@/views/DashboardPage.vue'

const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUsView,
      meta: {
        title: 'About Us'
      }
    },
    {
      path: '/documents',
      name: 'documents',
      component: DocumentsView,
      meta: {
        title: 'Documents'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Dashboard'
      }
    }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

// set window title using meta property
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ERN-Skin` : 'ERN-Skin'
})

export default router
