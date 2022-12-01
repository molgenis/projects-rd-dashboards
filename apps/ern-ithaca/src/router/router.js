import { createRouter, createWebHistory } from 'vue-router'
const initialState = window.__INITIAL_STATE__ || {}

import HomePage from '@/views/HomePage.vue'
import Documents from '@/views/Documents.vue'
import Dashboard from '@/views/Dashboard.vue'
import AboutUs from '@/views/AboutUs.vue'
import TransparencyPage from '@/views/Transparency.vue'

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
    },
    {
      name: 'about-us',
      path: '/ithaca-about-us',
      component: AboutUs,
      meta: {
        title: 'About Us'
      }
    },
    {
      name: 'dashboard',
      'path': '/ithaca-dashboard',
      component: Dashboard,
      meta: {
        title: 'Dasboard'
      }
    },
    {
      name: 'documents',
      'path': '/ithaca-documents',
      component: Documents,
      meta: {
        title: 'Documents'
      }
    },
    {
      name: 'transparency',
      path: '/ithaca-transparency',
      component: TransparencyPage,
      meta: {
        title: 'Transparence'
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
